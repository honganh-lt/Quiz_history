import React from 'react'
import "./ManageTopics.css"

export const ManageTopics = () => {

    const topics = [
  { topic_id: 1, grade_id: 10, topic_number: 1, name: " Lịch sử và sử học" },
  { topic_id: 2, grade_id: 10, topic_number: 2, name: " Vai trò của sử học" },
  { topic_id: 3, grade_id: 10, topic_number: 3, name: "Một số nền văn minh thế giới thời kì cổ-trung đại" },
  { topic_id: 4, grade_id: 10, topic_number: 4, name: "Cách mạng công nghiệp trong lịch sử thế giới" }
];
  return (
    <div className='admin-container'>
        {/* Sidebar */}
      <div className='top-bar'>
            <h2 className='title'>Quản lý chương</h2>
            <button className='add-btn'>+ Thêm chương</button>
        </div>

      {/* Main content */}
      <div className="main-content">
        {/* <div className="header">
            <button className='add-btn'>+ Thêm chương</button>
        </div> */}

        <table className="topic-table">
            <thead>
                <tr>
                    <th>Mã chương</th>
                    {/* chapter_id */}
                    {/* <th>Grade_id</th> */}
                    {/* chapter_number */}
                    <th>Tên</th>
                    <th>Chương số</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
  {topics.map((item) => {
    return (
      <tr key={item.topic_id}>
        <td>{item.topic_id}</td>
        {/* <td>{item.grade_id}</td> */}
        <td>{item.name}</td>
        <td>{item.topic_number}</td>
        <td>
          <button className='edit-btn'>Edit</button>
          <button className='delete-btn'>Delete</button>
        </td>
      </tr>
    );
  })}
</tbody>
        </table>
      </div>

    </div>
  )
}

export default ManageTopics