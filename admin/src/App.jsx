import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
// import Home from './components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Users from './components/Users/Users'
import Home from './components/Home/Home'
import Questions from './components/Questions/Questions'
import Chapters from './components/Chapters/Chapters'
// import Home from './components/Home'
// import Home from './components/Users/Home'
// import { Route, Router, Routes } from 'react-router-dom'
// import HomeAdmin from './components/Home/HomeAdmin'
// import Homepage from '../../client/src/components/Home/homepage'
// import HomeAdmin from './components/Home/homepage'

function App() {
  // const [count, setCount] = useState(0)
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} />
      {/* <Home /> */}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path='/questions' element={<Questions />} />
        <Route path='/chapters' element={<Chapters />} />


      </Routes>

    </div>

  )
}

export default App
