import React from 'react'
// import {
//   BsPerson,
//   BsBook,
//   BsBookshelf,
//   BsHouse,
//   BsQuestion
// } from 'react-icons/bs'
import './sidebar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../api/authApiAdmin';

function Sidebar({ openSidebarToggle }) {

  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    const refresh_token = localStorage.getItem("refresh_token");

    await logout(refresh_token);

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    navigate("/login");
  } catch (error) {
    console.log(error);

    localStorage.clear();
    navigate("/login");
  }
};

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <ul className="sidebar-list">

        <li className="sidebar-list-item">
          <NavLink to="/admin">
            {/* <BsHouse className="icon" /> */}
            Home
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <NavLink to="/users">
            {/* <BsPerson className="icon" /> */}
            Quản lý User
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <NavLink to="/subjects">
            {/* <BsBookshelf className="icon" /> */}
            Quản lý môn học
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <NavLink to="/chapters">
            {/* <BsBookshelf className="icon" /> */}
            Quản lý chương
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <NavLink to="/lessons">
            {/* <BsBook className="icon" /> */}
            Quản lý bài học
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/document">
            {/* <BsBook className="icon" /> */}
            Quản lý tài liệu
          </NavLink>
        </li>
        
        <li className="sidebar-list-item">
          <NavLink to="/questions">
            {/* <BsQuestion className="icon" /> */}
            Quản lý câu hỏi
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/exam">
            {/* <BsBook className="icon" /> */}
            Quản lý đề thi
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <NavLink to="/user-exam">
            {/* <BsBook className="icon" /> */}
            Quản lý bài thi User
          </NavLink>
        </li>
        <li className="sidebar-list-item-login">
         <span onClick={handleLogout} style={{cursor: "pointer"}}>
          Đăng xuất
         </span>
        </li>

      </ul>
    </aside>
  )
}

export default Sidebar