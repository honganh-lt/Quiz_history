// const db = require("../config/db");

// // ================= GET ALL REPORTS =================
// exports.getReports = async (req, res, next) => {
//     const sql = `
//         SELECT
//             qr.question_report_id,
//             qr.reason,
//             qr.description,
//             qr.status,
//             qr.created_at,

//             u.username,

//             q.question_id,
//             q.content

//         FROM question_reports qr

//         LEFT JOIN users u
//             ON qr.user_id = u.user_id

//         LEFT JOIN questions q
//             ON qr.question_id = q.question_id

//         ORDER BY qr.created_at DESC
//     `;

//     try {
//         const [rows] = await db.query(sql);
//         res.json(rows);
//     } catch (err) {
//         next(err);
//     }
// };

// // ================= CREATE REPORT =================
// exports.postReport = async (req, res, next) => {
//     const {
//         user_id,
//         question_id,
//         reason,
//         description
//     } = req.body;

//     const sql = `
//         INSERT INTO question_reports
//         (
//             user_id,
//             question_id,
//             reason,
//             description
//         )
//         VALUES (?, ?, ?, ?)
//     `;

//     try {
//         await db.query(sql, [
//             user_id,
//             question_id,
//             reason,
//             description
//         ]);

//         res.json({
//             message: "Gửi phản ánh thành công"
//         });
//     } catch (err) {
//         next(err);
//     }
// };

// // ================= UPDATE STATUS =================
// exports.updateReportStatus = async (req, res, next) => {
//     const { id } = req.params;
//     const { status } = req.body;

//     const sql = `
//         UPDATE question_reports
//         SET status = ?
//         WHERE question_report_id = ?
//     `;

//     try {
//         await db.query(sql, [status, id]);

//         res.json({
//             message: "Cập nhật trạng thái thành công"
//         });
//     } catch (err) {
//         next(err);
//     }
// };

// // ================= DELETE REPORT =================
// exports.deleteReport = async (req, res, next) => {
//     const { id } = req.params;

//     const sql = `
//         DELETE FROM question_reports
//         WHERE question_report_id = ?
//     `;

//     try {
//         await db.query(sql, [id]);

//         res.json({
//             message: "Xóa phản ánh thành công"
//         });
//     } catch (err) {
//         next(err);
//     }
// };