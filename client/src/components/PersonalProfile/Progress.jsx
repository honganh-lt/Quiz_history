import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getHistory } from '../../api/userExamApi';
import { getExams } from '../../api/examApi';
import "./css/Progress.css";
import Header from '../Home/Header';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const Progress = () => {
  const [data, setData] = useState([]);
  const [exams, setExams] = useState([]);
  const [pageMap, setPageMap] = useState({});

  const navigate = useNavigate();
  const { subjectId } = useParams();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.user_id;

  const pageSize = 2;

  //Gom 2 API chạy song song qua Promise.all và bọc try-catch, chặn request nếu chưa có userId
  useEffect(() => {
    if (!userId) return;

    const fetchProgressData = async () => {
      try {
        const [historyRes, examsRes] = await Promise.all([
          getHistory(userId),
          getExams()
        ]);

        setData(historyRes.data || []);
        setExams(examsRes.data || []);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu tiến độ học tập:", err);
      }
    };

    fetchProgressData();
  }, [userId]);

  // FILTER SUBJECT
  const filteredData = useMemo(() => {
    return data.filter(
      item =>
        item.status === "submitted" &&
        Number(item.subject_id) === Number(subjectId)
    );
  }, [data, subjectId]);

  // tên môn học --> để chưa làm vẫn hiện tên môn
  const subjectName = useMemo(() => {
    const exam = exams.find(
      e => Number(e.subject_id) === Number(subjectId)
    );
    return exam?.subject_name || "Môn học";
  }, [exams, subjectId]);

  // GROUP EXAM
  const grouped = useMemo(() => {
    const map = {};

    filteredData.forEach(item => {
      const exam = (item.title || "").trim();

      if (!map[exam]) {
        map[exam] = {
          title: exam,
          attempts: []
        };
      }

      map[exam].attempts.push(item);
    });

    return map;
  }, [filteredData]);

  // CHART DATA -> hiển thị 
  const chartData = useMemo(() => {
    return Object.values(grouped).flatMap(exam =>
      exam.attempts.map((a, index) => ({
        name: `${exam.title} - L${index + 1}`,
        score: a.score || 0
      }))
    );
  }, [grouped]);

  // PROGRESS
  const doneExams = new Set(filteredData.map(i => i.exam_id)).size;

  const totalExams = exams.filter(
    e => Number(e.subject_id) === Number(subjectId)
  ).length;

  const progress = totalExams === 0
    ? 0
    : Math.round((doneExams / totalExams) * 100);

  const changePage = (examTitle, page) => {
    setPageMap(prev => ({
      ...prev,
      [examTitle]: page
    }));
  };

  // Trả về giao diện chặn nếu chưa đăng nhập
  if (!userId) return <p>Chưa đăng nhập</p>;

  return (
    <div>
      <Header />
      <div className="progress-container">
      
        <h2>Tiến độ môn {subjectName}</h2>

        {/* PROGRESS BAR */}
        <div className="progress">
          <h3>{progress}%</h3>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Thông báo chưa làm đề nào */}
        {filteredData.length === 0 && (
          <p style={{ marginTop: 10, color: "#888" }}>
            Bạn chưa làm đề thi môn này
          </p>
        )}

        {/* CHART */}
        <div className="chart-box">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#4f46e5"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* LIST EXAM */}
        {Object.values(grouped).map(exam => {
          // phân trang
          const currentPage = pageMap[exam.title] || 1;
          const start = (currentPage - 1) * pageSize;
          const end = start + pageSize;
          const totalPages = Math.ceil(exam.attempts.length / pageSize);
          const paged = exam.attempts.slice(start, end);

          return (
            <div key={exam.title} className="exam-box">
              <h4>{exam.title}</h4>

              {/* ATTEMPTS */}
              {paged.map((a, index) => (
                <div key={a.user_exam_id} className="attempt-card">
                  <div className="attempt-info">
                    <div>Đề số {start + index + 1}</div>
                    <div>Điểm: {a.score || 0}</div>
                    <div>
                      {new Date(a.start_time).toLocaleString("vi-VN")} -{" "}
                      {new Date(a.end_time).toLocaleString("vi-VN")}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/review/${a.user_exam_id}`)}
                  >
                    Xem chi tiết
                  </button>
                </div>
              ))}

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => changePage(exam.title, currentPage - 1)}
                  >
                    &lt;
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      className={currentPage === i + 1 ? "active" : ""}
                      onClick={() => changePage(exam.title, i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => changePage(exam.title, currentPage + 1)}
                  >
                    &gt;
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Progress;