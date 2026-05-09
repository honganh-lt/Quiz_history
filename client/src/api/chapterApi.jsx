// import axios from "axios";
import axiosClient from "../../../api/axiosClient";

const BASE_URL = "http://localhost:3000/api/chapters";

export const getChapters = () => axiosClient.get(BASE_URL);