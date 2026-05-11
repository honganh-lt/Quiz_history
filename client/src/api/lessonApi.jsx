// import axios from "axios";
import axiosClient from "../../../api/axiosClient";

const BASE_URL = "/lessons";

export const getLesson = () => axiosClient.get(BASE_URL);