import axios from "axios";

const API_URL = "http://localhost:3000/api/lessons";

//Tạo function đồng bộ
//GET
export const getLesson = async () => {
    try {
        const res = await axios.get(API_URL);
        return res.data;
    } catch(error) {
        console.error(error);
        return [];
    }
}

//POST
export const createLesson = async (data) => {
    return await axios.post(API_URL, data);
}

//PUT
export const updateLesson = async (id, data) => {
    return await axios.put(`${API_URL}/${id}`, data);
}

//DELETE
export const deleteLesson = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
}