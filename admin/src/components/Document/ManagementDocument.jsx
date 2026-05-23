import {
    useEffect,
    useState
} from "react";

import {

    getAllDocuments,

    deleteDocument

} from "../../api/documentApi";



const ManagementDocument = () => {

    const [documents, setDocuments] = useState([]);




    useEffect(() => {

        fetchDocuments();

    }, []);




    const fetchDocuments = async () => {

        try {

            const data =
                await getAllDocuments();

            setDocuments(data);

        } catch (error) {

            console.log(error);
        }
    };




    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Bạn có chắc muốn xoá?"
            );



        if (!confirmDelete) return;



        try {

            await deleteDocument(id);

            alert("Xoá thành công");

            fetchDocuments();

        } catch (error) {

            console.log(error);
        }
    };




    return (

        <div>

            <h2>
                Quản lý tài liệu
            </h2>



            <table border="1">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Tên tài liệu</th>

                        <th>Bài học</th>

                        <th>PDF</th>

                        <th>Xóa</th>

                    </tr>

                </thead>




                <tbody>

                    {
                        documents.map((item) => (

                            <tr
                                key={
                                    item.document_id
                                }
                            >

                                <td>
                                    {item.document_id}
                                </td>



                                <td>
                                    {item.title}
                                </td>



                                <td>
                                    {item.lesson_name}
                                </td>



                                <td>

                                    <a
                                        href={`http://localhost:5000/${item.file_url}`}
                                        target="_blank"
                                    >
                                        Xem PDF
                                    </a>

                                </td>



                                <td>

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                item.document_id
                                            )
                                        }
                                    >
                                        Xóa
                                    </button>

                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>
    );
};



export default ManagementDocument;