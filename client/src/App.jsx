import { Routes, Route } from 'react-router-dom'
import Homepage from './components/Home/homepage'
import Practice from './components/Practice/Practice'
import Login from './components/RegisterLogin/Login'
import Signup from './components/RegisterLogin/Register'
import ReviseLop from './components/Practice/ReviseLop'
import ExamLop from './components/Exam/ExamLop'
import Revise from './components/Practice/Revise'
import Exam2 from './components/Exam/Exam2'
import MakeAnExamTen from './components/ExamMakeAnExam/MakeAnExamTen'
import MakeAnExamTenResult from './components/ExamMakeAnExam/MakeAnExamTenResult'
import Exam from './components/Exam/Exam'
import Profile from './components/PersonalProfile/Profile'
import ExamTen from './components/Practice/ExamPractice/ExamTen'
// import ExamTenAnswer from './components/Practice/ExamPractice/ExamTenAnswer'
import ReviewPage from './components/PersonalProfile/ReviewPage'

function App() {
  return (
    <Routes>
      {/* <Route path="/login" element={<LoginSignup />} /> */}
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/" element={<Homepage />} />

      {/* Hồ sơ */}
      <Route path='/profile' element={<Profile />}/>

      {/* Ôn tập */}
      {/* <Route path="/practice" element={<Revise />} /> Vì trong Practice chứa Revise*/}
      {/* Ấn vào Ôn tập(/practice) -> hiện ra từng môn học -> tiếp ấn "Luyện tập" (/practice/:subjectId) */}
      {/* Revise */}
      <Route path="/practice" element={<Practice />} /> 
      <Route path="/practice/:subjectId" element={<ReviseLop />} />

      {/* Làm đề ôn tập */}
      <Route path="/practice/:subjectId/:lessonId" element={<ExamTen />} />
      {/* <Route path="/practice/:subjectId/:lessonId/answer" element={<ExamTenAnswer />} /> */}

      
      {/* ============================Luyện thi============================ */}
      <Route path="/exam" element={<Exam />} />
      <Route path="/exam/:subjectId" element={<ExamLop />} />

      {/* làm đề thi */}
      <Route path="/exam/:subjectId/:examId/:userExamId" element={<MakeAnExamTen/>} />
      <Route path="/result/:userExamId" element={<MakeAnExamTenResult />} />

        {/* Review */}
        <Route path="/review/:userExamId" element={<ReviewPage />} />

    </Routes>
  )
}

export default App


