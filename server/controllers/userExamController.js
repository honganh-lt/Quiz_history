const db = require("../config/db");

// ================= GET ALL USER EXAMS (ADMIN) =================
exports.getAllUserExams = async (req, res, next) => {
    const sql = `
        SELECT 
          ue.user_exam_id,
          s.subject_name,
          e.title AS exam_title,
          ue.start_time,
          ue.end_time,
          ue.score,
          u.username
        FROM user_exam ue
        JOIN users u ON ue.user_id = u.user_id
        JOIN exam e ON ue.exam_id = e.exam_id
        JOIN subjects s ON e.subject_id = s.subject_id
        WHERE ue.status = 'submitted'
        ORDER BY ue.start_time ASC 
    `;

    try {
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (err) {
        next(err);
    }
};

// ================= START EXAM (USER) =================
exports.startExam = async (req, res, next) => {
    const { user_id, exam_id } = req.body;
    const sql = `
        INSERT INTO user_exam (user_id, exam_id, start_time, status)
        VALUES (?, ?, NOW(), 'doing')
    `;

    try {
        const [result] = await db.query(sql, [user_id, exam_id]);
        res.json({
            user_exam_id: result.insertId
        });
    } catch (err) {
        next(err);
    }
};

// ================= SUBMIT EXAM (USER) =================
exports.submitExam = async (req, res, next) => {
    const { user_exam_id, answers } = req.body;

    // 1. Kiểm tra đầu vào hợp lệ
    if (!user_exam_id) return res.status(400).json({ message: "Thiếu user_exam_id" });
    if (!Array.isArray(answers)) return res.status(400).json({ message: "answers phải là array" });

    try {
        // 2. Kiểm tra trạng thái bài thi hiện tại
        const checkSql = "SELECT status FROM user_exam WHERE user_exam_id = ?";
        const [checkResult] = await db.query(checkSql, [user_exam_id]);

        if (checkResult.length === 0) {
            return res.status(400).json({ message: "Không tồn tại bài thi" });
        }

        if (checkResult[0].status === "submitted") {
            return res.json({ message: "Bài đã nộp rồi" });
        }

        // Lấy tổng số câu hỏi của đề thi để trả về FE sau này
        const totalQuestionsSql = `
            SELECT COUNT(*) AS total 
            FROM exam_questions eq
            JOIN user_exam ue ON ue.exam_id = eq.exam_id
            WHERE ue.user_exam_id = ?
        `;
        const [totalResult] = await db.query(totalQuestionsSql, [user_exam_id]);
        const total = totalResult[0].total;

        // 3. KHỞI TẠO TRANSACTION (Bảo vệ tính toàn vẹn dữ liệu)
        await db.beginTransaction();

        // TRƯỜNG HỢP: Thí sinh bỏ trống toàn bộ đề thi
        if (answers.length === 0) {
            const updateEmptySql = `
                UPDATE user_exam
                SET score = 0, end_time = NOW(), status = 'submitted'
                WHERE user_exam_id = ?
            `;
            await db.query(updateEmptySql, [user_exam_id]);
            await db.commit(); // Lưu thay đổi

            return res.json({ score: 0, correct: 0, total });
        }

        // TRƯỜNG HỢP: Có câu trả lời -> Tiến hành lưu các câu trả lời của User
        const insertAnswerSql = `
            INSERT INTO user_answer (user_exam_id, question_id, answer_id)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE answer_id = VALUES(answer_id)
        `;

        // Dùng Promise.all phối hợp map() xử lý mảng bất đồng bộ, loại bỏ hoàn toàn forEach callback
        await Promise.all(
            answers.map(ans => 
                db.query(insertAnswerSql, [
                    Number(user_exam_id),
                    Number(ans.question_id),
                    Number(ans.answer_id)
                ])
            )
        );

        // 4. TÍNH TOÁN ĐIỂM SỐ
        const calculateSql = `
            SELECT COUNT(CASE WHEN a.is_correct = 1 THEN 1 END) AS correct
            FROM user_answer ua
            JOIN answers a ON ua.answer_id = a.answer_id
            WHERE ua.user_exam_id = ?
        `;
        const [calcResult] = await db.query(calculateSql, [user_exam_id]);
        const correct = calcResult[0].correct || 0;
        
        
        // Thang điểm 10 tròn trịa, lấy 1 chữ số thập phân 
        const score = Number(((correct / total) * 10).toFixed(1));

        // 5. CẬP NHẬT ĐIỂM VÀ ĐỔI TRẠNG THÁI SANG 'SUBMITTED'
        const updateFinalSql = `
            UPDATE user_exam
            SET score = ?, end_time = NOW(), status = 'submitted'
            WHERE user_exam_id = ?
        `;
        await db.query(updateFinalSql, [score, user_exam_id]);

        // Đống ý lưu toàn bộ tiến trình vào database
        await db.commit();

        res.json({ score, correct, total });

    } catch (err) {
        // Nếu có bất cứ bước nào bị lỗi trong try, lập tức hủy bỏ các thao tác sửa/ghi tạm thời
        await db.rollback();
        next(err);
    }
};

// ================= GET HISTORY (USER) =================
exports.getHistory = async (req, res, next) => {
    const { user_id } = req.params;
    const sql = `
        SELECT 
            ue.user_exam_id, ue.exam_id, ue.score, ue.start_time, ue.end_time, ue.status,
            e.title, s.subject_id, s.subject_name
        FROM user_exam ue
        JOIN exam e ON ue.exam_id = e.exam_id
        JOIN subjects s ON e.subject_id = s.subject_id
        WHERE ue.user_id = ?
        ORDER BY ue.start_time ASC
    `;

    try {
        const [rows] = await db.query(sql, [user_id]);
        res.json(rows);
    } catch (err) {
        next(err);
    }
};

// ================= REVIEW EXAM (XEM LẠI BÀI) =================
exports.reviewExam = async (req, res, next) => {
    const { user_exam_id } = req.params;
    const sql = `
        SELECT
            q.question_id, q.content AS question,
            ue.exam_id, e.subject_id,
            a.answer_id, a.content AS answer, a.is_correct,
            ua.answer_id AS user_answer_id
        FROM user_exam ue
        JOIN exam e ON ue.exam_id = e.exam_id
        JOIN exam_questions eq ON e.exam_id = eq.exam_id
        JOIN questions q ON eq.question_id = q.question_id
        JOIN answers a ON q.question_id = a.question_id
        LEFT JOIN user_answer ua
            ON ua.question_id = q.question_id
            AND ua.answer_id = a.answer_id
            AND ua.user_exam_id = ue.user_exam_id
        WHERE ue.user_exam_id = ?
        ORDER BY q.question_id, a.answer_id
    `;

    try {
        const [rows] = await db.query(sql, [user_exam_id]);
        console.log("ROWS REVIEWD:", rows);

        // Map cấu trúc lại dữ liệu phẳng từ SQL thành cấu trúc Nested JSON (Object chứa mảng answers)
        const result = [];
        rows.forEach(row => {
            let question = result.find(q => q.question_id === row.question_id);

            if (!question) {
                question = {
                    question_id: row.question_id,
                    question: row.question,
                    exam_id: row.exam_id,
                    subject_id: row.subject_id,
                    answers: []
                };
                result.push(question);
            }

            question.answers.push({
                answer_id: row.answer_id,
                answer: row.answer,
                is_correct: row.is_correct,
                user_answer_id: row.user_answer_id
            });
        });

        res.json(result);
    } catch (err) {
        next(err);
    }
};

exports.getAttemptCount = async (req, res, next) => {
    const { user_id } = req.params;

    const sql = `
        SELECT
            exam_id,
            COUNT(*) AS attempts
        FROM user_exam
        WHERE user_id = ?
        AND status = 'submitted'
        GROUP BY exam_id
    `;

    try {
        const [rows] = await db.query(sql, [user_id]);

        res.json(rows);
    } catch (err) {
        next(err);
    }
};