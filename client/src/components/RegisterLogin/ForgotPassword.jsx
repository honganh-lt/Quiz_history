import React from 'react'
import { useState } from 'react';
import { forgotPassword } from '../../api/userApi';

export const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    const handleSubmit = async () => {
        try {
            await forgotPassword({email});

            alert("Đã gửi email")
        } catch (err) {
            console.log(err)
            // alert(err.response.data.message);
        }
    }
  return (
    <div>
        <h2>Quên mật khẩu</h2>

        <input 
            type="email" 
            placeholder='Nhập email'
            onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleSubmit}>
            Gửi
        </button>
    </div>
  )
}

export default ForgotPassword;