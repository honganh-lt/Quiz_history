// import axios from "axios";
import axiosClient from "../../../api/axiosClient";


const API_URL = "http://localhost:3000/api/lessons";

//Tạo function đồng bộ
//GET
export const getLesson = async (chapterId) => {
    try {
        let url = API_URL;

        if (chapterId) {
            url += `?chapter_id=${chapterId}`;
        }

        const res = await axiosClient.get(url);
        return res.data;
    } catch(error) {
        console.error(error);
        return [];
    }
};

//POST
export const createLesson = async (data) => {
    return await axiosClient.post(API_URL, data);
}

//PUT
export const updateLesson = async (id, data) => {
    return await axiosClient.put(`${API_URL}/${id}`, data);
}

//DELETE
export const deleteLesson = async (id) => {
    return await axiosClient.delete(`${API_URL}/${id}`);
}