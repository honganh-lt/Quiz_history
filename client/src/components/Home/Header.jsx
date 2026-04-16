import { useNavigate } from 'react-router-dom'
import './css/Header.css'
import { useState } from 'react';

function Header() {
    const navigate = useNavigate();

    // ✅ Tách riêng 2 state
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const [openExamMenu, setOpenExamMenu] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header-inner">

                    {/* Logo */}
                    <div className="logo"></div>

                    {/* Menu */}
                    <nav className="menu">
                        <a href="/">Trang chủ</a>
                        <a href="/practice">Ôn tập</a>

                        {/* ✅ Luyện thi dropdown */}
                        <div
                            className="menu-item"
                            onClick={() => {
                                setOpenExamMenu(!openExamMenu);
                                setOpenUserMenu(false); //tắt user menu
                            }}
                        >
                            <span>Luyện thi ▾</span>

                            {openExamMenu && (
                                <div className="submenu"
                                    //Nếu không có cái này -> click vào menu sẽ bị đóng ngay
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div onClick={() => navigate("/exam/lop-10")}>Lớp 10</div>
                                    <div onClick={() => navigate("/exam/lop-11")}>Lớp 11</div>
                                    <div onClick={() => navigate("/exam/lop-12")}>Lớp 12</div>
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* Auth */}
                    <div className='auth'>
                        {user ? (
                            <div className='user-menu'>
                                <div
                                    className='user-info'
                                    onClick={() => {
                                        setOpenUserMenu(!openUserMenu);
                                        setOpenExamMenu(false); // tắt luyện thi
                                    }}
                                >
                                    <span>{user.username}</span>
                                    <i className="fa-solid fa-circle-user user-icon"></i>
                                </div>

                                {openUserMenu && (
                                    <div className="dropdown">
                                        <div onClick={() => navigate("/profile")}>
                                            Hồ sơ
                                        </div>
                                        <div onClick={handleLogout}>
                                            Đăng xuất
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <a href="/login" className='login'>Đăng nhập</a>
                        )}
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header;