import { useNavigate } from 'react-router-dom'
import './css/Header.css'
import {  useState } from 'react';
import { logout } from '../../../../admin/src/api/authApiAdmin';
// import { getSubjects } from '../../api/subjectApi';

function Header() {
    const navigate = useNavigate();
    //Subject: lấy dữ liệu theo môn học
    // const [subjects, setSubjects] = useState([]);


    // Tách riêng 2 state
    const [openUserMenu, setOpenUserMenu] = useState(false);
    // const [openExamMenu, setOpenExamMenu] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    // const handleLogout = () => {
    //     localStorage.removeItem("user");
    //     navigate("/");
    // }

    const handleLogout = async () => {
    try {
        const refresh_token = localStorage.getItem("refresh_token");

        // gọi BE để revoke token
        await logout(refresh_token);

        // xoá toàn bộ
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");

        navigate("/");
    } catch (error) {
        console.log(error);

        // fallback nếu lỗi
        localStorage.clear();
        navigate("/login");
    }
};

    //Gọi API khi load trang
    // useEffect(() => {
    //     getSubjects()
    //     .then(res => {
    //         setSubjects(res.data);
    //     })
    //     .catch(err => console.error(err));
    // }, []);

    return (
        <header className="header">
            <div className="container">
                <div className="header-inner">

                    {/* Logo */}
                    <div className="logo"></div>

                    {/* Menu */}
                    <nav className="menu">
                        <a href="/">Trang chủ</a>
                        {/* Ấn vào Ôn tập sẽ hiện ra môn lịch sử theo lớp */}
                        {/* Vào file: Revise: <h3>{item.subject_name}</h3> chính là lấy đc môn học */}
                        <a href="/practice">Ôn tập</a> 
                        <a href="/exam">Luyện thi</a>
                        
                    </nav>

                    {/* Auth */}
                    <div className='auth'>
                        {user ? (
                            <div className='user-menu'>
                                <div
                                    className='user-info'
                                    onClick={() => {
                                        setOpenUserMenu(!openUserMenu);
                                        // setOpenExamMenu(false); // tắt luyện thi
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
                            <span onClick={() => navigate("/login")} className="login">
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