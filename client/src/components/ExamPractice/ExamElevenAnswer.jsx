import './css/examTenAnswer.css'

import { useNavigate, useParams } from 'react-router-dom';


import { useEffect, useState } from 'react';
import Header from '../Home/Header';

// import { useParams } from "react-router-dom";
import questionsEleven from "../../aData/questionsEleven";


// Tính đúng số câu đúng

// ✅ Tính đúng điểm

// ✅ Hiển thị đáp án đúng (xanh) – sai (đỏ)

// ✅ Hiển thị thời gian đã làm


function ExamElevenAnswer() {

    const navigate = useNavigate();
    const { lessonId } = useParams();

    // 1. Lấy đề theo bài
    // const questions = questionsTen[lessonId] || [];
    const lessonData = questionsEleven[lessonId] || {};
    const title = lessonData.title || "";
    const questions = lessonData.questions || [];


    // 2. lấy đáp án đã chọn (lưu tạm LocalStorage)
    const [selectedAnswers, setSelectedAnswers] = useState({});

    ////////////////// timeUsed
    const [timeUsed, setTimeUsed] = useState(0);

    useEffect(() => {
        const saveAnswers = JSON.parse(
            localStorage.getItem("selectedAnswers")
        ) || {};
        // setSelectedAnswers(saveAnswers);
        const usedTime = Number(localStorage.getItem("timeUsed")) || 0;
        setSelectedAnswers(saveAnswers);
        setTimeUsed(usedTime);
    }, []);


    // 3. Tính số câu đúng
    const correctCount = questions.filter(
        (q) => selectedAnswers[q.id] === q.correct
    ).length;

    // 4.tính điểm 
    const score = questions.length > 0
        ? ((correctCount / questions.length) * 10).toFixed(1)
        : 0;
    // console.log("lessonId:", lessonId);
    // console.log("questionsTen:", questionsTen);
    // console.log("questions:", questions);

    // Thời gian
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
                    <p>Tổng số câu: {questions.length}</p>
                    <p>Số câu đúng: <strong>{correctCount}</strong></p>
                    <p>Điểm: <strong>{score}</strong></p>
                    <p>
                        Thời gian làm bài: <strong>{formatTime(timeUsed)}</strong>

                    </p>
                    {/*số câu đúng và điểm sau khi nộp bài */}


                </aside>

                {/* ===== KHUNG PHẢI ===== */}
                <section className="exam-right">
                    <h1>Xem đáp án</h1>

                    {/* dưới đây là xem đáp án đúng (màu xanh) và đáp án đã chọn(nếu sai màu đỏ) xem sau khi nộp bài */}
                    {/* 5. Hiển thị câu hỏi và đáp án */}
                    {questions.map((q, index) => (
                        <div key={q.id} className="question-card">
                            <h4>Câu {index + 1}: {q.question} </h4>

                            <div className="answers">
                                {/* đổi màu đáp án */}
                                {q.answers.map((ans) => {
                                    let className = "answer-btn"

                                    // Đáp án đúng -> xanh
                                    if (ans === q.correct) {
                                        className += " correct";

                                    }

                                    // Chọn sai -> đỏ
                                    if (
                                        selectedAnswers[q.id] === ans && ans !== q.correct
                                    ) {
                                        className += " wrong"
                                    }

                                    return (
                                        <div key={ans} className={className}>
                                            {ans}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                    {/* 6. Nút làm lại */}
                    <div className="submit-exam">
                        <button className="btn-practice-examTen"
                            // dùng chung examTen
                            onClick={() => {
                                localStorage.removeItem("selectedAnswers");
                                navigate(`/practice/lop-11/${lessonId}`)
                            }}
                        >
                            Làm lại bài
                        </button>
                    </div>

                </section>

            </div>
        </main>

    )
}

export default ExamElevenAnswer