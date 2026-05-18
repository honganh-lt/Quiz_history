// import { use } from "react";
// import axios from "axios";

import axiosClient from "../../../api/axiosClient";

const API_URL = "/users";

//authApi-userApi 
export const forgotPassword = (data) => {
    return axiosClient.post(
        `${API_URL}/forgot-password`,
        data
    );
};

export const verifyOtp = (data) => {
    return axiosClient.post(
        `${API_URL}/reset-password`,
        data
    );
};

export const changePassword = (data, token) => {
    return axiosClient.post(
        `${API_URL}/change-password`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};