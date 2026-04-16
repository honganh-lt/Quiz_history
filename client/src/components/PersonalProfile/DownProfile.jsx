import React from 'react'
import "./css/DownProfile.css"

const subjects = [
  { id: 1, name: "Lịch sử lớp 10" },
  { id: 2, name: "Lịch sử lớp 11" },
  { id: 3, name: "Lịch sử lớp 12" }
];

export const DownProfile = () => {
  return (
    <div className="main-downProfile">
      <div className="container-downProfile">
        <h2>Danh sách môn học</h2>
        <div className="list-subject">
          {subjects.map((item) => (
            <div className="subject-item" key={item.id}>
            <span className="arrow">›</span>
            <span className="subject-name">{item.name}</span>
          </div>
          ))}
          
        </div>
      </div>
    </div>
  )
}

export default DownProfile;