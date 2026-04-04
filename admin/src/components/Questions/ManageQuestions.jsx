import React, { useEffect, useState } from 'react'
import "./ManageQuestions.css"
import { deleteQuestion, getQuestion } from '../../api/questionApi';
import { getChapters } from '../../api/chapterApi';
import AddQuestionModal from './AddQuestionModal';
import { getSubjects } from '../../api/subjectService';
import EditQuestionModal from './EditQuestionModal';

export const ManageQuestions = () => {

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  //Thêm state điều khiển modal
  const [isOpen, setIsOpen] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [subjects, setSubjects] = useState([]);


  //==========Edit===============
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null); //Lí do?
  //============Phân trang===========
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  useEffect(() => {
    fetchData();
    fetchChapters(); //add
    fetchSubjects(); //add
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
    .slice(0, 4); // 🔥 CHỈ LẤY 4
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

  //ADD
  const fetchChapters = async () => {
    try {
      const data = await getChapters();
      setChapters(data);
    } catch (error) {
      console.error(error);
      
    }
  }
  const fetchSubjects = async () => {
    try {
      const data = await getSubjects();
      setSubjects(data);
    } catch (error){
      console.error(error);
    }
  }


  //EDIT
  // const updateQues = (updatedQues) => {
  //   setQuestions(prevQues => 
  //     prevQues.map(ques => 
  //       ques.question_id === updatedQues.question_id ? updatedQues : ques
  //     )
  //   )
  // }

  //DELETE
  const handleDelete = async (id) => {
    if(!window.confirm("Bạn có chắc chắn muốn xóa không?"));
    await deleteQuestion(id);
    fetchData();//bắt buộc
  }

  //Phân trang
    const indexOfLastChap = currentPage * questionsPerPage;
    const indexOfFirstChap = indexOfLastChap - questionsPerPage;

    //slice từ danh sách chapters
    const currentQuestion = questions.slice(indexOfFirstChap, indexOfLastChap);
    const totalPages = Math.ceil(questions.length / questionsPerPage);

  return (
    <div className='admin-container'>
      {/* Top bar */}
      <div className="top-bar">
        <h2>Quản lý câu hỏi</h2>
         <button 
          className='add-btn'
          onClick={() => setIsOpen(true)}
         >
          +
        </button>
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
              <th>Tên chương</th>
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
                <td title={q.chapter_name}>{q.chapter_name}</td>
                {/* <td>
                  {q.answers?.map((a, i) => (
                    <div key={i}>
                      {String.fromCharCode(65 + 1)}.{a.content}
                      {a.is_correct && "✅"}
                    </div>
                  ))}
                </td> */}
                
                {/* <td title={q.correct_answer}>{q.correct_answer}</td> */}

                <td>{getAnswer(q.answers, 0)}</td>
                <td>{getAnswer(q.answers, 1)}</td>
                <td>{getAnswer(q.answers, 2)}</td>
                <td>{getAnswer(q.answers, 3)}</td>
                <td>{getCorrectAnswer(q.answers)}</td>
  {/* Cột cuối → KHÔNG hover */}

                <td>
                  <button 
                    className='edit-btn'
                    onClick={() => {
                      setSelectedQuestion(q);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button 
                    className='delete-btn'
                    onClick={() => handleDelete(q.question_id)}
                  >
                    Delete
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

          {Array.from({length: totalPages}, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => {setCurrentPage(i+1)}}
            >
              {i + 1}
            </button>
          ))}

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
        />

        {/* Modal Edit */}
        {showEditModal && selectedQuestion && (
          <EditQuestionModal
            ques={selectedQuestion}
            onClose={() => setShowEditModal(false)}
            // updateQuestion={updateQues}   // ✅ đúng tên bị sai chỗ này nên không lấy được subject
            chapters={chapters}
            subjects={subjects}           // ✅ thêm dòng này
            onSuccess={fetchData}
          />
        )}
      </div>
    </div>
  )
}
