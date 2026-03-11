import React from 'react'
import {
    BsCart3, BsPerson, BsBook,
    BsBookHalf,
    BsBookshelf, BsGear, BsHouse,
    BsGrid1X2Fill,
} from 'react-icons/bs'
import { Link } from 'react-router-dom';


function Sidebar({ openSidebarToggle }) {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className="sidebar-title">
                {/* <div className="sidebar-brand">
                    <BsCart3 className='icon' />
                </div>
                <span className='icon close_icon'>X</span> */}

            </div>
            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <a href="">
                        <BsGrid1X2Fill className='icon' />Dashboard
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/">
                        <BsHouse className='icon' /> Home
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/users">
                        <BsPerson className='icon' /> Người dùng
                    </Link>
                </li>

                <li className='sidebar-list-item'>
                    <Link to="/questions">
                        <BsBook className='icon' /> Quản lý đề
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/chapters">
                        <BsBookshelf className='icon' /> Quản lý chương
                    </Link>
                </li>
                {/* <li className='sidebar-list-item'>
                    <a href="">
                        <BsGear className='icon' />Cài đặt
                    </a>
                </li> */}
            </ul>
        </aside>
    )
}


export default Sidebar