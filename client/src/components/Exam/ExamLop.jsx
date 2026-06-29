import React, { useEffect, useState } from 'react';
import Header from '../Home/Header';
// import { useNavigate } from 'react-router-dom';
import "./css/ExamLop.css"
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjects } from '../../api/subjectApi';
import { getExams } from '../../api/examApi';
// import { getExamAttempts, getHistory } from '../../api/userExamApi';
import { getExamAttempts } from '../../api/userExamApi';

//, startExam
import Footer from '../Home/Footer';

function ExamLop() {

    const navigate = useNavigate();
    //sửa ExamLop10 -> thành dynamic
    const { subjectId } = useParams();

    const [subjects, setSubjects] = useState([]);
    const [exams, setExams] = useState([]);

    //========Thêm số lần thi===========
    const [attempts, setAttempts] = useState({});
    // const [history, setHistory] = useState([]);


    //lấy user -> thêm
    const user =JSON.parse(localStorage.getItem("user"))
    const userId = user?.user_id


    //Vị trí 1: Tối ưu tải danh sách Môn học và đề thi chạy song song (Promise.all)
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                //Gọi cả 2 API cùng lúc giúp tăng tốc độ load trang
                const [subjectsRes, examsRes] = await Promise.all([
                    getSubjects(),
                    getExams()
                ]);

                setSubjects(subjectsRes.data);
                setExams(examsRes.data);
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu ban đầu", err);
                
            }
        }

        fetchInitialData();
    }, []);


    // useEffect(() => {
    //     if(!userId) return;

    //     const fetchHistoryData = async () => {
    //         try {
    //             const res = await getHistory(userId);
    //             console.log("History", res.data);
    //             setHistory(res.data);
    //         } catch (err) {
    //             console.error("Lỗi khi tải lịch sử thi: ", err);
                
    //         }
    //     }

    //     fetchHistoryData();
    // }, [userId]);

    // const attemptMap = useMemo(() => {
    //     const map = {};

    //     //chỉ lưu lần thi khi nộp bài
    //     history
    //     .filter(h => h.status === "submitted")
    //     .forEach(h => {
    //         const examId = Number(h.exam_id);

    //         if (!map[examId]) {
    //             map[examId] = 0;
    //         }

    //         map[examId] += 1;  // mỗi lần gặp cùng 1 đề thì số lần sẽ +1
    //     });

    //     return map;
    // }, [history]);

    useEffect(() => {
        if (!userId) return;

        const fetchAttempts = async () => {
            try {
                const res = await getExamAttempts(userId);

                const map = {};

                res.data.forEach(item => {
                    map[item.exam_id] = item.attempts;
                });

                setAttempts(map);
            } catch (err) {
                console.error(err);
            }
        };

        fetchAttempts();
    }, [userId]);

    
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
                                    attempts[exam.exam_id] > 0 ? "done-exam" : ""
                                }`} 
                                key={exam.exam_id}
                            >

                                <h3>{exam.title}</h3>
                                <h5>{exam.duration} phút - {exam.question_count} câu</h5>

                                <div className="exam-bottom">
                                    {/* <h4>Lần thi: {getAttemptCount(exam.exam_id)}</h4> */}
                                     <h4>
                                        Lần thi: {attempts[exam.exam_id] || 0}
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