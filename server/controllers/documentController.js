const db = require("../config/db");

const fs = require("fs");




// =========================
// THÊM TÀI LIỆU
// =========================

exports.createDocument = (req, res) => {

    const {
        lesson_id,
        title
    } = req.body;



    // lấy đường dẫn file
    const file_url = req.file.path;



    const sql = `
        INSERT INTO documents
        (lesson_id, title, file_url)
        VALUES (?, ?, ?)
    `;



    db.query(
        sql,
        [lesson_id, title, file_url],
        (err, result) => {

            if (err) {

                return res.status(500).json(err);
            }



            res.json({
                message: "Upload tài liệu thành công"
            });
        }
    );
};




// =========================
// LẤY TẤT CẢ TÀI LIỆU
// =========================

exports.getAllDocuments = (req, res) => {

    const sql = `
        SELECT
            d.*,
            l.title AS lesson_name

        FROM documents d

        JOIN lessons l
        ON d.lesson_id = l.lesson_id

        ORDER BY d.created_at DESC
    `;



    db.query(sql, (err, result) => {

        if (err) {

            return res.status(500).json(err);
        }



        res.json(result);
    });
};




// =========================
// LẤY TÀI LIỆU THEO BÀI HỌC
// =========================

exports.getDocumentsByLesson = (req, res) => {

    const lessonId = req.params.lessonId;



    const sql = `
        SELECT *
        FROM documents
        WHERE lesson_id = ?
    `;



    db.query(sql, [lessonId], (err, result) => {

        if (err) {

            return res.status(500).json(err);
        }



        res.json(result);
    });
};




// =========================
// XOÁ TÀI LIỆU
// =========================

exports.deleteDocument = (req, res) => {

    const id = req.params.id;



    // lấy file trước
    const findSql = `
        SELECT *
        FROM documents
        WHERE document_id = ?
    `;



    db.query(findSql, [id], (err, result) => {

        if (err) {

            return res.status(500).json(err);
        }



        if (result.length === 0) {

            return res.status(404).json({
                message: "Không tìm thấy tài liệu"
            });
        }



        const document = result[0];



        // xoá file pdf trong uploads
        fs.unlink(
            document.file_url,
            (unlinkErr) => {

                if (unlinkErr) {

                    console.log(unlinkErr);
                }
            }
        );



        // xoá database
        const deleteSql = `
            DELETE FROM documents
            WHERE document_id = ?
        `;



        db.query(
            deleteSql,
            [id],
            (deleteErr, deleteResult) => {

                if (deleteErr) {

                    return res.status(500).json(deleteErr);
                }



                res.json({
                    message: "Xoá thành công"
                });
            }
        );
    });
};