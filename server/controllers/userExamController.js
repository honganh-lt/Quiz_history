const db = require("../config/db")

//Get lấy dữ liệu đổ vào bảng có time FE Admin
exports.getAllUserExams = (req, res) => {
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

    db.query(sql, (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    })
}

//Số lần thi
// exports.getExamAttempts = (req, res) => {
//     const { user_id } = req.query;

//     const sql = `
//         SELECT 
//             e.exam_id,
//             e.title,
//             COUNT(ue.user_exam_id) AS attempt_count
//         FROM exam e
//         LEFT JOIN user_exam ue 
//             ON e.exam_id = ue.exam_id 
//             AND ue.user_id = ?
//         GROUP BY e.exam_id, e.title
//     `;

//     db.query(sql, [user_id], (err, rows) => {
//         if (err) return res.status(500).json(err);
//         res.json(rows);
//     });
// };

// Start exam === bắt đầu làm bài: FE User
exports.startExam = (req, res) => {
    const { user_id, exam_id } = req.body;

    const sql = `
        INSERT INTO user_exam
        (
            user_id,
            exam_id,
            start_time,
            status
        )
        VALUES (?,?,NOW(),'doing')
    `;

    db.query(sql, [user_id, exam_id], (err, result) => {
        if(err) return res.status(500).json(err);

        res.json({
            user_exam_id: result.insertId
        });
    });
};

//Submit == nộp
// Submit == nộp bài
exports.submitExam = (req, res) => {

    const { user_exam_id, answers } = req.body;

    // CHECK user_exam_id
    if (!user_exam_id) {
        return res.status(400).json({
            message: "Thiếu user_exam_id"
        });
    }

    // CHECK answers
    if (!Array.isArray(answers)) {
        return res.status(400).json({
            message: "answers phải là array"
        });
    }

    // CHECK user_exam tồn tại
    db.query(
        `
        SELECT *
        FROM user_exam
        WHERE user_exam_id = ?
        `,
        [user_exam_id],
        (err, result) => {

            if (err) {
                console.log("CHECK USER EXAM ERROR:", err);

                return res.status(500).json(err);
            }

            // KHÔNG TỒN TẠI
            if (result.length === 0) {
                return res.status(400).json({
                    message: "Không tồn tại bài thi"
                });
            }

            // ĐÃ NỘP
            if (result[0].status === "submitted") {
                return res.json({
                    message: "Bài đã nộp rồi"
                });
            }

            // TRANSACTION
            db.beginTransaction((err) => {

                if (err) {
                    console.log("TRANSACTION ERROR:", err);

                    return res.status(500).json(err);
                }

                // KHÔNG CHỌN CÂU NÀO
                if (answers.length === 0) {

                    db.query(
                        `
                        SELECT COUNT(*) AS total
                        FROM exam_questions eq
                        JOIN user_exam ue
                            ON ue.exam_id = eq.exam_id
                        WHERE ue.user_exam_id = ?
                        `,
                        [user_exam_id],
                        (err, totalResult) => {

                            if (err) {

                                console.log("COUNT TOTAL ERROR:", err);

                                return db.rollback(() =>
                                    res.status(500).json(err)
                                );
                            }

                            const total = totalResult[0].total;

                            db.query(
                                `
                                UPDATE user_exam
                                SET
                                    score = 0,
                                    end_time = NOW(),
                                    status = 'submitted'
                                WHERE user_exam_id = ?
                                `,
                                [user_exam_id],
                                (err) => {

                                    if (err) {

                                        console.log("UPDATE SCORE ERROR:", err);

                                        return db.rollback(() =>
                                            res.status(500).json(err)
                                        );
                                    }

                                    db.commit((err) => {

                                        if (err) {

                                            console.log("COMMIT ERROR:", err);

                                            return db.rollback(() =>
                                                res.status(500).json(err)
                                            );
                                        }

                                        res.json({
                                            score: 0,
                                            correct: 0,
                                            total
                                        });
                                    });
                                }
                            );
                        }
                    );

                    return;
                }

                let done = 0;

                // INSERT ANSWERS
                answers.forEach((ans) => {

                    db.query(
                        `
                        INSERT INTO user_answer
                        (
                            user_exam_id,
                            question_id,
                            answer_id
                        )
                        VALUES (?,?,?)
                        ON DUPLICATE KEY UPDATE
                            answer_id = VALUES(answer_id)
                        `,
                        [
                            Number(user_exam_id),
                            Number(ans.question_id),
                            Number(ans.answer_id)
                        ],
                        (err) => {

                            if (err) {

                                console.log("INSERT ANSWER ERROR:", err);

                                return db.rollback(() =>
                                    res.status(500).json(err)
                                );
                            }

                            done++;

                            // INSERT XONG HẾT
                            if (done === answers.length) {

                                // TÍNH ĐIỂM
                                db.query(
                                    `
                                    SELECT
                                        (
                                            SELECT COUNT(*)
                                            FROM exam_questions eq
                                            JOIN user_exam ue
                                                ON ue.exam_id = eq.exam_id
                                            WHERE ue.user_exam_id = ?
                                        ) AS total,

                                        COUNT(
                                            CASE
                                                WHEN a.is_correct = 1
                                                THEN 1
                                            END
                                        ) AS correct

                                    FROM user_answer ua

                                    JOIN answers a
                                        ON ua.answer_id = a.answer_id

                                    WHERE ua.user_exam_id = ?
                                    `,
                                    [
                                        user_exam_id,
                                        user_exam_id
                                    ],
                                    (err, result) => {

                                        if (err) {

                                            console.log("CALCULATE SCORE ERROR:", err);

                                            return db.rollback(() =>
                                                res.status(500).json(err)
                                            );
                                        }

                                        const total =
                                            result[0].total || 0;

                                        const correct =
                                            result[0].correct || 0;

                                        const score = Number(
                                            ((correct / total) * 10).toFixed(2)
                                        );

                                        // UPDATE SCORE
                                        db.query(
                                            `
                                            UPDATE user_exam
                                            SET
                                                score = ?,
                                                end_time = NOW(),
                                                status = 'submitted'
                                            WHERE user_exam_id = ?
                                            `,
                                            [
                                                score,
                                                user_exam_id
                                            ],
                                            (err) => {

                                                if (err) {

                                                    console.log("UPDATE FINAL SCORE ERROR:", err);

                                                    return db.rollback(() =>
                                                        res.status(500).json(err)
                                                    );
                                                }

                                                db.commit((err) => {

                                                    if (err) {

                                                        console.log("FINAL COMMIT ERROR:", err);

                                                        return db.rollback(() =>
                                                            res.status(500).json(err)
                                                        );
                                                    }

                                                    res.json({
                                                        score,
                                                        correct,
                                                        total
                                                    });
                                                });
                                            }
                                        );
                                    }
                                );
                            }
                        }
                    );
                });
            });
        }
    );
};

