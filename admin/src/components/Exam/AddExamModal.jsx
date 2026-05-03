import React, { useState, useEffect } from 'react';
import { createExamBySubject } from '../../api/examApi';
import "./css/AddExamModal.css"

const AddExamModal = ({ isOpen, onClose, onSuccess, subjects }) => {

    const [subjectId, setSubjectId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(20);

    // 👉 vẫn giữ UI difficulty nhưng KHÔNG cho user sửa
    const [easy, setEasy] = useState(0);
    const [medium, setMedium] = useState(0);
    const [hard, setHard] = useState(0);

    // 👉 auto set theo BE (50-30-20 của 20 câu)
    useEffect(() => {
        if (isOpen) {
            setEasy(10);
            setMedium(6);
            setHard(4);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const totalQuestions = easy + medium + hard; // luôn = 20

    const handleAdd = async () => {

        if (!subjectId || !title.trim()) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        try {
            await createExamBySubject({
                subject_id: subjectId,
                title,
                description,
                duration: Number(duration)
                // ❌ KHÔNG gửi total_questions nữa
            });

            onSuccess();
            onClose();

            // reset form
            setSubjectId("");
            setTitle("");
            setDescription("");
            setDuration(20);

        } catch (err) {
            console.error("ERROR:", err);
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

                {/* 👉 UI giữ nguyên nhưng disable */}
                <h4>Số câu hỏi theo độ khó</h4>
                <div className="difficulty-inputs">
                    <label>
                        Dễ:
                        <input type="number" value={easy} disabled />
                    </label>

                    <label>
                        Trung bình:
                        <input type="number" value={medium} disabled />
                    </label>

                    <label>
                        Khó:
                        <input type="number" value={hard} disabled />
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