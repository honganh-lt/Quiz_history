// import axios from "axios";
// import axiosClient from "./axiosClient";
// import axiosClient from "../../../api/axiosClient";

import axiosClient from "./axiosClient";

const BASE_URL = "/subjects";

export const getSubjects = () => axiosClient.get(BASE_URL);