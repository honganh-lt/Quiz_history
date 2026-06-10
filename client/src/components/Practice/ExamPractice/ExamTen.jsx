import './css/examTen.css';

import { useEffect, useState, useRef } from 'react'; // Đã thêm useRef
import { useParams } from "react-router-dom";

import { getQuestionsByLesson } from '../../../api/questionApi';
import { getSubjects } from '../../../api/subjectApi';
import Header from '../../Home/Header';
import { getChapters } from '../../../api/chapterApi';
import { getLesson } from '../../../api/lessonApi';

function ExamTen() {
    // ================= PARAMS =================
    const { lessonId } = useParams();

    // ================= STATE =================
    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    // Thêm ref để quản lý vị trí các câu hỏi
    const questionRefs = useRef({});

    // Hàm cuộn mượt mà đến câu hỏi
    const scrollToQuestion = (questionId) => {
        const element = questionRefs.current[questionId];
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    // ================= LOAD DATA =================
    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const [subjectsRes, chaptersRes, lessonsRes] = await Promise.all([
                    getSubjects(),
                    getChapters(),
                    getLesson()
                ]);
                setSubjects(subjectsRes.data);
                setChapters(chaptersRes.data);
                setLessons(lessonsRes.data);
            } catch (err) {
                console.error("Lỗi khi tải thông tin cấu trúc môn học:", err);
            }
        };
        fetchMetadata();
    }, []);

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            try {
                const res = await getQuestionsByLesson(lessonId);
                setQuestions(res.data || []);
            } catch (err) {
                console.error("Lỗi khi tải danh sách câu hỏi:", err);
            } finally {
                setLoading(false);
            }
        };

        if (lessonId) {
            fetchQuestions();
        }
    }, [lessonId]);

    // ================= LOCAL STORAGE =================
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user?.user_id;
    const storageKey = `doneLessons_${userId}`;

    useEffect(() => {
        if (questions.length > 0 && Object.keys(selectedAnswers).length === questions.length) {
            const oldDone = JSON.parse(localStorage.getItem(storageKey)) || [];
            if (!oldDone.includes(Number(lessonId))) {
                const updated = [...oldDone, Number(lessonId)];
                localStorage.setItem(storageKey, JSON.stringify(updated));
            }
        }
    }, [selectedAnswers, questions, lessonId, storageKey]);

    const lesson = lessons?.find(l => String(l.lesson_id) === String(lessonId));
    const chapter = chapters?.find(c => String(c.chapter_id) === String(lesson?.chapter_id));
    const subject = subjects?.find(s => String(s.subject_id) === String(chapter?.subject_id));

    const handleSelectAnswer = (questionId, answer) => {
        setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    if (loading) return <p>Đang tải đề...</p>;
    if (!questions.length) return <p>Không có câu hỏi cho bài này</p>;

    const correctCount = questions.filter(q => {
        const correctAnswer = q.answers?.find(a => Number(a.is_correct) === 1);
        return selectedAnswers[q.question_id] === correctAnswer?.content;
    }).length;

    return (
        <main className="main-examTen">
            <Header />
            <div className="exam-layout">
                {/* ================= LEFT ================= */}
                <aside className="exam-left">
                    <h3>Trắc nghiệm {subject?.subject_name || ""}</h3>
                    <h4> Chương {chapter?.chapter_id || ""}: { chapter?.chapter_name || ""}</h4>
                    <h5>Bài {lesson?.lesson_id || ""}: {lesson?.lesson_name || ""}</h5>

                    <p>
                        Số câu đúng:
                        <span style={{ color: "green", marginLeft: 6 }}>
                            {correctCount} / {questions.length}
                        </span>
                    </p>

                    <div className="question-status">
                        {questions.map((q, index) => (
                            <span
                                key={q.question_id}
                                className={selectedAnswers[q.question_id] ? "question-number answered" : "question-number"}
                                // TÍNH NĂNG MỚI: Bấm để cuộn
                                onClick={() => scrollToQuestion(q.question_id)}
                                style={{ cursor: 'pointer' }}
                            >
                                {index + 1}
                            </span>
                        ))}
                    </div>
                </aside>

                {/* ================= RIGHT ================= */}
                <section className="exam-right">
                    <h1>Bài làm</h1>
                    {questions.map((q, index) => {
                        const selected = selectedAnswers[q.question_id];
                        return (
                            <div
                                key={q.question_id}
                                className="question-card"
                                // TÍNH NĂNG MỚI: Gán ref cho từng thẻ câu hỏi
                                ref={(el) => (questionRefs.current[q.question_id] = el)}
                            >
                                <h4>Câu {index + 1}: {q.content}</h4>
                                <div className="answers-practice">
                                    {q.answers?.map(ans => {
                                        let className = "answer-practice-btn";
                                        const isCorrect = Number(ans.is_correct) === 1;
                                        if (selected === ans.content) {
                                            className += isCorrect ? " correct" : " wrong";
                                        }
                                        if (selected && isCorrect) {
                                            className += " show-correct";
                                        }
                                        return (
                                            <button
                                                key={ans.answer_id}
                                                className={className}
                                                onClick={() => handleSelectAnswer(q.question_id, ans.content)}
                                            >
                                                {ans.content}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </section>
            </div>
        </main>
    );
}

export default ExamTen;