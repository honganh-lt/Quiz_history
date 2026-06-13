import React, { useState, useEffect } from 'react';
import { createExamBySubject, getDifficultyCount } from '../../api/examApi';
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

    const [difficultyCount, setDifficultyCount] = useState({
        EASY: 0,
        MEDIUM: 0,
        HARD: 0
    });

    // auto set khi mở modal
    useEffect(() => {
        if (isOpen) {
            setEasy("");
            setMedium("");
            setHard("");
        }
    }, [isOpen]);

    
    //Thống kê độ khó
    //Thống kê độ khó
    useEffect(() => {

        if (!subjectId) return;

        const fetchCount = async () => {

            try {

                const res = await getDifficultyCount(subjectId);

                console.log("API RESPONSE:", res);

                console.log("DATA:", res.data);

                setDifficultyCount({
                    EASY: res.data.EASY || 0,
                    MEDIUM: res.data.MEDIUM || 0,
                    HARD: res.data.HARD || 0
                });

            } catch (err) {
                console.log(err);
            }
        };

        fetchCount();

    }, [subjectId]);


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

        if (Number(easy) > difficultyCount.EASY) {
            return alert(
                `Chỉ có ${difficultyCount.EASY} câu dễ`
            );
        }

        if (Number(medium) > difficultyCount.MEDIUM) {
            return alert(
                `Chỉ có ${difficultyCount.MEDIUM} câu trung bình`
            );
        }

        if (Number(hard) > difficultyCount.HARD) {
            return alert(
                `Chỉ có ${difficultyCount.HARD} câu khó`
            );
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
        <div className="modal-overlay-addexam">
            <div className="modal-exam">
                <h3>Thêm đề thi</h3>

                <h4>Chọn môn học</h4>
                <select
                    value={subjectId}
                    onChange={(e) => {

                        console.log("SELECT:", e.target.value);

                        setSubjectId(e.target.value);
                    }}
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
                            Dễ (tối đa: {difficultyCount.EASY}) :

                            <input
                                type="number"
                                value={easy}
                                onChange={(e) =>
                                    setEasy(e.target.value)
                                }
                            />
                        </label>

                        <label>
                            Trung bình (tối đa: {difficultyCount.MEDIUM}) :

                            <input
                                type="number"
                                value={medium}
                                onChange={(e) =>
                                    setMedium(e.target.value)
                                }
                            />
                        </label>

                        <label>
                            Khó (tối đa: {difficultyCount.HARD}) :

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