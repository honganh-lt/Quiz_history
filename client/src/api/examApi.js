// import axios from "axios";
// import axiosClient from "../../../api/axiosClient";

import axiosClient from "./axiosClient";

const BASE_URL = "/exams";

export const getExams = () => axiosClient.get(BASE_URL)

//chi tiết câu hỏi cho đề thi và đáp án
export const getExamDetail = (examId) => {
    return axiosClient.get(`${BASE_URL}/${examId}`);
};