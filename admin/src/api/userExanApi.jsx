// import axios from "axios";
import axiosClient from "../../../api/axiosClient";


const API_URL = "/user-exam";


export const getAllUserExams = async () => {
    try {
        const res = await axiosClient.get(API_URL);
        return res; // trả nguyên axios response
    } catch (err) {
        console.error(err);
        
    }
} 

// export const getUserExamDetail = (id) => {
//     return axios.get(`${API_URL}/review/${id}`)
// }
export const getUserExamDetail = (id) => {

    const token = localStorage.getItem("access_token");

    return axiosClient.get(
        `${API_URL}/review/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
}
        
//     }
// } vì api BE là : res.json(rows); nghĩa là axios nhận đc là res.data = rows (mảng luôn)
//nên return res.data; là sai cấu trúc


