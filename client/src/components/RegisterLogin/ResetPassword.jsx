import React from 'react'
import { resetPassword } from '../../api/userApi';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const ResetPassword = () => {

    const { token } = useParams();

    const [password, setPassword] =
        useState("");

    const handleSubmit = async () => {

        try {

            await resetPassword({
                token,
                newPassword: password
            });

            alert("Đổi mật khẩu thành công");

        } catch (error) {
            console.error(error);
            

            // alert(error.response.data.message);
        }
    };

  return (
    <div>
        <h2>Quên mật khẩu</h2>

        <input 
            type="text" 
            placeholder='Mật khẩu mới'
            onChange={(e) => setPassword(e.target.value) }
        />

        <button onClick={handleSubmit}>
            Đặt lại mật khẩu
        </button>
    </div>
  )
}

export default ResetPassword;