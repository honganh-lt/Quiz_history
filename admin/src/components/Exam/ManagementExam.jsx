import React, { useEffect, useState } from "react";
import "./css/ManagementExam.css";
import { getExams } from "../../api/examApi";
import { getSubjects } from "../../api/subjectApi";
import AddExamModal from "./AddExamModal";
import EditExamModal from "./EditExamModal";

export const ManagementExam = () => {

  const [exam, setExam] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);

  // const [showEditModal, setShowEditModal] = useState(false);
  // const [selectedExam, setSelectedExam] = useState(null);

  // =======Search=========
  const [search,setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const examPerPage = 7;

  useEffect(() => {
    fetchData();
    fetchSubjects();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getExams();
      setExam(data || []);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      setExam([]);
    }
  };

  const fetchSubjects = async () => {
    try {
      const data = await getSubjects();
      setSubjects(data || []);
    } catch (err) {
      console.error(err);
    }
  };
  
  //=======Search========
  const normalize = (str) => 
      str 
        ?.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase(); //chữ in thường
        
    const filteredExam = exam.filter((q) => 
      normalize(q.subject_name).includes(normalize(search)) ||
      normalize(q.title).includes(normalize(search))
    );

  const indexOfLastExam = currentPage * examPerPage;
  const indexOfFirstExam = indexOfLastExam - examPerPage;

  const currentExam =filteredExam.slice(indexOfFirstExam, indexOfLastExam) || [];

  const totalPages = Math.ceil(filteredExam.length / examPerPage);
  return (
    <div className="exam-management">
      <div className="top-bar">
        <h2>Quản lý đề thi</h2>
        <div className="action-buttons">
          <input 
              type="text"
              className='search-ques'
              placeholder='Tìm kiếm môn học, đề thi'
              value={search}
              onChange={(e) => {setSearch(e.target.value);
                setCurrentPage(1); //tìm ở trang 1
              }} 
            />
             <button className="add-btn" onClick={() => setIsOpen(true)}>
            +
            </button>
        </div>
      </div>

      <div className="main-content">
        <table className="exam-table">
          <thead>
            <tr>
              <th>Môn học</th>
              <th>Tên đề thi</th>
              {/* <th>Mô tả</th> */}
              <th>Thời gian</th>
              <th>Số câu hỏi</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>

          <tbody>
            {currentExam.length > 0 ? (
              currentExam.map((ex) => (
                <tr key={ex.exam_id}>
                  <td>{ex.subject_name}</td>
                  <td>{ex.title}</td>
                  {/* <td>{ex.description}</td> */}
                  <td>{ex.duration} phút</td>
                  <td>{ex.question_count}</td>

                  {/* <td>
                    <button
                      className='edit-btn'
                      onClick={() => {
                        setSelectedExam(ex);
                        setShowEditModal(true);
                      }}
                    >
                   <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Chưa có đề thi
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* pagination */}
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>

          {(() => {
            const pages = [];

            if (totalPages <= 7) {
              for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
              }
            } else {
              pages.push(1);

              if (currentPage > 3) {
                pages.push("...");
              }

              const start = Math.max(2, currentPage - 1);
              const end = Math.min(totalPages - 1, currentPage + 1);

              for (let i = start; i <= end; i++) {
                pages.push(i);
              }

              if (currentPage < totalPages - 2) {
                pages.push("...");
              }

              pages.push(totalPages);
            }

            return pages.map((page, index) =>
              page === "..." ? (
                <span key={index} className="pagination-dots">
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  className={currentPage === page ? "active" : ""}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              )
            );
          })()}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => p + 1)}
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

        {/* EDIT */}
        {/* {showEditModal && selectedExam && (
          <EditExamModal
              exam={selectedExam}
              onClose={() => {
                setShowEditModal(false);
                setSelectedExam(null);
              }}
              onSuccess={fetchData}
            />
          )} */}
      </div>
    </div>
  );
};

export default ManagementExam;