const db = require("../config/db");

// Thuật toán trộn mảng ngẫu nhiên chuẩn hóa (Fisher-Yates Shuffle)
const shuffle = (array) => {
    const arr = [...array]; // Tạo bản sao tránh làm thay đổi mảng gốc
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

// ================= GET ALL ================= Lấy danh sách tất cả đề thi admin
exports.getExams = async (req, res, next) => {
    const sql = `
        SELECT 
            e.*,
            s.subject_name,
            COUNT(eq.question_id) AS question_count
        FROM exam e
        LEFT JOIN subjects s ON e.subject_id = s.subject_id
        LEFT JOIN exam_questions eq ON e.exam_id = eq.exam_id
        GROUP BY e.exam_id
        ORDER BY e.created_time ASC
    `;

    try {
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (err) {
        next(err);
    }
};

// ================= GET DETAIL ================= lấy chi tiết thông tin đề user
exports.getExamDetail = async (req, res, next) => {
    const { id } = req.params;

    const sql = `
        SELECT 
            e.exam_id, e.title, e.description, e.duration,
            q.question_id, q.content,
            a.answer_id, a.content AS answer_content, a.is_correct
        FROM exam e
        JOIN exam_questions eq ON e.exam_id = eq.exam_id
        JOIN questions q ON eq.question_id = q.question_id
        JOIN answers a ON q.question_id = a.question_id
        WHERE e.exam_id = ?
    `;

    try {
        const [rows] = await db.query(sql, [id]);

        if (!rows.length) {
            return res.status(404).json({ message: "Không tìm thấy đề thi này" });
        }

        const result = {
            exam_id: rows[0].exam_id,
            title: rows[0].title,
            description: rows[0].description,
            duration: rows[0].duration,
            questions: []
        };

        rows.forEach(row => {
            let question = result.questions.find(q => q.question_id === row.question_id);

            if (!question) {
                question = {
                    question_id: row.question_id,
                    content: row.content,
                    answers: []
                };
                result.questions.push(question);
            }

            question.answers.push({
                answer_id: row.answer_id,
                content: row.answer_content,
                is_correct: row.is_correct
            });
        });

        res.json(result);
    } catch (err) {
        next(err);
    }
};

// ================= DELETE ================= Xóa đề thi (Đã mở khóa)
// exports.deleteExam = async (req, res, next) => {
//     const { id } = req.params;

//     try {
//         await db.beginTransaction();

//         // Xóa liên kết ở bảng trung gian trước để tránh dính lỗi ràng buộc khóa ngoại (Foreign Key)
//         await db.query("DELETE FROM exam_questions WHERE exam_id = ?", [id]);
//         await db.query("DELETE FROM exam WHERE exam_id = ?", [id]);

//         await db.commit();
//         res.json({ message: "Xóa đề thi thành công" });
//     } catch (err) {
//         await db.rollback();
//         next(err);
//     }
// };

// ================= RANDOM CÂU HỎI & TẠO ĐỀ =================
exports.createExamBySubject = async (req, res, next) => {
    const {
        subject_id, title, description, duration,
        easy_count, medium_count, hard_count
    } = req.body;

    const easyCount = Number(easy_count) || 0;
    const mediumCount = Number(medium_count) || 0;
    const hardCount = Number(hard_count) || 0;
    const total_questions = easyCount + mediumCount + hardCount;

    if (!subject_id || !title || !duration) {
        return res.status(400).json({ error: "Thiếu dữ liệu bắt buộc (subject_id, title, duration)" });
    }

    if (total_questions <= 0) {
        return res.status(400).json({ error: "Tổng số câu hỏi trong đề phải lớn hơn 0" });
    }

    try {
        // 1. Lấy tất cả câu hỏi thuộc môn học
        const sql = `
            SELECT q.question_id, q.difficulty
            FROM questions q
            JOIN lessons l ON q.lesson_id = l.lesson_id
            JOIN chapters c ON l.chapter_id = c.chapter_id
            WHERE c.subject_id = ?
        `;
        const [questions] = await db.query(sql, [subject_id]);

        if (questions.length < total_questions) {
            return res.status(400).json({ error: `Ngân hàng chỉ có ${questions.length} câu, không đủ cung cấp ${total_questions} câu theo yêu cầu` });
        }

        // Lọc danh sách theo độ khó (Loại bỏ khoảng trắng dư thừa)
        const easyList = questions.filter(q => q.difficulty?.trim().toUpperCase() === "EASY");
        const mediumList = questions.filter(q => q.difficulty?.trim().toUpperCase() === "MEDIUM");
        const hardList = questions.filter(q => q.difficulty?.trim().toUpperCase() === "HARD");

        // Kiểm tra xem số lượng trong từng kho câu hỏi có đáp ứng nổi nhu cầu không
        if (easyList.length < easyCount || mediumList.length < mediumCount || hardList.length < hardCount) {
            return res.status(400).json({ 
                error: `Không đủ số lượng câu hỏi theo từng độ khó. Hiện có: Easy(${easyList.length}), Medium(${mediumList.length}), Hard(${hardList.length})` 
            });
        }

        // Tiến hành xáo trộn và bốc câu hỏi ngẫu nhiên
        const finalSelected = [
            ...shuffle(easyList).slice(0, easyCount),
            ...shuffle(mediumList).slice(0, mediumCount),
            ...shuffle(hardList).slice(0, hardCount)
        ];

        // Xáo trộn một lần nữa để phân tán vị trí các câu Dễ - Trung bình - Khó
        const shuffledFinal = shuffle(finalSelected);

        // KÍCH HOẠT TRANSACTION - Đảm bảo an toàn dữ liệu
        await db.beginTransaction();

        // 2. Chèn dữ liệu vào bảng exam trước
        const sqlExam = `
            INSERT INTO exam (title, description, duration, subject_id, created_time)
            VALUES (?, ?, ?, ?, NOW())
        `;
        const [examResult] = await db.query(sqlExam, [title, description, duration, subject_id]);
        const examId = examResult.insertId;

        // 3. Chuẩn bị mảng 2 chiều cho Bulk Insert [[examId, qId1], [examId, qId2], ...]
        const values = shuffledFinal.map(q => [examId, q.question_id]);

        const sqlInsertQuestions = `
            INSERT INTO exam_questions (exam_id, question_id)
            VALUES ?
        `;
        await db.query(sqlInsertQuestions, [values]);

        // Nếu mọi thứ chạy mượt mà, đồng ý chốt hạ lưu vào Database
        await db.commit();

        res.json({
            message: "Tạo đề thi ngẫu nhiên thành công",
            examId,
            total: shuffledFinal.length,
            difficulty: { easy: easyCount, medium: mediumCount, hard: hardCount }
        });

    } catch (err) {
        // Có bất kỳ lỗi gì phát sinh (Lỗi ghi DB, mất mạng,...) lập tức hủy bỏ lệnh tạo đề rác
        await db.rollback();
        next(err);
    }
};

// ================= THỐNG KÊ ĐỘ KHÓ CỦA MÔN HỌC =================
exports.getQuestionCountByDifficulty = async (req, res, next) => {
    const { subject_id } = req.params;

    const sql = `
        SELECT q.difficulty, COUNT(*) AS total
        FROM questions q
        JOIN lessons l ON q.lesson_id = l.lesson_id
        JOIN chapters c ON l.chapter_id = c.chapter_id
        WHERE c.subject_id = ?
        GROUP BY q.difficulty
    `;

    try {
        const [result] = await db.query(sql, [subject_id]);

        let data = { EASY: 0, MEDIUM: 0, HARD: 0 };

        result.forEach(item => {
            const difficulty = item.difficulty?.trim().toUpperCase();
            if (data.hasOwnProperty(difficulty)) {
                data[difficulty] = item.total;
            }
        });

        res.json(data);
    } catch (err) {
        next(err);
    }
};

///
exports.updateExam = async (req, res, next) => {
    const { id } = req.params;
    const { title, description, duration } = req.body;

    if (!title || !duration) {
        return res.status(400).json({
            message: "Tên đề thi và thời gian làm bài là bắt buộc"
        });
    }

    try {
        const sql = `
            UPDATE exam
            SET
                title = ?,
                description = ?,
                duration = ?
            WHERE exam_id = ?
        `;

        const [result] = await db.query(sql, [
            title,
            description,
            duration,
            id
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Không tìm thấy đề thi"
            });
        }

        res.json({
            message: "Cập nhật đề thi thành công"
        });
    } catch (err) {
        next(err);
    }
};