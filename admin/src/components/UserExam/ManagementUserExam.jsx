import React, { useEffect, useState } from 'react'
import { getAllUserExams } from '../../api/userExanApi';
import { useNavigate } from 'react-router-dom';

export const ManagementUserExam = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    //==========Phân trang=========
    const [currentPage, setCurrentPage] = useState(1);
    const userExamPerPage = 5;


    //khác với code khác Giống phía GD user
   // ✅ VIẾT Ở ĐÂY
    useEffect(() => {
        getAllUserExams()
        .then(res => {
            if (!res || !res.data) {
                setData([]);
                return;
            }
            setData(res.data);//  rows nằm ở đây
            setCurrentPage(1); // ✅ thêm dòng này
        })
        .catch(err => {
            console.error(err);
            setData([]);
        });
    }, []);

    //Format Ngày - Giờ
    const formatDateTime = (dateString) => {
        if(!dateString) return "-";

        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;

        return `${day}/${month}/${year}, ${String(hours).padStart(2, "0")}:${minutes}:${seconds}:${ampm}`;
    }

    //======Phân trang==========
    const indexOfLastUserExam = currentPage * userExamPerPage;
    const indexOfFirstUserExam = indexOfLastUserExam - userExamPerPage;
    //slice từ danh sach userExam
    const currentUserExam = data.slice(indexOfFirstUserExam, indexOfLastUserExam);

    //tính tổng số trang
    //vì không có userExam
    const totalPages = Math.ceil(data.length / userExamPerPage);


  return (
    <div className="admin-container">
        {/* Top bar */}
        <div className="top-bar">
            <h2>Quản lý bài thi User</h2>
        </div>

        {/* Table */}
        <div className="main-content">
            <table className="exam-table">
                <thead>
                    <tr>
                        <th>Môn học</th>
                        <th>Đề thi</th>
                        <th>Thời gian bắt đầu</th>
                        <th>Thời gian kết thúc</th>
                        <th>Điểm</th>
                        <th>Username</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {currentUserExam.length > 0 ? (
                        currentUserExam.map(item => (
                            <tr key={item.user_exam_id}>
                                <td>{item.subject_name}</td>
                                <td>{item.exam_title}</td>
                                <td>{formatDateTime(item.start_time)}</td>
                                <td>{formatDateTime(item.end_time)}</td>
                                <td>{item.score}</td>
                                <td>{item.username}</td>
                                <td>
                                    <button
                                        onClick={() => navigate(`/admin/user-exam/${item.user_exam_id}`)}
                                    >
                                        Xem
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">Không có dữ liệu</td>
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
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        <i className="fa-solid fa-angle-right"></i>
                    </button>
                </div>
        </div>
    </div>
  )
}
export default ManagementUserExam;