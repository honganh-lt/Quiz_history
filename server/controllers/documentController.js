const db = require("../config/db");


//Lấy all
exports.getAllDocuments = (req, res) => {

    const sql = `
        SELECT 
            d.document_id,
            d.title,
            d.content,
            d.lesson_id,        -- Thêm cái này để biết tài liệu thuộc bài học nào

            s.subject_id,       -- Thêm cái này để phục vụ select Môn học ở ô sửa
            s.subject_name,

            c.chapter_id,       -- Thêm cái này để phục vụ select Chương ở ô sửa
            c.chapter_number,
            c.chapter_name,

            l.lesson_number,
            l.lesson_name

        FROM documents d

        JOIN lessons l ON d.lesson_id = l.lesson_id
        JOIN chapters c ON l.chapter_id = c.chapter_id
        JOIN subjects s ON c.subject_id = s.subject_id

        ORDER BY d.document_id ASC
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};
// THÊM TÀI LIỆU
exports.createDocument = (req, res) => {

    const { lesson_id, title, content } = req.body;

    if (!lesson_id || !title || !content) {
        return res.status(400).json({
            message: "Thiếu dữ liệu"
        });
    }

    const sql = `
        INSERT INTO documents
        (lesson_id, title, content)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [lesson_id, title, content], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Thêm tài liệu thành công"
        });
    });
};
// // LẤY THEO BÀI HỌC
// exports.getDocumentsByLesson = (req, res) => {

//     const lessonId = req.params.lessonId;

//     const sql = `
//         SELECT *
//         FROM documents
//         WHERE lesson_id = ?
//     `;

//     db.query(sql, [lessonId], (err, result) => {

//         if (err) {
//             return res.status(500).json(err);
//         }

//         res.json(result);
//     });
// };

// CẬP NHẬT TÀI LIỆU (SỬA)
exports.updateDocument = (req, res) => {
    const id = req.params.id;
    const { lesson_id, title, content } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!lesson_id || !title || !content) {
        return res.status(400).json({
            message: "Thiếu dữ liệu để cập nhật"
        });
    }

    const sql = `
        UPDATE documents 
        SET lesson_id = ?, title = ?, content = ? 
        WHERE document_id = ?
    `;

    db.query(sql, [lesson_id, title, content, id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        // Kiểm tra xem ID có tồn tại trong DB không
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Không tìm thấy tài liệu cần sửa"
            });
        }

        res.json({
            message: "Cập nhật tài liệu thành công"
        });
    });
};

exports.deleteDocument = (req, res) => {

    const id = req.params.id;

    const sql = `
        DELETE FROM documents
        WHERE document_id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Xóa tài liệu thành công"
        });
    });
};

// LẤY TÀI LIỆU THEO MÔN HỌC chương bài User
exports.getDocumentsBySubject = (req, res) => {

    const subjectId = req.params.subjectId;

    const sql = `
        SELECT
            d.document_id,

            s.subject_name,

            c.chapter_id,
            c.chapter_number,
            c.chapter_name,

            l.lesson_name,
            l.lesson_number

        FROM documents d

        JOIN lessons l
            ON d.lesson_id = l.lesson_id

        JOIN chapters c
            ON l.chapter_id = c.chapter_id

        JOIN subjects s
            ON c.subject_id = s.subject_id

        WHERE s.subject_id = ?

        ORDER BY
            c.chapter_number ASC,
            l.lesson_number ASC
    `;

    db.query(sql, [subjectId], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

//lấy chi tiết tài liệu theo bài học
exports.getDocumentDetail = (req, res) => {

    const documentId = req.params.documentId;

    const sql = `
        SELECT
            d.*,

            s.subject_name,

            c.chapter_number,
            c.chapter_name,

            l.lesson_number,
            l.lesson_name

        FROM documents d

        JOIN lessons l
            ON d.lesson_id = l.lesson_id

        JOIN chapters c
            ON l.chapter_id = c.chapter_id

        JOIN subjects s
            ON c.subject_id = s.subject_id

        WHERE d.document_id = ?
    `;

    db.query(sql, [documentId], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);
    });
};