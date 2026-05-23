// import axiosClient from "../utils/axiosClient";

import axiosClient from "../../../api/axiosClient";



// upload tài liệu
export const createDocument = async (formData) => {

    try {

        const res = await axiosClient.post(
            "/documents",
            formData
        );

        return res.data;

    } catch (error) {

        console.log(error);

        throw error;
    }
};

// lấy tất cả tài liệu
export const getAllDocuments = async () => {

    try {

        const res = await axiosClient.get(
            "/documents"
        );

        return res.data;

    } catch (error) {

        console.log(error);

        return [];
    }
};

// xoá tài liệu
export const deleteDocument = async (id) => {

    try {

        const res = await axiosClient.delete(
            `/documents/${id}`
        );

        return res.data;

    } catch (error) {

        console.log(error);

        throw error;
    }
};