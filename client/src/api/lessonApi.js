// import axios from "axios";
// import axiosClient from "../../../api/axiosClient";

import axiosClient from "./axiosClient";

const BASE_URL = "/lessons";

export const getLesson = () => axiosClient.get(BASE_URL);