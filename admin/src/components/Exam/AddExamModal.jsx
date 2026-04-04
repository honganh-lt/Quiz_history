import React, { useState } from 'react';
import { createFullExam } from '../../api/examApi';

const AddExamModal = ({ isOpen, onClose, onSuccess, subjects }) => {
    const [subjectId, setSubjectId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(20);

    const [easy, setEasy] = useState(0);
    const [medium, setMedium] = useState(0);
    const [hard, setHard] = useState(0);

    if (!isOpen) return null;

    const handleAdd = async () => {
        const easyNum = Number(easy) || 0;
        const mediumNum = Number(medium) || 0;
        const hardNum = Number(hard) || 0;
        const durationNum = Number(duration) || 20;
        const totalQuestions = easyNum + mediumNum + hardNum;

        if (!subjectId || !title?.trim() || totalQuestions === 0) {
            alert("Vui lòng chọn môn học, nhập tiêu đề và số câu > 0");
            return;
        }

        try {
            await createFullExam({
                subject_id: subjectId,
                title,
                description,
                duration: durationNum,
                easy: easyNum,
                medium: mediumNum,
                hard: hardNum,
                created_by: 1
            });
            onSuccess();
            onClose();
        } catch (err) {
            console.error("Thêm exam thất bại:", err.response?.data || err.message);
            alert("Tạo đề thi thất bại!");
        }
    };

    return (
        <div className="modal-overlay-chap">
            <div className="modal-chap">
                <h3>Thêm bài thi</h3>

                <h4>Chọn môn học</h4>
                <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
                    <option value="">Chọn môn học</option>
                    {subjects?.length > 0
                        ? subjects.map((sub) => (
                              <option key={sub.subject_id} value={sub.subject_id}>
                                  {sub.subject_name}
                              </option>
                          ))
                        : <option disabled>Không có môn học</option>}
                </select>

                <h4>Tên bài thi</h4>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                <h4>Mô tả</h4>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

                <h4>Thời gian (phút)</h4>
                <input type="number" value={duration} min={1} onChange={(e) => setDuration(e.target.value)} />

                <h4>Số câu hỏi theo độ khó</h4>
                <div className="difficulty-inputs">
                    <label>Dễ:
                        <input type="number" value={easy} min={0} onChange={(e) => setEasy(e.target.value)} />
                    </label>
                    <label>Trung bình:
                        <input type="number" value={medium} min={0} onChange={(e) => setMedium(e.target.value)} />
                    </label>
                    <label>Khó:
                        <input type="number" value={hard} min={0} onChange={(e) => setHard(e.target.value)} />
                    </label>
                </div>

                <h4>Tổng số câu hỏi: {Number(easy) + Number(medium) + Number(hard)}</h4>

                <div className="modal-actions-chap">
                    <button onClick={handleAdd} className="save-btn">Thêm</button>
                    <button onClick={onClose} className="cancel-btn">Hủy</button>
                </div>
            </div>
        </div>
    );
};

export default AddExamModal;