// import axios from "axios";
// import axiosClient from "../../../api/axiosClient";

import axiosClient from "./axiosClient";

const BASE_URL = "/chapters";

export const getChapters = () => axiosClient.get(BASE_URL);