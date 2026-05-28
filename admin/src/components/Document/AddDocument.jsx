import React, { useState } from "react";
import { createDocument } from "../../api/documentApi";
import "./css/AddDocument.css";

const AddDocument = ({ onClose, onSuccess, subjects, chapters, lessons, setLessons, fetchLessons }) => {
    const [title, setTitle] = useState("");
    const [wordFile, setWordFile] = useState(null);

    const [subjectId, setSubjectId] = useState("");
    const [chapterId, setChapterId] = useState("");
    const [lessonId, setLessonId] = useState("");

    const [fileInputKey, setFileInputKey] = useState(Date.now());

    const handleUpload = async () => {
        if (!lessonId || !title || !wordFile) {
            return alert("Vui lòng điền đầy đủ thông tin và chọn file Word!");
        }

        const formData = new FormData();
        formData.append("lesson_id", Number(lessonId));
        formData.append("title", title);
        formData.append("file", wordFile);

        try {
            await createDocument(formData);
            alert("Thêm tài liệu thành công");
            
            // Reset form hoàn toàn
            setTitle("");
            setWordFile(null);
            setSubjectId("");
            setChapterId("");
            setLessonId("");
            setFileInputKey(Date.now());
            onSuccess();
        } catch (error) {
            console.log("Chi tiết lỗi cụ thể từ Backend:", error);
            alert("Thêm tài liệu thất bại");
        }
    };

    const handleChangeSubject = (value) => {
        setSubjectId(value);
        setChapterId("");
        setLessonId("");
        setLessons([]);
    };

    const handleChangeChapter = (value) => {
        setChapterId(value);
        setLessonId("");
        if (value) fetchLessons(value);
        else setLessons([]);
    };

    const filteredChapters = chapters.filter(c => c.subject_id === Number(subjectId));
    const filteredLessons = lessons.filter(l => l.chapter_id === Number(chapterId));

    return (
        <div className="document-add-modal">
            <div className="document-add-content">
                <h2>Thêm tài liệu học tập</h2>

                <input 
                    type="text"
                    placeholder="Tiêu đề tài liệu..."
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />

                <select value={subjectId} onChange={(e) => handleChangeSubject(e.target.value)}>
                    <option value="">Chọn môn học</option>
                    {subjects.map(s => (
                        <option key={s.subject_id} value={s.subject_id}>{s.subject_name}</option>
                    ))}
                </select>

                <select value={chapterId} onChange={(e) => handleChangeChapter(e.target.value)} disabled={!subjectId}>
                    <option value="">Chọn chương</option>
                    {filteredChapters.map(c => (
                        <option key={c.chapter_id} value={c.chapter_id}>Chương {c.chapter_number}: {c.chapter_name}</option>
                    ))}
                </select>

                <select value={lessonId} onChange={(e) => setLessonId(e.target.value)} disabled={!chapterId}>
                    <option value="">Chọn bài học</option>
                    {filteredLessons.map(l => (
                        <option key={l.lesson_id} value={l.lesson_id}>Bài {l.lesson_number}: {l.lesson_name}</option>
                    ))}
                </select>

                {/* KHU VỰC CHỌN FILE ĐÃ ĐƯỢC ĐƯA VÀO CLASS CSS SẠCH SẼ */}
                <div className="upload-file-group">
                    <label>Chọn tài liệu từ file Word (.docx):</label>
                    <input 
                        key={fileInputKey}
                        type="file" 
                        accept=".doc,.docx" 
                        onChange={(e) => setWordFile(e.target.files[0])} 
                    />
                </div>

                <div className="btn-group">
                    <button onClick={handleUpload}>Lưu tài liệu</button>
                    <button onClick={onClose}>Hủy</button>
                </div>
            </div>
        </div>
    );
};

export default AddDocument;