// import { useState } from "react";
// import { createReport } from "../../api/reportQuestionApi";
// // import { createReport } from "../../api/questionReportApi";
// import "./ReportQuestionModal.css"
// const ReportQuestionModal = ({
//     question,
//     onClose
// }) => {

//     const [reason, setReason] = useState("");
//     const [description, setDescription] = useState("");

// const handleSubmit = async () => {

//     if (!reason) {
//         alert("Chọn lý do phản ánh");
//         return;
//     }

//     try {

//         const user = JSON.parse(
//             localStorage.getItem("user")
//         );

//         const payload = {
//             user_id: user?.user_id,
//             question_id: question?.question_id,
//             reason,
//             description
//         };

//         console.log("USER:", user);
//         console.log("QUESTION:", question);
//         console.log("PAYLOAD:", payload);

//         const res = await createReport(payload);

//         console.log("RESPONSE:", res);

//         alert("Đã gửi phản ánh");

//         onClose();

//     } catch (err) {

//         console.error("ERROR:", err);
//         console.log("SERVER:", err.response?.data);

//         alert("Gửi phản ánh thất bại");

//     }
// };

//     return (
//         <div className="modal-overlay-addreport">

//             <div className="modal-report">

//                 <h3>Báo lỗi câu hỏi</h3>

//                 <h4>Nội dung câu hỏi</h4>

//                 <textarea
//                     disabled
//                     value={question.content}
//                 />

//                 <h4>Lý do</h4>

//                 <select
//                     value={reason}
//                     onChange={(e) =>
//                         setReason(e.target.value)
//                     }
//                 >
//                     <option value="">
//                         Chọn lý do
//                     </option>

//                     <option value="Sai đáp án">
//                         Sai đáp án
//                     </option>

//                     <option value="Sai nội dung">
//                         Sai nội dung
//                     </option>

//                     <option value="Lỗi chính tả">
//                         Lỗi chính tả
//                     </option>

//                     <option value="Khác">
//                         Khác
//                     </option>
//                 </select>

//                 <h4>Mô tả chi tiết</h4>

//                 <textarea
//                     value={description}
//                     onChange={(e) =>
//                         setDescription(e.target.value)
//                     }
//                 />

//                 <div className="modal-actions-report">

//                     <button
//                         className="save-btn"
//                         onClick={handleSubmit}
//                     >
//                         Gửi phản ánh
//                     </button>

//                     <button
//                         className="close-btn"
//                         onClick={onClose}
//                     >
//                         Đóng
//                     </button>

//                 </div>

//             </div>

//         </div>
//     );
// };

// export default ReportQuestionModal;