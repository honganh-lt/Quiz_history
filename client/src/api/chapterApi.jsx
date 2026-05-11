// import axios from "axios";
import axiosClient from "../../../api/axiosClient";

const BASE_URL = "/chapters";

export const getChapters = () => axiosClient.get(BASE_URL);