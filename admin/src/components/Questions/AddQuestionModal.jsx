import React, { useState } from 'react'
import { createQuestion } from '../../api/questionApi';
import "./css/AddQuestionModal.css"

export const AddQuestionModal = ({isOpen, onClose, onSuccess, chapters, subjects }) => {

    //1.State riêng từng file
    const [content, setContent] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [subjectId, setSubjectId] = useState("");
    const [chapterId, setChapterId] = useState("");
    const [answers, setAnswers] = useState([
        {content: "", is_correct: false},
        {content: "", is_correct: false},
        {content: "", is_correct: false},
        {content: "", is_correct: false},
    ])

    //2.Không mở modal -> không render
    if(!isOpen) return null;

    //3. Xử lý thêm
    const handleAdd = async () => {
        const isValidAnswers = answers.every(a => a.content.trim() !== "");
        const hasCorrect = answers.some(a => a.is_correct);

        if (!content || !difficulty || !chapterId || !isValidAnswers || !hasCorrect) {
            alert("Nhập đầy đủ và chọn đáp án đúng!");
            return;
        }

        try {
            await createQuestion({
                content,
                difficulty,
                chapter_id: Number(chapterId),
                answers: answers.map(a => ({
                    content: a.content.trim(),
                    is_correct: a.is_correct ? 1 : 0
                }))
            });

            onSuccess();
            onClose();

            // reset
            setContent("");
            setDifficulty("");
            setChapterId("");
            setAnswers([
                { content: "", is_correct: false },
                { content: "", is_correct: false },
                { content: "", is_correct: false },
                { content: "", is_correct: false }
            ]);

        } catch (err) {
            console.error(err);
            alert("Lỗi khi thêm!");
        }
    }

  return (
    <div className="modal-overlay-ques">
        <div className="modal-ques">
            <h3>Thêm câu hỏi</h3>

            {/* Chọn môn */}
            <h4>Chọn môn học</h4>
            <select 
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
            >
                <option value="">Chọn môn học</option>

                {subjects && subjects.length > 0 ? (
                    subjects.map((sub) => (
                        <option key={sub.subject_id} value={sub.subject_id}>
                            {sub.subject_name}
                        </option>
                    ))
                ) : (
                    <option disabled>Không có môn học</option>
                )}
            </select>

            {/* Chọn chương */}
            <h4>Chọn chương</h4>
            <select value={chapterId} onChange={e => setChapterId(e.target.value)}>
                <option value="">Chọn chương</option>
                {chapters.map(c => (
                    <option key={c.chapter_id} value={c.chapter_id}>
                        {c.chapter_name}
                    </option>
                ))}
            </select>

            {/* Nội dung câu hỏi */}
            <h4>Nội dung</h4>
            <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            {/* Mức độ */}
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

            {/* Đáp án*/}
            {answers.map((ans, i) => (
                <div key={i}>
                    <h4>Đáp án {String.fromCharCode(65 + i)}</h4>

                    <input 
                        value={ans.content}
                        onChange={(e) => {
                            const newAnswers = [...answers];
                            newAnswers[i].content = e.target.value;
                            setAnswers(newAnswers);
                        }}
                    />

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
                    
                </div>
            ))}
            
            {/* cập nhật + đóng */}
            <div className="modal-actions-ques">
                <button onClick={handleAdd} className='save-btn'>Thêm câu hỏi</button>
                <button onClick={onClose} className='close-btn'>Đóng</button>
            </div>
        </div>
    </div>
  )
}

export default AddQuestionModal;