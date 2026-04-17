import axios from "axios";

const BASE_URL = "http://localhost:3000/api/subjects";

export const getSubjects = () => axios.get(BASE_URL);