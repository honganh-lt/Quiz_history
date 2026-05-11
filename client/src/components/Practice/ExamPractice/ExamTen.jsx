import './css/examTen.css'

import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import { getQuestionsByLesson } from '../../../api/questionApi';
import Header from '../../Home/Header';

function ExamTen() {

    // ================= PARAMS =================
    const { lessonId } = useParams();

    // ================= STATE =================
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    // lưu đáp án user chọn
    const [selectedAnswers, setSelectedAnswers] = useState({});

    // ================= LOAD QUESTIONS =================
    useEffect(() => {

        setLoading(true);

        getQuestionsByLesson(lessonId)
            .then(res => {
                setQuestions(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });

    }, [lessonId]);

    // ================= CHỌN ĐÁP ÁN =================
    const handleSelectAnswer = (questionId, answer) => {

        // không cho chọn lại
        if (selectedAnswers[questionId]) return;

        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    // ================= LOADING =================
    if (loading) {
        return <p>Đang tải đề...</p>;
    }

    // ================= KHÔNG CÓ CÂU HỎI =================
    if (questions.length === 0) {
        return <p>Không có câu hỏi cho bài này</p>;
    }

    // ================= TÍNH ĐIỂM =================
    const correctCount = questions.filter(q => {

        const correctAnswer = q.answers?.find(
            a => Number(a.is_correct) === 1
        );

        return (
            selectedAnswers[q.question_id] ===
            correctAnswer?.content
        );

    }).length;

    return (
        <main className="main-examTen">

            <Header />

            <div className="exam-layout">

                {/* ================= LEFT ================= */}
                <aside className="exam-left">

                    <h3>Trắc nghiệm</h3>

                    <h5>Tổng số câu: {questions.length}</h5>

                    <h5>
                        Số câu đúng:
                        <span style={{ color: "green", marginLeft: 6 }}>
                            {correctCount}
                        </span>
                    </h5>

                    <div className="question-status">

                        {questions.map((q, index) => (

                            <span
                                key={q.question_id}
                                className={
                                    selectedAnswers[q.question_id]
                                        ? "question-number answered"
                                        : "question-number"
                                }
                            >
                                {index + 1}
                            </span>

                        ))}

                    </div>

                </aside>

                {/* ================= RIGHT ================= */}
                <section className="exam-right">

                    <h1>Bài làm</h1>

                    {questions.map((q, index) => (

                        <div
                            key={q.question_id}
                            className="question-card"
                        >

                            <h4>
                                Câu {index + 1}: {q.content}
                            </h4>

                            <div className="answers">

                                {q.answers.map((ans) => {

                                    const selected =
                                        selectedAnswers[q.question_id];

                                    let className = "answer-btn";

                                    // user chọn đáp án này
                                    if (selected === ans.content) {

                                        // đúng
                                        if (Number(ans.is_correct) === 1) {
                                            className += " correct";
                                        }

                                        // sai
                                        else {
                                            className += " wrong";
                                        }
                                    }

                                    // hiện đáp án đúng
                                    if (
                                        selected &&
                                        Number(ans.is_correct) === 1
                                    ) {
                                        className += " show-correct";
                                    }

                                    return (

                                        <button
                                            key={ans.answer_id}
                                            className={className}
                                            // disabled={selected}
                                            onClick={() =>
                                                handleSelectAnswer(
                                                    q.question_id,
                                                    ans.content
                                                )
                                            }
                                        >
                                            {ans.content}
                                        </button>

                                    );

                                })}

                            </div>

                        </div>

                    ))}
                    <div><h2></h2></div>

                </section>

            </div>

        </main>
    );
}

export default ExamTen;