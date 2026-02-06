import './css/Header.css'


function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="header-inner">
                    {/* Logo */}
                    <div className="logo">LOGO</div>
                    {/* Menu chính */}
                    <nav className="menu">
                        <a href="/home">Trang chủ</a>
                        <a href="/practice">Ôn luyện</a>
                        {/* <a href="/kiem-tra">Kiểm tra</a> */}
                    </nav>
                    {/* Auth */}
                    <div className='auth'>
                        {/* <a href="/register" className='register'>Đăng ký</a> */}
                        <a href="/login" className='login'>Đăng nhập</a>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Header
