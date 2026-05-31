// controllers/documentController.js
const db = require("../config/db");
const mammoth = require("mammoth");

// ================= GET ALL (ADMIN) =================
exports.getAllDocuments = async (req, res, next) => {
    const sql = `
        SELECT 
            d.document_id, d.title, d.content, d.lesson_id,
            s.subject_id, s.subject_name,
            c.chapter_id, c.chapter_number, c.chapter_name,
            l.lesson_number, l.lesson_name
        FROM documents d
        JOIN lessons l ON d.lesson_id = l.lesson_id
        JOIN chapters c ON l.chapter_id = c.chapter_id
        JOIN subjects s ON c.subject_id = s.subject_id
        ORDER BY d.document_id ASC
    `;
    try {
        const [result] = await db.query(sql);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

// ================= THÊM TÀI LIỆU (ĐỌC FILE WORD CHÈN CONTENT) =================
exports.createDocument = async (req, res, next) => {
    const { lesson_id, title } = req.body;
    let content = req.body.content; // Chuỗi text nhập tay từ Form (nếu có)

    if (!lesson_id || !title) {
        return res.status(400).json({ message: "Thiếu dữ liệu bắt buộc (lesson_id hoặc title)" });
    }

    try {
        // Nếu người dùng có bấm chọn và upload file Word lên
        if (req.file) {
            // Chuyển đổi file Word (.docx) từ bộ nhớ RAM thành cấu trúc HTML sạch
            const conversionResult = await mammoth.convertToHtml({ buffer: req.file.buffer });
            content = conversionResult.value; // Ghi đè nội dung đọc được vào biến content
        }

        // Kiểm tra cuối cùng xem có nội dung chữ nào không
        if (!content || content.trim() === "") {
            return res.status(400).json({ message: "Nội dung tài liệu không được để trống" });
        }

        const sql = "INSERT INTO documents (lesson_id, title, content) VALUES (?, ?, ?)";
        const [result] = await db.query(sql, [lesson_id, title, content]);

        res.json({
            message: "Thêm tài liệu thành công",
            documentId: result.insertId
        });
    } catch (err) {
        next(err);
    }
};

// ================= CẬP NHẬT TÀI LIỆU (SỬA ĐỔI FILE WORD) =================
exports.updateDocument = async (req, res, next) => {
    const { id } = req.params;
    const { lesson_id, title } = req.body;

    if (!lesson_id || !title) {
        return res.status(400).json({ message: "Thiếu dữ liệu để cập nhật" });
    }

    try {
        // 1. Kiểm tra tài liệu cũ có tồn tại trong DB không
        const [existingDoc] = await db.query("SELECT content FROM documents WHERE document_id = ?", [id]);
        if (existingDoc.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy tài liệu cần sửa" });
        }

        let content = existingDoc[0].content; // Mặc định lấy lại nội dung cũ trong database

        // 2. Nếu người dùng đăng tải một file Word mới, tiến hành ghi đè nội dung mới
        if (req.file) {
            const conversionResult = await mammoth.convertToHtml({ buffer: req.file.buffer });
            content = conversionResult.value;

            // Kiểm tra xem file word convert ra có bị rỗng không
            if (!content || content.trim() === "") {
                return res.status(400).json({ message: "File Word mới không có nội dung hợp lệ" });
            }
        }

        // 3. Tiến hành cập nhật vào Database (Nội dung chắc chắn không bị mất hay rỗng)
        const sql = "UPDATE documents SET lesson_id = ?, title = ?, content = ? WHERE document_id = ?";
        await db.query(sql, [lesson_id, title, content, id]);

        res.json({ message: "Cập nhật tài liệu thành công" });
    } catch (err) {
        next(err);
    }
};

// ================= XÓA TÀI LIỆU =================
exports.deleteDocument = async (req, res, next) => {
    const { id } = req.params;
    const sql = "DELETE FROM documents WHERE document_id = ?";
    try {
        await db.query(sql, [id]);
        res.json({ message: "Xóa tài liệu thành công" });
    } catch (err) {
        next(err);
    }
};

// ================= LẤY TÀI LIỆU THEO MÔN HỌC =================
exports.getDocumentsBySubject = async (req, res, next) => {
    const { subjectId } = req.params;
    const sql = `
        SELECT d.document_id, s.subject_name, c.chapter_id, c.chapter_number, c.chapter_name, l.lesson_name, l.lesson_number
        FROM documents d
        JOIN lessons l ON d.lesson_id = l.lesson_id
        JOIN chapters c ON l.chapter_id = c.chapter_id
        JOIN subjects s ON c.subject_id = s.subject_id
        WHERE s.subject_id = ?
        ORDER BY c.chapter_number ASC, l.lesson_number ASC
    `;
    try {
        const [result] = await db.query(sql, [subjectId]);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

// ================= LẤY CHI TIẾT TÀI LIỆU =================
exports.getDocumentDetail = async (req, res, next) => {
    const { documentId } = req.params;
    const sql = `
        SELECT d.*, s.subject_name, c.chapter_number, c.chapter_name, l.lesson_number, l.lesson_name
        FROM documents d
        JOIN lessons l ON d.lesson_id = l.lesson_id
        JOIN chapters c ON l.chapter_id = c.chapter_id
        JOIN subjects s ON c.subject_id = s.subject_id
        WHERE d.document_id = ?
    `;
    try {
        const [result] = await db.query(sql, [documentId]);
        if (!result.length) {
            return res.status(404).json({ message: "Không tìm thấy chi tiết tài liệu" });
        }
        res.json(result[0]);
    } catch (err) {
        next(err);
    }
};