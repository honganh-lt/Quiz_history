import React from 'react';
import Header from '../Home/Header';
import { useNavigate } from 'react-router-dom';
import "./css/ExamLop10.css"

function ExamLop10() {

    const navigate = useNavigate();

    const exams = [
        { id: 1, name: "Đề số 1" },
        { id: 2, name: "Đề số 2 " },
        { id: 3, name: "Đề số 3" },
        { id: 4, name: "Đề số 4" }
    ];

    return (
        <main className="main-exam">
            <div className="home-ten">
                <Header />
            </div>
            
            {/* Khung trên */}
            <section className='section-exam'>
                <div className="container-exam">
                    <div className='text-exam'>
                        <h1>Hãy chọn đề thi</h1>
                    </div>
                </div>
            </section>

            {/* Khung dưới */}
            <section className="down-section-exam">
                <div className="down-list-exam">
                   {/* <div className="card-list"> */}
                     <div className='card-list-exam'>
                        {exams.map((exam) => (
                        <div className='card-item-exam' key={exam.id}>
                            <h3>{exam.name}</h3>
                            <div className="exam-bottom">
                                <h4>Lần thi: 0</h4>
                                <button 
                                    className='btn-exam' 
                                    onClick={() => navigate(`/exam/lop-10/${exam.id}`)}
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
        </main>
    );
}

export default ExamLop10;