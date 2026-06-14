import React, { useEffect, useState } from 'react'
import { getAllUserExams } from '../../api/userExanApi';
import { useNavigate } from 'react-router-dom';
import "./ManagementUserExam.css"

export const ManagementUserExam = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const [search, setSearch] = useState("");

    //==========Phân trang=========
    const [currentPage, setCurrentPage] = useState(1);
    const userExamPerPage = 8;


    //khác với code khác Giống phía GD user
   //  VIẾT Ở ĐÂY
    useEffect(() => {
        getAllUserExams()
        .then(res => {
            if (!res || !res.data) {
                setData([]);
                return;
            }
            setData(res.data);//  rows nằm ở đây
            setCurrentPage(1); //  
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

    //SEARCH
    // const normalize = (str) => 
    //     str 
    //         ?.normalize("NFD")  //Chữ và dấu bị tách riêng ra.
    //         .replace(/[\u0300-\u036f]/g, "") //Xóa toàn bộ dấu vừa được tách.
    //         .toLowerCase(); //chuyển thành chữ thường

    const normalize = (str) =>
    String(str || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    
    const filteredUserExam = data.filter((ue) => 
        normalize(ue.subject_name).includes(normalize(search)) ||
        normalize(ue.exam_title).includes(normalize(search)) ||
        normalize(ue.username).includes(normalize(search)) 
    ); 

    //======Phân trang==========
    const indexOfLastUserExam = currentPage * userExamPerPage;
    const indexOfFirstUserExam = indexOfLastUserExam - userExamPerPage;
    //slice từ danh sach userExam
    // const currentUserExam = data.slice(indexOfFirstUserExam, indexOfLastUserExam);
    const currentUserExam = filteredUserExam.slice(indexOfFirstUserExam, indexOfLastUserExam);

    //tính tổng số trang
    //vì không có userExam
    // const totalPages = Math.ceil(data.length / userExamPerPage);
        const totalPages = Math.ceil(filteredUserExam.length / userExamPerPage);



  return (
    <div className="userExam-management">
        {/* Top bar */}
        <div className="top-bar">
            <h2>Quản lý bài thi User</h2>
            <input 
                type="text"
                className='search-ques'
                placeholder='Tìm kiếm môn, đề thi, username'
                value={search}
                onChange={(e) => {setSearch(e.target.value);
                setCurrentPage(1); //tìm ở trang 1
                }} 
            /> 
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
                                        className='action'
                                        onClick={() => navigate(`/admin/user-exam/${item.user_exam_id}`)}
                                    >
                                       <i className="fa-solid fa-circle-check"></i>
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