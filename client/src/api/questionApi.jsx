import axios from "axios";

const BASE_URL = "http://localhost:3000/api/questions";

export const getQuestionsByLesson = (lessonId) =>
    axios.get(`${BASE_URL}?lessonId=${lessonId}`);