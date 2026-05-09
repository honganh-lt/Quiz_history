// import axios from "axios";
import axiosClient from "../../../api/axiosClient";

const BASE_URL = "http://localhost:3000/api/exams";

export const getExams = () => axiosClient.get(BASE_URL)

//chi tiết câu hỏi cho đề thi 
export const getExamDetail = (examId) => {
    return axiosClient.get(`${BASE_URL}/${examId}`);
};