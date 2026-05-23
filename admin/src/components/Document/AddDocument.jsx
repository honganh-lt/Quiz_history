import { useState } from "react";

import {
    createDocument
} from "../../api/documentApi";



const AddDocument = () => {

    const [title, setTitle] = useState("");

    const [lessonId, setLessonId] = useState("");

    const [file, setFile] = useState(null);




    const handleUpload = async () => {

        try {

            const formData = new FormData();

            formData.append(
                "lesson_id",
                lessonId
            );

            formData.append(
                "title",
                title
            );

            formData.append(
                "file",
                file
            );



            await createDocument(formData);



            alert("Upload thành công");

        } catch (error) {

            console.log(error);
        }
    };




    return (

        <div>

            <h2>Upload tài liệu</h2>



            <input
                type="text"
                placeholder="Tên tài liệu"
                onChange={(e) =>
                    setTitle(e.target.value)
                }
            />



            <input
                type="number"
                placeholder="Lesson ID"
                onChange={(e) =>
                    setLessonId(e.target.value)
                }
            />



            <input
                type="file"
                accept="application/pdf"
                onChange={(e) =>
                    setFile(e.target.files[0])
                }
            />



            <button onClick={handleUpload}>
                Upload
            </button>

        </div>
    );
};



export default AddDocument;