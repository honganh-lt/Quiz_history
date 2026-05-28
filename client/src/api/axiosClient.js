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

    // Nếu API bị lỗi (Status 4xx, 5xx...)
    (error) => {
        // ĐOẠN PHÉP THUẬT: Đè tin nhắn tiếng Anh bằng tin nhắn tiếng Việt từ BE trả về
        if (error.response && error.response.data && error.response.data.message) {
            error.message = error.response.data.message; 
        }

        // LOGIC CŨ CỦA BẠN: Tự logout khi token hết hạn hoặc tài khoản bị khóa
        if (error.response?.status === 403) {
            alert(error.message || "Phiên đăng nhập đã hết hạn hoặc tài khoản đã bị khóa");
            localStorage.clear();
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default axiosClient;