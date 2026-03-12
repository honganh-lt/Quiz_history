import { useNavigate } from 'react-router-dom'
import './css/Header.css'
import { useState } from 'react';


function Header() {
    // Hook của React Router dùng để chuyển trang 
    const navigate = useNavigate();
    //// State dùng để kiểm soát dropdown menu (mở hoặc đóng)
    const [openMenu, setOpenMenu] = useState(false);

    //Lấy user từ localStorage
    // Lấy thông tin user đã lưu trong localStorage sau khi đăng nhập
    // JSON.parse dùng để chuyển dữ liệu từ string → object
    const user = JSON.parse(localStorage.getItem("user"));

    // Hàm xử lý khi người dùng bấm "Đăng xuất"
    const handleLogout = () => {
        // Xóa thông tin user khỏi localStorage
        // Sau khi xóa thì hệ thống sẽ hiểu là chưa đăng nhập
        localStorage.removeItem("user");
        // Chuyển người dùng về trang đăng nhập
        navigate("/");
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header-inner">
                    {/* Logo */}
                    <div className="logo"></div>

                    {/* Menu chính */}
                    <nav className="menu">
                        <a href="/">Trang chủ</a>
                        <a href="/practice">Ôn luyện</a>
                        {/* <a href="/kiem-tra">Kiểm tra</a> */}
                    </nav>

                    {/* Auth */}
                    <div className='auth'>
                        {user ? (
                            <div className='user-menu'>
                               <div className='user-info'
                               // Khi click vào username thì đổi trạng thái openMenu
                                // false -> true (mở menu)
                                // true -> false (đóng menu)
                               onClick={() => setOpenMenu(!openMenu)}>
                               Xin chào, {user.username} ▼
                               </div>
                                {/* tạo một trang profile để xem quá trinh học tập  */}
                               {openMenu && (
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

export default Header
