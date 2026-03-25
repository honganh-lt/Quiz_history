import React, { useEffect, useState } from 'react'
import "./SubjectModal.css"
import {createSubject, updateSubject} from "../../api/subjectService"

export const SubjectModal = ({isOpen, onClose, onSuccess, subject}) => {

    const [form, setForm] = useState({
        subject_name: "",
        description: ""
    });

    // Nếu là edit thì đổ dữ liệu vào form
    useEffect(() => {
        if(subject) {
            setForm({
                subject_name: subject.subject_name,
                description: subject.description
            });
        } else {
            setForm({
                subject_name: "",
                description: ""
            });
        }
    }, [subject]); //thêm dependency

    const handleSubmit = async () => {
        try {
            if (!form.subject_name.trim()) {
                alert("Tên môn học không được để trống");
                return;
            }
            if (subject) {
                // Edit
                await updateSubject(subject.subject_id, form);
            } else {
                // Add
                await createSubject(form);
            }

            onSuccess(); //reload data
            onClose(); //đóng modal
        } catch (error) {
            console.error(error);
            alert("Có lỗi xảy ra!");
        }
    };
    
    if(!isOpen) return null;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    
  return (
    <div className="modal-overlay">
        <div className="modal-sub">
            <h3>{subject ? "Sửa môn học" : " Thêm môn học"}</h3>

            <input 
                type="text" 
                name='subject_name' //bắt buộc
                placeholder='Tên môn học'
                value={form.subject_name}
                onChange={handleChange}
            />

            <textarea 
                name="description" //bắt buộc
                placeholder='Mô tả'
                value={form.description}
                onChange={handleChange}
            />
            <div className="modal-actions-sub">
                <button onClick={handleSubmit} className="save-btn">
                    {subject ? "Cập nhật" : "Thêm"}
                </button>
                <button onClick={onClose} className="cancel-btn">
                    Hủy
                </button>
            </div>
        </div>
    </div>
  )
}

export default SubjectModal;
