import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

export const getUser = async () => {
    try {
        const res = await axios.get(API_URL);
        return res.data;
    } catch (err) {
        console.error(err);
        
    }
}

//POST
// export const create

//put
export const updateUser = async (id, data) => {
    return await axios.put(`${API_URL}/${id}`, data);
}

//delete
export const deleteUser = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
}