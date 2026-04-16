import React from 'react'
import "./css/OnProfile.css"

export const OnProfile = () => {
  return (
    <div className="main-onProfile">
        <div className="container-onProfile">
            {/* Ảnh */}
            <img src="" alt="" />
            <h2>Thông tin người dùng</h2>
            <div className='list-personal'>
                <p><strong>Tên người dùng:</strong></p>
                <p><strong>Email:</strong></p>
                <p><strong>Vai trò:</strong></p>
            </div>
        </div>
    </div>
  )
}

export default OnProfile