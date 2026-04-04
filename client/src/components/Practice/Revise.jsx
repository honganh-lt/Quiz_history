import Header from '../Home/Header';
import './css/revise.css'

// import banner4 from "../../assets/images/banner-ls4.png";
// import img10 from "../../assets/images/anhlt2.jpg";
// import img11 from "../../assets/images/anhlt3.jpg";
// import img12 from "../../assets/images/anhlt1.jpg";
// import img13 from "../../assets/images/anhlt4.avif";

import { useNavigate } from 'react-router-dom';



function Revise() {

    const navigate = useNavigate();
    
    return (
        <main className='main'>
            {/* <Header/> */}
            {/* Khung trên */}
            <section className='hero-section-revise'>
                <div className='container'>
                    {/* Phần chữ */}
                    <div className='body-layout-revise'>
                        <div className='body-text-revise'>
                            <h1>Bộ bài tập trắc nghiệm online các lớp THPT</h1>
                            {/* <p>
                                Bộ bài tập cá nhân hóa theo trình độ từng học sinh giúp các
                                em tự tin đứng top chỉ với 30 phút học mỗi ngày.
                            </p> */}

                        </div>
                    </div>
                </div>
            </section>

            {/* Khung dưới */}
            <section className='feature-section-revise'>
                {/* <h2>Luyện theo lớp học - Sách kết nối tri thức</h2> */}
                <div className='feature-list-revise'>
                    <div className='feature-card-revise'>
                        {/* <img src={img10} alt="Lịch sử lớp 10" /> */}
                        <h3> Lớp 10</h3>
                        <button className="btn-practice"
                            onClick={() => navigate("/practice/lop-10")}
                        >Luyện tập</button>
                    </div>
                    <div className='feature-card-revise'>
                        {/* <img src={img11} alt="Lịch sử lớp 10" /> */}
                        <h3> Lớp 11</h3>
                        <button className="btn-practice"
                            onClick={() => navigate("/practice/lop-11")}
                        >Luyện tập</button>                    </div>
                    <div className='feature-card-revise'>
                        {/* <img src={img12} alt="Lịch sử lớp 10" /> */}
                        <h3> Lớp 12</h3>
                        <button className="btn-practice"
                            onClick={() => navigate("/practice/lop-12")}
                        >Luyện tập</button>                    </div>
                </div>
            </section>
        </main>

    )
}

export default Revise
