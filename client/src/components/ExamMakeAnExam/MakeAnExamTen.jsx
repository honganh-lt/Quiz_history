import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../Home/Header';
import "./css/MakeAnExamTen.css"
import { getExamDetail } from '../../api/examApi';
import { submitExam, startExam } from '../../api/userExamApi';
import { getSubjects } from '../../api/subjectApi';
// import ReportQuestionModal from '../ReportForm/ReportQuetionModal';
// import ReportQuestionModal from "./ReportQuestionModal";

function MakeAnExamTen() {
    const navigate = useNavigate();
    const { subjectId, examId } = useParams();

    const [subjects, setSubjects] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [title, setTitle] = useState("");
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [userExamId, setUserExamId] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);

    //Báo lỗi
    // const [showReportModal, setShowReportModal] = useState(false);

    // const [selectedQuestion, setSelectedQuestion] = useState(null);
    
    // ===== LOAD SUBJECTS =====
    useEffect(() => {
        const fetchExamAndSubjects = async () => {
            try {
                //kích hoạt load cả thông tin môn học và chi tiết đề thi 
                const [subjectsRes, examDetailRes] = await Promise.all([
                    getSubjects(),
                    getExamDetail(examId)
                ]);

                //Set data cho môn học
                setSubjects(subjectsRes.data);

                //Set data cho chi tiết đề thi
                console.log("Data đề thi: ", examDetailRes.data);
                setQuestions(examDetailRes.data.questions);
                setTitle(examDetailRes.data.title || "Đề thi");
                setTimeLeft(Number(examDetailRes.data.duration || 15) * 60);

            } catch (err) {
                console.error("Lỗi khi tải dữ liệu để thi hoặc môn học: ", err);
                
            }
        }

        if (examId) {
            fetchExamAndSubjects();
        }
    }, [examId]);


    // ===== SUBMIT HANDLER =====
    const handleSubmit = async (isAutoSubmit = false) => {
        try {
            if (!isAutoSubmit) {
                const confirmSubmit = window.confirm("Bạn có chắc muốn nộp bài không?");
                if (!confirmSubmit) return;
            }

            if (!userExamId) {
                alert("Bạn chưa làm câu nào");
                return;
            }

            const answers = Object.keys(selectedAnswers).map(qid => ({
                question_id: Number(qid),
                answer_id: selectedAnswers[qid]
            }));

            const res = await submitExam({
                user_exam_id: userExamId,
                answers
            });

            navigate(`/result/${userExamId}`, {
                state: res.data
            });
        } catch (err) {
            console.log(err);
            alert("Có lỗi khi nộp bài");
        }
    };

    // ===== TIMER =====
    useEffect(() => {
        if (timeLeft === null) return;
        if (timeLeft <= 0) {
            if (userExamId) {
                handleSubmit(true);
            }
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, userExamId]);

    // ===== PREVENT UNLOAD =====
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (userExamId) {
                e.preventDefault();
                e.returnValue = "";
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [userExamId]);

    // ===== SELECT ANSWER =====
    const handleSelectAnswer = async (questionId, answerId) => {
        try {
            let currentUserExamId = userExamId;

            if (!currentUserExamId) {
                const user = JSON.parse(localStorage.getItem("user"));
                const res = await startExam({
                    user_id: user.user_id,
                    exam_id: examId
                });
                currentUserExamId = res.data.user_exam_id;
                setUserExamId(currentUserExamId);
            }

            setSelectedAnswers((prev) => ({
                ...prev,
                [questionId]: answerId
            }));
        } catch (err) {
            console.log(err);
        }
    };

    // ===== HÀM CUỘN ĐẾN CÂU HỎI =====
    const scrollToQuestion = (index) => {
        const element = document.getElementById(`question-${index}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const formatTime = (s) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    };

    const currentSubject = subjects.find(
        s => Number(s.subject_id) === Number(subjectId)
    );

    // Đặt điều kiện loading ở cuối cùng, sau khi tất cả các Hook đã được khởi tạo
    if (!questions.length) {
        return <p>Đang tải đề...</p>;
    }

    return (
        <main className="main-examMake">
            <Header />

            <div className="exam-layout-make">
                {/* LEFT SIDEBAR */}
                <aside className="exam-left-sidebar">
                    <h2>Trắc nghiệm</h2>
                    <h3>{currentSubject?.subject_name}</h3>
                    <h4>{title}</h4>

                    <p>
                        Thời gian: 
                        <strong style={{ color: timeLeft <= 60 ? "red" : "" }}>
                            {timeLeft !== null ? formatTime(timeLeft) : "00:00"}
                        </strong>
                    </p>

                    <div className="question-status-exam">
                        {questions.map((q, index) => (
                            <span
                                key={q.question_id}
                                // Kích hoạt hàm và truyền vào vị trí index của câu hỏi
                                onClick={() => scrollToQuestion(index)}
                                style={{ cursor: 'pointer' }}
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

                {/* RIGHT CONTENT */}
                <section className="exam-right-content">
                    <h1>Bài làm</h1>

                    {questions.map((q, index) => (
                        // THÊM ID CHO TỪNG THẺ CÂU HỎI ĐỂ ĐỊNH VỊ
                        <div key={q.question_id} id={`question-${index}`} className="question-card-exam">
                            {/* <div className="question-header"> */}
                                <h4>
                                    Câu {index + 1}: {q.content}
                                </h4>

                                {/* <button
                                    className="report-btn"
                                    onClick={() => {
                                        setSelectedQuestion(q);
                                        setShowReportModal(true);
                                    }}
                                >
                                    ⚠️
                                </button> */}
                            {/* </div> */}

                            <div className="answers-exam">
                                {q.answers.map((ans) => (
                                    <button
                                        key={ans.answer_id}
                                        className={
                                            selectedAnswers[q.question_id] === ans.answer_id
                                                ? "answer-exam-btn selected"
                                                : "answer-exam-btn"
                                        }
                                        onClick={() => handleSelectAnswer(q.question_id, ans.answer_id)}
                                    >
                                        {ans.content}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="submit-exam">
                        <button 
                            type='button'
                            className="btn-practice-examTen" 
                            onClick={() => handleSubmit(false)}
                        >
                            Nộp bài
                        </button>
                    </div>
                </section>
            </div>

            {/* {
    showReportModal &&
    selectedQuestion && (

        <ReportQuestionModal
            question={selectedQuestion}
            onClose={() => {
                setShowReportModal(false);
                setSelectedQuestion(null);
            }}
        />

    )
} */}
        </main>
    );
}

export default MakeAnExamTen;