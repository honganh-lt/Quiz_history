// import axios from "axios";
import axiosClient from "../../../api/axiosClient";

const BASE_URL = "http://localhost:3000/api/lessons";

export const getLesson = () => axiosClient.get(BASE_URL);