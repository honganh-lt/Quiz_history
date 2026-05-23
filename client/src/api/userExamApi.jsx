// import axios from "axios";

import axiosClient from "../../../api/axiosClient";

const BASE_URL = "/user-exam";

// export const startExam = (data) => {
//     const token = localStorage.getItem("access_token")

//     return axiosClient.post(`${BASE_URL}/start`, data,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }
//     )
// };
//lấy đề thi time bd-kt lấy dữ liệu câu hỏi hiển thị cho người dùng
export const getAllUserExams = () => axiosClient.get(`${BASE_URL}`); 
export const startExam = (data) => {
    return axiosClient.post(`${BASE_URL}/start`, data);
};
// export const getExam = (id) => axios.get(`${BASE_URL}/exam/${id}`);
// export const submitExam = (data) => {
//     const token = localStorage.getItem("access_token")

//     return axiosClient.post(`${BASE_URL}/submit`, data,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }
//     )
// };
//nộp bài
export const submitExam = (data) => {
    return axiosClient.post(`${BASE_URL}/submit`, data);
};


// export const getHistory = (userId) => {
//     const token = localStorage.getItem("access_token")

//     return axiosClient.get(`${BASE_URL}/history/${userId}`,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }
//     )
// };
export const getHistory = (userId) => {
    return axiosClient.get(`${BASE_URL}/history/${userId}`);
};

export const reviewExam = (id) => {
    return axiosClient.get(`${BASE_URL}/review/${id}`);
};

// export const getExamAttempts = () => axios.get(`${BASE_URL}`);