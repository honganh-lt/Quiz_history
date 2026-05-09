// import axios from "axios"
import axiosClient from "../../../api/axiosClient";


const API_URL = "http://localhost:3000/api/dashboard";

export const getDashBoardStats = ()  => {
    return axiosClient.get(API_URL)
}