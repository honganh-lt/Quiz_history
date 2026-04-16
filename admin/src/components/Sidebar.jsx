import React from 'react'
import {
  BsPerson,
  BsBook,
  BsBookshelf,
  BsHouse,
  BsQuestion
} from 'react-icons/bs'
import './sidebar.css'
import { NavLink } from 'react-router-dom'

function Sidebar({ openSidebarToggle }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <ul className="sidebar-list">

        <li className="sidebar-list-item">
          <NavLink to="/admin">
            {/* <BsHouse className="icon" /> */}
            Trang chủ
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
          <NavLink to="/questions">
            {/* <BsQuestion className="icon" /> */}
            Quản lý câu hỏi
          </NavLink>
        </li>
        {/* <li className="sidebar-list-item">
          <NavLink to="/exam">
            <BsBook className="icon" />
            Quản lý đề thi
          </NavLink>
        </li> */}

      </ul>
    </aside>
  )
}

export default Sidebar