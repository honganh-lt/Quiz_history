import React, { useEffect, useState } from 'react'
import "./css/EditChapterModal.css"
import axios from 'axios';

export const EditChapterModal = ({chap, onClose, updateChap, subjects}) => {

  const [chapterName, setChapterName] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [chapterNumber, setChapterNumber] = useState("");


  //Đổ dữ liệu vào form khi mở modal
  //Nó tự chọn đúng môn vì có useEffet(setSubjectId)
  useEffect(() => {
    if(chap) {
      setChapterName(chap.chapter_name);
      setSubjectId(chap.subject_id);
      setChapterNumber(chap.chapter_number);
    }
  }, [chap]);

  //Luồng Click - modal mở -> sửa dữ liệu -> click sửa - put API ->
  const handleSubmit = async () => {
    // console.log("sửa") //kiểm tra
    try{
        await axios.put(`http://localhost:3000/api/chapters/${chap.chapter_id}`, {
        subject_id: Number(subjectId),
        chapter_name: chapterName,
        chapter_number: Number(chapterNumber)
    });
      //Update lại UI
      updateChap({
        ...chap,
        chapter_name: chapterName,
        subject_id: Number(subjectId),
        chapter_number: Number(chapterNumber)
      });

      onClose(); //đóng modal
    } catch (err) {
      console.log(err);
      alert("Lỗi khi cập nhật!");
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-chap">
        <h3>Sửa chương</h3>

        <h4>Tên chương</h4>
        <input 
          type="text" 
          value={chapterName}
          onChange={(e) => setChapterName(e.target.value)}
          //Enter
           onKeyDown={(e) => {
                    if(e.key === "Enter"){
                        handleSubmit();
                    }
                }}
        />

        {/* Môn học từ chức năng môn học */}
        <h4>Môn học</h4>
        {/* <input 
          type="text" 
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
        /> */}
        <select 
        value={subjectId}
        onChange={(e) => setSubjectId(e.target.value)}
        onKeyDown={(e) => {
                    if(e.key === "Enter"){
                        handleSubmit();
                    }
                }}
        >
          <option value=""></option>
          {subjects && subjects.map((sub) => (
            <option key={sub.subject_id} value={sub.subject_id}>
              {sub.subject_name}
            </option>
          ))}
        </select>

        <h4>Chương số</h4>
        <input 
          type="text" 
          value={chapterNumber}
          onChange={(e) => setChapterNumber(e.target.value)}
          onKeyDown={(e) => {
                    if(e.key === "Enter"){
                        handleSubmit();
                    }
                }}
        />
        <div className="modal-actions-chap">
          <button className='save-btn' onClick={handleSubmit}>Cập nhật</button>
          <button className='close-btn' onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  )
}

export default EditChapterModal;