import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    getDocumentsBySubject
} from "../../api/documentApi";

import "./Document.css";
import Header from "../Home/Header";

const Document = () => {

    const { subjectId } = useParams();

    const navigate = useNavigate();

    const [documents, setDocuments] = useState([]);

    const [subjectName, setSubjectName] = useState("");

    useEffect(() => {

        fetchDocuments();

    }, [subjectId]);

    const fetchDocuments = async () => {

        try {

            const data =
                await getDocumentsBySubject(subjectId);

            setDocuments(data);

            // lấy tên môn
            if (data.length > 0) {

                setSubjectName(
                    data[0].subject_name
                );
            }

        } catch (error) {

            console.log(error);
        }
    };

    // GROUP CHƯƠNG
    const groupedDocuments = {};

    documents.forEach((item) => {

        const chapterKey =
            item.chapter_id;

        if (!groupedDocuments[chapterKey]) {

            groupedDocuments[chapterKey] = {

                chapter_number:
                    item.chapter_number,

                chapter_name:
                    item.chapter_name,

                lessons: []
            };
        }

        groupedDocuments[chapterKey]
            .lessons
            .push(item);
    });

    return (

        <div className="document">
            <Header/>
            <div className="document-page">

            {/* tên môn */}
            <h1 className="subject-title">
                {subjectName || "Tài liệu học tập"}
            </h1>

            <div className="chapter-grid">

                {
                    Object.values(groupedDocuments)
                        .map((chapter, index) => (

                        <div
                            className="chapter-card"
                            key={index}
                        >

                            <h2>

                                Chương
                                {" "}
                                {chapter.chapter_number}
                                :
                                {" "}
                                {chapter.chapter_name}

                            </h2>

                            {
                                chapter.lessons.map((lesson) => (

                                    <div
                                        key={lesson.document_id}

                                        className="lesson-item"

                                        onClick={() =>
                                            navigate(
                                                `/document-detail/${lesson.document_id}`
                                            )
                                        }
                                    >

                                        <h3>

                                            Bài
                                            {" "}
                                            {lesson.lesson_number}
                                            :
                                            {" "}
                                            {lesson.lesson_name}

                                        </h3>

                                    </div>
                                ))
                            }

                        </div>
                    ))
                }

            </div>

        </div>
        </div>
    );
};

export default Document;