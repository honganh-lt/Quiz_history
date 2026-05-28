const db = require("../config/db");
const XLSX = require("xlsx");

// ================= GET QUESTIONS =================
exports.getQuestion = async (req, res, next) => {
    const { lessonId } = req.query;

    let sql = `
    SELECT 
        q.question_id, q.content, q.difficulty, q.lesson_id,
        c.chapter_id, c.subject_id,      
        s.subject_name, c.chapter_number, c.chapter_name,
        l.lesson_number, l.lesson_name,
        a.answer_id, a.content AS answer_content, a.is_correct
    FROM questions q
    JOIN lessons l ON q.lesson_id = l.lesson_id
    JOIN chapters c ON l.chapter_id = c.chapter_id
    JOIN subjects s ON c.subject_id = s.subject_id
    JOIN answers a ON q.question_id = a.question_id
    `;

    let params = [];
    if (lessonId) {
        sql += " WHERE q.lesson_id = ?";
        params.push(lessonId);
    }

    sql += " ORDER BY q.question_id ASC, a.answer_id ASC";

    try {
        const [rows] = await db.query(sql, params);
        const map = {};

        rows.forEach(row => {
            if (!map[row.question_id]) {
                map[row.question_id] = {
                    question_id: row.question_id,
                    content: row.content,
                    difficulty: row.difficulty,
                    lesson_id: row.lesson_id,
                    chapter_id: row.chapter_id,   
                    subject_id: row.subject_id,   
                    subject_name: row.subject_name,
                    chapter_number: row.chapter_number,
                    chapter_name: row.chapter_name,
                    lesson_number: row.lesson_number,
                    lesson_name: row.lesson_name,
                    answers: []
                };
            }

            map[row.question_id].answers.push({
                answer_id: row.answer_id,
                content: row.answer_content,
                is_correct: row.is_correct
            });
        });

        res.json(Object.values(map));
    } catch (err) {
        next(err);
    }
};

