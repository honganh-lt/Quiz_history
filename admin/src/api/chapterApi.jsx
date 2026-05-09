// import axios from "axios";
import axiosClient from "../../../api/axiosClient";

// import { data } from "react-router-dom";

//Đường dẫn tới API BE
const API_URL = "http://localhost:3000/api/chapters";

// Tạo function bất đồng bộ
//GET
export const getChapters = async () => {
    // Thêm try-catch
    try {
        const res = await axiosClient.get(API_URL);
        return res.data;
    } catch (error) {
        console.error("Error fetching chapters", error);
        return [];
    }
};

//POST
export const createChapter = async (data) => {
    return await axiosClient.post(API_URL, data);
}

//PUT
export const updateChapter = async (id, data) => {
    return await axiosClient.put(`${API_URL}/${id}`, data);
}

//Delete
export const deleteChapter = async (id) => {
    return await axiosClient.delete(`${API_URL}/${id}`);
}