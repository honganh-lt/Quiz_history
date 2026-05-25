// import React, { useEffect, useState } from "react";
// import "./css/EditExamModal.css";
// import { updateExam } from "../../api/examApi";

// export const EditExamModal = ({
//   exam,
//   onClose,
//   onSuccess,
//   subjects,
//   updateExam: updateExamUI
// }) => {

//   const [subjectId, setSubjectId] = useState("");
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [duration, setDuration] = useState(20);

//   const [easy, setEasy] = useState("");
//   const [medium, setMedium] = useState("");
//   const [hard, setHard] = useState("");

//   const [hasAttempt, setHasAttempt] = useState(false);

//   useEffect(() => {
//     if (!exam) return;

//     setSubjectId(String(exam.subject_id));
//     setTitle(exam.title);
//     setDescription(exam.description);
//     setDuration(exam.duration);

//     setEasy(exam.easy_count || 0);
//     setMedium(exam.medium_count || 0);
//     setHard(exam.hard_count || 0);

//     setHasAttempt(exam.has_attempt === 1);
//   }, [exam]);

//   if (!exam) return null;

//   const handleUpdate = async () => {
//     try {
//       const res = await updateExam(exam.exam_id, {
//         subject_id: subjectId,
//         title,
//         description,
//         duration,
//         easy_count: easy,
//         medium_count: medium,
//         hard_count: hard
//       });

//       updateExamUI(res.data);
//       onClose();
//       onSuccess(); 

//     } catch (err) {
//       if (err?.response?.status === 403) {
//         alert("Đề thi đã có người làm, không thể chỉnh sửa");
//         return;
//       }

//       alert(err?.response?.data?.error || "Lỗi cập nhật");
//     }
//   };

//   return (
//     <div className="modal-overlay-edit">
//       <div className="modal-exam-edit">
//         <h3>Sửa đề thi</h3>

//         {hasAttempt && (
//           <p style={{ color: "red" }}>
//             ⚠ Đề thi đã có người làm, không thể chỉnh sửa
//           </p>
//         )}

//         <select
//           value={subjectId}
//           onChange={(e) => setSubjectId(e.target.value)}
//           disabled={hasAttempt}
//         >
//           <option value="">Chọn môn</option>
//           {subjects.map((s) => (
//             <option key={s.subject_id} value={s.subject_id}>
//               {s.subject_name}
//             </option>
//           ))}
//         </select>

//         <input
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           disabled={hasAttempt}
//         />

//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           disabled={hasAttempt}
//         />

//         <input
//           type="number"
//           value={duration}
//           onChange={(e) => setDuration(e.target.value)}
//           disabled={hasAttempt}
//         />

//         <div>
//           <input value={easy} onChange={(e) => setEasy(e.target.value)} />
//           <input value={medium} onChange={(e) => setMedium(e.target.value)} />
//           <input value={hard} onChange={(e) => setHard(e.target.value)} />
//         </div>

//         <button onClick={handleUpdate} disabled={hasAttempt}>
//           Cập nhật
//         </button>

//         <button onClick={onClose}>Đóng</button>
//       </div>
//     </div>
//   );
// };

// export default EditExamModal;