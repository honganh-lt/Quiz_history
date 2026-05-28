// middleware/errorMiddleware.js
const errorHandler = (err, req, res, next) => {
    // Nếu lỗi có statusCode do mình tự định nghĩa thì lấy, không thì mặc định là 500 (Lỗi server)
    const statusCode = err.statusCode || 500;

    // Log chi tiết lỗi ra console của Terminal để Backend Developer dễ dàng debug
    console.error(`[ERROR] [${req.method}] ${req.url} ->`, err.stack || err);

    res.status(statusCode).json({
        success: false,
        message: err.message || "Lỗi hệ thống nội bộ",
        // Chỉ hiện chi tiết lỗi khi đang ở môi trường phát triển (development)
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    });
};

module.exports = errorHandler;