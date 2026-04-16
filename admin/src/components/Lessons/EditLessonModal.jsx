import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const EditLessonModal = ({ les, onClose, updateLes, chapters, subjects }) => {

    const [subjectId, setSubjectId] = useState("");
    const [chapterId, setChapterId] = useState("");
    const [lessonName, setLessonName] = useState("");
    const [lessonNumber, setLessonNumber] = useState("");

    // ===== Đổ dữ liệu =====
    useEffect(() => {
        if (les && chapters.length > 0) {
            setLessonName(les.lesson_name);
            setChapterId(les.chapter_id);
            setLessonNumber(les.lesson_number);

            // tìm subject từ chapter
            const chap = chapters.find(c => c.chapter_id === les.chapter_id);
            if (chap) {
                setSubjectId(chap.subject_id);
            }
        }
    }, [les, chapters]);

    // ===== Lọc chương theo môn =====
    const filteredChapters = chapters.filter(
        (chap) => Number(chap.subject_id) === Number(subjectId)
    );

    // ===== Submit =====
    const handleSubmit = async () => {
        if (!subjectId || !chapterId || !lessonName || !lessonNumber) {
            alert("Vui lòng nhập đầy đủ!");
            return;
        }

        try {
            await axios.put(
                `http://localhost:3000/api/lessons/${les.lesson_id}`, // ✅ FIX API
                {
                    chapter_id: Number(chapterId),
                    lesson_name: lessonName,
                    lesson_number: Number(lessonNumber)
                }
            );

            // update UI
            updateLes({
                ...les,
                lesson_name: lessonName,
                chapter_id: Number(chapterId),
                lesson_number: Number(lessonNumber)
            });

            onClose();
        } catch (error) {
            console.error(error);
            alert("Lỗi khi cập nhật!");
        }
    };

    return (
        <div className="modal-overlay-les">
            <div className="modal-les">

                <h3>Sửa bài học</h3>

                {/* CHỌN MÔN */}
                <h4>Môn học</h4>
                <select
                    value={subjectId}
                    onChange={(e) => {
                        setSubjectId(e.target.value);
                        setChapterId(""); // reset chương
                    }}
                >
                    <option value="">Chọn môn</option>
                    {subjects.map((sub) => (
                        <option key={sub.subject_id} value={sub.subject_id}>
                            {sub.subject_name}
                        </option>
                    ))}
                </select>

                {/* CHỌN CHƯƠNG */}
                <h4>Chương</h4>
                <select
                    value={chapterId}
                    onChange={(e) => setChapterId(e.target.value)}
                    disabled={!subjectId}
                >
                    <option value="">
                        {subjectId ? "Chọn chương" : "Chọn môn trước"}
                    </option>

                    {filteredChapters.length > 0 ? (
                        filteredChapters.map((chap) => (
                            <option key={chap.chapter_id} value={chap.chapter_id}>
                                Chương {chap.chapter_number} - {chap.chapter_name}
                            </option>
                        ))
                    ) : (
                        subjectId && <option disabled>Không có chương</option>
                    )}
                </select>

                {/* TÊN BÀI */}
                <h4>Tên bài</h4>
                <input
                    type="text"
                    value={lessonName}
                    onChange={(e) => setLessonName(e.target.value)}
                />

                {/* SỐ BÀI */}
                <h4>Số bài</h4>
                <input
                    type="number"
                    value={lessonNumber}
                    onChange={(e) => setLessonNumber(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />

                <div className="modal-actions-les">
                    <button className='save-btn' onClick={handleSubmit}>Cập nhật</button>
                    <button className='cancel-btn' onClick={onClose}>Hủy</button>
                </div>

            </div>
        </div>
    );
};

export default EditLessonModal;