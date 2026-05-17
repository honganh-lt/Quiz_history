import React, { useState } from 'react'
import { createdUser } from '../../api/userApi';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./AddUserModal.css"

export const AddUserModal = ({isOpen, onClose, onSuccess}) => {

    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const [showPassword, setShowPassword] = useState("");

    //2 Nếu không mở modal -> không hiển thị
    if(!isOpen) return null;

    //3. Xử lý khi bấm thêm
    const handleAdd = async () => {
        if(!username || !fullName || !email || !password || !role) {
            alert("Vui lòng nhập đầy đủ thông tin!")
            return;
        }

        try {
            await createdUser({
                username: username,
                full_name: fullName,
                email: email,
                password: password,
                role: role
            });

            onSuccess();
            onClose();

            //reset
            setUsername("");
            setFullName("");
            setEmail("");
            setPassword("");
            setRole("");
        } catch(err){

    if(err.response){
        alert(err.response.data.message);
    }
}
    }

  return (
    <div className="modal-overlay-adduser">
        <div className="modal-adduser">
            <h3>Thêm người dùng</h3>

            <h4>Tên tài khoản</h4>
            <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <h4>Họ và tên</h4>
            <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />

            <h4>Email</h4>
            <input 
                type="email" 
                placeholder='abc123@gmail.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <h4>Mật khẩu</h4>
            <div className="password-wrap">
                <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <span
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>

            </div>
            <h4>Role</h4>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">-- Chọn role --</option>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
            </select>

            <div className="modal-actions-adduser">
                <button onClick={handleAdd} className='save-btn'>Thêm</button>
                <button onClick={onClose} className='cancel-btn'>Hủy</button>
            </div>
        </div>
    </div>
  )
}

export default AddUserModal;