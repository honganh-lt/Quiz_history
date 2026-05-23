import React, { useEffect, useState } from 'react'
import "./css/OnProfile.css"
import ChangePassword from './ChangePassword';
// import ChangePassword from "./ChangePassword";

export const OnProfile = () => {

  const [user, setUser] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);

  //thông tin đang lấy ở CSDL? hay
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if(!user) {
    return <p>Bạn chưa đăng nhập</p>
  }
  //localStorage.getItem("access_token") : loginfile

  return (
    <div className="main-onProfile">
        <div className="container-onProfile">
            {/* Ảnh */}
            {/* <img src="" alt="" /> */}
            <h2>Thông tin người dùng</h2>
            <div className='list-personal'>
                <p><strong>Tên người dùng: {user.username} </strong></p>
                {/* <p><strong>Email: {user.email} </strong></p> */}
                <p><strong>Vai trò: {user.role} </strong></p>
            </div>
            <div className='change-password' >
              <button onClick={() => setShowChangePassword(!showChangePassword)}>
                Đổi mật khẩu
              </button>
              {
                  showChangePassword &&
                  <ChangePassword
                      onClose={() =>
                          setShowChangePassword(false)
                      }
                  />
              }
            </div>
        </div>
    </div>
  )
}

export default OnProfile