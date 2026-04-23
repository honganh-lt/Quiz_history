import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../Home/Header';
// import question from "../../aData/question";
import "./css/MakeAnExamTen.css"
import { getExamDetail } from '../../api/examApi';
import { submitExam } from '../../api/userExamApi';

function MakeAnExamTen() {

    const navigate = useNavigate();

    //Làm đề theo kiểu đã ramdom hết tất cả câu hỏi của các bài
    const { subjectId, examId, userExamId} = useParams();

    const [subjects]  = useState([]);
    const [questions, setQuestions] = useState([]);
    // const [title ,setTitle] = useState("");
    // ✅ HOOK LUÔN Ở TRÊN
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const TOTAL_TIME = 15 * 60;
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

    // ✅ Load Data
    useEffect(() => {
        // getRandomExam(subje)
        getExamDetail(examId)
        .then(res => {
             console.log("DATA:", res.data); // 👈 DEBUG
            setQuestions(res.data)
            // setTitle(res.data.title);
        })
        .catch(err => console.log(err));
    }, [examId]);

    // ✅ TIMER
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    // handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
         return () => clearInterval(timer);
    }, []);

    // ✅ LẤY DATA SAU HOOK
    // const lessonData = question[String(examId)];

    // if (!lessonData) {
    //     return <p>Không tìm thấy đề</p>;
    // }

    // const { title, questionExam } = lessonData;

    // ✅ HANDLE Chon đáp án
    const handleSelectAnswer = (questionId, answerId) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: answerId
        }));
    };

    //Nộp bài
    // const handleSubmit = () => {
    //     localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
    //     localStorage.setItem("timeUsed", (TOTAL_TIME - timeLeft).toString());

    //     navigate(`/exam/${subjectId}/${examId}/result`);
    // };

    const formatTime = (s) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    };


    //Tìm subject hiện tại
    const currentSubject = subjects.find(
        s => Number(s.subject_id) === Number(subjectId)
    )
    // ✅ FIX: loading
    if (!questions.length) {
        return <p>Đang tải đề...</p>;
    }

    // ví dụ trong nút nộp bài (sửa submit trong trang làm bài)
   const handleSubmit = async () => {
    try {

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
    }
};

    return (
        <main className="main-examTen">
            <Header />

            <div className="exam-layout">

                {/* LEFT */}
                <aside className="exam-left">
                    <h3>Trắc nghiệm {currentSubject?.subject_name}</h3>
                    {/* <h4>{title}</h4> */}
                    <h5>Tổng số câu: {questions.length}</h5>

                    <p>
                        Thời gian:
                        <strong style={{ color: timeLeft <= 60 ? "red" : "" }}>
                            {formatTime(timeLeft)}
                        </strong>
                    </p>

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

                {/* RIGHT */}
                <section className="exam-right">
                    <h1>Bài làm</h1>

                    {questions.map((q, index) => (
                        <div key={q.question_id} className="question-card">
                            <h4>Câu {index + 1}: {q.content}</h4>

                            <div className="answers">
                                {q.answers.map((ans) => (
                                    <button
                                        key={ans.answer_id}
                                        className={
                                            selectedAnswers[q.question_id] === ans.answer_id
                                                ? "answer-btn selected"
                                                : "answer-btn"
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
                            className="btn-practice-examTen" 
                            onClick={handleSubmit}
                            // onClick={() => {
                            //     localStorage.setItem(
                            //         "selectedAnswers",
                            //         JSON.stringify(selectedAnswers)
                            //     );

                            //     navigate(`/exam/${subjectId}/${examId}/result`)
                            // }}
                        >
                        Nộp bài
                    </button>
                    </div>
                </section>

            </div>
        </main>
    );
}

export default MakeAnExamTen;