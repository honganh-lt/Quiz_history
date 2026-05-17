import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../Home/Header';
// import question from "../../aData/question";
import "./css/MakeAnExamTen.css"
import { getExamDetail } from '../../api/examApi';
import { submitExam, startExam } from '../../api/userExamApi';
import { getSubjects } from '../../api/subjectApi';

function MakeAnExamTen() {

    const navigate = useNavigate();

    //Làm đề theo kiểu đã ramdom hết tất cả câu hỏi của các bài
    const { subjectId, examId} = useParams();

    const [subjects, setSubjects]  = useState([]);
    const [questions, setQuestions] = useState([]);
    const [title ,setTitle] = useState("");
    //  HOOK LUÔN Ở TRÊN
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [userExamId, setUserExamId] = useState(null)

    // const TOTAL_TIME = 15 * 60;
    // const [timeLeft, setTimeLeft] = useState(TOTAL_TIME); -> BỎ

    //thay 
    const [timeLeft, setTimeLeft] = useState(null);


    //=====LOAD SUBJECTS +
    useEffect(() => {
        getSubjects()
        .then(res => setSubjects(res.data))
        .catch(err => console.log(err))
    }, []);
    // Load Data chi tiết câu hỏi
    useEffect(() => {
        // getRandomExam(subje)
        getExamDetail(examId) //chi tiết từng câu hỏi đề thi examApi
        .then(res => {
             console.log("DATA:", res.data); // DEBUG
            setQuestions(res.data.questions)
            setTitle(res.data.title || "Đề thi");

            //lấy duration từ DB
            setTimeLeft(Number(res.data.duration || 15 )* 60);
        })
        .catch(err => console.log(err));
    }, [examId]);

    //=============Subject Find===========
    // const 
     // ví dụ trong nút nộp bài (sửa submit trong trang làm bài)
   const handleSubmit = async (isAutoSubmit = false) => {

        try {

            // CONFIRM KHI BẤM NỘP
            if (!isAutoSubmit) {

                const confirmSubmit = window.confirm(
                    "Bạn có chắc muốn nộp bài không?"
                );

                if (!confirmSubmit) return;
            }

            // CHƯA LÀM CÂU NÀO
            if (!userExamId) {

                alert("Bạn chưa làm câu nào");

                return;
            }

            // FORMAT ANSWERS
            const answers = Object.keys(selectedAnswers).map(qid => ({
                question_id: Number(qid),
                answer_id: selectedAnswers[qid]
            }));

            // SUBMIT
            const res = await submitExam({
                user_exam_id: userExamId,
                answers
            });

            // CHUYỂN TRANG KẾT QUẢ
            navigate(`/result/${userExamId}`, {
                state: res.data
            });

        } catch (err) {

            console.log(err);

            alert("Có lỗi khi nộp bài");
        }
    };

    // TIMER //khi thời gian về 0 thì true tự động nộp bài(isAutoSubmit = true)
    useEffect(() => {

        // chưa load thời gian
        if (timeLeft === null) return;

        // hết giờ
        if (timeLeft <= 0) {

            if (userExamId) {
                handleSubmit(true);
            }

            return;
        }

        // đếm ngược
        const timer = setTimeout(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);

    }, [timeLeft, userExamId]);

    // cảnh báo thoát trang -> reload, đóng tab, thoát web
    useEffect(() => {

        const handleBeforeUnload = (e) => {

            // ĐÃ BẮT ĐẦU LÀM BÀI
            if (userExamId) {

                e.preventDefault();

                e.returnValue = "";
            }
        };

        window.addEventListener(
            "beforeunload",
            handleBeforeUnload
        );

        return () => {

            window.removeEventListener(
                "beforeunload",
                handleBeforeUnload
            );
        };

    }, [userExamId]);
    
    // LẤY DATA SAU HOOK
    // const lessonData = question[String(examId)];

    // if (!lessonData) {
    //     return <p>Không tìm thấy đề</p>;
    // }

    // const { title, questionExam } = lessonData;

    //  HANDLE Chon đáp án
    const handleSelectAnswer = async (questionId, answerId) => {

    try {

        let currentUserExamId = userExamId;

        // Chưa có bài thi -> tạo lần đầu
        if (!currentUserExamId) {

            const user = JSON.parse(localStorage.getItem("user"));

            const res = await startExam({
                user_id: user.user_id,
                exam_id: examId
            });

            currentUserExamId = res.data.user_exam_id;

            setUserExamId(currentUserExamId);
        }

        // lưu đáp án
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: answerId
        }));

    } catch (err) {
        console.log(err);
    }
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
    //  FIX: loading
    if (!questions.length) {
        return <p>Đang tải đề...</p>;
    }
   
    return (
        <main className="main-examMake">
            <Header />

            <div className="exam-layout-make">

                {/* LEFT */}
                <aside className="exam-left-sidebar">
                    <h3>Trắc nghiệm {currentSubject?.subject_name}</h3>
                    <h4>{title}</h4>
                    {/* <h5>{examId.description}</h5> */}
                    {/* <h5>Tổng số câu: {questions.length}</h5> */}

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
                <section className="exam-right-content">
                    <h1>Bài làm</h1>

                    {questions.map((q, index) => (
                        <div key={q.question_id} className="question-card-exam">
                            <h4>Câu {index + 1}: {q.content}</h4>

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

                        {/* <button
                            className="btn-exit-exam"
                            onClick={handleExit}
                        >
                            Thoát
                        </button> */}
                        <button 
                            type='button'
                            className="btn-practice-examTen" 
                            onClick={() => handleSubmit(false)}
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