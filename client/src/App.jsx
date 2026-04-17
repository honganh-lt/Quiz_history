import { Routes, Route } from 'react-router-dom'
import Homepage from './components/Home/homepage'
import Practice from './components/Practice/Practice'
// import LoginSignup from './components/RegisterLogin/LoginSignup'
import Login from './components/RegisterLogin/Login'
import Signup from './components/RegisterLogin/Register'
import ReviseLop10 from './components/Practice/ReviseLop10'
// import ReviseLop11 from './components/Practice/ReviseLop11'
// import ReviseLop12 from './components/Practice/ReviseLop12'
// import ExamTen from './components/ExamPractice/ExamTen'
// import ExamTenAnswer from './components/ExamPractice/ExamTenAnswer'
// import ExamEleven from './components/ExamPractice/ExamEleven'
// import ExamElevenAnswer from './components/ExamPractice/ExamElevenAnswer'
import ExamLop10 from './components/Exam/ExamLop10'
import Revise from './components/Practice/Revise'
import Exam2 from './components/Exam/Exam2'
import MakeAnExamTen from './components/ExamMakeAnExam/MakeAnExamTen'
// import MakeAnExamTenAnswer from './components/ExamMakeAnExam/MakeAnExamTenAnswer'
import MakeAnExamTenResult from './components/ExamMakeAnExam/MakeAnExamTenResult'
import Exam from './components/Exam/Exam'
import Profile from './components/PersonalProfile/Profile'
import ExamTen from './components/Practice/ExamPractice/ExamTen'
import ExamTenAnswer from './components/Practice/ExamPractice/ExamTenAnswer'
// import MakeAnExamTen from './components/ExamMakeAnExam/MakeAnExamTen'
// import ExamTen from './components/Exam/Examten'
// import Exam10 from './components/Practice/ExamPractice/Exam10'

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
      {/* Revise */}
      <Route path="/practice" element={<Practice />} /> 

      <Route path="/practice/:subjectId" element={<ReviseLop10 />} />
      {/* <Route path="/practice/lop-11" element={<ReviseLop11 />} />
      <Route path="/practice/lop-12" element={<ReviseLop12 />} /> */}
      {/* <Route path="/practice/:className/:lessonId" element={<Practice />} /> */}

      {/* Làm đề ôn tập */}
      <Route path="/practice/:subjectId/:lessonId" element={<ExamTen />} />
      <Route path="/practice/:subjectId/:lessonId/answer" element={<ExamTenAnswer />} />

      {/* <Route path="/practice/lop-11/:lessonId" element={<ExamEleven />} />
      <Route path="/practice/lop-11/:lessonId/answer" element={<ExamElevenAnswer />} /> */}

      {/* Luyện thi */}
      <Route path="/exam" element={<Exam />} />
      <Route path="/exam/lop-10" element={<ExamLop10 />} />

      {/* làm đề thi */}
      <Route path="/exam/lop-10/:examId" element={<MakeAnExamTen />} />
<Route path="/exam/lop-10/:examId/answer" element={<MakeAnExamTenResult />} />


    </Routes>
  )
}

export default App


