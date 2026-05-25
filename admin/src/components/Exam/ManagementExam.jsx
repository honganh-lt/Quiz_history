import React, { useEffect, useState } from "react";
import "./css/ManagementExam.css";
import { getExams } from "../../api/examApi";
import { getSubjects } from "../../api/subjectApi";
import AddExamModal from "./AddExamModal";
// import EditExamModal from "./EditExamModal";

export const ManagementExam = () => {
  const [exam, setExam] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);

  // const [showEditModal, setShowEditModal] = useState(false);
  // const [selectedExam, setSelectedExam] = useState(null);

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

  // FIX UPDATE UI
  // const handleUpdateExam = (updated) => {
  //   setExam((prev) =>
  //     prev.map((ex) =>
  //       ex.exam_id === updated.exam.exam_id
  //         ? { ...ex, ...updated.exam }
  //         : ex
  //     )
  //   );
  // };

  const indexOfLastExam = currentPage * examPerPage;
  const indexOfFirstExam = indexOfLastExam - examPerPage;

  const currentExam =
    exam?.slice(indexOfFirstExam, indexOfLastExam) || [];

  const totalPages = Math.ceil((exam?.length || 0) / examPerPage);

  return (
    <div className="admin-container">
      <div className="top-bar">
        <h2>Quản lý đề thi</h2>
        <button className="add-btn" onClick={() => setIsOpen(true)}>
          +
        </button>
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
                      onClick={() => {
                        if (ex.has_attempt) {
                          alert("Đề thi đã có người làm, không thể chỉnh sửa");
                          return;
                        }

                        setSelectedExam(ex);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </button> */}
                  {/* </td> */}
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
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
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
            onClose={() => setShowEditModal(false)}
            subjects={subjects}
            updateExam={handleUpdateExam}
            onSuccess={fetchData}
          />
        )} */}
      </div>
    </div>
  );
};

export default ManagementExam;