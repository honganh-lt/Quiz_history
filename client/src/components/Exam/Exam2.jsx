import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./css/Exam2.css"

export const Exam2 = () => {

    const navigate = useNavigate();

  return (
    <main className='main'>
        {/* Khung trên */}
            <section className='hero-section-exam'>
                <div className='container-exam'>
                    {/* Phần chữ */}
                    <div className='body-layout-exam'>
                        <div className='body-text-exam'>
                            <h1>Bộ đề thi trắc nghiệm online các lớp THPT</h1>
                            {/* <p>
                                Bộ bài tập cá nhân hóa theo trình độ từng học sinh giúp các
                                em tự tin đứng top chỉ với 30 phút học mỗi ngày.
                            </p> */}

                        </div>
                    </div>
                </div>
            </section>

        {/* Khung dưới */}
        <section className="feature-section-exam">
            <div className="feature-list-exam">
                {/* Lớp 10 */}
                <div className="feature-card-exam">
                    <h3>Lớp10</h3>
                    <button className="btn-exam-btn"
                        onClick={() => navigate("/exam/lop-10")}
                    >
                        Làm đề
                    </button>
                </div>

                {/* Lớp 11 */}
                <div className="feature-card-exam">
                    <h3>Lớp11</h3>
                    <button className="btn-exam-btn">
                        Làm đề
                    </button>
                </div>

                {/* Lớp 12 */}
                <div className="feature-card-exam">
                    <h3>Lớp12</h3>
                    <button className="btn-exam-btn">
                        Làm đề
                    </button>
                </div>
            </div>
        </section>
    </main>
  )
}

export default Exam2;
