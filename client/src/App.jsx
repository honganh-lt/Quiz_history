import { Routes, Route } from 'react-router-dom'
import Homepage from './components/Home/homepage'
import Practice from './components/Practice/Practice'
// import LoginSignup from './components/RegisterLogin/LoginSignup'
import Login from './components/RegisterLogin/Login'
import Signup from './components/RegisterLogin/Register'
import ReviseLop10 from './components/Practice/ReviseLop10'
import ReviseLop11 from './components/Practice/ReviseLop11'
import ReviseLop12 from './components/Practice/ReviseLop12'
import ExamTen from './components/ExamPractice/ExamTen'
import ExamTenAnswer from './components/ExamPractice/ExamTenAnswer'
import ExamEleven from './components/ExamPractice/ExamEleven'
import ExamElevenAnswer from './components/ExamPractice/ExamElevenAnswer'
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


      <Route path="/practice" element={<Practice />} />
      <Route path="/practice/lop-10" element={<ReviseLop10 />} />
      <Route path="/practice/lop-11" element={<ReviseLop11 />} />
      <Route path="/practice/lop-12" element={<ReviseLop12 />} />

      {/* Làm đề */}
      <Route path="/practice/lop-10/:lessonId" element={<ExamTen />} />
      <Route path="/practice/lop-10/:lessonId/answer" element={<ExamTenAnswer />} />

      <Route path="/practice/lop-11/:lessonId" element={<ExamEleven />} />
      <Route path="/practice/lop-11/:lessonId/answer" element={<ExamElevenAnswer />} />

    </Routes>
  )
}

export default App


