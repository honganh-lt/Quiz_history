import axios from 'axios';
import React, { useEffect, useState } from 'react';

const EditQuestionModal = ({ ques, onClose, onSuccess, chapters, subjects }) => {
  const [content, setContent] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [chapterId, setChapterId] = useState("");
  const [answers, setAnswers] = useState([
    { content: "", is_correct: false},
    { content: "", is_correct: false},
    { content: "", is_correct: false},
    { content: "", is_correct: false},
  ]);
  
  // ✅ Đổ dữ liệu vào form khi mở modal
  //==================LOAD DATA====================
  useEffect(() => {
    if (ques && chapters.length > 0) {
      setContent(ques.content || "");
      setDifficulty(String(ques.difficulty || ""));
      setChapterId(String(ques.chapter_id || ""));

      // ✅ Tìm subject từ chapter
      const chap = chapters.find(c => c.chapter_id === ques.chapter_id);
      setSubjectId(chap ? String(chap.subject_id) : "");

      //Đổ answers (quan trọng)
      // 🔥 FIX: chỉ lấy 4 đáp án
      if (ques.answers && ques.answers.length > 0) {
        const fixed = ques.answers
          .sort((a, b) => a.answer_id - b.answer_id)
          .slice(0, 4)
          .map(a => ({
            content: a.content,
            is_correct: !!a.is_correct
          }));

        while (fixed.length < 4) {
          fixed.push({ content: "", is_correct: false });
        }

        setAnswers(fixed);
      }
    }
  }, [ques, chapters]);

  // ✅ Lọc chapter theo subject === FILTER CHAPTER
  const filteredChapters = subjectId
    ? chapters.filter(c => String(c.subject_id) === String(subjectId))
    : [];

  // ✅ Submit update
  // ================= UPDATE =================
  const handleSubmit = async () => {

    const isValidAnswers = answers.every(a => a.content.trim() !== "");
    const hasCorrect = answers.some(a => a.is_correct);

    if (!content || !difficulty || !chapterId) {
      alert("Thiếu thông tin!");
      return;
    }

    if (!isValidAnswers) {
      alert("Đáp án không được để trống!");
      return;
    }

    if (!hasCorrect) {
      alert("Phải chọn 1 đáp án đúng!");
      return;
    }


    try {
      await axios.put(`http://localhost:3000/api/questions/${ques.question_id}`, {
        content,
        difficulty,
        chapter_id: Number(chapterId),
        answers
      });

      onSuccess(); // 🔥 reload lại table
      onClose();

    } catch (err) {
      console.error(err);
      alert("Lỗi cập nhật!");
    }
  };



  return (
    <div className="modal-overlay-ques">
      <div className="modal-ques">
        <h3>Edit câu hỏi</h3>

        {/* Môn học */}
        <h4>Môn học</h4>
        <select
          value={subjectId}
          onChange={(e) => {
            setSubjectId(e.target.value);
            setChapterId("");
          }}
        >
          <option value="">Chọn môn</option>
          {subjects.map((sub) => (
            <option key={sub.subject_id} value={sub.subject_id}>
              {sub.subject_name}
            </option>
          ))}
        </select>

        {/* Chương */}
        <h4>Chọn chương</h4>
        <select
          value={chapterId}
          disabled={!subjectId}
          onChange={(e) => setChapterId(e.target.value)}
        >
          <option value="">Chọn chương</option>
          {filteredChapters.map((chap) => (
            <option key={chap.chapter_id} value={chap.chapter_id}>
              {chap.chapter_name}
            </option>
          ))}
        </select>

        {/* Nội dung */}
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

        {/* Đáp án */}
        {answers.map((ans, index) => (
          <div key={index}>
            <h4>Đáp án {String.fromCharCode(65 + index)}</h4>

            <input
              value={ans.content}
              onChange={(e) => {
                const newAns = [...answers];
                newAns[index].content = e.target.value;
                setAnswers(newAns);
              }}
            />

            <input
              type="radio"
              name="correct"
              checked={ans.is_correct}
              onChange={() => {
                setAnswers(answers.map((a, i) => ({
                  ...a,
                  is_correct: i === index
                })));
              }}
            />
            
          </div>
        ))}

        {/* Actions */}
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