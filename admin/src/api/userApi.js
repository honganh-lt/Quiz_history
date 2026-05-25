import axiosClient from "./axiosAdmin";


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

//====Status===
export const toggleBlockUsers = async (id) => {
    return await axiosClient.put(`${API_URL}/block/${id}`);
}

//put
export const updateUsers= async (id, data) => {
    return await axiosClient.put(`${API_URL}/${id}`, data);
}

//delete
export const deleteUser = async (id) => {
    return await axiosClient.delete(`${API_URL}/${id}`);
}

