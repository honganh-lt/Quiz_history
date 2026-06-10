require("dotenv").config();

const express = require("express");
const cors = require("cors");
const errorHandler = require('./middleware/errorMiddleware');
const app = express();

// ===== 1. MIDDLEWARE HỆ THỐNG =====
// app.use(cors({
//     origin: [
//         "http://localhost:5173", // user Portal
//         "http://localhost:5174"  // admin Portal
//     ],
//     credentials: true
// }));
app.use(cors({
  origin: function (origin, callback) {
    // Chấp nhận mọi request đến từ localhost với bất kỳ cổng nào
    if (!origin || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      callback(new Error('Bị chặn bởi cấu hình CORS!'));
    }
  },
  credentials: true // Trang Admin hoạt động hoàn hảo
}));

// Middleware đọc dữ liệu JSON từ body request
app.use(express.json()); 

// Log request ra terminal để theo dõi (Debug)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Cấu hình thư mục chứa file tĩnh (PDF, hình ảnh upload)
app.use("/uploads", express.static("uploads"));


// ===== 2. KHAI BÁO CÁC ROUTERS =====
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const chapterRoutes = require("./routes/chapterRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const questionRoutes = require("./routes/questionRoutes");
const examRoutes = require("./routes/examRoutes");
const userExamRoutes = require("./routes/userExamRoutes");
const documentRoute = require("./routes/documentRoutes");

// ===== 3. ĐỊNH TUYẾN API (ROUTES) =====
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/user-exam", userExamRoutes);
app.use("/api/documents", documentRoute);

// API kiểm tra tình trạng server
app.get("/", (req, res) => {
    res.send("SERVER RUNNING OK");
});


// ===== 4. XỬ LÝ LỖI (BẮT BUỘC PHẢI THEO THỨ TỰ NÀY) =====

// Bước 1: Lưới hứng lỗi toàn cục - Bắt toàn bộ lỗi từ các controller đẩy ra bằng next(err)
app.use(errorHandler);

// Bước 2: Middleware 404 - Nếu không trùng bất kỳ route nào ở trên VÀ cũng không có lỗi phát sinh
app.use((req, res) => {
    res.status(404).json({ message: "API không tồn tại" });
});


// ===== 5. KHỞI CHẠY SERVER =====
console.log("EMAIL:", process.env.EMAIL_USER);
console.log("PASS:", process.env.EMAIL_PASS);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server chạy thành công tại http://localhost:${PORT}`);
});