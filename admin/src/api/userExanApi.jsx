import axios from "axios";

const API_URL = "http://localhost:3000/api/user-exam";


export const getAllUserExams = async () => {
    try {
        const res = await axios.get(API_URL);
        return res; // trả nguyên axios response
    } catch (err) {
        console.error(err);
        
    }
} 

export const getUserExamDetail = (id) => {
    return axios.get(`${API_URL}/review/${id}`)
}
// export const getAllUserExams = async () => {
//     try {
//         const res = await axios.get(API_URL);
//         return res.data;
//     } catch (err) {
//         console.error(err);
        
//     }
// } vì api BE là : res.json(rows); nghĩa là axios nhận đc là res.data = rows (mảng luôn)
//nên return res.data; là sai cấu trúc


