import React from 'react'
import "./ManageQuestions.css"

export const ManageQuestions = () => {

//   const questions = [
//   {
//     question_id: 1,
//     topic_name: "1",
//     lesson_id: 1,
//     question_text: "Ai là người lãnh đạo khởi nghĩa Hai Bà Trưng?"
//   },
//   {
//     question_id: 2,
//     topic_name: "2",
//     lesson_id: 4,
//     question_text: "Chính sách đô hộ của nhà Hán là gì?"
//   },
//   {
//     question_id: 3,
//     topic_name: "1",
//     lesson_id: 2,
//     question_text: "Chiến tranh thế giới thứ nhất bắt đầu năm nào?"
//   },
//   {
//     question_id: 4,
//     topic_name: "2",
//     lesson_id: 3,
//     question_text: "Cách mạng tháng Tám diễn ra vào năm nào?"
//   }
// ];

  return (
    <div className='admin-container'>
      {/* Top bar */}
      <div className="top-bar">
        <h2>Quản lý câu hỏi</h2>
         <button className='add-btn'>+ Thêm câu hỏi</button>
      </div>

      {/* Table */}
      <div className="main-content">
        <table className="question-table">
          <thead>
            <tr>
              <th>Mã câu hỏi</th>
              <th>Nội dung</th>
              <th>Mức độ</th>
              <th>Tên chương</th>
              <th>Đáp án A</th>
              <th>Đáp án B</th>
              <th>Đáp án C</th>
              <th>Đáp án D</th>
              <th>Đáp án đúng</th>
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
