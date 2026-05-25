import axiosClient from "./axiosAdmin";


const API_URL = "/questions";

// GET
export const getQuestion = async () => {
    try {
        const res = await axiosClient.get(API_URL);
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

// POST (đã fix đúng format mới)
export const createQuestion = async (data) => {
    try {
        const res = await axiosClient.post(API_URL, data);
        return res.data; //  quan trọng
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// PUT
export const updateQuestion = async (id, data) => {
    try {
        const res = await axiosClient.put(`${API_URL}/${id}`, data);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// DELETE
export const deleteQuestion = async (id) => {
    try {
        const res = await axiosClient.delete(`${API_URL}/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//import - gửi formData
export const importQuestions = async (formData) => {
    try {
        const res = await axiosClient.post(
            `${API_URL}/import`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        return res.data;

    } catch(err) {
        console.log(err);
        throw err;
    }
}