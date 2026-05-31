import { useNavigate } from "react-router-dom";
import "./css/DownProfile.css";
import { useEffect, useState } from "react";
import { getSubjects } from "../../api/subjectApi";

const DownProfile = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);

  //Chuyển đổi API getSubjects sang cấu trúc async/await và try-catch
  useEffect(() => {
    const fetchSubjectsHistory = async () => {
      try {
        const res = await getSubjects();
        setSubjects(res.data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách môn học lịch sử học tập:", err);
      }
    };

    fetchSubjectsHistory();
  }, []);

  return (
    <div className="profile-container">
      <h2 className="title">Lịch sử học tập</h2>

      <div className="subject-list">
        {subjects.map((item) => {
          // ảnh theo từng môn
          let currentImage = "";

          if (item.subject_id === 1) {
            currentImage = "/imghome/5.jpg";
          } else if (item.subject_id === 2) {
            currentImage = "/imghome/6.jpg";
          } else if (item.subject_id === 3) {
            currentImage = "/imghome/8.jpg";
          }

          return (
            <div className="subject-card" key={item.subject_id}>
              <div className="subject-card-item">
                <img
                  src={currentImage}
                  alt={item.subject_name}
                  className="subject-image"
                />

                <div className="profile-nav">
                  <h2>{item.subject_name}</h2>

                  <button
                    onClick={() => navigate(`/progress/${item.subject_id}`)}
                  >
                    Tiến độ
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DownProfile;