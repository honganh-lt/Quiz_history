// import axios from "axios";
import axiosClient from "../../../api/axiosClient";

const API_URL = "/auth";

export const login = async (username, password) => {
    const response = await axiosClient.post(`${API_URL}/login`, {
        username,
        password
    });

    return response.data;
};

export const logout = async (refresh_token) => {
    return await axiosClient.post(`${API_URL}/logout`, {
        refresh_token
    })
}

// THÊM CÁI NÀY
export const getAdmin = async () => {
    const token = localStorage.getItem("access_token");

    return await axiosClient.get(`${API_URL}/admin`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
