// import axios from "axios";
// import axiosClient from "./axiosClient";
import axiosClient from "../../../api/axiosClient";

const BASE_URL = "http://localhost:3000/api/subjects";

export const getSubjects = () => axiosClient.get(BASE_URL);