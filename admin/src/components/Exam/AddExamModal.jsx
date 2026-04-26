import React, { useState } from 'react';
import { createExamBySubject } from '../../api/examApi';
import "./css/AddExamModal.css"

const AddExamModal = ({ isOpen, onClose, onSuccess, subjects }) => {

    const [subjectId, setSubjectId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(20);

    const [easy, setEasy] = useState(0);
    const [medium, setMedium] = useState(0);
    const [hard, setHard] = useState(0);

    if (!isOpen) return null;
    
    const totalQuestions = Number(easy) + Number(medium) + Number(hard);

   const handleAdd = async () => {
    const easyNum = Number(easy) || 0;
    const mediumNum = Number(medium) || 0;
    const hardNum = Number(hard) || 0;

    if (!subjectId || !title.trim() || totalQuestions === 0) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    // 👉 lấy user từ localStorage
    // const user = JSON.parse(localStorage.getItem("user"));

    // if (!user || !user.id) {
    //     alert("Bạn chưa đăng nhập");
    //     return;
    // }

    try {
        await createExamBySubject({
    subject_id: subjectId,
    title,
    description,
    duration: Number(duration),
    total_questions: easyNum + mediumNum + hardNum
});

        // alert("Tạo đề thành công");

        onSuccess();
        onClose();

        // reset form
        setSubjectId("");
        setTitle("");
        setDescription("");
        setDuration(15);
        setEasy(0);
        setMedium(0);
        setHard(0);

    } catch (err) {
        console.error("FULL ERROR:", err);
        console.error("BACKEND ERROR:", err?.response?.data);

        alert(err?.response?.data?.error || "Tạo đề thất bại");
    }
};

    return (
        <div className="modal-overlay-exam">
            <div className="modal-exam">
                <h3>Thêm bài thi</h3>

                <h4>Chọn môn học</h4>
                <select 
                    value={subjectId} 
                    onChange={(e) => setSubjectId(e.target.value)}
                >
                    <option value="">Chọn môn học</option>
                    {subjects.map((sub) => (
                        <option key={sub.subject_id} value={sub.subject_id}>
                            {sub.subject_name}
                        </option>
                    ))}
                </select>

                <h4>Tên bài thi</h4>
                <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            
                <h4>Mô tả</h4>
                <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                
                <h4>Thời gian (phút)</h4>
                <input 
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />

                {/* RULES THEO CHƯƠNG */}
                <h4>Số câu hỏi theo độ khó</h4>
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
                </div>
                

                {/* Tổng */}
                <div className="mb-3">
                    <strong>Tổng số câu hỏi: {totalQuestions}</strong>
                </div>

                <div className="modal-actions-exam">
                    <button onClick={handleAdd} className="save-btn">Thêm</button>
                    <button onClick={onClose} className="cancel-btn">Hủy</button>
                </div>
            </div>
        </div>
    );
};

export default AddExamModal;