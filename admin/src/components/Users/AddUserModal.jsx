import React, { useState } from 'react'
import { createdUser } from '../../api/userApi';

export const AddUserModal = ({isOpen, onClose, onSuccess}) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    //2 Nếu không mở modal -> không hiển thị
    if(!isOpen) return null;

    //3. Xử lý khi bấm thêm
    const handleAdd = async () => {
        if(!username || !email || !password || !role) {
            alert("Vui lòng nhập đầy đủ thông tin!")
            return;
        }

        try {
            await createdUser({
                username: username,
                email: email,
                password: password,
                role: role
            });

            onSuccess();
            onClose();

            //reset
            setUsername("");
            setEmail("");
            setPassword("");
            setRole("");
        } catch(err) {
            console.log(err);
            alert("Lỗi khi thêm!");
        }
    }

  return (
    <div className="modal-overlay-chap">
        <div className="modal-chap">
            <h3>Thêm người dùng</h3>

            <h4>Tên tài khoản</h4>
            <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <h4>Email</h4>
            <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <h4>Mật khẩu</h4>
            <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <h4>Role</h4>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">-- Chọn role --</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>

            <div className="modal-actions-chap">
                <button onClick={handleAdd} className='save-btn'>Thêm</button>
                <button onClick={onClose} className='cancel-btn'>Hủy</button>
            </div>
        </div>
    </div>
  )
}

export default AddUserModal;