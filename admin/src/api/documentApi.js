import axiosClient from "./axiosAdmin";

// =========================
// TẠO TÀI LIỆU (SGK TEXT)
// =========================
export const createDocument = async (data) => {

    try {

        const res = await axiosClient.post(
            "/documents/create",
            data
        );

        return res.data;

    } catch (error) {
        console.log(error);
        throw error;
    }
};



// =========================
// LẤY THEO BÀI HỌC
// =========================
// export const getDocumentsByLesson = async (lessonId) => {

//     try {

//         const res = await axiosClient.get(
//             `/documents/${lessonId}`
//         );

//         return res.data;

//     } catch (error) {
//         console.log(error);
//         return [];
//     }
// };

// =========================
// CẬP NHẬT TÀI LIỆU (SỬA)
// =========================
export const updateDocument = async (id, data) => {
    try {
        const res = await axiosClient.put(
            `/documents/update/${id}`, // Endpoint này phải trùng với route PUT bạn khai báo ở Backend
            data
        );

        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// =========================
// XÓA TÀI LIỆU
// =========================
export const deleteDocument = async (id) => {

    try {

        const res = await axiosClient.delete(
            `/documents/${id}`
        );

        return res.data;

    } catch (error) {
        console.log(error);
        throw error;
    }
};



// =========================
// LẤY TẤT CẢ (ADMIN)
// =========================
export const getAllDocuments = async () => {

    try {

        const res = await axiosClient.get(
            "/documents"
        );

        return res.data;

    } catch (error) {
        console.log(error);
        return [];
    }
};