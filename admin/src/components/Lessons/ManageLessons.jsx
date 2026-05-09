import React, { useEffect, useState } from 'react'
import "./ManageLessons.css"
import { deleteLesson, getLesson } from '../../api/lessonApi';
import { AddLessonModal } from './AddLessonModal';
import { getChapters } from '../../api/chapterApi';
import EditLessonModal from './EditLessonModal';
import { getSubjects } from '../../api/subjectApi';

export const ManageLessons = () => {

    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isOpen, setIsOpen] = useState(false);
    const [chapters, setChapters] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const [showEditModal, setShowEditModal] = useState(false);
    const [selectLesson, setSelectedLesson] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const lessonsPerPage = 5;

    useEffect(() => {
        fetchData();
        fetchChapters();
        fetchSubjects();
    }, []);

    // ===== GET lessons =====
    const fetchData = async () => {
        try {
            const data = await getLesson();
            setLessons(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // ===== GET chapters =====
    const fetchChapters = async () => {
        try {
            const data = await getChapters();
            setChapters(data);
        } catch (error) {
            console.error(error);
        }
    };

    // ===== GET subjects =====
    const fetchSubjects = async () => {
        try {
            const data = await getSubjects();
            setSubjects(data);
        } catch (error) {
            console.error(error);
        }
    };

    // ===== UPDATE =====
    const updateLes = (updatedLesson) => {
        setLessons(prev =>
            prev.map(les =>
                les.lesson_id === updatedLesson.lesson_id ? updatedLesson : les
            )
        );
    };

    // ===== DELETE =====
    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa không?")) {
            await deleteLesson(id);
            fetchData();
        }
    };

    // ===== PAGINATION =====
    const indexOfLast = currentPage * lessonsPerPage;
    const indexOfFirst = indexOfLast - lessonsPerPage;
    const currentLessons = lessons.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(lessons.length / lessonsPerPage);

    return (
        <div className='admin-container'>

            {/* TOP */}
            <div className="top-bar">
                <h2>Quản lý bài học</h2>
                <button className='add-btn' onClick={() => setIsOpen(true)}>+</button>
            </div>

            {/* TABLE */}
            <div className="main-content">
                {loading ? <p>Loading...</p> : (
                    <table className="lesson-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên bài</th>
                                <th>Môn</th>
                                <th>Chương</th>
                                <th>Bài số</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {currentLessons.map((les) => (
                                <tr key={les.lesson_id}>
                                    <td>{les.lesson_id}</td>
                                    <td>{les.lesson_name}</td>
                                    <td>{les.subject_name}</td>
                                    <td>Chương {les.chapter_number} - {les.chapter_name}</td>
                                    <td>{les.lesson_number}</td>
                                    <td>
                                        <button
                                            className='edit-btn'
                                            onClick={() => {
                                                setSelectedLesson(les);
                                                setShowEditModal(true);
                                            }}
                                        >
                                            {/* Edit */}
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button>

                                        <button
                                            className='delete-btn'
                                            onClick={() => handleDelete(les.lesson_id)}
                                        >
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* PAGINATION */}
                <div className="pagination">
                    <button disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}>
                        {'<'}
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

                    <button disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}>
                        {'>'}
                    </button>
                </div>

                {/* ADD MODAL */}
                <AddLessonModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    onSuccess={fetchData}
                    chapters={chapters}
                    subjects={subjects}
                />

                {/* EDIT MODAL */}
                {showEditModal && selectLesson && (
                    <EditLessonModal
                        les={selectLesson}
                        onClose={() => setShowEditModal(false)}
                        updateLes={updateLes}
                        chapters={chapters}
                        subjects={subjects} //sửa môn học
                    />
                )}
            </div>
        </div>
    )
}
export default ManageLessons;