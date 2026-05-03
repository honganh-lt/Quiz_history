import React, { useEffect, useState } from 'react'
import "./css/OnProfile.css"

export const OnProfile = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if(!user) {
    return <p>Bạn chưa đăng nhập</p>
  }

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
        </div>
    </div>
  )
}

export default OnProfile