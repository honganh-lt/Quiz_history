import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { Routes, Route, Navigate } from 'react-router-dom'

// import Users from './components/Users/Users'
import Home from './components/Home/Home'
// import Questions from './components/Questions/Questions'
// import Chapters from './components/Chapters/Chapters'
import LoginAdmin from './Login/LoginAdmin'
import UserManagement from './components/Users/UserManagement'
// import ManageTopics from './components/Topics/ManageTopics'
import { ManageQuestions } from './components/Questions/ManageQuestions'
import { ManageLessons } from './components/Lessons/ManageLessons'
import { ManageExam } from './components/Exam/ManageExam'
import ManagementSubject from './components/Subject/ManagementSubject'
// import ManageChapters from './components/Topics/ManageChapters'
import ManagementChapters from './components/Topics/ManagementChapters'
// import ManageTopics from './components/Chapters/ManageTopics'

function App() {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <Routes>

      {/* Trang login KHÔNG có sidebar */}
      <Route path="/login" element={<LoginAdmin />} />

      {/* Trang admin */}
      <Route path="/admin" element={
        <div className="grid-container">
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar openSidebarToggle={openSidebarToggle} />
          <Home />
        </div>
      } />

      <Route path="/users" element={
        <div className="grid-container">
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar openSidebarToggle={openSidebarToggle} />
          <UserManagement />
        </div>
      } />
      <Route path="/subjects" element={
        <div className="grid-container">
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar openSidebarToggle={openSidebarToggle} />
          <ManagementSubject />
        </div>
      } />

      <Route path="/chapters" element={
        <div className="grid-container">
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar openSidebarToggle={openSidebarToggle} />
          {/* <ManageTopics/> */}
          <ManagementChapters/>
        </div>
      } />
      <Route path="/lessons" element={
        <div className="grid-container">
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar openSidebarToggle={openSidebarToggle} />
          <ManageLessons />
        </div>
      } />
      <Route path="/questions" element={
        <div className="grid-container">
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar openSidebarToggle={openSidebarToggle} />
          <ManageQuestions />
        </div>
      } />

      <Route path="/exam" element={
        <div className="grid-container">
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar openSidebarToggle={openSidebarToggle} />
          <ManageExam />
        </div>
      } />

      {/* vào web sẽ chuyển về login */}
      <Route path="/" element={<Navigate to="/login" />} />

    </Routes>
  )
}

export default App