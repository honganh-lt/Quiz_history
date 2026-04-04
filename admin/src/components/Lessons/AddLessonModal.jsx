import React, { useState } from 'react'
import { createLesson } from '../../api/lessonApi';
import "./css/AddLessonModal.css"

export const AddLessonModal = ({isOpen, onClose, onSuccess, chapters}) => {

    //1. Lưu dữ liệu nhập vào
    const [chapterId, setChapterId] = useState("");
    const [lessonName, setLessonName] = useState("");
    const [lessonNumber, setLessonNumber] = useState("");

    //2. Nếu không mở modal -> không hiển thị
    if(!isOpen) return null;

    //3. Xử lý khi bấm thêm
    const handleAdd = async () => {
        if (!chapterId || !lessonName || !lessonNumber) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        try {
            await createLesson({
                chapter_id: Number(chapterId), //ép kiểu
                lesson_name: lessonName,
                lesson_number: Number(lessonNumber)
            });

            onSuccess();
            onClose();

            //reset
            setChapterId("");
            setLessonName("");
            setLessonNumber("");
        } catch (error) {
            console.error(error);
            alert("Lỗi khi thêm!")
            
        }
    }

  return (
    <div className="modal-overlay-les">
        <div className="modal-les">
            <h3>Thêm bài học</h3>

            {/*Chọn môn học */}
            <h4>Chọn chương</h4>
            <select 
                value={chapterId}
                onChange={(e) => setChapterId(e.target.value)}
            >
                <option value="">Chọn chương</option>

                {/* Map danh sách chương */}
                {/* dùng {} nhưng không return sẽ bị sai và không render được */}
                {chapters && chapters.length > 0 ? (
                    chapters.map((chap) => (
                        <option key={chap.chapter_id} value={chap.chapter_id}>
                            {chap.chapter_number}
                        </option>
                    ))
                ) : (
                    <option disabled>Không có chương nào</option>
                )}
            </select>

            {/* Tên chương */}
            <h4>Tên bài</h4>
            <input 
                type='text'
                value={lessonName}
                onChange={(e) => setLessonName(e.target.value)}
            />

            {/* Số chương */}
            <h4>Số bài</h4>
            <input 
                type='number'
                value={lessonNumber}
                onChange={(e) => setLessonNumber(e.target.value)}
            />
            <div className="modal-actions-les">
                <button onClick={handleAdd} className='save-btn'>Thêm</button>
                <button onClick={onClose} className='cancel-btn'>Hủy</button>
            </div>
        </div>
    </div>
  )
}
