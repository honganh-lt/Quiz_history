import './css/examTen.css'

import { useNavigate } from 'react-router-dom';

// import questions from '../../aData/question';
import { useEffect, useState } from 'react';
import Header from '../Home/Header';
// import questions from '../../aData/question';
import { useParams } from "react-router-dom";
import questionsEleven from "../../aData/questionsEleven";





function ExamEleven() {

    const navigate = useNavigate();

    // làm đề theo bài

    const { lessonId } = useParams();
    // dữ liệu không có tên bài 1
    // const questions = questionsTen[lessonId] || [];

    // dữ liệu có tên bài 1
    const lessonData = questionsEleven[lessonId];

    if (!lessonData) {
        return <p>Không tìm thấy đề thi</p>;
    }
    const { title, questions } = lessonData;

    //Lưu đáp án đã chọn
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const handleSelectAnswer = (questionId, answer) => { // handlSelectAnswer: hiện thị đáp án đã chọn
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: answer
        });
    };


    // Thêm state & effect tính thời gian
    const TOTAL_TIME = 15 * 60; // 15:00 phút (giây)

    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);

    }, [timeLeft]);

    // Hàm format thời gian (mm:ss)
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, "0")}:${s
            .toString()
            .padStart(2, "0")}`;
    };


    return (
        <main className="main-examTen">
            <Header />

            <div className="exam-layout">
                {/* ===== KHUNG TRÁI ===== */}
                <aside className="exam-left">
                    <h3>Trắc nghiệm Sử 10</h3>
                    <h4>{title}</h4>
                    <h5>Tổng số câu: {questions.length}</h5>
                    <p>
                        Thời gian còn lại :
                        <strong style={{ marginLeft: 6, color: timeLeft <= 60 ? "red" : "" }}>
                            {formatTime(timeLeft)}
                        </strong>
                    </p>

                    <div className="question-status">
                        {questions.map((q, index) => (
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

                {/* ===== KHUNG PHẢI ===== */}
                <section className="exam-right">
                    <h1>Bài làm</h1>

                    {questions.map((q, index) => (
                        <div key={q.id} className="question-card">
                            <h4>
                                Câu {index + 1}: {q.question}
                            </h4>

                            <div className="answers">
                                {q.answers.map((ans) => (
                                    <button
                                        key={ans}
                                        className={
                                            selectedAnswers[q.id] === ans
                                                ? "answer-btn selected"
                                                : "answer-btn"
                                        }
                                        onClick={() =>
                                            handleSelectAnswer(q.id, ans)
                                        }
                                    >
                                        {ans}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="submit-exam">
                        <button
                            className="btn-practice-examTen"
                            onClick={() => {
                                localStorage.setItem(
                                    "selectedAnswers",
                                    JSON.stringify(selectedAnswers)
                                );
                                localStorage.setItem(
                                    "timeUsed",
                                    (TOTAL_TIME - timeLeft).toString()
                                );

                                navigate(`/practice/lop-11/${lessonId}/answer`)
                            }
                            }
                        >
                            Nộp bài
                            {/* selectedAnswers ✅thời gian làm bài ✅đều đã được lưu */}
                        </button>
                    </div>


                </section>

            </div>
        </main>

    )
}

export default ExamEleven
