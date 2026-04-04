// examApi.jsx
import axios from "axios";

// URL API backend
const API_URL = "http://localhost:3000/api/exam";

// GET tất cả exam
export const getExam = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    console.error("Lỗi GET exam:", err);
    return [];
  }
};

// POST tạo exam bình thường
export const createExam = async (data) => {
  try {
    const res = await axios.post(`${API_URL}`, data);
    return res.data;
  } catch (err) {
    console.error("Lỗi POST exam:", err);
    throw err;
  }
};

// POST tạo exam + random câu hỏi (full exam)
export const createFullExam = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/create-full`, data);
    return res.data;
  } catch (err) {
    console.error("Lỗi POST full exam:", err);
    throw err;
  }
};

// PUT cập nhật exam theo id
export const updateExam = async (id, data) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Lỗi PUT exam:", err);
    throw err;
  }
};

// DELETE exam theo id
export const deleteExam = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi DELETE exam:", err);
    throw err;
  }
};