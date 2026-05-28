const db = require("../config/db"); 

// ================= GET ALL SUBJECTS =================
exports.getSubjects = async (req, res, next) => {
    const sql = "SELECT * FROM subjects";

    try {
        // Gửi câu sql lên MYSQL và đợi kết quả trả về bằng await
        const [rows] = await db.query(sql);
        
        // Trả dữ liệu mảng object về cho FE dưới dạng JSON
        res.json(rows);
    } catch (err) {
        // Nếu "người đi lấy dữ liệu" gặp lỗi, đẩy qua errorHandler tập trung
        next(err);
    }
};

// ================= POST (CREATE) SUBJECT =================
exports.postSubjects = async (req, res, next) => {
    const { subject_name, description } = req.body;
    const sql = "INSERT INTO subjects (subject_name, description) VALUES (?,?)";

    try {
        await db.query(sql, [subject_name, description]);
        res.json({ message: "Created" });
    } catch (err) {
        next(err);
    }
};

// ================= PUT (UPDATE) SUBJECT =================
exports.putSubjects = async (req, res, next) => {
    const { subject_name, description } = req.body;
    const sql = "UPDATE subjects SET subject_name=?, description=? WHERE subject_id=?";

    try {
        await db.query(sql, [subject_name, description, req.params.id]);
        res.json({ message: "Update" });
    } catch (err) {
        next(err);
    }
};

// ================= DELETE SUBJECT =================
exports.deleteSubjects = async (req, res, next) => {
    const { id } = req.params;
    const sql = "DELETE FROM subjects WHERE subject_id=?";

    try {
        await db.query(sql, [id]);
        res.json({ message: "Xóa thành công" });
    } catch (err) {
        next(err);
    }
};