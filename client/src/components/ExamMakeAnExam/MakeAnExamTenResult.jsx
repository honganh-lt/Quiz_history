import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../Home/Header";

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
        <div>
            <div>
                {/* Khung trên */}
                <Header/>
                {/* Khung dưới */}
                <div>
                    <h2>Kết quả</h2>
                    <p>Đúng: {data.correct} / {data.total}</p>
                    <p>Điểm: {data.score}</p>

                    <button onClick={() => navigate(`/review/${userExamId}`)}>
                        Xem chi tiết
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MakeAnExamTenResult;