// ================= IMPORT QUESTIONS FROM EXCEL =================
exports.importQuestions = async (req, res, next) => {
    try {
        const file = req.file;
        const lesson_id = req.body.lesson_id;

        if (!file) return res.status(400).json({ message: "Không có file" });
        if (!lesson_id) return res.status(400).json({ message: "Thiếu lesson_id" });

        // Đọc dữ liệu Excel
        const workbook = XLSX.read(file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        for (const row of data) {
            // Validate từng cột dữ liệu
            if (!row.content || !row.A || !row.B || !row.C || !row.D || !row.correct || !row.difficulty) {
                continue;
            }

            // CHECK TRÙNG trong bài học bằng cú pháp db.query mới
            const [existing] = await db.query(
                `SELECT question_id FROM questions WHERE LOWER(TRIM(content)) = LOWER(TRIM(?)) AND lesson_id = ?`,
                [row.content.trim(), lesson_id]
            );

            if (existing.length > 0) continue;

            const correct = row.correct?.toString().trim().toUpperCase();
            const difficulty = row.difficulty?.toString().trim().toUpperCase();

            // Insert câu hỏi mới
            const [questionResult] = await db.query(
                `INSERT INTO questions (content, difficulty, lesson_id) VALUES (?, ?, ?)`,
                [row.content.trim(), difficulty, lesson_id]
            );

            const questionId = questionResult.insertId;

            // Gom cụm mảng answers để chèn bulk insert (Nhanh hơn chạy vòng lặp đơn lẻ)
            const answerValues = [
                [questionId, row.A, correct === "A" ? 1 : 0],
                [questionId, row.B, correct === "B" ? 1 : 0],
                [questionId, row.C, correct === "C" ? 1 : 0],
                [questionId, row.D, correct === "D" ? 1 : 0]
            ];

            await db.query(
                `INSERT INTO answers (question_id, content, is_correct) VALUES ?`,
                [answerValues]
            );
        }

        res.json({ message: "Import thành công" });
    } catch (err) {
        next(err);
    }
};

// ================= POST (CREATE) QUESTION =================
exports.postQuestion = async (req, res, next) => {
    const { content, difficulty, lesson_id, answers } = req.body;

    if (!content || !difficulty || !lesson_id || !answers?.length) {
        return res.status(400).json({ message: "Thiếu dữ liệu" });
    }

    try {
        // CHECK TRÙNG CÂU HỎI
        const [existing] = await db.query(
            `SELECT * FROM questions WHERE content = ? AND lesson_id = ?`,
            [content.trim(), lesson_id]
        );

        if (existing.length > 0) {
            return res.status(400).json({ message: "Câu hỏi đã tồn tại trong bài học này!" });
        }

        // Insert chân trang câu hỏi
        const [questionResult] = await db.query(
            `INSERT INTO questions (content, difficulty, lesson_id) VALUES (?, ?, ?)`,
            [content, difficulty, lesson_id]
        );

        const questionId = questionResult.insertId;

        // Bulk insert mảng câu trả lời
        const answerValues = answers.map(a => [questionId, a.content, a.is_correct ? 1 : 0]);
        await db.query(`INSERT INTO answers (question_id, content, is_correct) VALUES ?`, [answerValues]);

        res.json({ message: "Thêm thành công" });
    } catch (err) {
        next(err);
    }
};

// ================= PUT (UPDATE) QUESTION & ANSWERS =================
exports.putQuestion = async (req, res, next) => {
    const { id } = req.params;
    const { content, difficulty, lesson_id, answers } = req.body;

    if (!content || !difficulty || !lesson_id) {
        return res.status(400).json({ message: "Thiếu dữ liệu" });
    }
    if (!Array.isArray(answers) || answers.length === 0) {
        return res.status(400).json({ message: "Answers lỗi" });
    }

    const isValidAnswers = answers.every(a => a.content?.trim() !== "");
    const hasCorrect = answers.some(a => Number(a.is_correct) === 1);

    if (!isValidAnswers || !hasCorrect) {
        return res.status(400).json({ message: "Đáp án phải có nội dung và ít nhất 1 đáp án đúng" });
    }

    try {
        // CHECK TRÙNG (Loại trừ ID hiện tại)
        const [existing] = await db.query(
            `SELECT question_id FROM questions WHERE LOWER(TRIM(content)) = LOWER(TRIM(?)) AND lesson_id = ? AND question_id != ?`,
            [content, lesson_id, id]
        );

        if (existing.length > 0) {
            return res.status(400).json({ message: "Câu hỏi đã tồn tại!" });
        }

        // ================= KHỞI ĐỘNG TRANSACTION MỚI =================
        await db.beginTransaction();

        // 1. Cập nhật bảng cha (questions)
        await db.query(
            "UPDATE questions SET content=?, difficulty=?, lesson_id=? WHERE question_id=?",
            [content.trim(), difficulty, lesson_id, id]
        );

        // 2. Lấy danh sách answers cũ để so sánh số lượng
        const [oldAnswers] = await db.query(
            "SELECT answer_id FROM answers WHERE question_id=? ORDER BY answer_id ASC",
            [id]
        );

        if (oldAnswers.length !== answers.length) {
            // Nếu số lượng đáp án thay đổi: Xóa hết cũ, insert mới hoàn toàn
            await db.query("DELETE FROM answers WHERE question_id=?", [id]);

            const newValues = answers.map(a => [id, a.content.trim(), a.is_correct ? 1 : 0]);
            await db.query("INSERT INTO answers (question_id, content, is_correct) VALUES ?", [newValues]);
        } else {
            // Nếu số lượng bằng nhau: Duyệt mảng đồng bộ cập nhật theo vị trí tương ứng (Không cần dùng new Promise thủ công)
            for (let i = 0; i < answers.length; i++) {
                await db.query(
                    "UPDATE answers SET content=?, is_correct=? WHERE answer_id=?",
                    [answers[i].content.trim(), answers[i].is_correct ? 1 : 0, oldAnswers[i].answer_id]
                );
            }
        }

        // Hoàn tất Transaction
        await db.commit();
        res.json({ message: "Cập nhật thành công" });

    } catch (err) {
        // Nếu có bất kỳ lỗi nào xảy ra trong khối try, thực hiện Rollback lập tức khôi phục DB
        await db.rollback();
        next(err);
    }
};

// ================= DELETE QUESTION =================
exports.deleteQuestion = async (req, res, next) => {
    const { id } = req.params;

    try {
        // Xóa các đáp án của câu hỏi trước để tránh lỗi ràng buộc FK
        await db.query("DELETE FROM answers WHERE question_id=?", [id]);
        await db.query("DELETE FROM questions WHERE question_id=?", [id]);

        res.json({ message: "Xóa thành công" });
    } catch (err) {
        next(err);
    }
};