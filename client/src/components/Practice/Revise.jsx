import { useEffect, useState } from 'react';
import Header from '../Home/Header';
import './css/revise.css'

// import banner4 from "../../assets/images/banner-ls4.png";
// import img10 from "../../assets/images/anhlt2.jpg";
// import img11 from "../../assets/images/anhlt3.jpg";
// import img12 from "../../assets/images/anhlt1.jpg";
// import img13 from "../../assets/images/anhlt4.avif";

import { useNavigate } from 'react-router-dom';
import { getSubjects } from '../../api/subjectApi';



function Revise() {

    const navigate = useNavigate();
    const [subjects, setSubjects] = useState([]);

    //GỌi API khi load trang
    useEffect(() => {
        getSubjects()
        .then(res => {
            setSubjects(res.data);
        })

        .catch (err => console.error(err));
        
    }, []);
    
    return (
        <main className='main-revise'>
            {/* <Header/> */}
            {/* Khung trên */}
            <section className='hero-section-revise'>
                <div className='container-revise'>
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
                    
                    {subjects.map((item) => (
                        <div className='feature-card-revise' key={item.subject_id}>
                        {/* <img src="./imghome/1.png" alt="Lịch sử lớp 10" /> */}
                        <h3>{item.subject_name}</h3> 

                        {/*Đường dẫn tới trang ../practice/1 -> khi ấn vào "Luyện tập"  */}
                        <button className="btn-practice"
                            onClick={() => navigate(`/practice/${item.subject_id}`)}
                        >Luyện tập</button>
                    </div>
                    ))}
                    
                </div>
            </section>
        </main>

    )
}

export default Revise
