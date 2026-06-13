import React, { useState } from 'react'
import "./css/ImportQuestionModal.css"

import { importQuestions } from '../../api/questionApi';

const ImportQuestionModal = ({
    isOpen,
    onClose,
    onSuccess,
    subjects,
    chapters,
    lessons,
    setLessons,
    fetchLessons
}) => {

    const [subjectId, setSubjectId] = useState("");
    const [chapterId, setChapterId] = useState("");
    const [lessonId, setLessonId] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);

    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    // ================= SUBJECT CHANGE =================
    const handleChangeSubject = (value) => {

        setSubjectId(value);

        setChapterId("");

        setLessonId("");

        setLessons([]);
    };

    // ================= CHAPTER CHANGE =================
    const handleChangeChapter = (value) => {

        setChapterId(value);

        setLessonId("");

        if (value) {
            fetchLessons(value);
        } else {
            setLessons([]);
        }
    };

    // ================= FILTER =================
    const filteredChapters = chapters.filter(
        c => c.subject_id === Number(subjectId)
    );

    const filteredLessons = lessons.filter(
        l => l.chapter_id === Number(chapterId)
    );

    // ================= IMPORT =================
    //upload file lên BE
    const handleImport = async () => {

        if (!lessonId) {
            alert("Vui lòng chọn bài học");
            return;
        }

        if (!selectedFile) {
            alert("Vui lòng chọn file");
            return;
        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("file", selectedFile);

            formData.append("lesson_id", lessonId);

            await importQuestions(formData);

            alert("Import thành công!");

            onSuccess();

            onClose();

            // reset
            setSubjectId("");
            setChapterId("");
            setLessonId("");

            setSelectedFile(null);

            setLessons([]);

        } catch (error) {

            console.log(error);

            alert("Import thất bại!");

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay-import">

            <div className="import-modal">

                <h2>Import câu hỏi</h2>

                {/* SUBJECT */}
                <h4>Môn học</h4>

                <select
                    value={subjectId}
                    onChange={(e) =>
                        handleChangeSubject(e.target.value)
                    }
                >
                    <option value="">
                        Chọn môn học
                    </option>

                    {subjects?.map(sub => (
                        <option
                            key={sub.subject_id}
                            value={sub.subject_id}
                        >
                            {sub.subject_name}
                        </option>
                    ))}
                </select>

                {/* CHAPTER */}
                <h4>Chương</h4>

                <select
                    value={chapterId}
                    disabled={!subjectId}
                    onChange={(e) =>
                        handleChangeChapter(e.target.value)
                    }
                >
                    <option value="">
                        Chọn chương
                    </option>

                    {filteredChapters.map(c => (
                        <option
                            key={c.chapter_id}
                            value={c.chapter_id}
                        >
                            Chương {c.chapter_number} - {c.chapter_name}
                        </option>
                    ))}
                </select>

                {/* LESSON */}
                <h4>Bài học</h4>

                <select
                    value={lessonId}
                    disabled={!chapterId}
                    onChange={(e) =>
                        setLessonId(e.target.value)
                    }
                >
                    <option value="">
                        Chọn bài học
                    </option>

                    {filteredLessons.map(l => (
                        <option
                            key={l.lesson_id}
                            value={l.lesson_id}
                        >
                            Bài {l.lesson_number} - {l.lesson_name}
                        </option>
                    ))}
                </select>

                {/* FILE */}
                <h4>Chọn file <span>(.xlsx,.xls,.csv)</span></h4>

                <input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={(e) =>
                        setSelectedFile(e.target.files[0])
                    }
                />

                {/* BUTTON */}
                <div className="import-actions">

                    <button
                        className="upload-btn"
                        onClick={handleImport}
                        disabled={loading}
                    >
                        {loading ? "Đang import..." : "Upload"}
                    </button>

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Đóng
                    </button>

                </div>

            </div>

        </div>
    )
}

export default ImportQuestionModal;