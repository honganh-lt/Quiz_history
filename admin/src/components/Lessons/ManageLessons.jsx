import React, { useEffect, useState } from 'react'
import "./ManageLessons.css"
import { deleteLesson, getLesson } from '../../api/lessonApi';
import { AddLessonModal } from './AddLessonModal';
import { getChapters } from '../../api/chapterApi';
import EditLessonModal from './EditLessonModal';

export const ManageLessons = () => {

    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    //Thêm state điều khiển modal
    const [isOpen, setIsOpen] = useState(false);
    const [chapters, setChapters] = useState([]);

    //Edit
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectLesson, setSelectedLesson] = useState(null); //Lí do?

    //==================Phân trang====================
    const [currentPage, setCurrentPage] = useState(1);
    const lessonsPerPage = 5;


    useEffect (() => {
        fetchData();
        fetchChapters(); //ADD
    }, []);

    //=============GET /lessons===========
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

    //========ADD========= GET /chapters : liên quan đến lấy bài theo chương
    const fetchChapters = async () => {
        try {
            const data = await getChapters(); //
            setChapters(data); //
        } catch (error) {
            console.error(error);           
        }
    }
    //ADD ============ Thêm hàm lấy tên chương (tìm)
    const getChapterNumber = (id) => {
        const chapter = chapters.find(chap => chap.chapter_id === id);
        return chapter ? chapter.chapter_number : "Không rõ"
    };

    //EDIT
     const updateLes = (updatedLesson) => {
        setLessons(prevLes => 
            prevLes.map(les => 
                les.lesson_id === updatedLesson.lesson_id ? updatedLesson : les
            )
        )
     }

    //DELETE
    const handleDelete = async (id) => {
        //Check FE có gọi không
        // console.log("Delete id: ", id);

        if(window.confirm("Bạn có chắc muốn xóa không?")) {
            await deleteLesson(id);
            fetchData(); //bắt buộc
        }
    }

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
                onClick={() => setIsOpen(true)}
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
                            {/* ???????????????? */}
                            <td>{getChapterNumber(les.chapter_id)}</td> 
                            <td> Bài {les.lesson_number}</td>
                            <td>
                                <button 
                                    className='edit-btn'
                                    onClick={() => {
                                        setSelectedLesson(les);//Mở modal-> cần đổ dữ liệu vào input
                                        setShowEditModal(true);
                                    }}
                                >
                                    Edit
                                </button>
                                <button 
                                    className='delete-btn'
                                    onClick={() => handleDelete(les.lesson_id)}
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
            < AddLessonModal
                isOpen = {isOpen}
                onClose = {() => setIsOpen(false)}
                onSuccess = {fetchData}
                chapters = {chapters} //cái này phải có dữ liệu
            />

            {/* Modal Edit */}
            {showEditModal && selectLesson && (
                <EditLessonModal
                les={selectLesson}
                onClose={() => setShowEditModal(false)}
                updateLes={updateLes}
                chapters={chapters} //lấy danh sách chương môn học để sửa
            />
            )}

        </div>
    </div>
  )
}

export default ManageLessons;
