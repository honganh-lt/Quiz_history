const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendMail = require("../config/sendMail");

// ================= REGISTER =================
exports.register = async (req, res, next) => {
    const { username, email, password, full_name } = req.body;

    if (!username || !email || !password || !full_name) {
        return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin bắt buộc" });
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
        return res.status(400).json({
            message: "Username chỉ được chứa chữ, số và dấu gạch dưới (_), không chứa dấu tiếng Việt hoặc khoảng trắng"
        });
    }

    try {
        // 1. Kiểm tra username xem đã tồn tại chưa
        const [userCheck] = await db.query(`SELECT user_id FROM users WHERE username = ?`, [username]);
        if (userCheck.length > 0) {
            return res.status(400).json({ message: "Tên tài khoản (username) này đã tồn tại" });
        }

        // 2. Kiểm tra email xem đã tồn tại chưa (Tách biệt lỗi giúp UI hiển thị rõ ràng)
        const [emailCheck] = await db.query(`SELECT user_id FROM users WHERE email = ?`, [email]);
        if (emailCheck.length > 0) {
            return res.status(400).json({ message: "Địa chỉ email này đã được đăng ký sử dụng" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); //hash gì?
        
        const sql = `
            INSERT INTO users (username, email, password, role, full_name)
            VALUES (?, ?, ?, ?, ?)
        `;
        await db.query(sql, [username.trim(), email.trim(), hashedPassword, "USER", full_name.trim()]);

        return res.status(201).json({ message: "Đăng ký thành công" });

    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ message: "Tài khoản hoặc Email đăng ký đã tồn tại trên hệ thống" });
        }
        next(error); 
    }
};

// ================= LOGIN =================
exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Thiếu username hoặc password" });
    }

    try {
        const [users] = await db.query("SELECT * FROM users WHERE username = ?", [username]);

        if (users.length === 0) {
            return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
        }

        const user = users[0];

        if (user.status === "blocked") {
            return res.status(403).json({ message: "Tài khoản của bạn đã bị khóa bởi ban quản trị" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
        }

        //Access Token chỉ nên sống ngắn hạn để đảm bảo tính an toàn
        const accessToken = jwt.sign(
            { user_id: user.user_id, role: user.role },
            process.env.JWT_SECRET, 
            { expiresIn: "15m" } 
        );

        const refreshToken = crypto.randomBytes(64).toString("hex");
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1); // Refresh token sống

        const insertSql = `
            INSERT INTO refresh_tokens (token, user_id, expiry_date)
            VALUES (?, ?, ?)
        `;
        await db.query(insertSql, [refreshToken, user.user_id, expiryDate]);
         
        return res.json({
            access_token: accessToken,
            refresh_token: refreshToken,
            user: {
                user_id: user.user_id,
                username: user.username,
                role: user.role,
                full_name: user.full_name,
                email: user.email
            }
        });

    } catch (error) {
        next(error);
    }
};

// ================= FORGOT PASSWORD =================
exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (users.length === 0) {
            return res.status(404).json({ message: "Email không tồn tại" });
        }

        const user = users[0];
        const otp = Math.floor(100000 + Math.random() * 900000).toString();        
        
        //Tạo hẳn một đối tượng Date (Thời gian hiện tại + 5 phút)
        const expireDate = new Date(Date.now() + 5 * 60 * 1000); 

        // Thư viện mysql2 sẽ tự động định dạng expireDate thành 'YYYY-MM-DD HH:MM:SS' khi truyền vào tham số
        const updateSql = `UPDATE users SET otp_code = ?, otp_expire = ? WHERE user_id = ?`;
        await db.query(updateSql, [otp, expireDate, user.user_id]);

        // Đợi gửi mail xong mới phản hồi
        await sendMail(
            email,
            "Quên mật khẩu",
            `<h2>Mã OTP của bạn</h2><h1>${otp}</h1>`
        );

        return res.json({ message: "Đã gửi OTP" });

    } catch (error) {
        next(error);
    }
};

// ================= VERIFY OTP =================
exports.verifyOtp = async (req, res, next) => {
    const { email, otp, newPassword } = req.body;

    try {
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (users.length === 0) {
            return res.status(404).json({ message: "Email không tồn tại" });
        }

        const user = users[0];

        if (user.otp_code !== otp) {
            return res.status(400).json({ message: "OTP không đúng" });
        }

        //Do dữ liệu trả về từ cột DATETIME đã là một Object Date của JS,
        // chúng ta chỉ cần dùng .getTime() để đổi ra mốc số mili-giây (Timestamp)
        const expireTime = new Date(user.otp_expire).getTime();
        
        // So sánh trực tiếp với thời gian thực tại của hệ thống (Date.now())
        if (Date.now() > expireTime) {
            return res.status(400).json({ message: "OTP đã hết hạn" });
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);
        const updateSql = `
            UPDATE users SET password = ?, otp_code = NULL, otp_expire = NULL WHERE user_id = ?
        `;
        await db.query(updateSql, [hashPassword, user.user_id]);

        return res.json({ message: "Đổi mật khẩu thành công" });

    } catch (error) {
        next(error);
    }
};

// ================= CHANGE PASSWORD =================
exports.changePassword = async (req, res, next) => {
    // Lưu ý: Đảm bảo Auth Middleware của bạn đã gán đối tượng giải mã token vào req.user trước đó
    const userId = req.user?.user_id; 
    const { oldPassword, newPassword } = req.body;

    if (!userId) {
        return res.status(401).json({ message: "Bạn không có quyền thực hiện hành động này" });
    }

    try {
        const [users] = await db.query("SELECT * FROM users WHERE user_id = ?", [userId]);

        if (users.length === 0) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mật khẩu cũ nhập vào không chính xác" });
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);
        await db.query(`UPDATE users SET password = ? WHERE user_id = ?`, [hashPassword, userId]);

        return res.json({ message: "Đổi mật khẩu thành công" });

    } catch (error) {
        next(error);
    }
};

// ================= REFRESH TOKEN =================
exports.refreshToken = async (req, res, next) => {
    const { refresh_token } = req.body;

    if (!refresh_token) {
        return res.status(401).json({ message: "Không tìm thấy refresh token đính kèm" });
    }

    try {
        const [tokens] = await db.query(
            `SELECT * FROM refresh_tokens WHERE token = ? AND revoked = FALSE`, 
            [refresh_token]
        );

        if (tokens.length === 0) {
            return res.status(403).json({ message: "Phiên làm việc không hợp lệ hoặc đã bị hủy" });
        }

        const tokenData = tokens[0];

        if (new Date(tokenData.expiry_date).getTime() < Date.now()) {
            return res.status(403).json({ message: "Phiên làm việc đã hết hạn, vui lòng đăng nhập lại" });
        }

        const [users] = await db.query("SELECT role FROM users WHERE user_id = ?", [tokenData.user_id]);
        if (users.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy người dùng sở hữu token này" });
        }
        const user = users[0];

        //Đồng bộ thời gian sống ngắn hạn
        const newAccessToken = jwt.sign(
            { user_id: tokenData.user_id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        return res.json({ access_token: newAccessToken });

    } catch (error) {
        next(error);
    }
};

// ================= LOGOUT =================
exports.logout = async (req, res, next) => {
    const { refresh_token } = req.body;

    if (!refresh_token) {
        return res.status(400).json({ message: "Thiếu refresh token yêu cầu hủy" });
    }

    try {
        await db.query(`UPDATE refresh_tokens SET revoked = TRUE WHERE token = ?`, [refresh_token]);
        return res.json({ message: "Đăng xuất tài khoản thành công" });
    } catch (error) {
        next(error);
    }
};