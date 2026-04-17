import axios from "axios";

const BASE_URL = "http://localhost:3000/api/chapters";

export const getChapters = () => axios.get(BASE_URL);