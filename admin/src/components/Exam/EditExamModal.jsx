import React, { useEffect, useState } from 'react'
// import "./css/EditChapterModal.css"
import {  updateExams } from '../../api/examApi';
// import axios from 'axios';
// import { updateExam } from '../../api/examApi';

export const EditExamModal = ({exam, onClose, subjects, updateExam}) => {

  

  const [subjectId, setSubjectId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  // const [easy, setEasy] = useState(0);
  // const [medium, setMedium] = useState(0);
  // const [hard, setHard] = useState(0);

  // const totalQuestions = Number(easy) + Number(medium) + Number(hard);

  //Đổ dữ liệu đã có để sửa
  useEffect(() => {
    if (exam) {
      setSubjectId(String(exam.subject_id)); //để không bị string
      setTitle(exam.title);
      setDescription(exam.description);
      setDuration(exam.duration);
      // setEasy(0);
      // setMedium(0);
      // setHard(0);
      //dùng difficulty của bảng question hay vẫn dùng easy, medium, hard
    }
  }, [exam]);
  

  //Luồng Click - modal mở -> sửa dữ liệu -> click sửa - put API ->
  const handleSubmit = async () => {
    //console.log("") //Kiểm tra
    try {
      await updateExams(exam.exam_id, {
        subject_id: Number(subjectId),
        title, 
        description, 
        duration: Number(duration),
        // total_questions: easy + medium + hard
      });
      //sau khi DB được update ở trên -> phải truyền updateExam ở management
      //để gọi dữ liệu đã cập nhật lại -> sau ccos mới onClose
    // cập nhật UI ngay
    updateExam({
      exam_id: exam.exam_id,
      subject_id: Number(subjectId),
      title,
      description,
      duration: Number(duration),
    });

    onClose();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi cập nhật!");
    }
  }
  
  return (
    <div className="modal-overlay">
      <div className="modal-chap">
        <h3>Sửa đề thi</h3>


        {/* Môn học từ chức năng môn học */}
        <h4>Môn học</h4>
        {/* <input 
          type="text" 
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
        /> */}
        <select 
        value={subjectId}
        onChange={(e) => setSubjectId(e.target.value)}
        >
          <option value="">Chọn môn học</option>
          {subjects && subjects.map((sub) => (
            <option key={sub.subject_id} value={sub.subject_id}>
              {sub.subject_name}
            </option>
          ))}
        </select>

        {/* Tên bài thi */}
        <h4>Tên bài thi</h4>
        <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
        
        />

        {/* Mô tả */}
        <h4>Mô tả</h4>
        <textarea 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Thời gian */}
        <h4>Thời gian (phút)</h4>
        <input 
          type="number" 
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        {/* Số câu hỏi theo độ khó */}
        {/* <h4>Số câu hỏi theo độ khó</h4>
                <div className="difficulty-inputs">
                    <label>
                        Dễ:
                        <input 
                            type="number"
                            value={easy}
                            onChange={(e) => setEasy(e.target.value)}
                        />
                    </label>
                    <label>
                        Trung bình:
                        <input
                            type="number"
                            value={medium}
                            onChange={(e) => setMedium(e.target.value)}
                        />
                    </label>

                    <label>
                        Khó:
                        <input
                            type="number"
                            value={hard}
                            onChange={(e) => setHard(e.target.value)}
                        />
                    </label>
                </div> */}
                {/* tổng số câu hỏi */}
                {/* <div className="mb-3">
                  <strong>Tổng số câu hỏi: {totalQuestions}</strong>
                </div> */}

        <div className="modal-actions-chap">
          <button className='save-btn' onClick={handleSubmit}>Cập nhật</button>
          <button className='close-btn' onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  )
}

export default EditExamModal;