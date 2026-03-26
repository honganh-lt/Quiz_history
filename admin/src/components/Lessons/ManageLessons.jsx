import React, { useEffect, useState } from 'react'
import "./ManageLessons.css"
import { getLesson } from '../../api/lessonApi';

export const ManageLessons = () => {

    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    //Thêm state điều khiển modal
    // const [isOpen, setIsOpen] = useState(false);
    // const [chapters, setChapters] = useState([]);

    //Edit

    //==================Phân trang====================
    const [currentPage, setCurrentPage] = useState(1);
    const lessonsPerPage = 5;


    useEffect (() => {
        fetchData();
        // fetchChapters();
    }, []);

    //=============GET===========
    const fetchData = async () => {
        try {
            const data = await getLesson();
            setLessons(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    //========ADD=========


    //EDIT

    //DELETE

    //Phân trang
    const indexOfLastChap = currentPage * lessonsPerPage;
    const indexOfFirstChap = indexOfLastChap - lessonsPerPage;

    //slice từ danh sách chapters
    const currentLessons = lessons.slice(indexOfFirstChap, indexOfLastChap);
    const totalPages = Math.ceil(lessons.length / lessonsPerPage);



  return (
    <div className='admin-container'>
        {/* Top bar */}
        <div className="top-bar">
            <h2>Quản lý bài học</h2>
            <button 
                className='add-btn'
                // onClick={() => setIsOpen(true)}
            >
                +
            </button>
        </div>

        {/* Table */}
        <div className="main-content">
            {loading ? <p>Loading...</p>: (
            <table className="lesson-table">
                <thead>
                    <tr>
                        <th>Mã bài</th>
                        {/* <th>Chapter_id</th> */}
                        <th>Tên bài</th>
                        <th>Chương số</th>
                        <th>Bài số</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {/*lessons.map((item)  */}
                    {currentLessons.map((les) => (
                        <tr key={les.lesson_id}>
                            <td>{les.lesson_id}</td>
                            
                            <td>{les.lesson_name}</td>
                            <td>{les.chapter_id}</td>
                            <td> Bài {les.lesson_number}</td>
                            <td>
                                <button 
                                    className='edit-btn'

                                >
                                    Edit
                                </button>
                                <button 
                                    className='delete-btn'

                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            ) }

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
                        onClick={() => {setCurrentPage(i+1)}}
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

            {/* Render modal ADD */}

            {/* Modal Edit */}

        </div>
    </div>
  )
}

export default ManageLessons;
