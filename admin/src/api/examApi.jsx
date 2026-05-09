// examApi.jsx
// import axios from "axios";
import axiosClient from "../../../api/axiosClient";


// URL API backend
const API_URL = "http://localhost:3000/api/exams";

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

//====Get Detail=======
export const getExamDetail = async (id) => {
  try {
    const res = await axiosClient.get(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}


// POST tạo exam thủ công
export const createExam = async (data) => {
  try {
    const res = await axiosClient.post(API_URL, data);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

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



// PUT cập nhật exam theo id
export const updateExams = async (id, data) => {
  try {
    const res = await axiosClient.put(`${API_URL}/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Lỗi PUT exam:", err);
    throw err;
  }
};

// DELETE exam theo id
export const deleteExam = async (id) => {
  try {
    const res = await axiosClient.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi DELETE exam:", err);
    throw err;
  }
};