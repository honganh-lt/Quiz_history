import React, { useEffect, useMemo, useState } from 'react';
import Header from '../Home/Header';
// import { useNavigate } from 'react-router-dom';
import "./css/ExamLop.css"
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjects } from '../../api/subjectApi';
import { getExams } from '../../api/examApi';
import { getHistory } from '../../api/userExamApi';
//, startExam
import Footer from '../Home/Footer';

function ExamLop() {

    const navigate = useNavigate();
    //sửa ExamLop10 -> thành dynamic
    const { subjectId } = useParams();

    const [subjects, setSubjects] = useState([]);
    const [exams, setExams] = useState([]);

    //========Thêm số lần thi===========
    // const [attempts, setAttempts] = useState([]);
    const [history, setHistory] = useState([]);


    //lấy user -> thêm
    const user =JSON.parse(localStorage.getItem("user"))
    const userId = user?.user_id

    //LOAD SUBJECT + EXAM
    useEffect(() => {
        //môn học
        getSubjects()
        .then(res => setSubjects(res.data))
        .catch(err => console.log(err));

        //Exam
        getExams()
        .then(res => setExams(res.data))
        .catch(err => console.log(err))

        //Lần thi
        // if(userId) {
        //     getExamAttempts(userId)
        //     .then(res => setAttempts(res.data))
        //     .catch(err => console.log(err));
        // }
    }, []);

    //Lần thi load history
    useEffect(() => {
        if(!userId) return;

        getHistory(userId)
        .then(res => {
            console.log("History", res.data);
            setHistory(res.data);
        })
        .catch(err => console.log(err));
    }, [userId]);


    //Hàm lấy số lần thi
    // const getAttemptCount = (examId) => {
    //     // const item = attempts.find(a => a.exam_id === examId);
    //     return history.filter(
    //         h => Number(h.exam_id) === Number(examId)
    //     ).length;
    // };

    //số lần FE tự tính
    const attemptMap = useMemo(() => {
        const map = {};

        //chỉ lưu lần thi khi nộp bài
        history
        .filter(h => h.status === "submitted")
        .forEach(h => {
            const examId = Number(h.exam_id);

            if (!map[examId]) {
                map[examId] = 0;
            }

            map[examId] += 1;  // mỗi lần gặp cùng 1 đề thì số lần sẽ +1
        });

        return map;
    }, [history]);

    
    //Tìm subject hiện tại
    const currentSubject = subjects.find(
        s => Number(s.subject_id) === Number(subjectId)
    )
    //Lọc đề theo subjectId
    const filteredExams = exams.filter(
        ex => Number(ex.subject_id) === Number(subjectId)
    );

    return (
        <main className="main-exam-ten">
            <div>
                <Header />
            </div>
            
            {/* Khung trên */}
            <section className='section-exam'>
                <div className="container-exam">
                    <div className='text-exam'>
                        <h1>Hãy chọn đề thi {currentSubject?.subject_name}</h1>
                    </div>
                </div>
            </section>

            {/* Khung dưới */}
            <section className="down-section-exam">
                <div className="down-list-exam">
                   {/* <div className="card-list"> */}
                     <div className='card-list-exam'>
                        {/* Fix MAP */}
                        {filteredExams.map((exam) => (
                            <div 
                            // đổi màu để biết đề đã làm
                                className={`card-item-exam ${
                                    attemptMap[exam.exam_id] > 0 ? "done-exam" : ""
                                }`} 
                                key={exam.exam_id}
                            >

                                <h3>{exam.title}</h3>
                                <h5>{exam.description}</h5>

                                <div className="exam-bottom">
                                    {/* <h4>Lần thi: {getAttemptCount(exam.exam_id)}</h4> */}
                                     <h4>
                                        Lần thi: {attemptMap[exam.exam_id] || 0}
                                    </h4>
                                    <button
                                    className='btn-exam'
                                    onClick={async () => {
                                        try {

                                            if (!userId) {
                                                alert("Bạn chưa đăng nhập");
                                                navigate("/login");
                                                return;
                                            }

                                            // const res = await startExam({ //userExam
                                            //     user_id: userId,
                                            //     exam_id: exam.exam_id
                                            // });

                                            // const userExamId = res.data.user_exam_id;

                                            navigate(`/exam/${subjectId}/${exam.exam_id}`);

                                        } catch (err) {
                                            console.log(err);
                                            if (err.response?.status === 401) {
                                                alert("Bạn cần đăng nhập");

                                                navigate("/login");
                                            }
                                        }
                                    }}
                                >
                                    Làm đề
                                </button>
                                </div>

                            </div>
                    ))}
                    </div>
                   {/* </div> */}

                </div>
            </section>
            {/* <Footer/> */}
        </main>
    );
}

export default ExamLop;