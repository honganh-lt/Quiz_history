import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory } from '../../api/userExamApi';
import "./css/DownProfile.css"

const DownProfile = () => {

  const [data, setData] = useState([]);
  const [openSubject, setOpenSubject] = useState(null);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user_id;

  // ================= LOAD DATA =================
  useEffect(() => {
    if (userId) {
      getHistory(userId)
        .then(res => {
          console.log("HISTORY:", res.data);
          setData(res.data || []);
        })
        .catch(err => console.log(err));
    }
  }, [userId]);

  // ================= GROUP DATA =================
  const grouped = useMemo(() => {
    const map = {};

    data.forEach(item => {
      const subject = (item.subject_name || "").trim();
      const exam = (item.title || "").trim();

      if (!map[subject]) map[subject] = {};

      if (!map[subject][exam]) {
        map[subject][exam] = {
          title: exam,
          attempts: [],
          bestScore: 0
        };
      }

      const score = item.score || 0;

      map[subject][exam].attempts.push(item);

      map[subject][exam].bestScore = Math.max(
        map[subject][exam].bestScore,
        score
      );
    });

    return map;
  }, [data]);

  // ================= UI GUARD =================
  if (!userId) return <p>Chưa đăng nhập</p>;
  if (!data.length) return <p>Chưa có lịch sử làm bài</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lịch sử học tập</h2>

      {Object.keys(grouped).map(subject => (
        <div key={subject} style={{ marginBottom: "20px" }}>

          {/* ===== HEADER CLICK ===== */}
          <div
            style={{
              cursor: "pointer",
              background: "#eee",
              padding: "10px",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between"
            }}
            onClick={() =>
              setOpenSubject(prev =>
                prev === subject ? null : subject
              )
            }
          >
            <h3 style={{ margin: 0 }}>{subject}</h3>
            <span>{openSubject === subject ? "▲" : "▼"}</span>
          </div>

          {/* ===== CONTENT ===== */}
          {openSubject === subject && (
            <div style={{ marginTop: "10px" }}>

              {Object.values(grouped[subject]).map(exam => (
                <div
                  key={exam.title + "_" + exam.attempts[0]?.exam_id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "8px"
                  }}
                >
                  <h4>{exam.title}</h4>

                  <p>Số lần thi: <b>{exam.attempts.length}</b></p>
                  <p>Điểm cao nhất: <b>{exam.bestScore.toFixed(1)}</b></p>

                  {/* ===== ATTEMPTS ===== */}
                  {exam.attempts.map((a, index) => (
                    <div
                      key={a.user_exam_id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "6px"
                      }}
                    >
                      <span>
                        Lần {index + 1} - {a.score ? a.score.toFixed(1) : 0} điểm
                      </span>

                      {a.status === "submitted" ? (
                        <button
                          onClick={() =>
                            navigate(`/review/${a.user_exam_id}`)
                          }
                        >
                          Xem lại
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            navigate(
                              `/exam/${a.subject_id}/${a.exam_id}/${a.user_exam_id}`
                            )
                          }
                        >
                          Làm tiếp
                        </button>
                      )}
                    </div>
                  ))}

                </div>
              ))}

            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DownProfile;