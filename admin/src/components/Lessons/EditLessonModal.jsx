import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { updateLesson } from '../../api/lessonApi';

export const EditLessonModal = ({les, onClose, updateLes, chapters }) => {

    const [lessonName, setLessonName] = useState("");
    const [chapterId, setChapterId] = useState("");
    const [lessonNumber, setLessonNumber] = useState("");

    //Đổ dữ liệu vào form khi mở modal
    useEffect(() => {
        if(les) {
            setLessonName(les.lesson_name);
            setChapterId(les.chapter_id);
            setLessonNumber(les.lesson_number);
        }
    }, [les]);

     //Luồng Click - modal mở -> sửa dữ liệu -> click sửa - put API ->
     const handleSubmit = async () => {
        try {
            await axios.put(`http://localhost:3000/api/chapters/${les.lesson_id}`, {
                chapter_id: Number(chapterId),
                lesson_name: lessonName,
                lesson_number: Number(lessonNumber)
            });
            //Update lại UI
            updateLes({
                ...les,
                lesson_name: lessonName,
                chapter_id: Number(chapterId),
                lesson_number: Number(lessonNumber)
            });

            onClose();
        } catch (error) {
            console.error(error);
            alert("Lỗi khi cập nhật!")
        }
     }

  return (
    <div className="modal-overlay-les">
        <div className="modal-les">
            <h3>Sửa bài</h3>

            {/* Tên bài */}
            <h4>Tên bài </h4>
            <input 
                type="text"    
                value={lessonName}
                onChange={(e) => setLessonName(e.target.value)}       
            />

            {/* Chương số */}
            <select 
                value={chapterId}
                onChange={(e) => setChapterId(e.target.value)}
            >
                <option value=""></option>
                {chapters && chapters.map((chap) => (
                    <option key={chap.chapter_id} value={chap.chapter_id}>
                        {chap.chapter_number}
                    </option>
                ))}

            </select>

            {/* Bài số */}
            <h4>Bài số</h4>
            <input 
                type="text" 
                value={lessonNumber}
                onChange={(e) => setLessonNumber(e.target.value)}
            />

            <div className="modal-actions-les">
                <button className='save-btn' onClick={handleSubmit} >Cập nhật</button>
                <button className='close-btn' onClick={onClose}>Đóng</button>
            </div>

        </div>
    </div>
  )
}

export default EditLessonModal;