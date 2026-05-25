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
import Footer from '../Home/Footer';



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
                        {/* <img src="./public/imghome/ot-1.png" alt="" /> */}
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

    <div className='feature-list-revise'>

        {subjects.map((item) => {

            let currentImage = "";

            // if (item.subject_id === 1)
            //     // currentImage = "/imghome/ot-2.png";

            // else if (item.subject_id === 2)
            //     // currentImage = "/imghome/ot-3.png";

            // else if (item.subject_id === 3)
            //     currentImage = "/imghome/ot-4.png";

            return (
               <div
                    className='feature-card-revise'
                    key={item.subject_id}
                >

                    {/* Background mờ */}
                    <div
                        className='card-bg-revise'
                        style={{
                            backgroundImage: `url(${currentImage})`
                        }}
                    ></div>

                    {/* Overlay trắng */}
                    <div className='overlay-revise'></div>

                    {/* Nội dung */}
                    <div className='card-content-revise'>

                        {/* Icon */}
                        {/* <img
                            className='subject-icon-revise'
                            src={
                                item.subject_id === 1
                                    ? "/imghome/đt-3.png"
                                    : item.subject_id === 2
                                    ? "/imghome/đt-4.png"
                                    : "/imghome/đt-5.png"
                            }
                            alt=""
                        /> */}

                        <h3>{item.subject_name}</h3>

                        <button
                            className="btn-practice"
                            onClick={() =>
                                navigate(`/practice/${item.subject_id}`)
                            }
                        >
                            Vào Ôn Tập
                        </button>

                    </div>

                </div>
            );
        })}

    </div>

</section>
        <Footer/>
        </main>

    )
}

export default Revise
