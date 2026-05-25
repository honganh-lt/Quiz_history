const db = require("../config/db");
 //Ramdom ở đây:

// ================= GET ALL ================= Lấy danh sách tất cả đề thi admin
exports.getExams = (req, res) => {
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
    //DESC

    db.query(sql, (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
};


// ================= GET DETAIL ================= lấy chi tiết thông tin đề user
// exports.getExamDetail = (req, res) => {
//     const { id } = req.params;

//     const sql = `
//         SELECT q.*
//         FROM exam_questions eq
//         JOIN questions q ON eq.question_id = q.question_id
//         WHERE eq.exam_id = ?
//     `;
//     //  const sql = `
//     //     SELECT 
//     //         q.us
//     //     FROM exam_questions eq
//     //     JOIN questions q ON eq.question_id = q.question_id
//     //     WHERE eq.exam_id = ?
//     // `;

// db.query(sql, [id], (err) => {        
//     //subject_id, title, description, duration, req.params.id
//     if (err) return res.status(500).json(err); 
//     if (err) {
//             return res.status(500).json(err);
//         }

//         // trả data mới về FE
//         res.json({
//             exam_id: req.params.id,
//             subject_id,
//             title,
//             description,
//             duration
//         });
//     });
// };

//Lấy đề thi
exports.getExamDetail = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT 
            e.exam_id,
            e.title,
            e.description,
            e.duration,
            q.question_id,
            q.content,
            a.answer_id,
            a.content AS answer_content,
            a.is_correct
        FROM exam e
        JOIN exam_questions eq ON e.exam_id = eq.exam_id
        JOIN questions q ON eq.question_id = q.question_id
        JOIN answers a ON q.question_id = a.question_id
        WHERE e.exam_id = ?
    `;

    db.query(sql, [id], (err, rows) => {
        if (err) return res.status(500).json(err);

        if (!rows.length) {
            return res.status(404).json({ message: "Không tìm thấy exam" });
        }

        const result = {
            exam_id: rows[0].exam_id,
            title: rows[0].title,
            description: rows[0].description,
            duration: rows[0].duration,
            questions: []
        };

        rows.forEach(row => {
            let question = result.questions.find(
                q => q.question_id === row.question_id
            );

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
    });
};


// ================= UPDATE EXAM =================
// exports.updateExam = (req, res) => {
//     const { id } = req.params;

//     const {
//         subject_id,
//         title,
//         description,
//         duration,
//         easy_count,
//         medium_count,
//         hard_count
//     } = req.body;

//     // 🔥 CHECK đã có ai làm bài chưa (DÙNG user_exam)
//     const sqlCheck = `
//         SELECT COUNT(*) AS total
//         FROM user_exam
//         WHERE exam_id = ?
//     `;

//     db.query(sqlCheck, [id], (err, result) => {
//         if (err) return res.status(500).json(err);

//         const hasAttempts = result[0].total > 0;

//         // ❌ đã có người làm → chặn update
//         if (hasAttempts) {
//             return res.status(403).json({
//                 error: "Đề thi đã có người làm, không thể chỉnh sửa"
//             });
//         }

//         // ✅ chưa ai làm → update tiếp
//         continueUpdateExam();
//     });

//     // =====================
//     function continueUpdateExam() {

//         const easyCount = Number(easy_count || 0);
//         const mediumCount = Number(medium_count || 0);
//         const hardCount = Number(hard_count || 0);

//         const total_questions =
//             easyCount + mediumCount + hardCount;

//         if (!subject_id || !title || !duration) {
//             return res.status(400).json({
//                 error: "Thiếu dữ liệu"
//             });
//         }

//         if (total_questions <= 0) {
//             return res.status(400).json({
//                 error: "Tổng số câu phải lớn hơn 0"
//             });
//         }

//         // update exam
//         const sqlUpdateExam = `
//             UPDATE exam
//             SET subject_id = ?,
//                 title = ?,
//                 description = ?,
//                 duration = ?
//             WHERE exam_id = ?
//         `;

//         db.query(sqlUpdateExam, [
//             subject_id,
//             title,
//             description,
//             duration,
//             id
//         ], (err) => {
//             if (err) return res.status(500).json(err);

//             // xoá câu cũ
//             db.query(
//                 "DELETE FROM exam_questions WHERE exam_id=?",
//                 [id],
//                 (err2) => {
//                     if (err2) return res.status(500).json(err2);

//                     // lấy câu hỏi theo subject
//                     const sql = `
//                         SELECT 
//                             q.question_id,
//                             q.difficulty
//                         FROM questions q
//                         JOIN lessons l ON q.lesson_id = l.lesson_id
//                         JOIN chapters c ON l.chapter_id = c.chapter_id
//                         WHERE c.subject_id = ?
//                     `;

//                     db.query(sql, [subject_id], (err3, questions) => {
//                         if (err3) return res.status(500).json(err3);

//                         const shuffle = arr =>
//                             arr.sort(() => Math.random() - 0.5);

//                         const easyList = questions.filter(
//                             q => q.difficulty?.trim().toUpperCase() === "EASY"
//                         );

//                         const mediumList = questions.filter(
//                             q => q.difficulty?.trim().toUpperCase() === "MEDIUM"
//                         );

//                         const hardList = questions.filter(
//                             q => q.difficulty?.trim().toUpperCase() === "HARD"
//                         );

//                         if (
//                             easyList.length < easyCount ||
//                             mediumList.length < mediumCount ||
//                             hardList.length < hardCount
//                         ) {
//                             return res.status(400).json({
//                                 error: "Không đủ câu hỏi theo độ khó"
//                             });
//                         }

//                         const finalSelected = [
//                             ...shuffle(easyList).slice(0, easyCount),
//                             ...shuffle(mediumList).slice(0, mediumCount),
//                             ...shuffle(hardList).slice(0, hardCount)
//                         ];

//                         const shuffledFinal = shuffle(finalSelected);

//                         const values = shuffledFinal.map(q => [
//                             id,
//                             q.question_id
//                         ]);

//                         db.query(
//                             `INSERT INTO exam_questions (exam_id, question_id) VALUES ?`,
//                             [values],
//                             (err4) => {
//                                 if (err4) return res.status(500).json(err4);

//                                 res.json({
//                                     message: "Cập nhật đề thi thành công",
//                                     examId: id
//                                 });
//                             }
//                         );
//                     });
//                 }
//             );
//         });
//     }
// };
// exports.checkExamLock = (req, res) => {
//     const { id } = req.params;

//     const sql = `
//         SELECT COUNT(*) AS total
//         FROM user_exam
//         WHERE exam_id = ?
//     `;

//     db.query(sql, [id], (err, result) => {
//         if (err) return res.status(500).json(err);

//         res.json({
//             hasAttempt: result[0].total > 0
//         });
//     });
// };

// ================= DELETE ================= xóa đề
exports.deleteExam = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM exam_questions WHERE exam_id=?", [id], (err) => {
        if (err) return res.status(500).json(err);

        db.query("DELETE FROM exam WHERE exam_id=?", [id], (err2) => {
            if (err2) return res.status(500).json(err2);

            res.json({ message: "Xóa thành công" });
        });
    });
};

