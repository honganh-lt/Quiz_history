import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { reviewExam, startExam } from "../../api/userExamApi";
import Header from "../Home/Header";

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

            <div style={{ padding: "20px" }}>
                <h2>📊 Review bài làm</h2>

                {data.map((q, index) => (
                    <div key={q.question_id}>
                        <h4>Câu {index + 1}: {q.question}</h4>

                        {q.answers.map(ans => {
                            const isUser = ans.answer_id === ans.user_answer_id;
                            const isCorrect = ans.is_correct;

                            return (
                                <div
                                    key={ans.answer_id}
                                    style={{
                                        background: isCorrect
                                            ? "#d4edda"
                                            : isUser
                                            ? "#f8d7da"
                                            : "#f1f1f1",
                                        margin: "4px 0",
                                        padding: "6px"
                                    }}
                                >
                                    {ans.answer}
                                </div>
                            );
                        })}
                    </div>
                ))}

                <button onClick={handleRetry}>
                    Làm lại bài
                </button>
            </div>
        </div>
    );
}

export default ReviewPage;