import React, { useState, useEffect } from "react";
import { updateDocument } from "../../api/documentApi";
import "./css/EditDocument.css";

const EditDocument = ({
    editData,
    onClose,
    onSuccess,
    subjects,
    chapters,
    lessons,
    setLessons,
    fetchLessons
}) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [subjectId, setSubjectId] = useState("");
    const [chapterId, setChapterId] = useState("");
    const [lessonId, setLessonId] = useState("");

    // load data
    useEffect(() => {
        if (!editData) return;

        setTitle(editData.title || "");
        setContent(editData.content || "");
        setSubjectId(editData.subject_id || "");
        setChapterId(editData.chapter_id || "");

        if (editData.chapter_id) {
            fetchLessons(editData.chapter_id);
        }
    }, [editData]);

    useEffect(() => {
        if (editData && lessons.length > 0) {
            setLessonId(editData.lesson_id || "");
        }
    }, [lessons, editData]);

    const handleUpdate = async () => {
        if (!lessonId || !title || !content) {
            return alert("Thiếu dữ liệu");
        }

        try {
            await updateDocument(editData.document_id, {
                lesson_id: Number(lessonId),
                title,
                content
            });

            alert("Cập nhật thành công");
            onSuccess();
        } catch (err) {
            console.log(err);
            alert("Lỗi cập nhật");
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

    const filteredChapters = chapters.filter(
        c => c.subject_id === Number(subjectId)
    );

    const filteredLessons = lessons.filter(
        l => l.chapter_id === Number(chapterId)
    );

    return (
        <div className="document-edit-modal">
            <div className="document-edit-content">

                <h2>Chỉnh sửa tài liệu</h2>

                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <select
                    value={subjectId}
                    onChange={(e) => handleChangeSubject(e.target.value)}
                >
                    <option value="">Chọn môn</option>
                    {subjects.map(s => (
                        <option key={s.subject_id} value={s.subject_id}>
                            {s.subject_name}
                        </option>
                    ))}
                </select>

                <select
                    value={chapterId}
                    onChange={(e) => handleChangeChapter(e.target.value)}
                    disabled={!subjectId}
                >
                    <option value="">Chọn chương</option>
                    {filteredChapters.map(c => (
                        <option key={c.chapter_id} value={c.chapter_id}>
                            Chương {c.chapter_number}: {c.chapter_name}
                        </option>
                    ))}
                </select>

                <select
                    value={lessonId}
                    onChange={(e) => setLessonId(e.target.value)}
                    disabled={!chapterId}
                >
                    <option value="">Chọn bài học</option>
                    {filteredLessons.map(l => (
                        <option key={l.lesson_id} value={l.lesson_id}>
                            Bài {l.lesson_number}: {l.lesson_name}
                        </option>
                    ))}
                </select>

                <textarea
                    rows="10"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <div className="btn-group">
                    <button onClick={handleUpdate}>Cập nhật</button>
                    <button onClick={onClose}>Hủy</button>
                </div>

            </div>
        </div>
    );
};

export default EditDocument;