// import axiosClient from "../../../api/axiosClient";

import axiosClient from "./axiosClient";

// danh sách tài liệu môn chương bài
export const getDocumentsBySubject = async (subjectId) => {

    try {

        const res = await axiosClient.get(
            `/documents/subject/${subjectId}`
        );

        return res.data;

    } catch (error) {

        console.log(error);

        return [];
    }
};

// chi tiết tài liệu theo bài học
export const getDocumentDetail = async (documentId) => {

    try {

        const res = await axiosClient.get(
            `/documents/detail/${documentId}`
        );

        return res.data;

    } catch (error) {

        console.log(error);

        return null;
    }
};