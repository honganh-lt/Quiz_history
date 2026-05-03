import React, { useState } from 'react'
import { createQuestion } from '../../api/questionApi';
import "./css/AddQuestionModal.css"

export const AddQuestionModal = ({
    isOpen,
    onClose,
    onSuccess,
    subjects,
    chapters,
    lessons,
    setLessons,
    fetchLessons
}) => {

    const [content, setContent] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [subjectId, setSubjectId] = useState("");
    const [chapterId, setChapterId] = useState("");
    const [lessonId, setLessonId] = useState("");

    const [answers, setAnswers] = useState([
        { content: "", is_correct: false },
        { content: "", is_correct: false },
        { content: "", is_correct: false },
        { content: "", is_correct: false },
    ]);

    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    // ================= VALIDATE =================
    const isValidAnswers = answers.every(a => a.content.trim() !== "");
    const hasCorrect = answers.some(a => a.is_correct);

    const isFormValid =
        content.trim() &&
        difficulty &&
        lessonId &&
        isValidAnswers &&
        hasCorrect;

    // ================= ADD QUESTION =================
    const handleAdd = async () => {
        if (!isFormValid) {
            alert("Nhập đầy đủ nội dung + mức độ + bài học + đáp án!");
            return;
        }

        try {
            setLoading(true);

            await createQuestion({
                content: content.trim(),
                difficulty,
                lesson_id: Number(lessonId),
                answers: answers.map(a => ({
                    content: a.content.trim(),
                    is_correct: a.is_correct ? 1 : 0
                }))
            });

            alert("Thêm thành công!");

            onSuccess();
            onClose();

            // reset form
            setContent("");
            setDifficulty("");
            setSubjectId("");
            setChapterId("");
            setLessonId("");

            setAnswers([
                { content: "", is_correct: false },
                { content: "", is_correct: false },
                { content: "", is_correct: false },
                { content: "", is_correct: false }
            ]);

        } catch (err) {
            console.error(err);

            const message =
                err?.response?.data?.message || "Lỗi khi thêm câu hỏi!";

            alert(message);
        } finally {
            setLoading(false);
        }
    };

    // ================= SUBJECT CHANGE =================
    const handleChangeSubject = (value) => {
        setSubjectId(value);
        setChapterId("");
        setLessonId("");
        setLessons([]); // ok vì sẽ load lại khi chọn chapter
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

    return (
        <div className="modal-overlay-ques">
            <div className="modal-ques">

                <h3>Thêm câu hỏi</h3>

                {/* SUBJECT */}
                <h4>Môn học</h4>
                <select
                    value={subjectId}
                    onChange={(e) => handleChangeSubject(e.target.value)}
                >
                    <option value="">Chọn môn học</option>
                    {subjects?.map(sub => (
                        <option key={sub.subject_id} value={sub.subject_id}>
                            {sub.subject_name}
                        </option>
                    ))}
                </select>

                {/* CHAPTER */}
                <h4>Chương</h4>
                <select
                    value={chapterId}
                    disabled={!subjectId}
                    onChange={(e) => handleChangeChapter(e.target.value)}
                >
                    <option value="">Chọn chương</option>
                    {filteredChapters.map(c => (
                        <option key={c.chapter_id} value={c.chapter_id}>
                            Chương {c.chapter_number} - {c.chapter_name}
                        </option>
                    ))}
                </select>

                {/* LESSON */}
                <h4>Bài học</h4>
                <select
                    value={lessonId}
                    disabled={!chapterId}
                    onChange={(e) => setLessonId(e.target.value)}
                >
                    <option value="">Chọn bài học</option>
                    {filteredLessons.map(l => (
                        <option key={l.lesson_id} value={l.lesson_id}>
                            Bài {l.lesson_number} - {l.lesson_name}
                        </option>
                    ))}
                </select>

                {/* CONTENT */}
                <h4>Nội dung</h4>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                {/* DIFFICULTY */}
                <h4>Mức độ</h4>
                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="">Chọn mức độ</option>
                    <option value="EASY">EASY</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HARD">HARD</option>
                </select>

                {/* ANSWERS */}
                <h4>Đáp án</h4>

                {answers.map((ans, i) => (
                    <div key={i} className="answer-item">
                        <input
                            type="radio"
                            name="correct"
                            checked={ans.is_correct}
                            onChange={() => {
                                setAnswers(answers.map((a, index) => ({
                                    ...a,
                                    is_correct: index === i
                                })));
                            }}
                        />

                        <input
                            type="text"
                            placeholder={`Đáp án ${String.fromCharCode(65 + i)}`}
                            value={ans.content}
                            onChange={(e) => {
                                const newAnswers = [...answers];
                                newAnswers[i].content = e.target.value;
                                setAnswers(newAnswers);
                            }}
                        />
                    </div>
                ))}

                {/* BUTTON */}
                <div className="modal-actions-ques">
                    <button
                        onClick={handleAdd}
                        className="save-btn"
                        disabled={!isFormValid || loading}
                    >
                        {loading ? "Đang thêm..." : "Thêm"}
                    </button>

                    <button onClick={onClose} className="close-btn">
                        Đóng
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AddQuestionModal;