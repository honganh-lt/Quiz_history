import React, { useState } from 'react'
import { createLesson } from '../../api/lessonApi';
import "./css/AddLessonModal.css"

export const AddLessonModal = ({ isOpen, onClose, onSuccess, chapters, subjects }) => {

    const [subjectId, setSubjectId] = useState("");
    const [chapterId, setChapterId] = useState("");
    const [lessonName, setLessonName] = useState("");
    const [lessonNumber, setLessonNumber] = useState("");

    if (!isOpen) return null;

    // ✅ FIX QUAN TRỌNG
    const filteredChapters = chapters.filter(
        (chap) => Number(chap.subject_id) === Number(subjectId)
    );

    const handleAdd = async () => {
        if (!subjectId || !chapterId || !lessonName || !lessonNumber) {
            alert("Vui lòng nhập đầy đủ!");
            return;
        }

        try {
            await createLesson({
                chapter_id: Number(chapterId),
                lesson_name: lessonName,
                lesson_number: Number(lessonNumber)
            });

            onSuccess();
            onClose();

            // reset
            setSubjectId("");
            setChapterId("");
            setLessonName("");
            setLessonNumber("");

        } catch (error) {
            console.error(error);
            alert("Lỗi!");
        }
    };

    return (
        <div className="modal-overlay-les">
            <div className="modal-les">

                <h3>Thêm bài học</h3>

                {/* CHỌN MÔN */}
                <h4>Môn học</h4>
                <select
                    value={subjectId}
                    onChange={(e) => {
                        setSubjectId(e.target.value);
                        setChapterId("");
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
                <h4>Bài số</h4>
                <input
                    type="number"
                    value={lessonNumber}
                    onChange={(e) => setLessonNumber(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                />

                <div className="modal-actions-les">
                    <button onClick={handleAdd} className='save-btn'>Thêm</button>
                    <button onClick={onClose} className='cancel-btn'>Hủy</button>
                </div>

            </div>
        </div>
    )
}