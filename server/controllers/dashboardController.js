const db = require("../config/db");

exports.getDashboardStats = async (req, res, next) => { // Thêm chữ async ở đây
    try {
        // Dùng cú pháp bóc tách mảng [rows] của Promise, viết thẳng hàng tắp lự!
        const [subjects] = await db.query("SELECT COUNT(*) AS total FROM subjects");
        const [questions] = await db.query("SELECT COUNT(*) AS total FROM questions");
        const [exams] = await db.query("SELECT COUNT(*) AS total FROM exam");
        const [users] = await db.query("SELECT COUNT(*) AS total FROM users");
        
        const [difficultys] = await db.query(`
            SELECT difficulty, COUNT(*) as total
            FROM questions
            GROUP BY difficulty
        `);

        // Đoạn logic xử lý Object độ khó giữ nguyên 100%
        const difficultyData = { easy: 0, medium: 0, hard: 0 };
        difficultys.forEach(d => {
            difficultyData[d.difficulty] = d.total;
        });

        // Trả dữ liệu về cho Frontend thành công
        res.json({
            subjects: subjects[0].total,
            questions: questions[0].total,
            exams: exams[0].total,
            users: users[0].total,
            difficulty: difficultyData   
        });

    } catch (err) {
        // BẤT KỲ 1 trong 5 câu lệnh SQL ở trên bị lỗi (gãy kết nối, sai tên bảng...),
        // nó sẽ lập tức nhảy xuống đây và bắn thẳng qua Error Middleware bằng 1 dòng duy nhất.
        next(err); 
    }
};