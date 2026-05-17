import { useNavigate } from "react-router-dom";
import "./css/DownProfile.css";
import { useEffect, useState } from "react";
import { getSubjects } from "../../api/subjectApi";


const DownProfile = () => {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);

  //load môn học từ DB
  useEffect(() => {
    getSubjects()
    .then(res => setSubjects(res.data))
    .catch(err => console.log(err));
  }, []);

return (
    <div className="profile-container">
        <h2 className="title">Lịch sử học tập</h2>

    <div className="subject-list">
      {subjects.map((item) => (
        <div className="subject-card" key={item.subject_id}>

          <div className="subject-card-item">
            <img src="./imghome/5.jpg" alt="" style={{ width: "160px" }} />

            <div className="profile-nav">
              <h2>{item.subject_name}</h2>
              <button
                onClick={() =>
                  navigate(`/progress/${item.subject_id}`)
                }
              >
                Tiến độ
              </button>

            </div>
          </div>
        </div>
      ))}
        
    </div>


    </div>
  );
};

export default DownProfile;