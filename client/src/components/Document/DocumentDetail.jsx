import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { getDocumentDetail } from "../../api/documentApi";

import "./DocumentDetail.css";
import Header from "../Home/Header";

const DocumentDetail = () => {

    const { documentId } = useParams();

    const [document, setDocument] = useState(null);

    useEffect(() => {

        fetchDetail();

    }, [documentId]);

    const fetchDetail = async () => {

        const data =
            await getDocumentDetail(documentId);

        setDocument(data);
    };

    if (!document) {

        return <h2>Loading...</h2>;
    }

    return (
        
        <div className="detail-document">
            <Header/>
            <div className="detail-page">

            <div className="detail-card">

                <div className="detail-subject">

                    {/* {document.subject_name} */}

                </div>

                {/* <h1>

                    {document.title}

                </h1> */}

                <div
                    className="detail-content"

                    dangerouslySetInnerHTML={{
                        __html: document.content
                    }}
                />

            </div>

        </div>
        </div>
    );
};

export default DocumentDetail;