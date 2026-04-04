import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../Home/Header';
import question from "../../aData/question";
import "./css/MakeAnExamTen.css"
function MakeAnExamTen() {

    const navigate = useNavigate();
    const { examId } = useParams();

    // ✅ HOOK LUÔN Ở TRÊN
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const TOTAL_TIME = 15 * 60;
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

    // ✅ TIMER
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // ✅ LẤY DATA SAU HOOK
    const lessonData = question[String(examId)];

    if (!lessonData) {
        return <p>Không tìm thấy đề</p>;
    }

    const { title, questionExam } = lessonData;

    // ✅ HANDLE
    const handleSelectAnswer = (id, answer) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [id]: answer
        }));
    };

    const handleSubmit = () => {
        localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
        localStorage.setItem("timeUsed", (TOTAL_TIME - timeLeft).toString());

        navigate(`/exam/lop-10/${examId}/answer`);
    };

    const formatTime = (s) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    };

    return (
        <main className="main-examTen">
            <Header />

            <div className="exam-layout">

                {/* LEFT */}
                <aside className="exam-left">
                    <h3>Trắc nghiệm Sử 10</h3>
                    <h4>{title}</h4>
                    <h5>Tổng số câu: {questionExam.length}</h5>

                    <p>
                        Thời gian còn lại:
                        <strong style={{ color: timeLeft <= 60 ? "red" : "" }}>
                            {formatTime(timeLeft)}
                        </strong>
                    </p>

                    <div className="question-status">
                        {questionExam.map((q, index) => (
                            <span
                                key={q.id}
                                className={
                                    selectedAnswers[q.id]
                                        ? "question-number answered"
                                        : "question-number"
                                }
                            >
                                {index + 1}
                            </span>
                        ))}
                    </div>
                </aside>

                {/* RIGHT */}
                <section className="exam-right">
                    <h1>Bài làm</h1>

                    {questionExam.map((q, index) => (
                        <div key={q.id} className="question-card">
                            <h4>Câu {index + 1}: {q.question}</h4>

                            <div className="answers">
                                {q.answers.map((ans) => (
                                    <button
                                        key={ans}
                                        className={
                                            selectedAnswers[q.id] === ans
                                                ? "answer-btn selected"
                                                : "answer-btn"
                                        }
                                        onClick={() => handleSelectAnswer(q.id, ans)}
                                    >
                                        {ans}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="submit-exam">
                        <button className="btn-practice-examTen" onClick={handleSubmit}>
                        Nộp bài
                    </button>
                    </div>
                </section>

            </div>
        </main>
    );
}

export default MakeAnExamTen;