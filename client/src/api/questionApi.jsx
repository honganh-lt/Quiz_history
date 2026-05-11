// import axios from "axios";
import axiosClient from "../../../api/axiosClient";

const BASE_URL = "/questions";

export const getQuestionsByLesson = (lessonId) =>
    axiosClient.get(`${BASE_URL}?lessonId=${lessonId}`);