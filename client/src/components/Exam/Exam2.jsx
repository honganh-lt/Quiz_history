import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./css/Exam2.css"
import { getSubjects } from '../../api/subjectApi';

export const Exam2 = () => {

    const navigate = useNavigate();
    const [subjects, setSubjects] = useState([]);

    //Gọi API khi load trang lấy ra tên môn học theo lớp: async/await và try-catch
    useEffect(() => {
        const fetchSubjectsData = async () => {
            try {
                const res = await getSubjects();
                setSubjects(res.data);
            } catch (err) {
                console.error("Lỗi khi tải danh sách môn học: ", err);
                
            }
        }

        fetchSubjectsData();
    }, []);


  return (
    <main className='main-exam'>
        {/* Khung trên */}
            <section className='hero-section-exam'>
                <div className='container-exam'>
                    {/* Phần chữ */}
                    <div className='body-layout-exam'>
                        {/* <img src="./public/imghome/đt-1.png" alt="" /> */}
                        <div className='body-text-exam'>
                            <h1>Bộ đề thi trắc nghiệm online các lớp THPT</h1>
                            {/* <p>
                                Bộ bài tập cá nhân hóa theo trình độ từng học sinh giúp các
                                em tự tin đứng top chỉ với 30 phút học mỗi ngày.
                            </p> */}

                        </div>
                        {/* <img src="./public/imghome/đt-2.png" alt="" /> */}
                    </div>
                </div>
            </section>

        {/* Khung dưới */}
        <section className="feature-section-exam">
            <div className="feature-list-exam">
                
                {subjects.map((item) => {
                    // Khởi tạo biến chứa ảnh cho từng vòng lặp
                    let currentImage = "";
                    
                    // Thay số 1, 2, 3 bằng đúng subject_id trong CSDL MySQL của bạn
                    if (item.subject_id === 1) currentImage = "./public/imghome/đt-3.png";
                    else if (item.subject_id === 2) currentImage = "./public/imghome/đt-4.png";
                    else if (item.subject_id === 3) currentImage = "./public/imghome/đt-5.png";

                    return (
                        <div className="feature-card-exam" key={item.subject_id}>
                            
                            <div className="card-image-wrapper">
                                <img src={currentImage} alt={item.subject_name} className="subject-card-img" />
                            </div>

                            <h3>{item.subject_name}</h3>

                            <button className="btn-exam-e"
                                onClick={() => navigate(`/exam/${item.subject_id}`)}
                            >
                                Chọn đề
                            </button>
                        </div>
                    );
                })}

            </div>
        </section>
    </main>
  )
}

export default Exam2;
