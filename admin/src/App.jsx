import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { Routes, Route, Navigate } from 'react-router-dom'

// import Users from './components/Users/Users'
import Home from './components/Home/Home'
import Questions from './components/Questions/Questions'
import Chapters from './components/Chapters/Chapters'
import LoginAdmin from './Login/LoginAdmin'
import UserManagement from './components/Users/UserManagement'

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

      <Route path="/questions" element={
        <div className="grid-container">
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar openSidebarToggle={openSidebarToggle} />
          <Questions />
        </div>
      } />

      <Route path="/chapters" element={
        <div className="grid-container">
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar openSidebarToggle={openSidebarToggle} />
          <Chapters />
        </div>
      } />

      {/* vào web sẽ chuyển về login */}
      <Route path="/" element={<Navigate to="/login" />} />

    </Routes>
  )
}

export default App