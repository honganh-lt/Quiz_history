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
import DownProfile from './components/PersonalProfile/DownProfile'
// import DetailDownProfile from './components/PersonalProfile/DetailDownProfile'
import Progress from './components/PersonalProfile/Progress'
import ForgotPassword from './components/RegisterLogin/ForgotPassword'
// import ResetPassword from './components/RegisterLogin/ResetPassword'
import ChangePassword from './components/PersonalProfile/changePassword'
import Document from './components/Document/Document'
import DocumentDetail from './components/Document/DocumentDetail'

function App() {
  return (
    <Routes>
      {/* <Route path="/login" element={<LoginSignup />} /> */}
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> */}
      <Route path="/change-password" element={<ChangePassword />} />


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
      {/* hãy chọn đề */}
      <Route path="/exam/:subjectId" element={<ExamLop />} />

      {/* làm đề thi */}
      <Route path="/exam/:subjectId/:examId/" element={<MakeAnExamTen/>} />
      {/* trang kết quả */}
      <Route path="/result/:userExamId" element={<MakeAnExamTenResult />} />

        {/* Review */}
        <Route path="/review/:userExamId" element={<ReviewPage />} />
        <Route path="/progress/:subjectId" element={<Progress />} />


        <Route path="/document/:subjectId" element={<Document />} />
        <Route path="/document-detail/:documentId" element={<DocumentDetail />}/>
    </Routes>
  )
}

export default App


