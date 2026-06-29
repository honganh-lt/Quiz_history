// import { useEffect, useState } from "react";
// import { getReports } from "../../api/questionReportApi";
// import EditReportQuestion from "./EditReportQuestion";
// import "./css/ManagementReportQuestion.css"

// const ManagementReportQuestion = () => {

//     const [reports, setReports] = useState([]);
//     const [selectedReport, setSelectedReport] = useState(null);
//     const [showModal, setShowModal] = useState(false);

//     const fetchData = async () => {
//         try {
//             const data = await getReports();
//             setReports(Array.isArray(data) ? data : []);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     return (
//         <div className="report-management">

//             <h2>Quản lý phản ánh câu hỏi</h2>

//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Người báo</th>
//                         <th>Mã câu hỏi</th>
//                         <th>Lý do</th>
//                         <th>Trạng thái</th>
//                         {/* <th>Ngày tạo</th> */}
//                         <th>Action</th>
//                     </tr>
//                 </thead>

//                 <tbody>

//                     {reports.length > 0 ? (
//                         reports.map((r) => (
//                             <tr key={r.report_id}>

//                                 <td>{r.report_id}</td>

//                                 <td>{r.username}</td>

//                                 <td>{r.question_id}</td>

//                                 <td>{r.reason}</td>

//                                 {/* <td>{r.status}</td> */}
//                                 <td>
//                                     {{
//                                         pending: "Chờ xử lý",
//                                         reviewed: "Đã xem",
//                                         resolved: "Đã xử lý"
//                                     }[r.status] || r.status}
//                                 </td>

//                                 {/* <td>
//                                     {new Date(
//                                         r.created_at
//                                     ).toLocaleString("vi-VN")}
//                                 </td> */}

//                                 <td>
//                                     <button
//                                         className="detail-btn"
//                                         onClick={() => {
//                                             setSelectedReport(r);
//                                             setShowModal(true);
//                                         }}
//                                     >
//                                         <i className="fa-solid fa-pen-to-square"></i>

//                                     </button>
//                                 </td>

//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="7">
//                                 Chưa có phản ánh nào
//                             </td>
//                         </tr>
//                     )}

//                 </tbody>
//             </table>

//             {showModal && selectedReport && (
//                 <EditReportQuestion
//                     report={selectedReport}
//                     onClose={() => {
//                         setShowModal(false);
//                         setSelectedReport(null);
//                     }}
//                     onSuccess={fetchData}
//                 />
//             )}

//         </div>
//     );
// };

// export default ManagementReportQuestion;