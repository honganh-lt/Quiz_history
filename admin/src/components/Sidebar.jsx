import React from 'react'
import './sidebar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../api/authApiAdmin';

function Sidebar({ openSidebarToggle, toggleSidebar }) { // 🌟 Nhận thêm toggleSidebar để bấm đóng khi ở màn hình nhỏ

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
    //  Nếu openSidebarToggle = true thì thêm class sidebar-responsive
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
     <div className="sidebar-mobile-header">
         {/* Nút X này giúp người dùng đóng menu lại khi ở mobile */}
         <i className="fa-solid fa-xmark close-icon" onClick={toggleSidebar}></i>
     </div>

      <ul className="sidebar-list">

        <li className="sidebar-list-item">
          <NavLink to="/admin">
            <i className="fa-solid fa-house icon"></i>
            <span>Home</span>
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <NavLink to="/users">
            <i className="fa-solid fa-user icon"></i>
            <span>Quản lý User</span>
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <NavLink to="/subjects">
            <i className="fa-solid fa-book icon"></i>
            <span>Quản lý môn học</span>
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <NavLink to="/chapters">
            <i className="fa-solid fa-folder-open icon"></i>
            <span>Quản lý chương</span>
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <NavLink to="/lessons">
            <i className="fa-solid fa-chalkboard-user icon"></i>
            <span>Quản lý bài học</span>
          </NavLink>
        </li>
        
        <li className="sidebar-list-item">
          <NavLink to="/document">
            <i className="fa-solid fa-file-lines icon"></i>
            <span>Quản lý tài liệu</span>
          </NavLink>
        </li>
        
        <li className="sidebar-list-item">
          <NavLink to="/questions">
            <i className="fa-solid fa-circle-question icon"></i>
            <span>Quản lý câu hỏi</span>
          </NavLink>
        </li>
        
        <li className="sidebar-list-item">
          <NavLink to="/exam">
            <i className="fa-solid fa-file-signature icon"></i>
            <span>Quản lý đề thi</span>
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <NavLink to="/user-exam">
            <i className="fa-solid fa-graduation-cap icon"></i>
            <span>Quản lý bài thi User</span>
          </NavLink>
        </li>

        {/* <li className="sidebar-list-item">
          <NavLink to="/question-reports">
            <i className="fa-solid fa-graduation-cap icon"></i>
            <span>Quản lý phản ánh</span>
          </NavLink>
        </li> */}

        <li className="sidebar-list-item-login">
          <span onClick={handleLogout} className="logout-button">
            <i className="fa-solid fa-right-from-bracket icon"></i>
            <span>Đăng xuất</span>
          </span>
        </li>

      </ul>
    </aside>
  )
}

export default Sidebar