import React, { useEffect, useState } from 'react'
import "./css/ManagementExam.css"
import { deleteExam, getExams } from '../../api/examApi';
import { getSubjects } from '../../api/subjectApi';
import AddExamModal from './AddExamModal';
import EditExamModal from './EditExamModal';

export const ManagementExam = () => {

  const [exam, setExam] = useState([]);

  //Thêm state điều khiển modal
  const [isOpen, setIsOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);

  // EDIT
  // const [showEditModal, setShowEditModal] = useState(false);
  // const [selectedExam, setSelectedExam] = useState(null);

  //===============Phân trang==============
  const [currentPage, setCurrentPage] = useState(1);
  const examPerPage = 7;

  useEffect (() => {
    fetchData();
    fetchSubjects(); //vẫn cần cho modal
  }, []);

  // Component render lần đầu -> gọi API -> set state hiển thị dữ liệu
  //================GET chapters======================
  const fetchData = async () => {
    try {
      const data = await getExams();
      console.log("Exam data:", data);
      setExam(data || []);
      setCurrentPage(1); //thêm Nếu đang ở page 3 mà thêm → không thấy dữ liệu mới
    } catch (err) {
      console.error(err);
      setExam([]);
    }
  };

  //==================ADD==============
   //Dùng cho modal "/chapters" để chọn môn học 
  //  GET subjects : lấy dữ liệu môn học để chọn
  // GET SUBJECT (cho dropdown modal)
  const fetchSubjects = async () => {
    try {
      const data = await getSubjects();
      setSubjects(data || []);
    } catch (err) {
      console.error(err);
    }
  };
  //Thêm hàm lấy tên môn ===ADD
  // const getSubjectName = (id) => {
  //   const subject = subjects.find(sub => sub.subject_id === id);
  //   return subject ? subject.subject_name : " "
  // }


  //Edit
  // const updateExam = (updatedExam) => {
  //   setExam(prevEx => 
  //     prevEx.map(ex => 
  //       ex.exam_id === updatedExam.exam_id ? updatedExam : ex
  //     )
  //   )
  // }


  //Delete
  const handleDelete = async (id) => {
      console.log("Delete id: ", id);

      if(!window.confirm("Bạn có chắc chắn muốn xóa không?")) return;
      
      try {
        await deleteExam(id);
        fetchData();
      } catch (err) {
        console.error(err);
      }
  }

  //Phân trang
  const indexOfLastExam = currentPage * examPerPage;
  const indexOfFirstExam = indexOfLastExam - examPerPage;

  //slice từ danh sách exam
  const currentExam = exam?.slice(indexOfFirstExam, indexOfLastExam) || [];
  const totalPages = Math.ceil((exam?.length || 0) / examPerPage);

  return (
     <div className='admin-container'>
      {/* Top bar */}
      <div className="top-bar">
        <h2>Quản lý đề thi</h2>
         <button className='add-btn' onClick={() => setIsOpen(true)}>+</button>
      </div>

      {/* Table */}
      <div className="main-content">
        <table className="exam-table">
          <thead>
            <tr>
              <th>Mã môn học</th>
              <th>Tên đề thi</th>
              <th>Mô tả</th>
              {/* <th>Tên môn học</th> */}
              <th>Thời gian</th>
              <th>Số câu hỏi</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentExam.length > 0 ? (
              currentExam.map((ex) => (
                <tr key={ex.exam_id}>
                  <td>{ex.subject_name}</td>
                  <td>{ex.title}</td>
                  <td>{ex.description}</td>
                  <td>{ex.duration || 0} phút</td>
                  <td>{ex.question_count}</td> {/* ✅ thêm dòng này */}     
                  <td>
                    {/* <button className='edit-btn'
                          onClick={() => {
                            setSelectedExam(ex); //Mở modal-> cần đổ dữ liệu vào input
                            setShowEditModal(true);
                          }}
                      >
                       {/* Edit */}
                      {/* <i class="fa-solid fa-pen-to-square"></i>
                      </button> */} 
                    <button 
                      className='delete-btn'
                      onClick={() => handleDelete(ex.exam_id)}
                    >
                     {/* Delete */}
                    <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{textAlign: "center"}}>Chưa có đề thi</td>
              </tr>
            )}
          </tbody>
        </table>

            {/* Phân trang */}
            <div className="pagination">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
            {/* sử dụng thư viện */}
              <i className="fa-solid fa-angle-left"></i> 
            </button> 
            {Array.from({length: totalPages}, (_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}   
            <button
              // disabled={currentPage === totalPages}
               disabled={totalPages === 0}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>

      {/* ADD */}
          <AddExamModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSuccess={fetchData}
            subjects={subjects}
          />

      {/* MOdal Edit */}
            {/* {showEditModal && selectedExam && (
              <EditExamModal 
              exam = {selectedExam}
              onClose = {() => setShowEditModal(false)}
              updateExam = {updateExam}
              subjects={subjects} //lấy danh sách môn học để sửa
            />
            )} */}

      </div>
    </div>
  )
}

export default ManagementExam;