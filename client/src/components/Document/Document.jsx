import {
    useEffect,
    useState
} from "react";
import { getDocumentsByLesson } from "../../api/documentApi";

// import {
    // getDocumentsByLesson
// } from "../../api/documentApi";



const Document = ({ lessonId }) => {

    const [documents, setDocuments] = useState([]);




    useEffect(() => {

        if (!lessonId) return;

        fetchDocuments();

    }, [lessonId]);




    const fetchDocuments = async () => {

        try {

            const data =
                await getDocumentsByLesson(
                    lessonId
                );

            setDocuments(data);

        } catch (error) {

            console.log(error);
        }
    };




    return (

        <div>

            {
                documents.map((item) => (

                    <div
                        key={item.document_id}
                    >

                        <h2>
                            {item.title}
                        </h2>



                        <iframe
                            src={`http://localhost:5000/${item.file_url}`}
                            width="100%"
                            height="700px"
                            title={item.title}
                        />

                    </div>
                ))
            }

        </div>
    );
};



export default Document;