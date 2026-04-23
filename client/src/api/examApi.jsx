import axios from "axios";

const BASE_URL = "http://localhost:3000/api/exams";

export const getExams = () => axios.get(BASE_URL)

export const getExamDetail = (examId) => {
    return axios.get(`${BASE_URL}/${examId}`);
};