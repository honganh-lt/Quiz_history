// const { json } = require("express");
// const db = require("../config/db");

// // ================= GET ALL CHAPTERS =================
// exports.getChapters = (req, res, next) => {
//     const sql = "SELECT * FROM chapters";

//     db.query(sql, (err, result) => {
//         // Nếu lỗi, đá sang Error Middleware gánh thay vì tự trả về 500 thô kệch
//         if (err) return next(err); 
        
//         // Trả dữ liệu về cho FE dưới dạng JSON
//         res.json(result);
//     });
// };

// // ================= POST NEW CHAPTER =================
// exports.postChapter = (req, res, next) => {
//     const { chapter_name, subject_id, chapter_number } = req.body;
//     const sql = "INSERT INTO chapters (chapter_name, subject_id, chapter_number) VALUES (?,?,?)";

//     db.query(sql, [chapter_name, subject_id, chapter_number], (err, result) => {
//         if (err) return next(err);

//         // ĐÃ SỬA: Đưa insertId vào đúng bên trong cặp dấu {} của json
//         res.json({
//             message: "Creates",
//             insertId: result.insertId 
//         });
//     });
// };

// // ================= PUT (UPDATE) CHAPTER =================
// exports.putChapter = (req, res, next) => {
//     const { chapter_name, subject_id, chapter_number } = req.body;
//     const sql = "UPDATE chapters SET chapter_name=?, subject_id=?, chapter_number=? WHERE chapter_id=?";

//     db.query(sql, [chapter_name, subject_id, chapter_number, req.params.id], (err) => {
//         if (err) return next(err);

//         res.json({ message: "Update" });
//     });
// };

// // ================= DELETE CHAPTER =================
// exports.deleteChapter = (req, res, next) => {
//     const { id } = req.params;
//     const sql = "DELETE FROM chapters WHERE chapter_id=?";

//     db.query(sql, [id], (err, result) => {
//         if (err) return next(err);

//         res.json({ message: "Xóa thành công" });
//     });
// };

const db = require("../config/db");

// ================= GET ALL CHAPTERS =================
exports.getChapters = async (req, res, next) => { // Thêm async
    const sql = "SELECT * FROM chapters";

    try {
        // Cú pháp bóc tách mảng [rows] từ Promise
        const [rows] = await db.query(sql);
        
        // Trả dữ liệu về cho FE
        res.json(rows);
    } catch (err) {
        next(err); // Bắn lỗi vào errorHandler tập trung
    }
};

// ================= POST NEW CHAPTER =================
exports.postChapter = async (req, res, next) => { // Thêm async
    const { chapter_name, subject_id, chapter_number } = req.body;
    const sql = "INSERT INTO chapters (chapter_name, subject_id, chapter_number) VALUES (?,?,?)";

    try {
        const [result] = await db.query(sql, [chapter_name, subject_id, chapter_number]);

        res.json({
            message: "Creates",
            insertId: result.insertId 
        });
    } catch (err) {
        next(err);
    }
};

// ================= PUT (UPDATE) CHAPTER =================
exports.putChapter = async (req, res, next) => { // Thêm async
    const { chapter_name, subject_id, chapter_number } = req.body;
    const sql = "UPDATE chapters SET chapter_name=?, subject_id=?, chapter_number=? WHERE chapter_id=?";

    try {
        await db.query(sql, [chapter_name, subject_id, chapter_number, req.params.id]);

        res.json({ message: "Update" });
    } catch (err) {
        next(err);
    }
};

// ================= DELETE CHAPTER =================
exports.deleteChapter = async (req, res, next) => { // Thêm async
    const { id } = req.params;
    const sql = "DELETE FROM chapters WHERE chapter_id=?";

    try {
        await db.query(sql, [id]);

        res.json({ message: "Xóa thành công" });
    } catch (err) {
        next(err);
    }
};