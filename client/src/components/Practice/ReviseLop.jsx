import { useEffect, useState } from 'react';
import Header from '../Home/Header'
import './css/reviseLop.css'

import { useNavigate, useParams } from 'react-router-dom';
import { getChapters } from '../../api/chapterApi';
import { getLesson } from '../../api/lessonApi';
import { getSubjects } from '../../api/subjectApi';
import Footer from '../Home/Footer';

function ReviseLop() {

    const navigate = useNavigate();

    const { subjectId } = useParams();

    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [lessons, setLessons] = useState([]);

    const [doneLessons, setDoneLessons] = useState([]);

    // ================= LOAD DATA =================
    //Gom 3 API rời rạc thành Promise.all bọc trong try-catch giúp load cực nhanh
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Bắn cả 3 API đi cùng một lúc
                const [subjectsRes, chaptersRes, lessonsRes] = await Promise.all([
                    getSubjects(),
                    getChapters(),
                    getLesson()
                ]);

                // Đổ dữ liệu vào state sau khi tất cả đã tải xong
                setSubjects(subjectsRes.data);
                setChapters(chaptersRes.data);
                setLessons(lessonsRes.data);
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu học tập:", err);
            }
        };

        fetchInitialData();
    }, []);

    // ================= LẤY USER =================
    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const userId = user?.user_id;

    const storageKey = `doneLessons_${userId}`;

    // ================= LOAD DONE LESSON =================
    useEffect(() => {

        const saved = JSON.parse(
            localStorage.getItem(storageKey)
        ) || [];

        setDoneLessons(saved);

    }, [storageKey]);

    // ================= SUBJECT HIỆN TẠI =================
    const currentSubject = subjects.find(
        s => Number(s.subject_id) === Number(subjectId)
    );

    // ================= FILTER CHAPTER =================
    const filteredChapters = chapters.filter(
        c => Number(c.subject_id) === Number(subjectId)
    );

    return (
        <main className='main-ten'>

            <div>
                <Header />
            </div>

            {/* TOP */}
            <section className='hero-section-ten'>

                <div className='container-ten'>

                    <div className='body-layout-ten'>

                        <div className='body-text-ten'>
                            <h1>{currentSubject?.subject_name}</h1>
                        </div>

                    </div>

                </div>

            </section>

            {/* LIST */}
            <section className='feature-section-ten'>

                <div className="feature-list-ten">

                    {filteredChapters.map((chapter) => (

                        <div
                            className="card-list"
                            key={chapter.chapter_id}
                        >

                            <h2>
                                Chương {chapter.chapter_number}: {chapter.chapter_name}
                            </h2>

                            <div className="card-list-ten">

                                {lessons
                                    .filter(
                                        l => Number(l.chapter_id) === Number(chapter.chapter_id)
                                    )
                                    .map((lesson) => (

                                        <div
                                            key={lesson.lesson_id}
                                            className={`card-ten-item ${
                                                doneLessons.includes(Number(lesson.lesson_id))
                                                    ? "done"
                                                    : ""
                                            }`}
                                        >

                                            <h3>Trắc nghiệm</h3>

                                            <h4>
                                                Bài {lesson.lesson_number} - {lesson.lesson_name}
                                            </h4>

                                            <button
                                                className="btn-practice-lop"
                                                onClick={() => {

                                                    const user = JSON.parse(
                                                        localStorage.getItem("user")
                                                    );

                                                    if (!user) {

                                                        alert("Bạn chưa đăng nhập");

                                                        navigate("/login");

                                                        return;
                                                    }

                                                    navigate(
                                                        `/practice/${subjectId}/${lesson.lesson_id}`
                                                    );

                                                }}
                                            >
                                                Làm đề
                                            </button>

                                        </div>

                                    ))}

                            </div>

                        </div>

                    ))}

                </div>

            </section>

            {/* <Footer /> */}

        </main>
    );
}

export default ReviseLop;