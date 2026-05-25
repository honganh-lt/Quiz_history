// examApi.jsx
// import axios from "axios";
import axiosClient from "../../../api/axiosClient";


// URL API backend
const API_URL = "/exams";

// GET tất cả exam ALL
export const getExams = async () => {
  try {
    const res = await axiosClient.get(API_URL);
    return res.data;
  } catch (err) {
     console.error(err);
     throw err;
  }
};

//====Get Detail======= user
// export const getExamDetail = async (id) => {
//   try {
//     const res = await axiosClient.get(`${API_URL}/${id}`);
//     return res.data;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }



// POST tạo exam thủ công
// export const createExam = async (data) => {
//   try {
//     const res = await axiosClient.post(API_URL, data);
//     return res.data;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

//POst CREATE RANDOM theo subject = BE
export const createExamBySubject = async (data) => {
  try {
   const res = await axiosClient.post(`${API_URL}/subject`, data);
  return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

//Thống kê độ khó
export const getDifficultyCount = async (subjectId) => {
    return axiosClient.get(
        `${API_URL}/difficulty-count/${subjectId}`
    );
};



// PUT cập nhật exam theo id
// export const updateExam = async (id, data) => {
//   try {
//     const res = await axiosClient.put(`${API_URL}/${id}`, data);
//     return res.data;
//   } catch (err) {
//     console.error("Lỗi PUT exam:", err);
//     throw err;
//   }
// };
// export const checkExamLock = (id) => {
//   return axiosClient.get(`${API_URL}/check-lock/${id}`);
// };

// DELETE exam theo id
// export const deleteExam = async (id) => {
//   try {
//     const res = await axiosClient.delete(`${API_URL}/${id}`);
//     return res.data;
//   } catch (err) {
//     console.error("Lỗi DELETE exam:", err);
//     throw err;
//   }
// };