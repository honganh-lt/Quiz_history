// import axios from "axios";
import axiosClient from "../../../api/axiosClient";

const BASE_URL = "http://localhost:3000/api/questions";

export const getQuestionsByLesson = (lessonId) =>
    axiosClient.get(`${BASE_URL}?lessonId=${lessonId}`);