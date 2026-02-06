import './css/reviseLop10.css'
// dùng chung css
import Header from '../Home/Header'
import { useNavigate } from 'react-router-dom';



function ReviseLop11() {

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
                            <h1>Bài tập và đề thi lịch sử lớp 11</h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* Khung dưới */}
            <section className='feature-section-ten'>
                <div className="feature-list-ten">
                    {/* Chương 1 */}
                    <div className="card-list">
                        <h2>Chương 1: Cách mạng tư sản và sự phát triển của chủ nghĩa tư bản</h2>
                        <div className="card-list-ten">
                            <div className="card-ten-item">
                                <h3>Trắc nghiệm sử 11</h3>
                                <h4>Bài 1: Một số vấn đề chung về cách mạng tư sản </h4>
                                {/* trang làm đề */}
                                <button className="btn-practice"
                                    onClick={() => navigate("/practice/lop-11/bai1")}
                                >Làm đề</button>
                            </div>
                            <div className="card-ten-item">
                                <h3>Trắc nghiệm sử 11</h3>
                                <h4>Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản </h4>
                                <button className="btn-practice"
                                    onClick={() => navigate("/practice/lop-11/bai2")}
                                >Làm đề</button>
                            </div>
                        </div>
                    </div>

                    {/* Chương 2 */}
                    <div className="card-list">
                        <h2>Chương 2: Chủ nghĩa xã hội từ năm 1917 đến nay</h2>
                        <div className="card-list-ten">
                            <div className="card-ten-item">
                                <h3>Trắc nghiệm sử 11</h3>
                                <h4>Bài 3: Sự hình thành Liên bang Cộng hòa xã hội chủ nghĩa Xô Viết</h4>
                                <button className="btn-practice"
                                    onClick={() => navigate("/practice/lop-11/bai3")}
                                >Làm đề</button>
                            </div>
                            <div className="card-ten-item">
                                <h3>Trắc nghiệm sử 11</h3>
                                <h4>Bài 4: Sự phát triển của chủ nghĩa xã hội từ sau chiến tranh thế giới thứ hau đến nay </h4>
                                <button className="btn-practice"
                                    onClick={() => navigate("/practice/lop-11/bai4")}
                                >Làm đề</button>
                            </div>
                        </div>
                    </div>

                    {/* Chương 3 */}
                    <div className="card-list">
                        <h2>Chương 3: Quá trình giành độc lập của các quốc gia ĐNA</h2>
                        <div className="card-list-ten">
                            <div className="card-ten-item">
                                <h3>Trắc nghiệm sử 11</h3>
                                <h4>Bài 5: QUá trình xâm lược và cai trị của chủ nghĩa thực dân ở Đông Nam Á</h4>
                                <button className="btn-practice"
                                    onClick={() => navigate("/practice/lop-11/bai5")}
                                >Làm đề</button>
                            </div>
                            <div className="card-ten-item">
                                <h3>Trắc nghiệm sử 11</h3>
                                <h4>Bài 6: Hành trình đi đến đọc lập dân tộc ở Đông Nam Á </h4>
                                <button className="btn-practice"
                                    onClick={() => navigate("/practice/lop-11/bai6")}
                                >Làm đề</button>
                            </div>
                            {/* <div className="card-ten-item">
                                <h3>Trắc nghiệm sử 11</h3>
                                <h4>Bài 7: Một số nền văn minh Phương Tây</h4>
                                <button className="btn-practice"
                                    onClick={() => navigate("/practice/lop-10/exam10")}
                                >Làm đề</button>
                            </div> */}
                        </div>
                    </div>

                </div>
            </section>
            {/* </div> */}
        </main>

    )
}

export default ReviseLop11
