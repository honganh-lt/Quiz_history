const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.verifyToken = (req, res, next) => {

    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Không có token"
        });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (err) {

            if (err.name === "TokenExpiredError") {
                return res.status(403).json({
                    message: "Token đã hết hạn"
                });
            }

            return res.status(403).json({
                message: "Token không hợp lệ"
            });
        }

        const sql = `
            SELECT user_id, status
            FROM users
            WHERE user_id = ?
        `;

        db.query(sql, [decoded.user_id], (dbErr, result) => {

            if (dbErr) {
                return res.status(500).json({
                    message: "Server error"
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: "Không tìm thấy user"
                });
            }

            if (result[0].status === "blocked") {
                return res.status(403).json({
                    message: "Tài khoản đã bị khóa"
                });
            }

            req.user = decoded;

            next();
        });
    });
};