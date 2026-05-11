// import axios from "axios"
import axiosClient from "../../../api/axiosClient";


const API_URL = "/dashboard";

export const getDashBoardStats = ()  => {
    return axiosClient.get(API_URL)
}