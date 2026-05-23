import axiosClient from "../../../api/axiosClient";

// lấy tài liệu theo lesson
export const getDocumentsByLesson = async (lessonId) => {

    try {

        const res = await axiosClient.get(
            `/documents/${lessonId}`
        );

        return res.data;

    } catch (error) {

        console.log(error);

        return [];
    }
};