//Random câu hỏi
exports.createExamBySubject = (req, res) => {

    const {
        subject_id,
        title,
        description,
        duration,
        easy_count,
        medium_count,
        hard_count
    } = req.body;

    // ép kiểu number
    const easyCount = Number(easy_count);
    const mediumCount = Number(medium_count);
    const hardCount = Number(hard_count);

    const total_questions =
        easyCount +
        mediumCount +
        hardCount;

    // validate
    if (
        !subject_id ||
        !title ||
        !duration
    ) {
        return res.status(400).json({
            error: "Thiếu dữ liệu"
        });
    }

    if (total_questions <= 0) {
        return res.status(400).json({
            error: "Tổng số câu phải lớn hơn 0"
        });
    }

    // lấy câu hỏi theo môn
    const sql = `
        SELECT 
            q.question_id,
            q.difficulty,
            c.chapter_id
        FROM questions q
        JOIN lessons l 
            ON q.lesson_id = l.lesson_id
        JOIN chapters c 
            ON l.chapter_id = c.chapter_id
        WHERE c.subject_id = ?
    `;

    db.query(sql, [subject_id], (err, questions) => {

        if (err) {
            return res.status(500).json(err);
        }

        // kiểm tra đủ tổng số câu
        if (questions.length < total_questions) {
            return res.status(400).json({
                error: `Không đủ ${total_questions} câu hỏi`
            });
        }

        // =========random=============
        const shuffle = arr =>
            arr.sort(() => Math.random() - 0.5);

        // chia theo độ khó
        const easyList = questions.filter(
            q =>
                q.difficulty
                    ?.trim()
                    .toUpperCase() === "EASY"
        );

        const mediumList = questions.filter(
            q =>
                q.difficulty
                    ?.trim()
                    .toUpperCase() === "MEDIUM"
        );

        const hardList = questions.filter(
            q =>
                q.difficulty
                    ?.trim()
                    .toUpperCase() === "HARD"
        );

        // debug
        console.log("Easy:", easyList.length);
        console.log("Medium:", mediumList.length);
        console.log("Hard:", hardList.length);

        // kiểm tra đủ từng độ khó
        if (
            easyList.length < easyCount ||
            mediumList.length < mediumCount ||
            hardList.length < hardCount
        ) {
            return res.status(400).json({
                error: "Không đủ câu hỏi theo độ khó yêu cầu"
            });
        }

        // random từng nhóm
        const finalSelected = [
            ...shuffle(easyList).slice(0, easyCount),

            ...shuffle(mediumList).slice(0, mediumCount),

            ...shuffle(hardList).slice(0, hardCount)
        ];

        // random lại toàn đề
        const shuffledFinal = shuffle(finalSelected);

        // tạo exam
        const sqlExam = `
            INSERT INTO exam (
                title,
                description,
                duration,
                subject_id,
                created_time
            )
            VALUES (?, ?, ?, ?, NOW())
        `;

        db.query(
            sqlExam,
            [
                title,
                description,
                duration,
                subject_id
            ],
            (err2, result) => {

                if (err2) {
                    return res.status(500).json(err2);
                }

                const examId = result.insertId;

                // insert exam_questions
                const values = shuffledFinal.map(q => [
                    examId,
                    q.question_id
                ]);

                const sqlInsert = `
                    INSERT INTO exam_questions (
                        exam_id,
                        question_id
                    )
                    VALUES ?
                `;

                db.query(sqlInsert, [values], (err3) => {

                    if (err3) {
                        return res.status(500).json(err3);
                    }

                    res.json({
                        message: "Tạo đề thành công",
                        examId,
                        total: shuffledFinal.length,

                        difficulty: {
                            easy: easyCount,
                            medium: mediumCount,
                            hard: hardCount
                        }
                    });
                });
            }
        );
    });
};

//Thống kê độ khó
exports.getQuestionCountByDifficulty = (req, res) => {

    const { subject_id } = req.params;

    const sql = `
        SELECT 
            q.difficulty,
            COUNT(*) AS total
        FROM questions q
        JOIN lessons l 
            ON q.lesson_id = l.lesson_id
        JOIN chapters c 
            ON l.chapter_id = c.chapter_id
        WHERE c.subject_id = ?
        GROUP BY q.difficulty
    `;

    db.query(sql, [subject_id], (err, result) => {

        if (err) {
            console.log("SQL ERROR:", err);
            return res.status(500).json(err);
        }

        console.log("RESULT:", result);

        let data = {
            EASY: 0,
            MEDIUM: 0,
            HARD: 0
        };

        result.forEach(item => {

            const difficulty =
                item.difficulty?.trim().toUpperCase();

            data[difficulty] = item.total;
        });

        res.json(data);
    });
};