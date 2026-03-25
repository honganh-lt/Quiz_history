import axios from "axios";
// import { data } from "react-router-dom";
import App from "../App";

// Đây là đường dẫn tới API BE trùng với route bạn đã tạo ở BE
// app.use("/api/subjects", subjectRoutes);
// GET http://localhost:3000/api/subjects
const API_URL = "http://localhost:3000/api/subjects";

// Tạo function bất đồng bộ (async) ; export để component khác dùng được
export const getSubjects = async () => {

    //Thêm try-catch để tránh crash : ??????????
    try {
    // gửi request GET lên backend ; await = đợi server trả dữ liệu
    const res =  await axios.get(API_URL);

    // Lấy phần data trong response trả về cho component React => Đây chính là dữ liệu từ database
    return res.data;
    } catch (error) {
        console.error("Error fetching subjects:", error);
    return [];
  }
};

export const createSubject = async (data) => {
  return await axios.post(API_URL, data);
};

export const updateSubject = async (id, data) => {
  return await axios.put(`${API_URL}/${id}`, data);
}

export const deleteSubject = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
}

// res(response) có dạng:
// {
//   data: [...],      // dữ liệu từ DB
//   status: 200,
//   headers: {...}
// }

// Import thư viện axios
// Dùng để gọi API từ frontend (React → Backend)

// 📌 Axios giúp:

// Gửi request (GET, POST, PUT, DELETE)
// Nhận dữ liệu dễ hơn fetch