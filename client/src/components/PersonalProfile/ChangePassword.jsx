import React, { useState } from 'react'
import { changePassword } from '../../api/authApi';
import "./css/changePassword.css"
const ChangePassword = ({ onClose }) => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const token =
        localStorage.getItem("access_token");

    const handleSubmit = async () => {

        try {

            await changePassword(
                {
                    oldPassword,
                    newPassword
                },
                token
            );

            alert("Đổi mật khẩu thành công");

            onClose();

        } catch (error) {

            console.log(error);

            alert(
                error?.response?.data?.message
            );
        }
    }

    return (

        <div className="modal-overlay-change">

            <div className="modal-content-change">

                <h2>Đổi mật khẩu</h2>

                <input
                    type="password"
                    placeholder="Mật khẩu cũ"
                    onChange={(e) =>
                        setOldPassword(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Mật khẩu mới"
                    onChange={(e) =>
                        setNewPassword(e.target.value)
                    }
                />

                <button onClick={handleSubmit}>
                    Xác nhận
                </button>

                <button onClick={onClose}>
                    Đóng
                </button>

            </div>

        </div>
    )
}

export default ChangePassword;