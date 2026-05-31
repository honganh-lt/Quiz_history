import React, { useEffect, useState } from 'react'
import { getDashBoardStats } from '../../api/dashboardApi';
import { Bar, Pie } from 'react-chartjs-2';
// import { data } from 'react-router-dom';
import "./home.css"
import "chart.js/auto";

export const Home = () => {

    const [stats, setStats] = useState(null);

    useEffect(() => {
        getDashBoardStats()
        .then(res => {
            console.log("DATA:", res.data); // QUAN TRỌNG
            setStats(res.data);
        })
        .catch(err => console.log(err));
    }, []);

    //biểu đồ
    // const barData = {
    //     labels: ["Câu hỏi", "Đề thi", "Người dùng", "Môn học"],
    //     datasets: [
    //         {
    //             label: "Số lượng",
    //             data: stats 
    //             ? [
    //                 stats.questions,
    //                 stats.exams,
    //                 stats.users,
    //                 stats.subjects
    //             ]
    //             :[],
    //             backgroundColor: "#4e73df"
    //         }
    //     ]
    // };

    // const pieData = {
    //     labels: ["Easy", "Medium", "Hard"],
    //     datasets: [
    //         {
    //             data: stats
    //             ? [
    //                 stats.difficulty.easy,
    //                 stats.difficulty.medium,
    //                 stats.difficulty.hard
    //             ]
    //             : [],
    //             backgroundColor: ["#f6c23e", "#1cc88a", "#e74a3b"]
    //         }
    //     ]
    // }

  return (
    <div className="admin-container">
        <div className="dashboard">
        {/* Box */}
        <div className="top-box">
            <div>{stats?.questions} <p>Số câu hỏi</p></div>
            <div>{stats?.exams} <p>Số đề thi</p></div>
            <div>{stats?.users} <p>Số người dùng</p></div>
            <div>{stats?.subjects} <p>Số môn học</p></div>
            {/* <div>{stats?.questions} <p>Số câu hỏi</p></div> */}
        </div>

        {/* Chart */}
        {/* <div className="chart-row">
            <div style={{ width: "60%" }}>
                <Bar data={barData} />
                </div>
        </div> */}
    </div>
    </div>
  )
}
{/* <div style={{ width: "40%" }}>
                <Pie data={pieData} />
            </div> */}

export default Home;