// import axiosClient from "./axiosAdmin";

// const API_URL = "/question-reports";

// export const getReports = async () => {
//     try {
//         const res = await axiosClient.get(API_URL);
//         return res.data;
//     } catch (error) {
//         console.error(error);
//         return [];
//     }
// };

// export const updateReportStatus = async (
//     id,
//     data
// ) => {
//     return await axiosClient.put(
//         `${API_URL}/${id}`,
//         data
//     );
// };

// // DELETE
// export const deleteReport = async (id) => {
//     return await axiosClient.delete(
//         `${API_URL}/${id}`
//     );
// };