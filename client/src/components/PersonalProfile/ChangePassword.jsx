import React, { useState } from 'react';
import { changePassword } from '../../api/authApi';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Nhớ cài đặt: npm install react-icons
import "./css/changePassword.css";

const ChangePassword = ({ onClose }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    
    // Tách biệt 2 state để ẩn/hiện độc lập cho từng ô input
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const handleSubmit = async () => {
        // Validate cơ bản ở Front-end trước khi gửi API
        if (!oldPassword || !newPassword) {
            alert("Vui lòng điền đầy đủ thông tin vào các trường bắt buộc (*)");
            return;
        }

        try {
            // Lấy token ngay lúc nhấn nút gửi để đảm bảo giá trị mới nhất
            const token = localStorage.getItem("access_token");

            await changePassword(
                { oldPassword, newPassword },
                token
            );
            
            alert("Đổi mật khẩu thành công");
            
            // Reset form trước khi đóng modal để bảo mật
            setOldPassword("");
            setNewPassword("");
            onClose();
        } catch (error) {
            console.error(error);
            alert(error?.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    return (
        <div className="modal-overlay-change">
            <div className="modal-content-change">
                <h2>Đổi mật khẩu</h2>

                {/* Phần Mật khẩu cũ */}
                <div className="input-group">
                    <h4>Mật khẩu cũ <span className="required">*</span></h4>
                    <div className="input-wrapper">
                        <input
                            type={showOldPassword ? "text" : "password"}
                            placeholder="Mật khẩu cũ"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <span className="eye-icon" onClick={() => setShowOldPassword(!showOldPassword)}>
                            {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>

                {/* Phần Mật khẩu mới */}
                <div className="input-group">
                    <h4>Mật khẩu mới <span className="required">*</span></h4>
                    <div className="input-wrapper">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Mật khẩu mới"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <span className="eye-icon" onClick={() => setShowNewPassword(!showNewPassword)}>
                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>

                {/* Thêm type="button" cho các button để tường minh */}
                <button type="button" onClick={handleSubmit}>
                    Xác nhận đổi mật khẩu
                </button>

                <button type="button" onClick={onClose}>
                    Đóng
                </button>
            </div>
        </div>
    );
};

export default ChangePassword;