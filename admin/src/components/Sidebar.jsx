import React from 'react'
import {
  BsPerson,
  BsBook,
  BsBookshelf,
  BsHouse
} from 'react-icons/bs'
import './sidebar.css'
import { NavLink } from 'react-router-dom'

function Sidebar({ openSidebarToggle }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <ul className="sidebar-list">

        <li className="sidebar-list-item">
          <NavLink to="/home">
            <BsHouse className="icon" />
            Home
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <NavLink to="/users">
            <BsPerson className="icon" />
            Người dùng
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <NavLink to="/questions">
            <BsBook className="icon" />
            Quản lý đề
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <NavLink to="/chapters">
            <BsBookshelf className="icon" />
            Quản lý chương
          </NavLink>
        </li>

      </ul>
    </aside>
  )
}

export default Sidebar