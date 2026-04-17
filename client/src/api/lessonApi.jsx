import axios from "axios";

const BASE_URL = "http://localhost:3000/api/lessons";

export const getLesson = () => axios.get(BASE_URL);