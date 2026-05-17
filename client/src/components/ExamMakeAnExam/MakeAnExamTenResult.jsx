import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../Home/Header";
import "./css/Result.css"

function MakeAnExamTenResult() {

    const { userExamId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const data = location.state;

    if (!data) {
        return (
            <div>
                <p>Không có dữ liệu → sang review...</p>
                {setTimeout(() => {
                    window.location.href = `/review/${userExamId}`;
                }, 1000)}
            </div>
        );
    }

    return (
        <div className="result"> 
            <div className="container-result">
                {/* Khung trên */}
                <Header/>
                {/* Khung dưới */}
                <div className="result-page">
                    <div className="result-card">
                        <h2>Kết quả</h2>
                        <p>Đúng: {data.correct} / {data.total}</p>
                        <p>Điểm: {data.score}</p>

                        <button onClick={() => navigate(`/review/${userExamId}`)}>
                            Xem chi tiết
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MakeAnExamTenResult;