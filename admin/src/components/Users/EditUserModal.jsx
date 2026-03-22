import React, { useState } from 'react'
import './EditUserModal.css'
import axios from 'axios';

export const EditUserModal = ({user, closeModal, updateUser}) => {

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.role);

    //Luông: click Edit -. modal mở -> sửa dữ liệu-> click sửa-> PUT API-> MYsql-> updateUser-> setUser-> render lại table - không cần f5
    const handleSubmit = async () => {
        // console.log("Sửa"); //kiểm tra
        try {
            await axios.put(`http://localhost:3000/api/users/${user.id}`, {
                username,
                email,
                role
            });

            updateUser({
                id: user.id,
                username,
                email,
                role
            });

            closeModal(); //đóng modal
        } catch(err){
            console.log(err);
        }
    } 

  return (
    <div className='modal'>
        <div className="modal-content">
            <h3>Edit</h3>
            <input 
                type='text'
                // placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>

            <div className="modal-actions">
            <button className='btn-save' onClick={handleSubmit}>Cập nhật</button>
            <button className='btn-close' onClick={closeModal}>Đóng</button>
        </div>
        </div>
    </div>
  )
}

export default EditUserModal;

