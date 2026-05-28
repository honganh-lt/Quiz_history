const mysql = require("mysql2");

// 1. Khởi tạo kết nối theo chuẩn Promise
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "honganh@",
    database: "mydatabase",   
    port: 3307
});

// 2. THẦN CHÚ: Chuyển đổi connection này sang dạng hỗ trợ Promise (để dùng được async/await)
const db = connection.promise();

// Kiểm tra kết nối nhanh (Không bắt buộc nhưng nên có để biết lỗi kết nối ngay khi start server)
connection.connect((err) => {
    if (err) {
        console.error("Lỗi kết nối MySQL:", err);
    } else {
        console.log("Kết nối MySQL thành công");
        //chế độ promise
    }
});

module.exports = db;