// import axiosClient from "./axiosClient"a;

import axiosClient from "../../../api/axiosClient";

const BASE_URL = "/auth";

export const login = async (username, password) => {

    const response = await axiosClient.post(`${BASE_URL}/login`, {
        username,
        password
    });

    return response.data;
};

export const register = async (username, fullName, email, password) => {

    const response = await axiosClient.post(`${BASE_URL}/register`, {
        username,
        full_name: fullName,
        email,
        password
    });

    return response.data;
};

//authApi-userApi 
export const forgotPassword = (data) => {
    return axiosClient.post(
        `${BASE_URL}/forgot-password`,
        data
    );
};

export const verifyOtp = (data) => {
    return axiosClient.post(
        `${BASE_URL}/verify-otp`,
        data
    );
};

export const changePassword = (data, token) => {
    return axiosClient.post(
        `${BASE_URL}/change-password`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const logout = async (refresh_token) => {

    const response = await axiosClient.post(`$${BASE_URL}/logout`, {
        refresh_token
    });

    return response.data;
};