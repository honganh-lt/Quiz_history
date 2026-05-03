import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { reviewExam, startExam } from "../../api/userExamApi";
import Header from "../Home/Header";
import "./css/Review.css"

function ReviewPage() {

    const navigate = useNavigate();
    const { userExamId } = useParams();

    const [data, setData] = useState([]);
    const [examInfo, setExamInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        reviewExam(userExamId)
            .then(res => {
                const result = res.data || [];

                setData(result);

                if (result.length > 0) {
                    setExamInfo({
                        exam_id: result[0].exam_id,
                        subject_id: result[0].subject_id
                    });
                }
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [userExamId]);

    // ✅ LOADING
    if (loading) {
        return (
            <div>
                <Header />
                <p>Đang tải...</p>
            </div>
        );
    }

    // ✅ CHƯA NỘP
    if (!data.length) {
        return (
            <div>
                <Header />
                <h3>Bài này chưa nộp nên không có dữ liệu review</h3>

                <button onClick={() => navigate(-1)}>
                    Quay lại
                </button>
            </div>
        );
    }

    // ✅ LÀM LẠI
    const handleRetry = async () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("Bạn chưa đăng nhập");
            navigate("/login");
            return;
        }

        const res = await startExam({
            user_id: user.user_id,
            exam_id: examInfo.exam_id
        });

        const newUserExamId = res.data.user_exam_id;

        navigate(`/exam/${examInfo.subject_id}/${examInfo.exam_id}/${newUserExamId}`);
    };

    return (
        <div>
            <Header />

            <div className="review">
                <div className="review-page" style={{ padding: "20px" }}>
                <h2>Kết quả bài làm</h2>

                {data.map((q, index) => {
                    const correctAnswer = q.answers.find(ans => ans.is_correct);
                return (
                    <div key={q.question_id} className="review-page-list">
                        <h4>Câu {index + 1}: {q.question}</h4>

                        {q.answers.map(ans => {
                            const isUser = ans.answer_id === ans.user_answer_id;
                            const isCorrect = ans.is_correct;

                            return (
                                <div
                                    className="review-page-ans"
                                    key={ans.answer_id}
                                    style={{
                                        background: isCorrect
                                            ? "#a4fcb9"
                                            : isUser
                                            ? "#faaab0"
                                            : "#f1f1f1",
                                        margin: "4px 0",
                                        padding: "6px"
                                    }}
                                >
                                    {ans.answer}
                                </div>
                            );
                        })}
                        {/* Hiển thị đáp án đúng */}
                        <p style={{marginTop: 8, color:"green"}}>
                            Đáp án đúng: {correctAnswer?.answer}
                            {/*{ans.answer} = {correctAnswer?.answer}  */}
                        </p>
                    </div>
                );
            })}

                <button onClick={handleRetry}>
                    Làm lại bài
                </button>
            </div>
            </div>
        </div>
    );
}

export default ReviewPage;