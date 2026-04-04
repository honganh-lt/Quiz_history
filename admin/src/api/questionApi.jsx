import axios from "axios";

const API_URL = "http://localhost:3000/api/questions";

// GET
export const getQuestion = async () => {
    try {
        const res = await axios.get(API_URL);
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

// POST (đã fix đúng format mới)
export const createQuestion = async (data) => {
    try {
        const res = await axios.post(API_URL, data);
        return res.data; // 🔥 quan trọng
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// PUT
export const updateQuestion = async (id, data) => {
    try {
        const res = await axios.put(`${API_URL}/${id}`, data);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// DELETE
export const deleteQuestion = async (id) => {
    try {
        const res = await axios.delete(`${API_URL}/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};