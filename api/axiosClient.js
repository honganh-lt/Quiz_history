import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:3000/api"
});

// Tự động gắn token
axiosClient.interceptors.request.use(config => {

    const token = localStorage.getItem("access_token");

    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Tự logout khi token hết hạn
axiosClient.interceptors.response.use(
    response => response,

    error => {

        if(error.response?.status === 403) {

            alert("Phiên đăng nhập đã hết hạn hoặc tài khoản đã bị khóa");

            localStorage.clear();

            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default axiosClient;