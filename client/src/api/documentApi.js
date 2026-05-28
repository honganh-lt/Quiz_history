import axiosClient from "./axiosClient";

// Danh sách tài liệu môn chương bài
export const getDocumentsBySubject = async (subjectId) => {
    try {
        const res = await axiosClient.get(`/documents/subject/${subjectId}`);
        // Nếu Backend trả về object dạng { data: [...] } thì res.data là mảng. 
        // Đảm bảo trả về mảng dữ liệu sạch
        return res.data; 
    } catch (error) {
        console.error("Lỗi lấy danh sách tài liệu:", error);
        return [];
    }
};

// Chi tiết tài liệu theo bài học
export const getDocumentDetail = async (documentId) => {
    try {
        const res = await axiosClient.get(`/documents/detail/${documentId}`);
        return res.data;
    } catch (error) {
        console.error("Lỗi lấy chi tiết tài liệu:", error);
        return null;
    }
};