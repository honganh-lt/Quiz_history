import React, { useRef, useState } from 'react'
import './LoginAdmin.css'
import { useNavigate } from 'react-router-dom'
import { getAdmin, login } from '../api/authApiAdmin';

function LoginAdmin() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const handleLogin = async () => {

    if (!username || !password) {
      alert("Vui lòng nhập thông tin");
      return;
    }

    try {
      const result = await login(username.trim(), password.trim());

      console.log("Kết quả login:", result);

      //Kiểm tra user
      if (!result.user) {
        alert("Sai tài khoản hoặc mật khẩu");
        return;
      }

      // kiểm tra admin
      if (result.user.role !== "admin") {
        alert("Bạn không phải admin");
        return;
      }

      //  Lưu token
      localStorage.setItem("access_token", result.access_token);
      localStorage.setItem("refresh_token", result.refresh_token);

      // Lưu user
      localStorage.setItem("user", JSON.stringify(result.user));

       // TEST Ở ĐÂY
    const testAdmin = await getAdmin();
    console.log("TEST ADMIN:", testAdmin.data);

      //  chuyển trang
      navigate("/admin");

    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message || "Đăng nhập thất bại");
      } else {
        alert("Không kết nối được với server");
      }
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              passwordRef.current.focus();
            }
          }}
        />

        <input
          type="password"
          placeholder='Mật khẩu'
          ref={passwordRef}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />

        <button className='btn-practice' onClick={handleLogin}>
          Đăng nhập
        </button>
      </div>
    </div>
  )
}

export default LoginAdmin;