// import { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// // import API của bạn
// import { createDocument } from "../../api/documentApi";

// const AddDocument = () => {
//     const [title, setTitle] = useState("");
//     const [content, setContent] = useState("");

//     const modules = {
//         toolbar: [
//             [{ header: [1, 2, 3, false] }],
//             ["bold", "italic", "underline"],
//             [{ list: "ordered" }, { list: "bullet" }],
//             ["link", "image"],
//             ["clean"]
//         ]
//     };

//     const formats = [
//         "header",
//         "bold",
//         "italic",
//         "underline",
//         "list",
//         "bullet",
//         "link",
//         "image"
//     ];

//     const handleSubmit = async () => {
//         try {
//             const res = await createDocument({
//                 title,
//                 content
//             });

//             console.log("Saved:", res);
//             alert("Tạo tài liệu thành công!");
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     return (
//         <div style={{ padding: "20px" }}>
//             <h2>Thêm tài liệu</h2>

//             <input
//                 placeholder="Nhập tiêu đề..."
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 style={{ width: "100%", padding: "10px", marginBottom: 10 }}
//             />

//             <ReactQuill
//                 value={content}
//                 onChange={setContent}
//                 modules={modules}
//                 formats={formats}
//                 placeholder="Nhập nội dung tài liệu..."
//             />

//             <button onClick={handleSubmit} style={{ marginTop: 10 }}>
//                 Lưu
//             </button>
//         </div>
//     );
// };

// export default AddDocument;