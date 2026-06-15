import React, { useEffect, useState } from 'react'
import "./ManageQuestions.css"
import { deleteQuestion, getQuestion } from '../../api/questionApi';
import { getChapters } from '../../api/chapterApi';
import AddQuestionModal from './AddQuestionModal';
import { getSubjects } from '../../api/subjectApi';
import EditQuestionModal from './EditQuestionModal';
import { getLesson } from '../../api/lessonApi';
import ImportQuestionModal from './ImportQuestionModal';

export const ManageQuestions = () => {

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  //Thêm state điều khiển modal
  const [isOpen, setIsOpen] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [lessons, setLessons] = useState([]);

  //=====Search=====
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");

  //==========Edit===============
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null); //Lí do?
  //Import
  // const [selectedFile, setSelectedFile] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  //============Phân trang===========
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

  useEffect(() => {
    fetchData();
    fetchChapters(); //add
    fetchSubjects(); //add
    // fetchLessons(); //add
  }, []);

  //GET===questions
  const fetchData = async () => {
    try{
      const data = await getQuestion();
      setQuestions(data);
    }catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

 const getSortedAnswers = (answers) => {
  return [...(answers || [])]
    .sort((a, b) => a.answer_id - b.answer_id)
    .slice(0, 4); // CHỈ LẤY 4
};

const getAnswer = (answers, index) => {
  const sorted = getSortedAnswers(answers);
  return sorted[index]?.content || "";
};

const getCorrectAnswer = (answers) => {
  const sorted = getSortedAnswers(answers);
  const i = sorted.findIndex(a => a.is_correct);
  return i !== -1 ? String.fromCharCode(65 + i) : "";
};

  //=========Search=========
  const normalize = (str) => 
    str 
      ?.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase(); //chữ in thường
      
  // const filteredQuestion = questions.filter((q) => 
  //   normalize(q.subject_name).includes(normalize(search)) ||
  //   normalize(q.content).includes(normalize(search)) ||
  //   normalize(q.difficulty).includes(normalize(search))
  // );

  const filteredQuestion = questions.filter((q) => {
    const matchSearch =
      search === "" ||
      normalize(q.content).includes(normalize(search));

    const matchSubject =
      subjectFilter === "" ||
      q.subject_name === subjectFilter;

  const matchDifficulty =
    difficultyFilter === "" ||
    normalize(q.difficulty) === normalize(difficultyFilter);

      return (
        matchSearch &&
        matchSubject &&
        matchDifficulty
      );
    });

//   const filterStats = filteredQuestion.reduce(
//   (acc, q) => {
//     acc.subject_name++;

//     const diff = q.difficulty?.toLowerCase();

//     if (diff === "easy") acc.easy++;
//     if (diff === "medium") acc.medium++;
//     if (diff === "hard") acc.hard++;

//     return acc;
//   },
//   {
//     subject_name: 0,
//     easy: 0,
//     medium: 0,
//     hard: 0,
//   }
// );


  //ADD - subject, Chapter, lesson
  const fetchSubjects = async () => {
    try {
      const data = await getSubjects();
      setSubjects(data);
    } catch (error){
      console.error(error);
    }
  }
  const fetchChapters = async () => {
    try {
      const data = await getChapters();
      setChapters(data);
    } catch (error) {
      console.error(error);
      
    }
  }
  const fetchLessons = async (chapterId) => {
  try {
    const data = await getLesson(chapterId);
    console.log("LESSONS:", data);
    setLessons(data);
  } catch (error) {
    console.error(error);
    setLessons([]); //THÊM DÒNG NÀY
  }
};


  //EDIT
  // const updateQues = (updatedQues) => {
  //   setQuestions(prevQues => 
  //     prevQues.map(ques => 
  //       ques.question_id === updatedQues.question_id ? updatedQues : ques
  //     )
  //   )
  // }


  //DELETE
   //Delete
      const handleDelete = async (id) => {
  
          //Check FE có gọi không
          console.log("Delete id: ", id);
  
          if(window.confirm("Bạn có chắc muốn xóa không?")) {
            //Các file delete khác có thể thêm cái này try-catch
              try {
                  await deleteQuestion(id);
                  fetchData();
                } catch (error) {
                  console.error(error);
                  alert("Xóa thất bại!");
                }
          }
      }

  //Phân trang
    const indexOfLastChap = currentPage * questionsPerPage;
    const indexOfFirstChap = indexOfLastChap - questionsPerPage;

    //slice từ danh sách chapters
    const currentQuestion = filteredQuestion.slice(indexOfFirstChap, indexOfLastChap);
    const totalPages = Math.ceil(filteredQuestion.length / questionsPerPage);

  return (
    <div className='question-management'>
      {/* Top bar */}
      <div className="top-bar">
        <h2>Quản lý câu hỏi</h2>

        <div className="action-buttons">
          {/* <input 
            type="text"
            className='search-ques'
            placeholder='Tìm kiếm môn, độ khó,...'
            value={search}
            onChange={(e) => {setSearch(e.target.value);
              setCurrentPage(1); //tìm ở trang 1
            }} 
          />  */}
          <div className="filter-bar">

              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
              >
                <option value="">Tất cả môn</option>

                {subjects.map((s) => (
                  <option
                    key={s.subject_id}
                    value={s.subject_name}
                  >
                    {s.subject_name}
                  </option>
                ))}
              </select>

              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
              >
                <option value="">Tất cả độ khó</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              <input
                type="text"
                className='search-ques'
                placeholder="Tìm nội dung câu hỏi..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />

            </div>
            <button 
                className='add-btn'
                onClick={() => setIsOpen(true)}
            >
                +
            </button>

            <button
                className="import-btn"
                onClick={() => setShowImportModal(true)}
            >
                Import
            </button>
        </div>
      </div>

      {/* Phần thống kê mới thêm */}
      {/* ===== Thông tin câu hỏi ===== */}
      {/* <div className="question-info-bar">

        <div className="info-card">
          <span className="info-label">
            Tổng số câu hỏi
          </span>

          <span className="info-value">
            {questions.length}
          </span>
        </div>

        {search.trim() !== "" && (
          <div className="info-card search-result-card">
            <span className="info-label">
              Kết quả tìm kiếm
            </span>

            <span className="info-value">
              {filteredQuestion.length}
            </span>

          </div>
        )}

      </div> */}

      <div className="question-info-bar">
        {(subjectFilter || difficultyFilter || search) && (
          <div className="info-card">
            <span className="info-label">
              Kết quả 
            </span>

            <span className="info-value">
              {filteredQuestion.length}
            </span>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="main-content">
        {loading ? <p>Loading...</p> : (
          <table className="question-table">
          <thead>
            <tr>
              <th>Mã câu hỏi</th>
              <th>Nội dung</th>
              <th>Mức độ</th>
              <th>Phân loại</th>
              <th>Đáp án A</th>
              <th>Đáp án B</th>
              <th>Đáp án C</th>
              <th>Đáp án D</th>
              <th>Đáp án đúng</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentQuestion.map((q) => (
              <tr key={q.question_id}>
                <td>{q.question_id}</td>
                <td title={q.content}>{q.content}</td>
                <td title={q.difficulty}>{q.difficulty}</td>
                <td
                  title={`${q.subject_name} > Chương ${q.chapter_number}: ${q.chapter_name} > Bài ${q.lesson_number}: ${q.lesson_name}`}
                >
                  {q.subject_name} {" > "} 
                  Chương {q.chapter_number}: {q.chapter_name} {" > "} 
                  Bài {q.lesson_number}: {q.lesson_name}
                </td>
                {/* <td>
                  {q.answers?.map((a, i) => (
                    <div key={i}>
                      {String.fromCharCode(65 + 1)}.{a.content}
                      {a.is_correct && ""}
                    </div>
                  ))}
                </td> */}
                
                {/* <td title={q.correct_answer}>{q.correct_answer}</td> */}

                <td>{getAnswer(q.answers, 0)}</td>
                <td>{getAnswer(q.answers, 1)}</td>
                <td>{getAnswer(q.answers, 2)}</td>
                <td>{getAnswer(q.answers, 3)}</td>
                <td>{getCorrectAnswer(q.answers)}</td>

                <td>
                  <button 
                    className='edit-btn'
                    onClick={() => {
                      setSelectedQuestion(q);
                      setShowEditModal(true);
                    }}
                  >
                    {/* Edit */}
                   <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button 
                    className='delete-btn'
                    onClick={() => handleDelete(q.question_id)}
                  >
                    {/* Delete */}
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        ) }
        {/* Phân trang */}
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1 )}
          >
            <i className="fa-solid fa-angle-left"></i> 
          </button>

          {(() => {
            const pages = [];

            if (totalPages <= 7) {
              for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
              }
            } else {
              pages.push(1);

              if (currentPage > 3) {
                pages.push("...");
              }
              //Tính khoảng trang cần hiện trang hiện tại avf trước sau
              const start = Math.max(2, currentPage - 1);
              const end = Math.min(totalPages - 1, currentPage + 1);

              for (let i = start; i <= end; i++) {
                pages.push(i);
              }

              if (currentPage < totalPages - 2) {
                pages.push("...");
              }

              pages.push(totalPages);
            }

            return pages.map((page, index) =>
              page === "..." ? (
                <span key={index} className="pagination-dots">
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  className={currentPage === page ? "active" : ""}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              )
            );
          })()}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>

        {/* Render ADD */}
        <AddQuestionModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSuccess={fetchData}
          subjects={subjects}
          chapters={chapters}
          lessons={lessons}
          setLessons={setLessons}   // THÊM DÒNG NÀY
          fetchLessons={fetchLessons} // THÊM DÒNG NÀY
        />

        <ImportQuestionModal
          isOpen={showImportModal}
          onClose={() => setShowImportModal(false)}
          onSuccess={fetchData}

          subjects={subjects}
          chapters={chapters}
          lessons={lessons}
          setLessons={setLessons}
          fetchLessons={fetchLessons}
        />

        {/* Modal Edit */}
        {showEditModal && selectedQuestion && (
          <EditQuestionModal
            ques={selectedQuestion}
            onClose={() => setShowEditModal(false)}
            // updateQuestion={updateQues}   //  đúng tên bị sai chỗ này nên không lấy được subject
            chapters={chapters}
            subjects={subjects}   
            lessons={lessons}        //  thêm dòng này
            fetchLessons={fetchLessons}
            onSuccess={fetchData}
          />
        )}
      </div>
    </div>
  )
}

export default ManageQuestions;