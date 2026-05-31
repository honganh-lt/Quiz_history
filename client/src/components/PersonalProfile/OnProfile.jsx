import React, { useEffect, useState } from 'react'
import "./css/OnProfile.css"
import ChangePassword from './ChangePassword';

export const OnProfile = () => {
  const [user, setUser] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    // Bọc try-catch để phòng trường hợp dữ liệu JSON trong localStorage bị lỗi chuỗi
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Lỗi parse dữ liệu user từ localStorage:", err);
    }
  }, []);

  if (!user) {
    return <p>Bạn chưa đăng nhập</p>;
  }

  return (
    <div className="main-onProfile">
        <div className="container-onProfile">
            <h2>Thông tin người dùng</h2>
            <div className='list-personal'>
                <p><strong>Tên người dùng:</strong> {user.username}</p>
                <p><strong>Họ và tên:</strong> {user.full_name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Vai trò:</strong> {user.role}</p>
            </div>
            
            <div className='change-password'>
              <button onClick={() => setShowChangePassword(!showChangePassword)}>
                {showChangePassword ? "Hủy đổi mật khẩu" : "Đổi mật khẩu"}
              </button>
              
              {showChangePassword && (
                  <ChangePassword onClose={() => setShowChangePassword(false)} />
              )}
            </div>
        </div>
    </div>
  )
}

export default OnProfile;