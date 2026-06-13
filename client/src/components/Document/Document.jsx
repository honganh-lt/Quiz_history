import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDocumentsBySubject } from "../../api/documentApi";
import "./Document.css";
import Header from "../Home/Header";

const Document = () => {
    const { subjectId } = useParams();
    const navigate = useNavigate();

    const [documents, setDocuments] = useState([]);
    const [subjectName, setSubjectName] = useState("");

    // Thêm dependency subjectId và dùng async/await chuẩn hóa để lấy tài liệu
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                // Reset dữ liệu cũ trước khi tải môn mới để tránh lỗi hiển thị đè (Flash UX)
                setDocuments([]);
                setSubjectName("");

                const data = await getDocumentsBySubject(subjectId);
                setDocuments(data || []);

                // Lấy tên môn học từ phần tử đầu tiên
                if (data && data.length > 0) {
                    setSubjectName(data[0].subject_name);
                }
            } catch (error) {
                console.error("Lỗi khi tải danh sách tài liệu theo môn học:", error);
            }
        };

        if (subjectId) {
            fetchDocuments();
        }
    }, [subjectId]);

    // Bọc logic GROUP CHƯƠNG vào useMemo để tăng tốc độ phản hồi, tránh lặp vô ích khi re-render
    const groupedDocuments = useMemo(() => {
        const map = {};
        
        documents.forEach((item) => {
            const chapterKey = item.chapter_id;

            if (!map[chapterKey]) {
                map[chapterKey] = {
                    chapter_number: item.chapter_number,
                    chapter_name: item.chapter_name,
                    lessons: []
                };
            }

            map[chapterKey].lessons.push(item);
        });

        return map;
    }, [documents]);

    return (
        <div className="document">
            <Header />
            
            <div className="document-page">
                {/* Tên môn học */}
                <h1 className="document-subject-title">
                    {subjectName || "Tài liệu học tập"}
                </h1>

                {/* Danh sách các chương và bài viết */}
                <div className="chapter-grid">
                    {Object.values(groupedDocuments).map((chapter, index) => (
                        <div className="chapter-card" key={index}>
                            <h2>
                                Chương {chapter.chapter_number}: {chapter.chapter_name}
                            </h2>

                            {chapter.lessons.map((lesson) => (
                                <div
                                    key={lesson.document_id}
                                    className="lesson-item"
                                    onClick={() =>
                                        navigate(`/document-detail/${lesson.document_id}`)
                                    }
                                >
                                    <h3>
                                        Bài {lesson.lesson_number}: {lesson.lesson_name}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Hiển thị thông báo nếu môn học này trống tài liệu */}
                {documents.length === 0 && (
                    <p className="no-document" style={{ textAlign: "center", color: "#888", marginTop: "20px" }}>
                        Hiện tại chưa có tài liệu học tập cho môn học này.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Document;