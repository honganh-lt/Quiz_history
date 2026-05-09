import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, {
        username,
        password
    });

    return response.data;
};

export const logout = async (refresh_token) => {
    return await axios.post("http://localhost:3000/api/auth/logout", {
        refresh_token
    })
}

// THÊM CÁI NÀY
export const getAdmin = async () => {
    const token = localStorage.getItem("access_token");

    return await axios.get(`${API_URL}/admin`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
