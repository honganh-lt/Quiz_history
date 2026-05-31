import axiosClient from "./axiosAdmin";

export const createDocument = async (formData) => {
    try {
        const res = await axiosClient.post("/documents", formData);
        return res.data; // <--- CHÚ Ý: Chấm .data ở đây
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateDocument = async (id, formData) => {
    try {
        // TRUYỀN THẲNG formData VÀO ĐÂY
        // Trình duyệt và file axiosClient của bạn sẽ tự xử lý đính kèm file
        const res = await axiosClient.put(`/documents/${id}`, formData);
        
        // Vì trong interceptor của bạn đang viết `return response;` (giữ nguyên cấu trúc cũ)
        // nên ở đây bạn vẫn cần `.data` để lấy dữ liệu trả về từ Server.
        return res.data; 
    } catch (error) {
        console.error("Lỗi tại API updateDocument:", error);
        throw error;
    }
};

export const deleteDocument = async (id) => {
    try {
        const res = await axiosClient.delete(`/documents/${id}`);
        return res.data; // <--- CHÚ Ý: Chấm .data ở đây
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllDocuments = async () => {
    try {
        const res = await axiosClient.get("/documents");
        return res.data; // <--- CHÚ Ý: Chấm .data ở đây
    } catch (error) {
        console.error(error);
        return [];
    }
};