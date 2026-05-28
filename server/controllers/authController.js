const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendMail = require("../config/sendMail");

// ================= REGISTER =================
exports.register = async (req, res, next) => {
    const { username, email, password, full_name } = req.body;

    if (!username || !email || !password || !full_name) {
        return res.status(400).json({ message: "Thiếu dữ liệu" });
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
        return res.status(400).json({
            message: "Username chỉ được chứa chữ, số và dấu _ , không dấu và không khoảng trắng"
        });
    }

    try {
        // Kiểm tra username tồn tại (Cú pháp bóc tách mảng kết quả của Promise)
        const [rows] = await db.query(`SELECT user_id FROM users WHERE username = ?`, [username]);

        if (rows.length > 0) {
            return res.status(400).json({ message: "Username đã tồn tại" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const sql = `
            INSERT INTO users (username, email, password, role, full_name)
            VALUES (?, ?, ?, ?, ?)
        `;
        await db.query(sql, [username, email, hashedPassword, "USER", full_name]);

        return res.status(201).json({ message: "Đăng ký thành công" });

    } catch (error) {
        // Xử lý lỗi trùng unique key (ER_DUP_ENTRY) của MySQL dạng Promise
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ message: "Username hoặc email đã tồn tại" });
        }
        next(error); // Các lỗi hệ thống khác đẩy sang Error Middleware
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
            return res.status(403).json({ message: "Tài khoản đã bị khóa" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
        }

        const accessToken = jwt.sign(
            { user_id: user.user_id, role: user.role },
            process.env.JWT_SECRET, 
            { expiresIn: "7d" }
        );

        const refreshToken = crypto.randomBytes(64).toString("hex");
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);

        const insertSql = `
            INSERT INTO refresh_tokens (token, user_id, expiry_date)
            VALUES (?, ?, ?)
        `;
        await db.query(insertSql, [refreshToken, user.user_id, expiryDate]);

        // Thêm dòng này để debug
        console.log("Dữ liệu user từ DB:", user);      
         
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
        
        // CHỌN CÁCH 1: Lấy số Timestamp mili-giây (Ví dụ: 1716712700000)
        // Số này sẽ khớp hoàn toàn với kiểu dữ liệu `bigint` trong DB của bạn
        const expire = Date.now() + 5 * 60 * 1000; 

        const updateSql = `UPDATE users SET otp_code = ?, otp_expire = ? WHERE user_id = ?`;
        await db.query(updateSql, [otp, expire, user.user_id]);

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

        // TỐI ƯU THÊM: Khi lấy dữ liệu 'otp_expire' từ MySQL lên, nó có thể là chuỗi hoặc đối tượng Date.
        // Ép nó về timestamp (miligiây) bằng `new Date(...).getTime()` để so sánh với Date.now() chính xác 100%.
        const expireTime = new Date(user.otp_expire).getTime();
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
    const userId = req.user.user_id;
    const { oldPassword, newPassword } = req.body;

    try {
        const [users] = await db.query("SELECT * FROM users WHERE user_id = ?", [userId]);

        if (users.length === 0) {
            return res.status(404).json({ message: "User không tồn tại" });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mật khẩu cũ không đúng" });
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
        return res.status(401).json({ message: "Không có refresh token" });
    }

    try {
        const [tokens] = await db.query(
            `SELECT * FROM refresh_tokens WHERE token = ? AND revoked = FALSE`, 
            [refresh_token]
        );

        if (tokens.length === 0) {
            return res.status(403).json({ message: "Token không hợp lệ" });
        }

        const tokenData = tokens[0];

        if (new Date(tokenData.expiry_date) < new Date()) {
            return res.status(403).json({ message: "Token đã hết hạn" });
        }

        const [users] = await db.query("SELECT role FROM users WHERE user_id = ?", [tokenData.user_id]);
        const user = users[0];

        const newAccessToken = jwt.sign(
            { user_id: tokenData.user_id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
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
        return res.status(400).json({ message: "Thiếu refresh token" });
    }

    try {
        await db.query(`UPDATE refresh_tokens SET revoked = TRUE WHERE token = ?`, [refresh_token]);
        return res.json({ message: "Logout thành công" });
    } catch (error) {
        next(error);
    }
};