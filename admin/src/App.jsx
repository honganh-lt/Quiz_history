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
// import { ManagementExam } from './components/Exam/ManageExam'
import ManagementSubject from './components/Subject/ManagementSubject'
// import ManageChapters from './components/Topics/ManageChapters'
import ManagementChapters from './components/Topics/ManagementChapters'
import ManagementExam from './components/Exam/ManagementExam'
import { ManagementUserExam } from './components/UserExam/ManagementUserExam'
import UserExamDetail from './components/UserExam/UserExamDetail'

import AdminLayout from './LayoutAdmin/AdminLayout'
import ProtectedRoute from './Login/ProtectedRoute'
import ManagementDocument from './components/Document/ManagementDocument'
// import ManageTopics from './components/Chapters/ManageTopics'

function App() {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <Routes>

      {/* Trang login KHÔNG có sidebar */}
      {/* =====LOGIN không layout */}
      <Route path="/login" element={<LoginAdmin />} />

      {/* Trang admin (có bảo vệ + layout) */}
      <Route path="/admin" element={
        // <div className="grid-container"> Login - LayoutAmin
            <ProtectedRoute>
                <AdminLayout>
                  <Home />
                </AdminLayout>
            </ProtectedRoute>
        // </div>
      } />

      <Route path="/users" element={
        
            <ProtectedRoute>
                <AdminLayout>
                  <UserManagement />
                </AdminLayout>
            </ProtectedRoute>
      } />
      <Route path="/subjects" element={
        
            <ProtectedRoute>
                <AdminLayout>
                  <ManagementSubject />
                </AdminLayout>
            </ProtectedRoute>
      
      } />

      <Route path="/chapters" element={
        
            <ProtectedRoute>
                <AdminLayout>
                  <ManagementChapters />
                </AdminLayout>
            </ProtectedRoute>
        
      } />
      <Route path="/lessons" element={
        
            <ProtectedRoute>
                <AdminLayout>
                  <ManageLessons />
                </AdminLayout>
            </ProtectedRoute>
       
      } />
      <Route path="/document" element={
        
            <ProtectedRoute>
                <AdminLayout>
                  <ManagementDocument />
                </AdminLayout>
            </ProtectedRoute>
       
      } />
      <Route path="/questions" element={
        
            <ProtectedRoute>
                <AdminLayout>
                  <ManageQuestions />
                </AdminLayout>
            </ProtectedRoute>
        
      } />

      <Route path="/exam" element={
       
            <ProtectedRoute>
                <AdminLayout>
                  <ManagementExam />
                </AdminLayout>
            </ProtectedRoute>
       
      } />
      <Route path="/user-exam" element={
        
            <ProtectedRoute>
                <AdminLayout>
                  <ManagementUserExam />
                </AdminLayout>
            </ProtectedRoute>
        
      } />

      <Route path="/admin/user-exam/:id" element={ 
            <ProtectedRoute>
                <AdminLayout>
                  <UserExamDetail />
                </AdminLayout>
            </ProtectedRoute>
      } />

      {/* vào web sẽ chuyển về login */}
      <Route path="/" element={<Navigate to="/login" />} />

    </Routes>
  )
}

export default App