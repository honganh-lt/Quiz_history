import React from 'react'
import "./ManageExam.css"

export const ManageExam = () => {



  return (
     <div className='admin-container'>
      {/* Top bar */}
      <div className="top-bar">
        <h2>Quản lý đề thi</h2>
         <button className='add-btn'>+</button>
      </div>

      {/* Table */}
      <div className="main-content">
        <table className="exam-table">
          <thead>
            <tr>
              <th>Mã môn học</th>
              <th>Tên đề thi</th>
              <th>Mô tả</th>
              <th>Tên chương</th>
              <th>Thời gian</th>
              <th>Số câu hỏi</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {/* {questions.map((q) => (
              <tr key={q.question_id}>
                <td>{q.question_id}</td>
                <td>{q.topic_name}</td>
                <td>{q.lesson_id}</td> */}
                {/* text dài xử lý riêng */}
                {/* <td>
                  {q.question_text}
                </td>
                <td>
                  <button className='edit-btn'>Edit</button>
                  <button className='delete-btn'>Delete</button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  )
}
