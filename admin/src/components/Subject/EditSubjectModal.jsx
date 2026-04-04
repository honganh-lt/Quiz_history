import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { updateSubject } from '../../api/subjectService';
import "./css/EditSubjectModal.css"

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
      await axios.put(`http://localhost:3000/api/chapters/${sub.subject_id}`, {
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
      <div className="moddal-sub">
        <h3>Sửa môn học</h3>

        {/* Tên môn học */}
        <input 
          type="text"
           value={subjectName}
           onChange={(e) => setSubjectName(e.target.value)}
        />
        {/* Mô tả */}
        <textarea 
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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