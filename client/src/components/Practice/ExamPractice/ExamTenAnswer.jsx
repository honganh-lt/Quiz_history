import './css/examTenAnswer.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import Header from '../Home/Header';
import { getQuestionsByLesson } from '../../../api/questionApi';
import Header from '../../Home/Header';

function ExamTenAnswer() {
    const navigate = useNavigate();
    const {subjectId, lessonId } = useParams();

    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({}); /////

    // ================= LOAD QUESTIONS =================
    useEffect(() => {
        getQuestionsByLesson(lessonId)
            .then(res => setQuestions(res.data))
            .catch(err => console.error(err));
    }, [lessonId]);

    // ================= LOAD USER ANSWERS =================
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("selectedAnswers")) || {};
        setSelectedAnswers(saved);
    }, []);

    // ================= TÍNH KẾT QUẢ =================
    const correctCount = questions.filter(q => {
        const correctAnswer = q.answers?.find(a => Number(a.is_correct) === 1);
        return selectedAnswers[q.question_id] === correctAnswer?.content;
    }).length;

    const wrongCount = questions.length - correctCount;

    // ================= LOADING =================
    if (questions.length === 0) {
        return (
            <div>
                <Header />
                <p>Không có dữ liệu bài làm</p>
            </div>
        );
    }

    return (
        <main className="main-examTen">
            <Header />

            <div className="exam-layout">

                {/* ================= LEFT ================= */}
                <aside className="exam-left">
                    <h3>Kết quả làm bài</h3>

                    <p>Tổng câu hỏi: <strong>{questions.length}</strong></p>
                    <p>Số câu đúng: <strong style={{ color: "green" }}>{correctCount}</strong></p>
                    <p>Số câu sai: <strong style={{ color: "red" }}>{wrongCount}</strong></p>
                </aside>

                {/* ================= RIGHT ================= */}
                <section className="exam-right">
                    <h1>Đáp án chi tiết</h1>

                    {questions.map((q, index) => {

                        const userAnswer = selectedAnswers[q.question_id];
                        const correctAnswer = q.answers?.find(
                            a => Number(a.is_correct) === 1
                        );

                        return (
                            <div key={q.question_id} className="question-card">

                                <h4>
                                    Câu {index + 1}: {q.content}
                                </h4>

                                <div className="answers">

                                    {q.answers.map(ans => {

                                        let className = "answer-btn";

                                        // đáp án đúng
                                        if (Number(ans.is_correct) === 1) {
                                            className += " correct";
                                        }

                                        // đáp án user chọn sai
                                        if (
                                            userAnswer === ans.content &&
                                            Number(ans.is_correct) !== 1
                                        ) {
                                            className += " wrong";
                                        }

                                        return (
                                            <div
                                                key={ans.answer_id}
                                                className={className}
                                            >
                                                {ans.content}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* hiển thị đáp án đúng (optional) */}
                                <p style={{ marginTop: 8, color: "green" }}>
                                    Đáp án đúng: {correctAnswer?.content}
                                </p>

                            </div>
                        );
                    })}

                    {/* ================= BUTTON ================= */}
                    <div className="submit-exam">
                        <button
                            className="btn-practice-examTen"
                            onClick={() => {
                                localStorage.removeItem("selectedAnswers");
                                navigate(`/practice/${subjectId}/${lessonId}`);
                            }}
                        >
                            Làm lại bài
                        </button>
                    </div>

                </section>
            </div>
        </main>
    );
}

export default ExamTenAnswer;