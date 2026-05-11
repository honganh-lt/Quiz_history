// import axios from "axios";
import axiosClient from "../../../api/axiosClient";


const API_URL = "/users";

export const getUser = async () => {
    try {
        const res = await axiosClient.get(API_URL);
        return res.data;
    } catch (err) {
        console.error(err);
        
    }
}

//POST
// export const create
export const createdUser = async (data) => {
    return await axiosClient.post(`${API_URL}`, data);
}

//put
export const updateUsers= async (id, data) => {
    return await axiosClient.put(`${API_URL}/${id}`, data);
}

//delete
export const deleteUser = async (id) => {
    return await axiosClient.delete(`${API_URL}/${id}`);
}