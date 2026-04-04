import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../Home/Header';
import question from "../../aData/question";

function MakeAnExamTenResult() {

    const navigate = useNavigate();
    const { examId } = useParams();

    // ✅ HOOK TRƯỚC
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timeUsed, setTimeUsed] = useState(0);

    useEffect(() => {
        setSelectedAnswers(JSON.parse(localStorage.getItem("selectedAnswers")) || {});
        setTimeUsed(Number(localStorage.getItem("timeUsed")) || 0);
    }, []);

    // ✅ DATA SAU
    const lessonData = question[String(examId)];

    if (!lessonData) {
        return <p>Không tìm thấy đề</p>;
    }

    const { title, questionExam } = lessonData;

    // ✅ TÍNH ĐIỂM
    const correctCount = questionExam.filter(
        (q) => selectedAnswers[q.id] === q.correct
    ).length;

    const score = ((correctCount / questionExam.length) * 10).toFixed(1);

    const formatTime = (s) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    };

    return (
        <main className="main-examTen">
            <Header />

            <div className="exam-layout">

                <aside className="exam-left">
                    <h3>Trắc nghiệm Sử 10</h3>
                    <h4>{title}</h4>
                    <p>Đúng: {correctCount}</p>
                    <p>Điểm: {score}</p>
                    <p>Thời gian: {formatTime(timeUsed)}</p>
                </aside>

                <section className="exam-right">
                    <h1>Kết quả</h1>

                    {questionExam.map((q, index) => (
                        <div key={q.id} className="question-card">
                            <h4>Câu {index + 1}: {q.question}</h4>

                            {q.answers.map((ans) => {
                                let className = "answer-btn";

                                if (ans === q.correct) className += " correct";
                                else if (ans === selectedAnswers[q.id]) className += " wrong";

                                return (
                                    <div key={ans} className={className}>
                                        {ans}
                                    </div>
                                );
                            })}
                        </div>
                    ))}

                    <div className="submit-exam">
                        <button
                        className="btn-practice-examTen"
                        onClick={() => {
                            localStorage.clear();
                            navigate(`/exam/lop-10/${examId}`);
                        }}
                    >
                        Làm lại
                    </button>
                    </div>
                </section>

            </div>
        </main>
    );
}

export default MakeAnExamTenResult;