import React, { useEffect, useState } from 'react'
import "./Header.css"

export const Header = ({ toggleSidebar }) => { // 🌟 Thêm prop toggleSidebar vào đây

    const [users, setUsers] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if(userData) {
            setUsers(userData);
        }
    }, [])

    return (
        <div className="header-admin">
            <div className='header-left'>
                {/* Nút Hamburger xuất hiện ở đây để mở Sidebar khi thu nhỏ */}
                <i className="fa-solid fa-bars menu-icon" onClick={toggleSidebar}></i>
                <h2>Education</h2>
            </div>
            <div className="header-right">
                {users && (
                    <h4>
                        {users.username}
                        <i className="fa-solid fa-circle-user user-icon"></i>
                    </h4>
                )}
            </div>
        </div>
    )
}

export default Header;