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
        const res = await axiosClient.put(`/documents/${id}`, formData);
        return res.data; // <--- CHÚ Ý: Chấm .data ở đây
    } catch (error) {
        console.error(error);
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