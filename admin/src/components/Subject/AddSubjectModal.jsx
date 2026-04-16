import React, { useState } from 'react'
import { createSubject } from '../../api/subjectService';
import "./css/AddSubjectModal.css"

export const AddSubjectModal = ({isOpen, onClose, onSuccess}) => {

  //Lưu dữ liêu
  const [subjectName, setSubjectName] = useState("");
  const [description, setDescription] = useState("");

  //2: Nếu không mở modal -> không hiển thị
  if(!isOpen) return null;
  console.log("isOpen:", isOpen);

  //3: xử lý khi bấm thêm
  const handleAdd = async () => {
    if (!subjectName) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      await createSubject({
        subject_name: subjectName,
        description: description
      });

      onSuccess();
      onClose();

      //reset
      setSubjectName("");
      setDescription("");
    } catch (error) {
      console.error(error);
      alert("Lỗi khi thêm!");
      
    }
  }

  return (
    <div className="modal-overlay-sub">
      <div className="modal-sub">
        <h3>Thêm môn học</h3>

        {/* Tên môn */}
        {/* <h4>Tên môn học</h4> */}
        <input 
          type="text" 
          placeholder='Tên môn học'
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
           //Enter
            onKeyDown={(e) => {
              if(e.key === "Enter"){
                handleAdd(); //Gọi luôn hàm thêm
              }
            }} 
        />

        {/* Mô tả */}
        <textarea 
          name='description'
          placeholder='Mô tả'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          //Enter ở input chạy - còn textarea thì không
          onKeyDown={(e) => {
            if(e.key === "Enter" && e.ctrlKey) {
              handleAdd(); //ctrl + Enter mới submit
            }
          }}
        />

        <div className="modal-actions-sub">
          <button className='save-btn' onClick={handleAdd}>Thêm</button>
          <button className='close-btn' onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  )
}
 export default AddSubjectModal;