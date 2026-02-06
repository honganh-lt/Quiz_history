import './css/reviseLop10.css'
// dùng chung css
import Header from '../Home/Header'
import { useNavigate } from 'react-router-dom';


// chú ý đường dẫn
function ReviseLop12() {

    const navigate = useNavigate();

    return (
        <main className='main'>
            <div className="home-ten">
                <Header />
            </div>
            {/* Khung trên */}
            <section className='hero-section-ten'>
                <div className='container'>
                    {/* Phần chữ */}
                    {/* <div className="back-revise">
                        <a href="/practice">Quay lại</a>
                    </div> */}
                    <div className='body-layout-ten'>
                        <div className='body-text-ten'>
                            <h1>Bài tập và đề thi lịch sử lớp 12</h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* Khung dưới */}
            <section className='feature-section-ten'>
                <div className="feature-list-ten">
                    {/* Chương 1 */}
                    <div className="card-list">
                        <h2>Chương 1: Thế giới trong và sau Chiến tranh lạnh</h2>
                        <div className="card-list-ten">
                            <div className="card-ten-item">
                                <h3>Trắc nghiệm sử 11</h3>
                                <h4>Bài 1: Liên hợp quốc </h4>
                                {/* trang làm đề */}
                                <button className="btn-practice"
                                    onClick={() => navigate("/practice/lop-10/bai1")}
                                >Làm đề</button>
                            </div>
                            <div className="card-ten-item">
                                <h3>Trắc nghiệm sử 11</h3>
                                <h4>Bài 2: Trật tự thế giới trong Chiến tranh lạnh </h4>
                                <button className="btn-practice"
                                    onClick={() => navigate("/practice/lop-10/bai2")}
                                >Làm đề</button>
                            </div>
                            <div className="card-ten-item">
                                <h3>Trắc nghiệm sử 11</h3>
                                <h4>Bài 3: Trật tự thế giới sau Chiến tranh lạnh </h4>
                                <button className="btn-practice"
                                    onClick={() => navigate("/practice/lop-10/bai2")}
                                >Làm đề</button>
                            </div>
                        </div>
                    </div>

                    {/* Chương 2 */}
                    <div className="card-list">
                        <h2>Chương 2: ASEAN: Những chặng đường lịch sử</h2>
                        <div className="card-list-ten">
                            <div className="card-ten-item">
                                <h3>Trắc nghiệm sử 11</h3>
                                <h4>Bài 4: Sự ra đời và phát triển của Hiệp hội các quốc gia Đông Nam Á </h4>
                                <button className="btn-practice"
                                    onClick={() => navigate("/practice/lop-10/bai3")}
                                >Làm đề</button>
                            </div>
                            <div className="card-ten-item">
                                <h3>Trắc nghiệm sử 11</h3>
                                <h4>Bài 5: Cộng đồng ASEAN: Từ ý tưởng đến hiện thực </h4>
                                <button className="btn-practice"
                                    onClick={() => navigate("/practice/lop-10/bai4")}
                                >Làm đề</button>
                            </div>
                        </div>
                    </div>

                    {/* Chương 3 */}
                    <div className="card-list">
                        <h2>Chương 3: Cách mạng tháng Tám năm 1945, chiến tranh giải phóng dân tộc và
                            chiến tranh bảo vệ tổ quốc trong lịch sử Việt Nam (từ tháng 8 năm 1945 đến nay)
                        </h2>
                        <div className="card-list-ten">
                            <div className="card-ten-item">
                                <h3>Trắc nghiệm sử 11</h3>
                                <h4>Bài 6: Cách mạng tháng Tám năm 1945</h4>
                                <button className="btn-practice"
                                    onClick={() => navigate("/practice/lop-12/exam12")}
                                >Làm đề</button>
                            </div>
                            <div className="card-ten-item">
                                <h3>Trắc nghiệm sử 11</h3>
                                <h4>Bài 7: Cuộc kháng chiến chống thực dân Pháp(1945-1954) </h4>
                                <button className="btn-practice"
                                    onClick={() => navigate("/practice/lop-12/exam12")}
                                >Làm đề</button>
                            </div>
                            <div className="card-ten-item">
                                <h3>Trắc nghiệm sử 11</h3>
                                <h4>Bài 8: Cuộc kháng chiến chống Mỹ, cứu nước(1954-1975)</h4>
                                <button className="btn-practice"
                                    onClick={() => navigate("/practice/lop-12/exam12")}
                                >Làm đề</button>
                            </div>
                            <div className="card-ten-item">
                                <h3>Trắc nghiệm sử 11</h3>
                                <h4>Bài 9: Cuộc đấu tranh bảo vệ Tở quốc từ sau tháng 4 - 1975 đến nay.
                                    Một số bài học lịch sử của các cuộc kháng chiến bảo vệ Tổ quốc từ năm 1945 đến nay.
                                </h4>
                                <button className="btn-practice"
                                    onClick={() => navigate("/practice/lop-12/exam12")}
                                >Làm đề</button>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            {/* </div> */}
        </main>

    )
}

export default ReviseLop12
