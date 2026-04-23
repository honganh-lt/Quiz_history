// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./css/EditQuestionModal.css";
import { updateQuestion } from '../../api/questionApi';

const EditQuestionModal = ({
  ques,
  onClose,
  onSuccess,
  chapters,
  subjects,
  lessons,
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

  // ================= LOAD DATA =================
 useEffect(() => {
  if (ques) {
    setContent(ques.content || "");
    setDifficulty(ques.difficulty || "");

    // 🔥 dùng trực tiếp từ BE
    setSubjectId(ques.subject_id);
    setChapterId(ques.chapter_id);
    setLessonId(ques.lesson_id);

    // load lesson theo chapter
    if (ques.chapter_id) {
      fetchLessons(ques.chapter_id);
    }

    // answers
    if (ques.answers?.length) {
      const sorted = [...ques.answers]
        .sort((a, b) => a.answer_id - b.answer_id)
        .slice(0, 4)
        .map(a => ({
          content: a.content,
          is_correct: !!a.is_correct
        }));

      while (sorted.length < 4) {
        sorted.push({ content: "", is_correct: false });
      }

      setAnswers(sorted);
    }
  }
}, [ques]);
  // ================= FILTER =================
  const filteredChapters = chapters.filter(
    c => String(c.subject_id) === String(subjectId)
  );

  const filteredLessons = lessons.filter(
    l => String(l.chapter_id) === String(chapterId)
  );

  // ================= CHANGE =================
  const handleChangeSubject = (value) => {
    setSubjectId(value);
    setChapterId("");
    setLessonId("");
  };

  const handleChangeChapter = (value) => {
    setChapterId(value);
    setLessonId("");
    if (value) fetchLessons(value);
  };

  // ================= UPDATE =================
  const handleSubmit = async () => {
    const isValid = answers.every(a => a.content.trim() !== "");
    const hasCorrect = answers.some(a => a.is_correct);

    if (!content || !difficulty || !subjectId || !chapterId || !lessonId) {
      alert("Thiếu thông tin!");
      return;
    }

    if (!isValid || !hasCorrect) {
      alert("Đáp án không hợp lệ!");
      return;
    }

    try {
      // await axios.put(`http://localhost:3000/api/questions/${ques.question_id}`,
      await updateQuestion(ques.question_id,
        {
          content,
          difficulty,
          chapter_id: Number(chapterId),
          lesson_id: Number(lessonId),
          answers: answers.map(a => ({
            content: a.content.trim(),
            is_correct: a.is_correct ? 1 : 0
          }))
        }
      );

      onSuccess();
      onClose();

    } catch (err) {
      console.error(err);
      alert("Lỗi cập nhật!");
    }
  };

  return (
    <div className="modal-overlay-ques">
      <div className="modal-ques">

        <h3>Sửa câu hỏi</h3>

        {/* Môn */}
        <h4>Môn học</h4>
        <select value={subjectId} onChange={(e) => handleChangeSubject(e.target.value)}>
          <option value="">Chọn môn</option>
          {subjects.map(sub => (
            <option key={sub.subject_id} value={sub.subject_id}>
              {sub.subject_name}
            </option>
          ))}
        </select>

        {/* Chương */}
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

        {/* Bài học */}
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

        {/* Nội dung */}
        <h4>Nội dung</h4>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />

        {/* Mức độ */}
        <h4>Mức độ</h4>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="">Chọn mức độ</option>
          <option value="EASY">EASY</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HARD">HARD</option>
        </select>

        {/* Đáp án */}
        <h4>Đáp án</h4>
        {answers.map((ans, i) => (
          <div key={i} className="answer-item">

            <input
              type="radio"
              name="correct"
              checked={ans.is_correct}
              onChange={() => {
                setAnswers(answers.map((a, idx) => ({
                  ...a,
                  is_correct: idx === i
                })));
              }}
            />

            <input
              type="text"
              value={ans.content}
              onChange={(e) => {
                const newAns = [...answers];
                newAns[i].content = e.target.value;
                setAnswers(newAns);
              }}
            />
          </div>
        ))}

        {/* BUTTON */}
        <div className="modal-actions-ques">
          <button className="save-btn" onClick={handleSubmit}>
            Cập nhật
          </button>
          <button className="close-btn" onClick={onClose}>
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditQuestionModal;