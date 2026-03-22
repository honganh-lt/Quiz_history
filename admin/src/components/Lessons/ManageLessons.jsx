import React from 'react'
import "./ManageLessons.css"

export const ManageLessons = () => {

    const lessons = [
  { lesson_id: 1, topic_id: 1, lesson_number: 1, name: "Hiện thực lịch sử và nhận thức lịch sử" },
  { lesson_id: 2, topic_id: 1, lesson_number: 2, name: "Tri thức lịch sử và cuộc sống" },
  { lesson_id: 3, topic_id: 2, lesson_number: 3, name: "Sử học với các lĩnh vực khoa học khác" },
    ]

  return (
    <div className='admin-container'>
        {/* Top bar */}
        <div className="top-bar">
            <h2>Quản lý bài học</h2>
            <button className='add-btn'>+ Thêm bài</button>
        </div>

        {/* Table */}
        <div className="main-content">
            <table className="lesson-table">
                <thead>
                    <tr>
                        <th>Mã bài</th>
                        {/* <th>Chapter_id</th> */}
                        <th>Bài số</th>
                        <th>Tên bài</th>
                        <th>Chương</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {lessons.map((item) => (
                        <tr key={item.lesson_id}>
                            <td>{item.lesson_id}</td>
                            
                            <td>Bài {item.lesson_number}</td>
                            <td>{item.name}</td>
                            <td>{item.topic_id}</td>
                            <td>
                                <button className='edit-btn'>Edit</button>
                                <button className='delete-btn'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ManageLessons;
