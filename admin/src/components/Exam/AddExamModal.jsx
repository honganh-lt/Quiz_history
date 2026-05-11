import React, { useState, useEffect } from 'react';
import { createExamBySubject } from '../../api/examApi';
import "./css/AddExamModal.css";

const AddExamModal = ({ isOpen, onClose, onSuccess, subjects }) => {

    const [subjectId, setSubjectId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(20);

    // để "" để xoá số 0 và nhập tay
    const [easy, setEasy] = useState("");
    const [medium, setMedium] = useState("");
    const [hard, setHard] = useState("");

    // auto set khi mở modal
    useEffect(() => {
        if (isOpen) {
            setEasy(10);
            setMedium(6);
            setHard(4);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const totalQuestions =
        (Number(easy) || 0) +
        (Number(medium) || 0) +
        (Number(hard) || 0);

    const handleAdd = async () => {

        if (!subjectId || !title.trim()) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        if (totalQuestions <= 0) {
            alert("Tổng số câu phải lớn hơn 0");
            return;
        }

        try {
            await createExamBySubject({
                subject_id: subjectId,
                title,
                description,
                duration: Number(duration),

                easy_count: Number(easy || 0),
                medium_count: Number(medium || 0),
                hard_count: Number(hard || 0)
            });

            onSuccess();
            onClose();

            // reset form
            setSubjectId("");
            setTitle("");
            setDescription("");
            setDuration(20);

            setEasy("");
            setMedium("");
            setHard("");

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
                        <option
                            key={sub.subject_id}
                            value={sub.subject_id}
                        >
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
                    onChange={(e) =>
                        setDuration(e.target.value)
                    }
                />

                <h4>Số câu hỏi theo độ khó</h4>

                <div className="difficulty-inputs">

                    <label>
                        Dễ: (tối đa: 10)
                        <input
                            type="number"
                            value={easy}
                            onChange={(e) =>
                                setEasy(e.target.value)
                            }
                        />
                    </label>

                    <label>
                        Trung bình:
                        <input
                            type="number"
                            value={medium}
                            onChange={(e) =>
                                setMedium(e.target.value)
                            }
                        />
                    </label>

                    <label>
                        Khó:
                        <input
                            type="number"
                            value={hard}
                            onChange={(e) =>
                                setHard(e.target.value)
                            }
                        />
                    </label>

                </div>

                <div className="mb-3">
                    <strong>
                        Tổng số câu hỏi: {totalQuestions}
                    </strong>
                </div>

                <div className="modal-actions-exam">
                    <button
                        onClick={handleAdd}
                        className="save-btn"
                    >
                        Thêm
                    </button>

                    <button
                        onClick={onClose}
                        className="cancel-btn"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddExamModal;