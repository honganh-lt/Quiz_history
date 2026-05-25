import axiosClient from "./axiosAdmin";


const API_URL = "/dashboard";

export const getDashBoardStats = ()  => {
    return axiosClient.get(API_URL)
}