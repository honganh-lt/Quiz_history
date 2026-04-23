import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllUserExams, getUserExamDetail } from '../../api/userExanApi';

export const UserExamDetail = () => {

    const { id } = useParams();
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        getAllUserExams()
        .then(res => setUserData(res.data))
        .catch(err => console.log(err));
    })

    //dùng để tìm dữ liệu người thi không dùng getAllUserExam nữa:
    const currentUserExam = userData.find(
    item => item.user_exam_id === Number(id)
);

    useEffect(() => {
        // getAllUserExams()
        // .then(res => setData(res.data))
        // .catch(err => console.log(err));


        getUserExamDetail(id)
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [id]);

    //Format Ngày - Giờ
    const formatDateTime = (dateString) => {
        if(!dateString) return "-";

        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;

        return `${day}/${month}/${year}, ${String(hours).padStart(2, "0")}:${minutes}:${seconds}:${ampm}`;
    }

  return (
    <div className='admin-container'>
        <h2>Chi tiết bài thi người dùng</h2>

        {/* Thông người làm bài */}
        {currentUserExam && (
            <div>
                <h4>Môn học: {currentUserExam.subject_name}</h4>
                <h4>Đề thi: {currentUserExam.exam_title}</h4>
                <h4>Thời gian bắt đầu: {formatDateTime(currentUserExam.start_time)}</h4>
                <h4>Thời gian kết thúc: {formatDateTime(currentUserExam.end_time)}</h4>
                <h4>Điểm: {currentUserExam.score}</h4>
                <h4>Username: {currentUserExam.username}</h4>
            </div>
        )}


        {/* Thông tin bài thi */}
        {data.map((q, index) => (
            <div key={q.question_id}>
                <h4> Câu {index + 1}: {q.question}</h4>
                {q.answers.map(a => (
                    <div key={a.answer_id}>
                        <span
                            style={{
                                color:
                                    a.answer_id === a.user_answer_id
                                        ? (a.is_correct === 1 ? "green" : "red")
                                        : (a.is_correct === 1 ? "green" : "black"),
                                fontWeight: a.answer_id === a.user_answer_id ? "bold" : "normal"
                            }}
                        >
                            {a.answer}
                        </span>
                    </div>
                ))}
            </div>
        ))}
    </div>
  )
}

export default UserExamDetail