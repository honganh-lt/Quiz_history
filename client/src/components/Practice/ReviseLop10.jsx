import { useEffect, useState } from 'react';
import Header from '../Home/Header'
import './css/reviseLop10.css'

import { useNavigate, useParams } from 'react-router-dom';
import { getChapters } from '../../api/chapterApi';
import { getLesson } from '../../api/lessonApi';
import { getSubjects } from '../../api/subjectApi';



function ReviseLop10() {

    const navigate = useNavigate();

    //sửa reviseLop10 -> thành dynamic

    const {subjectId} = useParams(); 

    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [lessons, setLessons] = useState([]);




    //load chapters + lessons
    useEffect(() => {
        getSubjects()
        .then(res => setSubjects(res.data))
        .catch(err => console.error(err));

        getChapters()
        .then(res => setChapters(res.data))
        .catch(err => console.error(err));

        getLesson()
        .then(res => setLessons(res.data))
        .catch(err => console.error(err));
    }, []);

    //tìm subject hiện tại 
    const currentSubject = subjects.find(
        s => Number(s.subject_id) === Number(subjectId)
    )
    // 🔥 lọc chương theo môn
    const filteredChapters = chapters.filter(
        c => Number(c.subject_id) === Number(subjectId)
    );

    return (
        <main className='main'>
            <div className="home-ten">
                <Header />
            </div>
            {/* Khung trên */}
            <section className='hero-section-ten'>
                <div className='container-ten'>
                    {/* Phần chữ */}
                    {/* <div className="back-revise">
                        <a href="/practice">Quay lại</a>
                    </div> */}
                    <div className='body-layout-ten'>
                        <div className='body-text-ten'>
                            <h1>{currentSubject?.subject_name}</h1>
                        </div>

                        {/* Tìm kiiếm */}
                        {/* <div className="revise-search">
                            <input type="text" placeholder="Tìm kiếm..." />
                        </div> */}
                    </div>
                </div>
            </section>

            {/* Khung dưới */}
            <section className='feature-section-ten'>
                <div className="feature-list-ten">
                    {/* Chương  */}
                   {filteredChapters.map((chapter) => (
                         <div className="card-list" key={chapter.chapter_id}>
                        <h2>Chương {chapter.chapter_number}: {chapter.chapter_name}</h2>
                        <div className="card-list-ten">
                           {lessons
                            .filter(l => Number(l.chapter_id) === Number(chapter.chapter_id))
                            .map((lesson) => (
                                 <div className="card-ten-item" key={lesson.lesson_id}>
                                <h3>Trắc nghiệm</h3>
                                <h4> Bài {lesson.lesson_number} - {lesson.lesson_name}</h4>
                                {/* trang làm đề */}
                                <button className="btn-practice"
                                    onClick={() => navigate(`/practice/${subjectId}/${lesson.lesson_id}`)}
                                >Làm đề</button>
                            </div>
                            ))}
                            
                        </div>
                    </div>
                   ))}

                    {/* Chương 2 */}
                    

                    {/* Chương 3 */}
                    

                </div>
            </section>
            {/* </div> */}
        </main>

    )
}

export default ReviseLop10
