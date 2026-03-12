import React, { useRef, useState } from 'react'
import './LoginAdmin.css'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/authApiAdmin';
function LoginAdmin() {

  //điều hướng trang
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //tạo ref để bắt buộc điền đủ thông tin
  const passwordRef = useRef(null);

  const handleLogin = async () => {

    if(!username || !password){
        alert("Vui lòng nhập thông tin");
        return;
    }

    try {
      const result = await login(username.trim(), password.trim());
      //chạy
      console.log(result);

      if(!result.user){
        alert("Sai tài khoản hoặc mật khẩu");
        return
      }
      //kiểm tra admin
  if(result.user.role !== "admin"){
      alert("Bạn không phải admin");
      return;
    }

      //Kiểm tra có user trả về không
        //Lưu thông tin user vào localStorage
        localStorage.setItem("user", JSON.stringify(result.user))
        navigate("/admin");
    } catch(error){
      console.error(error);
      
    }
  }

  return (
    <div className='loginAdmin-container'>
        <div className='loginAdmin'>
            <h2>Đăng nhập</h2>

            <input 
            type="text" 
            placeholder='Tên' 
            onChange={(e) => setUsername(e.target.value)}
            //Enter
            onKeyDown={(e) => {
              if(e.key === "Enter"){
                passwordRef.current.focus();
              }
            }}
            />
            <input 
            type="password" 
            placeholder='Mật khẩu'
            ref={passwordRef} // gắn ở trên xg
            onChange={(e) => setPassword(e.target.value)}
            //Enter
            onKeyDown={(e) => {
              if(e.key === "Enter"){
                handleLogin();
              }
            }}
            />

            <button className='btn-practice'
            onClick={handleLogin}
            >
              Đăng nhập</button>
        </div>
    </div>
  )
}

export default LoginAdmin