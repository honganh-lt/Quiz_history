// import { useState } from "react";
// import { updateReportStatus } from "../../api/questionReportApi";
// import "./css/EditReportQuestion.css";

// const EditReportQuestion = ({
//     report,
//     onClose,
//     onSuccess
// }) => {

//     const [status, setStatus] = useState(report.status);

//     const handleSave = async () => {
//         try {

//             await updateReportStatus(
//                 report.question_report_id,
//                 { status }
//             );

//             alert("Cập nhật thành công");

//             onSuccess();
//             onClose();

//         } catch (err) {

//             console.error(err);
//             alert("Cập nhật thất bại");

//         }
//     };

//     return (
//         <div className="modal-overlay-report">

//             <div className="modal-report">

//                 <h3>Chi tiết phản ánh</h3>

//                 <h4>Người báo cáo</h4>
//                 <input
//                     type="text"
//                     value={report.username || ""}
//                     disabled
//                 />

//                 <h4>Mã câu hỏi</h4>
// <input
//     type="text"
//     value={report.question_id || ""}
//     disabled
// />

// <h4>Nội dung câu hỏi</h4>
// <textarea
//     value={report.content || ""}
//     disabled
// />

// <h4>Lý do phản ánh</h4>
// <input
//     type="text"
//     value={report.reason || ""}
//     disabled
// />

//                 <h4>Mô tả chi tiết</h4>
//                 <textarea
//                     value={report.description || ""}
//                     disabled
//                 />

//                 <h4>Trạng thái</h4>
//                 <select
//                     value={status}
//                     onChange={(e) =>
//                         setStatus(e.target.value)
//                     }
//                 >
//                     <option value="pending">
//                         Chờ xử lý
//                     </option>

//                     <option value="reviewed">
//                         Đã xem
//                     </option>

//                     <option value="resolved">
//                         Đã xử lý
//                     </option>
//                 </select>

//                 <div className="modal-actions-report">

//                     <button
//                         className="save-btn"
//                         onClick={handleSave}
//                     >
//                         Lưu
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

// export default EditReportQuestion;