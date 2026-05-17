import React from 'react'
import { useState } from 'react'
import { changePassword } from '../../api/userApi';

export const ChangePassword = () => {

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

        } catch (error) {

            // alert(error.response.data.message);
            console.log(error)
        }
    }
    
  return (
    <div>
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

            <button onClick={handleSubmit} >
                Đổi mật khẩu
            </button>

    </div>
  )
}

export default ChangePassword