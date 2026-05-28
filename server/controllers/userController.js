const db = require("../config/db");
const bcrypt = require("bcrypt");

// ================= GET ALL USERS =================
exports.getUser = async (req, res, next) => {
    const sql = "SELECT * FROM users";

    try {
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (err) {
        next(err);
    }
};

// ================= POST (CREATE) USER =================
exports.postUser = async (req, res, next) => {
    console.log("BODY:", req.body);
    const { username, full_name, email, password, role } = req.body;

    try {
        // 1. CHECK TRÙNG USERNAME / EMAIL (Dùng await thẳng thắn, không callback)
        const checkSql = "SELECT * FROM users WHERE username = ? OR email = ?";
        const [checkResult] = await db.query(checkSql, [username, email]);

        if (checkResult.length > 0) {
            const usernameExists = checkResult.find(user => user.username === username);
            if (usernameExists) {
                return res.status(400).json({ message: "Username đã tồn tại" });
            }

            const emailExists = checkResult.find(user => user.email === email);
            if (emailExists) {
                return res.status(400).json({ message: "Email đã tồn tại" });
            }
        }

        // 2. HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. INSERT USER MỚI
        const sql = `
            INSERT INTO users (username, full_name, email, password, role)
            VALUES (?, ?, ?, ?, ?)
        `;
        await db.query(sql, [username, full_name, email, hashedPassword, role]);

        res.json({ message: "Created" });
    } catch (err) {
        next(err); // try/catch bây giờ đã bắt được toàn bộ lỗi trong khối này
    }
};

// ================= TOGGLE BLOCK USER (khóa) =================
exports.toggleBlockUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        // Lấy status hiện tại
        const findSql = "SELECT status FROM users WHERE user_id = ?";
        const [result] = await db.query(findSql, [id]);

        if (result.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy user" });
        }

        const currentStatus = result[0].status;
        const newStatus = currentStatus === "blocked" ? "active" : "blocked";

        // Cập nhật trạng thái mới
        const updateSql = "UPDATE users SET status = ? WHERE user_id = ?";
        await db.query(updateSql, [newStatus, id]);

        res.json({
            message: newStatus === "blocked" ? "Đã khóa tài khoản" : "Đã mở khóa tài khoản"
        });
    } catch (err) {
        next(err);
    }
};

// ================= PUT (UPDATE) USER =================
exports.putUser = async (req, res, next) => {
    const { username, full_name, email, role } = req.body;
    const { id } = req.params;

    const sql = `
        UPDATE users 
        SET username=?, full_name=?, email=?, role=? 
        WHERE user_id=?
    `;

    try {
        await db.query(sql, [username, full_name, email, role, id]);
        res.json({ message: "Update success" });
    } catch (err) {
        // Xử lý mã lỗi trùng lặp từ MySQL (Unique Constraint)
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
                message: "Username hoặc email đã tồn tại"
            });
        }
        next(err);
    }
};

// ================= DELETE USER =================
exports.deleteUser = async (req, res, next) => {
    const { id } = req.params;
    const sql = "DELETE FROM users WHERE user_id = ?";

    try {
        await db.query(sql, [id]);
        res.json({ message: "Xóa thành công" });
    } catch (err) {
        next(err);
    }
};