import Header from '../Home/Header'
import './css/reviseLop10.css'

import { useNavigate } from 'react-router-dom';



function ReviseLop10() {

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
                            <h1>Bài tập và đề thi lịch sử lớp 10</h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* Khung dưới */}
            <section className='feature-section-ten'>
                <div className="feature-list-ten">
                    {/* Chương 1 */}
                    <div className="card-list">
                        <h2>Chương 1: Lịch sử và sử học</h2>
                        <div className="card-list-ten">
                            <div className="card-ten-item">
                                <h3>Trắc nghiệm sử 10</h3>
                                <h4>Bài 1: Hiện thực lịch sử và nhận thức lịch sử </h4>
                                {/* trang làm đề */}
                                <button className="btn-practice"
                                    onClick={() => navigate("/practice/lop-10/bai1")}
                                >Làm đề</button>
                            </div>
                            <div className="card-ten-item">
                                <h3>Trắc nghiệm sử 10</h3>
                                <h4>Bài 2: Tri thức lịch sử và cuộc sống </h4>
                                <button className="btn-practice"
                                    onClick={() => navigate("/practice/lop-10/bai2")}
                                >Làm đề</button>
                            </div>
                        </div>
                    </div>

                    {/* Chương 2 */}
                    <div className="card-list">
                        <h2>Chương 2: Vai trò của Sử học</h2>
                        <div className="card-list-ten">
                            <div className="card-ten-item">
                                <h3>Trắc nghiệm sử 10</h3>
                                <h4>Bài 3: Sử học với các lĩnh vực khoa học khác</h4>
                                <button className="btn-practice"
                                    onClick={() => navigate("/practice/lop-10/bai3")}
                                >Làm đề</button>
                            </div>
                            <div className="card-ten-item">
                                <h3>Trắc nghiệm sử 10</h3>
                                <h4>Bài 4: Sử học với một số lĩnh vực, ngành hiện đại </h4>
                                <button className="btn-practice"
                                    onClick={() => navigate("/practice/lop-10/bai4")}
                                >Làm đề</button>
                            </div>
                        </div>
                    </div>

                    {/* Chương 3 */}
                    <div className="card-list">
                        <h2>Chương 3: Một số nền văn minh thế giới thời kì cổ -trung đại</h2>
                        <div className="card-list-ten">
                            <div className="card-ten-item">
                                <h3>Trắc nghiệm sử 10</h3>
                                <h4>Bài 5: Khái niệm văn minh</h4>
                                <button className="btn-practice"
                                    onClick={() => navigate("/practice/lop-10/bai5")}
                                >Làm đề</button>
                            </div>
                            <div className="card-ten-item">
                                <h3>Trắc nghiệm sử 10</h3>
                                <h4>Bài 6: Một số nền văn minh Phương Đông </h4>
                                <button className="btn-practice"
                                    onClick={() => navigate("/practice/lop-10/bai6")}
                                >Làm đề</button>
                            </div>
                            <div className="card-ten-item">
                                <h3>Trắc nghiệm sử 10</h3>
                                <h4>Bài 7: Một số nền văn minh Phương Tây</h4>
                                <button className="btn-practice"
                                    onClick={() => navigate("/practice/lop-10/bai7")}
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

export default ReviseLop10
