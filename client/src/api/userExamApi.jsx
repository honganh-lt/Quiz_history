import axios from "axios";

const BASE_URL = "http://localhost:3000/api/user-exam";

export const startExam = (data) => axios.post(`${BASE_URL}/start`, data);
// export const getExam = (id) => axios.get(`${BASE_URL}/exam/${id}`);
export const submitExam = (data) => axios.post(`${BASE_URL}/submit`, data);


export const getHistory = (userId) => axios.get(`${BASE_URL}/history/${userId}`);
export const reviewExam = (id) => axios.get(`${BASE_URL}/review/${id}`);
export const getAllUserExams = () => axios.get(`${BASE_URL}`);
// export const getExamAttempts = () => axios.get(`${BASE_URL}`);