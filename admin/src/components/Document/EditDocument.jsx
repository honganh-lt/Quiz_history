import React, { useState, useEffect } from "react";
import { updateDocument } from "../../api/documentApi";
import "./css/EditDocument.css";

const EditDocument = ({ editData, onClose, onSuccess, subjects, chapters, lessons, setLessons, fetchLessons }) => {
    const [title, setTitle] = useState("");
    const [wordFile, setWordFile] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now());

    const [subjectId, setSubjectId] = useState("");
    const [chapterId, setChapterId] = useState("");
    const [lessonId, setLessonId] = useState("");
    
    // Lưu tên file hiện tại từ server để hiển thị cho người dùng biết
    const [currentFileName, setCurrentFileName] = useState(""); 

    useEffect(() => {
        if (!editData) return;

        setTitle(editData.title || "");
        setSubjectId(editData.subject_id ? String(editData.subject_id) : "");
        setChapterId(editData.chapter_id ? String(editData.chapter_id) : "");
        setLessonId(editData.lesson_id ? String(editData.lesson_id) : "");
        
        // Hiển thị tên file hiện tại (nếu backend của bạn có trả về trường này, ví dụ: file_name hoặc file_url)
        setCurrentFileName(editData.file_name || editData.file_url || "Đã có file cũ trên hệ thống");
        
        setWordFile(null);
        setFileInputKey(Date.now());

        // Kích hoạt việc tải danh sách bài học dựa trên chương cũ của tài liệu
        if (editData.chapter_id) {
            fetchLessons(editData.chapter_id);
        }
    }, [editData]);

    const handleUpdate = async () => {
        if (!lessonId || !title) return alert("Thiếu dữ liệu bắt buộc (Tiêu đề hoặc Bài học)");

        const formData = new FormData();
        formData.append("lesson_id", Number(lessonId));
        formData.append("title", title);
        
        // Chỉ gửi file lên SERVER nếu người dùng có chọn file mới
        if (wordFile) {
            formData.append("file", wordFile);
        }

        try {
            await updateDocument(editData.document_id, formData);
            alert("Cập nhật tài liệu thành công");
            onSuccess();
        } catch (err) {
            console.log("Chi tiết lỗi cập nhật tài liệu:", err);
            if (err.response?.data?.message) {
                alert(`Lỗi hệ thống: ${err.response.data.message}`);
            } else {
                alert("Lỗi cập nhật! Vui lòng kiểm tra lại kết nối mạng hoặc file Word.");
            }
        }
    };

    const handleChangeSubject = (value) => {
        setSubjectId(value);
        setChapterId("");
        setLessonId("");
        if (typeof setLessons === "function") setLessons([]);
    };

    const handleChangeChapter = (value) => {
        setChapterId(value);
        setLessonId("");
        if (value) {
            fetchLessons(value);
        } else {
            if (typeof setLessons === "function") setLessons([]);
        }
    };

    // Ép kiểu về String hoặc Number đồng bộ để tránh lỗi so sánh (mismatch type) làm trắng bộ chọn
    const filteredChapters = chapters.filter(c => String(c.subject_id) === String(subjectId));
    const filteredLessons = lessons.filter(l => String(l.chapter_id) === String(chapterId));

    return (
        <div className="document-edit-modal">
            <div className="document-edit-content">
                <h2>Chỉnh sửa tài liệu</h2>

                <div className="form-group">
                    <label>Tiêu đề tài liệu:</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Môn học:</label>
                    <select value={subjectId} onChange={(e) => handleChangeSubject(e.target.value)}>
                        <option value="">Chọn môn</option>
                        {subjects.map(s => (
                            <option key={s.subject_id} value={s.subject_id}>{s.subject_name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Chương:</label>
                    <select value={chapterId} onChange={(e) => handleChangeChapter(e.target.value)} disabled={!subjectId}>
                        <option value="">Chọn chương</option>
                        {filteredChapters.map(c => (
                            <option key={c.chapter_id} value={c.chapter_id}>Chương {c.chapter_number}: {c.chapter_name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Bài học:</label>
                    <select value={lessonId} onChange={(e) => setLessonId(e.target.value)} disabled={!chapterId}>
                        <option value="">Chọn bài học</option>
                        {filteredLessons.map(l => (
                            <option key={l.lesson_id} value={l.lesson_id}>Bài {l.lesson_number}: {l.lesson_name}</option>
                        ))}
                    </select>
                </div>

                <div className="upload-word-section">
                    <label className="upload-label">
                        File hiện tại: <span style={{ color: "#007bff", fontWeight: "bold" }}>{currentFileName}</span>
                    </label>
                    
                    <label className="upload-label" style={{ marginTop: "10px" }}>
                        Tải lên file Word mới (.docx):
                    </label>
                    <input 
                        key={fileInputKey}
                        type="file" 
                        accept=".doc,.docx" 
                        onChange={(e) => setWordFile(e.target.files[0])} 
                    />
                    <small className="upload-note">
                        *Nếu giữ nguyên nội dung file cũ, bạn không cần chọn gì ở ô này.
                    </small>
                </div>

                <div className="btn-group">
                    <button onClick={handleUpdate}>Cập nhật</button>
                    <button onClick={onClose} className="btn-cancel">Hủy</button>
                </div>
            </div>
        </div>
    );
};

export default EditDocument;