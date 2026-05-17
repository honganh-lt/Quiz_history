import React, { useState } from 'react'
import './EditUserModal.css'
import { updateUsers } from '../../api/userApi';
// import axios from 'axios';
// import axiosClient from '../../../../api/axiosClient';

export const EditUserModal = ({user, onClose, updateUser}) => {

    const [username, setUsername] = useState(user.username);
    const [fullName, setFullName] = useState(user.full_name);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.role);

    //Luông: click Edit -. modal mở -> sửa dữ liệu-> click sửa-> PUT API-> MYsql-> updateUser-> setUser-> render lại table - không cần f5
    const handleSubmit = async () => {
        // console.log("Sửa"); //kiểm tra
        try {
            await updateUsers(user.user_id, {
                username,
                full_name: fullName,
                email,
                role
            });

            updateUser({
                user_id: user.user_id,
                username,
                full_name: fullName,
                email,
                role
            });

            onClose(); //đóng modal
        } catch(err){

            console.log(err.response.data);

            alert(err.response.data.message);
        }
    } 

  return (
    <div className="modal-overlay-u">
        <div className='modal-u'>
            <div className="modal-content">
                <h3>Edit</h3>
                <input 
                    type='text'
                    // placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type='text'
                    // placeholder='Username'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <input 
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>

                <div className="modal-actions">
                <button className='save-btn' onClick={handleSubmit}>Cập nhật</button>
                <button className='close-btn-btn' onClick={onClose}>Đóng</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default EditUserModal;

