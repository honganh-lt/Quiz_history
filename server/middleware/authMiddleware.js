const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.verifyToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];

    // 1. Kiểm tra định dạng Header Authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Không có token"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        // 2. Xác thực Token (Chạy đồng bộ, nếu lỗi sẽ tự nhảy xuống catch)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Kiểm tra trạng thái User trong Database bằng await
        const sql = "SELECT user_id, status FROM users WHERE user_id = ?";
        const [result] = await db.query(sql, [decoded.user_id]);

        if (result.length === 0) {
            return res.status(404).json({
                message: "Không tìm thấy user"
            });
        }

        // Nếu admin đã block user này, chặn không cho đi tiếp vào các route sau
        if (result[0].status === "blocked") {
            return res.status(403).json({
                message: "Tài khoản đã bị khóa"
            });
        }

        // Đính kèm thông tin giải mã được vào vật trung chuyển `req` để các controller phía sau sử dụng
        req.user = decoded;
        
        // Cho phép đi tiếp qua cửa kiểm duyệt
        next();

    } catch (err) {
        // 4. Bắt toàn bộ lỗi của JWT (Hết hạn, sai chữ ký,...) hoặc lỗi Database tại đây
        if (err.name === "TokenExpiredError") {
            return res.status(403).json({
                message: "Token đã hết hạn"
            });
        }
        
        if (err.name === "JsonWebTokenError") {
            return res.status(403).json({
                message: "Token không hợp lệ"
            });
        }

        // Nếu là lỗi kết nối Database hoặc lỗi hệ thống khác, đẩy ra errorHandler tập trung
        next(err);
    }
};