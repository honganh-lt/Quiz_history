// import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { updateSubject } from '../../api/subjectService';
import "./css/EditSubjectModal.css"
import { updateSubject } from '../../api/subjectService';

export const EditSubjectModal = ({sub, onClose, updateSub}) => {

  const [subjectName, setSubjectName] = useState("");
  const [description, setDescription] = useState("");

  //Đổ dữ liệu vào form khi mở modal
  //Nó tự chọn đúng môn vì có useEffet(setSubjectId)
  useEffect(() => {
    if(sub) {
      setSubjectName(sub.subject_name);
      setDescription(sub.description);
    }
  }, [sub]);

    //Luồng Click - modal mở -> sửa dữ liệu -> click sửa - put API ->
  const handleSubmit = async () => {
    try {
      // await axios.put(`http://localhost:3000/api/chapters/${sub.subject_id}`, {
      await updateSubject(sub.subject_id, { //Không dùng axios trực tiếp → dùng:
        subject_name: subjectName,
        description: description
      });

      //Update lại UI
      updateSub({
        ...sub,
        subject_name: subjectName,
        description: description
      });

      onClose();
    }catch (err) {
      console.error(err);
      alert("");
    }
  }

  return (
    <div className="modal-overlay-sub">
      <div className="modal-sub">
        <h3>Sửa môn học</h3>

        {/* Tên môn học */}
        <h4>Tên môn học</h4>
        <input 
          type="text"
          // placeholder='Tên môn học'
           value={subjectName}
           onChange={(e) => setSubjectName(e.target.value)}
           //Enter
           onKeyDown={(e) => {
            if(e.key === "Enter") {
              handleSubmit();
            }
           }}
        />
        {/* Mô tả */}
        <textarea 
          name="description"
          placeholder='Mô tả'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === "Enter" && e.ctrlKey) {
              handleSubmit();
            }
          }}
        />
        <div className="modal-actions-sub">
          <button className='save-btn' onClick={handleSubmit}>Cập nhật</button>
          <button className='close-btn' onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  )
}

export default EditSubjectModal;