//lịch sử làm bài
exports.getHistory = (req, res) => {
    const { user_id } = req.params;

    const sql = `
        SELECT 
            ue.user_exam_id,
            ue.exam_id,
            ue.score,
            ue.start_time,
            ue.end_time,
            ue.status,
            e.exam_id,
            s.subject_id,
            e.title,
            s.subject_name
        FROM user_exam ue
        JOIN exam e ON ue.exam_id = e.exam_id
        JOIN subjects s ON e.subject_id = s.subject_id
        WHERE ue.user_id = ?
        ORDER BY ue.start_time ASC
    `;

    db.query(sql, [user_id], (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
};

exports.reviewExam = (req, res) => {

    const { user_exam_id } = req.params;

    const sql = `
        SELECT
            q.question_id,
            q.content AS question,

            ue.exam_id,
            e.subject_id,

            a.answer_id,
            a.content AS answer,
            a.is_correct,

            ua.answer_id AS user_answer_id

        FROM user_exam ue

        JOIN exam e
            ON ue.exam_id = e.exam_id

        -- BẢNG TRUNG GIAN ĐỀ THI - CÂU HỎI
        JOIN exam_questions eq
            ON e.exam_id = eq.exam_id

        JOIN questions q
            ON eq.question_id = q.question_id

        JOIN answers a
            ON q.question_id = a.question_id

        LEFT JOIN user_answer ua
            ON ua.question_id = q.question_id
            AND ua.answer_id = a.answer_id
            AND ua.user_exam_id = ue.user_exam_id

        WHERE ue.user_exam_id = ?

        ORDER BY q.question_id, a.answer_id
    `;

    db.query(sql, [user_exam_id], (err, rows) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        // DEBUG
        console.log("ROWS:", rows);

        const result = [];

        rows.forEach(row => {

            let question = result.find(
                q => q.question_id === row.question_id
            );

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
    });
};

//