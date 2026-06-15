import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true // Thêm cái này để hỗ trợ đọc/ghi cookie (nếu BE dùng cookie cho refresh token)
});

// ===== 1. TỰ ĐỘNG GẮN TOKEN (REQUEST) =====
axiosClient.interceptors.request.use(config => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ===== 2. XỬ LÝ PHẢN HỒI & LỖI TẬP TRUNG (RESPONSE) =====
axiosClient.interceptors.response.use(
    // Nếu API chạy thành công (Status 2xx)
    (response) => {
        // Tự động bóc tách trả về response.data luôn cho FE đỡ phải viết .data nhiều lần
        // LƯU Ý: Nếu code cũ ở các file API của bạn đang dùng dạng `result.data.message` 
        // thì khi dùng dòng này bạn chỉ cần viết `result.message`. Nếu muốn giữ nguyên cấu trúc cũ 100% 
        // thì bạn có thể sửa dòng dưới thành: return response;
        return response; 
    },

    async (error) => {

        if (error.response?.data?.message) {
            error.message = error.response.data.message;
        }

        const originalRequest = error.config;

        // Access token hết hạn
        if (
            error.response?.status === 401 &&
            error.response?.data?.message === "Token đã hết hạn" &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken =
                    localStorage.getItem("refresh_token");

                const res = await axios.post(
                    "http://localhost:3000/api/auth/refresh-token",
                    {
                        refresh_token: refreshToken
                    }
                );

                const newAccessToken =
                    res.data.access_token;

                localStorage.setItem(
                    "access_token",
                    newAccessToken
                );

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return axiosClient(originalRequest);

            } catch (refreshError) {

                localStorage.clear();

                alert("Phiên đăng nhập đã hết hạn");

                window.location.href = "/";

                return Promise.reject(refreshError);
            }
        }

        // Tài khoản bị khóa hoặc refresh token không hợp lệ
        if (error.response?.status === 403) {

            alert(error.message);

            localStorage.clear();

            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default axiosClient;