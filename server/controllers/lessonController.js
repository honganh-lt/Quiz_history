const db = require("../config/db");

// ================= GET LESSONS =================
exports.getLesson = async (req, res, next) => {
    const { chapter_id } = req.query;

    let sql = `
    SELECT 
        l.*,                 
        c.chapter_number,
        c.chapter_name,
        s.subject_name       
    FROM lessons l
    JOIN chapters c ON l.chapter_id = c.chapter_id
    JOIN subjects s ON c.subject_id = s.subject_id
    `;

    if (chapter_id) {
        sql += " WHERE l.chapter_id = ?";
    }

    sql += " ORDER BY l.lesson_id ASC";

    try {
        // Chạy câu lệnh truy vấn và bóc tách lấy mảng rows kết quả
        const [rows] = await db.query(sql, chapter_id ? [chapter_id] : []);
        res.json(rows);
    } catch (err) {
        next(err); // Đẩy lỗi database qua errorHandler tập trung
    }
};

// ================= POST NEW LESSON =================
exports.postLesson = async (req, res, next) => {
    const { lesson_name, chapter_id, lesson_number } = req.body;
    const sql = "INSERT INTO lessons (lesson_name, chapter_id, lesson_number) VALUES (?,?,?)";

    try {
        await db.query(sql, [lesson_name, chapter_id, lesson_number]);
        res.json({ message: "Creates" });
    } catch (err) {
        next(err);
    }
};

// ================= PUT (UPDATE) LESSON =================
exports.putLesson = async (req, res, next) => {
    const { lesson_name, chapter_id, lesson_number } = req.body;
    const sql = "UPDATE lessons SET lesson_name=?, chapter_id=?, lesson_number=? WHERE lesson_id=?";

    try {
        await db.query(sql, [lesson_name, chapter_id, lesson_number, req.params.id]);
        res.json({ message: "Update" });
    } catch (err) {
        next(err);
    }
};

// ================= DELETE LESSON =================
exports.deleteLesson = async (req, res, next) => {
    const { id } = req.params; // Lấy id từ URL động (params)
    const sql = "DELETE FROM lessons WHERE lesson_id=?";

    try {
        await db.query(sql, [id]);
        res.json({ message: "Xóa thành công" });
    } catch (err) {
        next(err);
    }
};