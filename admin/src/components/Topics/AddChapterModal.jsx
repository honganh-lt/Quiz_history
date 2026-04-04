import React, { useState } from 'react'
import "./css/AddChapterModal.css"
import { createChapter } from '../../api/chapterApi';

export const AddChapterModal = ({isOpen, onClose, onSuccess, subjects}) => {
    
    //1. Lưu dữ liệu nhập vào
    const [subjectId, setSubjectId] = useState("");
    const [chapterName, setChapterName] = useState("");
    const [chapterNumber, setChapterNumber] = useState("");

    //2. Nếu không mở modal -> Không hiển thi 
    if(!isOpen) return null;

    //3. Xử lý khi bấm thêm
    const handleAdd = async () => {
        if (!subjectId || !chapterName || !chapterNumber) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        try {
            await createChapter({
                subject_id: Number(subjectId), //ép kiểu
                chapter_name: chapterName,
                chapter_number: Number(chapterNumber)
            });

            onSuccess(); //reload bảng
            onClose(); //đóng modal

            
            //reset
            setSubjectId("");
            setChapterName("");
            setChapterNumber("");
        } catch (error) {
            console.error(error);
            alert("Lỗi khi thêm!");
        }
    };

    // const data = {
    //         subject_id: subjectId,
    //         chapter_name: chapterName,
    //         chapter_number: chapterNumber
    //     };

    //     console.log("Dữ liệu gửi:", data);

    //     onSuccess(); //reload
    //     onClose(); //đóng modal

    //     //reset
    //     setSubjectId("");
    //     setChapterName("");
    //     setChapterNumber("");
  return (
    <div className="modal-overlay-chap">
        <div className="modal-chap">
            <h3>Thêm chương</h3>

            {/* Môn học: lớp 10,11,12 */}
            <h4>Chọn môn học</h4>
            <select 
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
            >
                {/* <div className="option-subject"> */}
                    <option value="">Chọn môn học</option>
                {/* </div> */}

                {/* map Danh sách môn */}
                {subjects && subjects.length > 0 ? (
                    subjects.map((sub) => (
                        <option key={sub.subject_id} value={sub.subject_id}>
                            {sub.subject_name}
                        </option>
                    ))
                ) : (
                    <option disabled>Không có môn học nào</option>
                )}
            </select>

            {/* Tên chương */}
            <h4>Tên chương</h4>
            <input 
                type='text'
                // placeholder='Tên chương'
                value={chapterName}
                onChange={(e) => setChapterName(e.target.value)}
            />

            {/* Chương số */}
            <h4>Số chương</h4>
            <input 
                type='number'
                // placeholder='Số chương'
                value={chapterNumber}
                onChange={(e) => setChapterNumber(e.target.value)}
            />
            <div className="modal-actions-chap">
                <button onClick={handleAdd} className='save-btn'>Thêm</button>
                <button onClick={onClose} className='cancel-btn'>Hủy</button>
            </div>
        </div>
    </div>
  )
}

export default AddChapterModal;