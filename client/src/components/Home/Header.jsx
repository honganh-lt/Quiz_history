import { useNavigate } from 'react-router-dom'
import './css/Header.css'
import { useEffect, useState } from 'react';

import { logout } from '../../../../admin/src/api/authApiAdmin';

// import API
import { getSubjects } from '../../api/subjectApi';

function Header() {

    const navigate = useNavigate();

    const [openUserMenu, setOpenUserMenu] = useState(false);

    const [openDocumentMenu, setOpenDocumentMenu] = useState(false);

    // state môn học
    const [subjects, setSubjects] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    // Gọi API
    useEffect(() => {

        getSubjects()
            .then(res => {
                setSubjects(res.data);
            })

            .catch(err => console.error(err));

    }, []);

    const handleLogout = async () => {

        try {

            const refresh_token = localStorage.getItem("refresh_token");

            await logout(refresh_token);

            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user");

            navigate("/");

        } catch (error) {

            console.log(error);

            localStorage.clear();

            navigate("/login");
        }
    };

    return (

        <header className="header">

            <div className="container">

                <div className="header-inner">

                    {/* Logo */}
                    <div className="logo">
                        <img src="/imghome/logo1.png" alt="" />
                    </div>

                    {/* Menu */}
                    <nav className="menu">

                        <a href="/">Trang chủ</a>

                        <a href="/practice">
                            Ôn tập
                        </a>

                        <a href="/exam">
                            Luyện thi
                        </a>

                        {/* MENU TÀI LIỆU */}
                        <div
                            className="document-menu"
                            onMouseEnter={() => setOpenDocumentMenu(true)}
                            onMouseLeave={() => setOpenDocumentMenu(false)}
                        >

                            <span
                                className="document-title"

                                onClick={() =>
                                    navigate("/document/1")
                                }
                            >
                                Tài liệu
                                {" "}
                                <i className="fa-solid fa-caret-down"></i>
                            </span>

                            {openDocumentMenu && (

                                <div className="document-dropdown">

                                    {subjects.map((item) => (

                                        <div
                                            key={item.subject_id}
                                            className="document-item"

                                            onClick={() =>
                                                navigate(`/document/${item.subject_id}`)
                                            }
                                        >
                                            {item.subject_name}
                                        </div>

                                    ))}

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
                                    }}
                                >

                                    <span className='username'>
                                        {user.full_name}
                                    </span>

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

                            <span
                                onClick={() => navigate("/login")}
                                className="login"
                            >
                                Đăng nhập
                            </span>

                        )}

                    </div>

                </div>

            </div>

        </header>
    )
}

export default Header;