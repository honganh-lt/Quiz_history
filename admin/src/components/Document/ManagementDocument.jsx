import { useEffect, useState } from "react";

import {
    getAllDocuments,
    deleteDocument
} from "../../api/documentApi";

import {
    getSubjects
} from "../../api/subjectApi";

import {
    getChapters
} from "../../api/chapterApi";

import {
    getLesson
} from "../../api/lessonApi";

import AddDocument from "./AddDocument";
import EditDocument from "./EditDocument";

import "./css/ManagementDocument.css";

const ManagementDocument = () => {

    const [documents, setDocuments] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [lessons, setLessons] = useState([]);

    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);

    // ===== PAGINATION =====
    const [currentPage, setCurrentPage] = useState(1);
    const documentsPerPage = 8;

    useEffect(() => {
        fetchDocuments();
        fetchSubjects();
        fetchChapters();
    }, []);

    // reset page khi data thay đổi
    useEffect(() => {
        setCurrentPage(1);
    }, [documents]);

    const fetchDocuments = async () => {
        const data = await getAllDocuments();
        setDocuments(data);
    };

    const fetchSubjects = async () => {
        const data = await getSubjects();
        setSubjects(data);
    };

    const fetchChapters = async () => {
        const data = await getChapters();
        setChapters(data);
    };

    const fetchLessons = async (chapterId) => {
        const data = await getLesson(chapterId);
        setLessons(data);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xoá?")) return;

        await deleteDocument(id);
        alert("Xoá thành công");
        fetchDocuments();
    };

    // ===== PAGINATION LOGIC (FIX 100%) =====
    const indexOfLastDoc = currentPage * documentsPerPage;
    const indexOfFirstDoc = indexOfLastDoc - documentsPerPage;

    const currentDocument = documents.slice(indexOfFirstDoc, indexOfLastDoc);
    const totalPages = Math.ceil(documents.length / documentsPerPage);

    return (
        <div className="document">

            <div className="document-admin-container">

                {/* TOP */}
                <div className="document-top-bar">
                    <h2>Quản lý tài liệu</h2>

                    <button
                        className="add-btn"
                        onClick={() => {
                            setIsOpen(true);
                            setLessons([]);
                        }}
                    >
                        +
                    </button>
                </div>

                {/* TABLE */}
                <div className="document-main-content">
                    <table className="document-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên tài liệu</th>
                                <th>Phân loại</th>
                                <th>Nội dung</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentDocument.length > 0 ? (
                                currentDocument.map(item => (
                                    <tr key={item.document_id}>

                                        <td>{item.document_id}</td>

                                        <td>
                                            <div className="text-ellipsis">
                                                {item.title}
                                            </div>
                                        </td>

                                        <td>
                                            <div className="text-ellipsis">
                                                {item.subject_name} &gt; Chương {item.chapter_number}: {item.chapter_name} &gt; Bài {item.lesson_number}: {item.lesson_name}
                                            </div>
                                        </td>

                                        <td>
                                            <div className="text-ellipsis">
                                                {/* Lọc bỏ toàn bộ thẻ html để hiển thị text sạch dạng preview ngắn trên table */}
                                                {item.content ? item.content.replace(/<[^>]*>/g, '') : "Chưa có nội dung"}
                                            </div>
                                        </td>

                                        <td>
                                            <button
                                                className="edit-btn"
                                                onClick={() => {
                                                    setSelectedDoc(item);
                                                    setIsEditOpen(true);
                                                }}
                                            >
                                                {/* Edit */}
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDelete(item.document_id)}
                                            >
                                                {/* Delete */}
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">Chưa có tài liệu</td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>

            </div>

            {/* PAGINATION */}
            <div className="pagination">

                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    <i className="fa-solid fa-angle-left"></i>
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
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    <i className="fa-solid fa-angle-right"></i>
                </button>

            </div>

            {/* ADD MODAL */}
            {isOpen && (
                <AddDocument
                    onClose={() => setIsOpen(false)}
                    onSuccess={() => {
                        fetchDocuments();
                        setIsOpen(false);
                    }}
                    subjects={subjects}
                    chapters={chapters}
                    lessons={lessons}
                    setLessons={setLessons}
                    fetchLessons={fetchLessons}
                />
            )}

            {/* EDIT MODAL */}
            {isEditOpen && (
                <EditDocument
                    editData={selectedDoc}
                    onClose={() => {
                        setIsEditOpen(false);
                        setSelectedDoc(null);
                        setLessons([]);
                    }}
                    onSuccess={() => {
                        fetchDocuments();
                        setIsEditOpen(false);
                        setSelectedDoc(null);
                        setLessons([]);
                    }}
                    subjects={subjects}
                    chapters={chapters}
                    lessons={lessons}
                    setLessons={setLessons}
                    fetchLessons={fetchLessons}
                />
            )}

        </div>
    );
};

export default ManagementDocument;