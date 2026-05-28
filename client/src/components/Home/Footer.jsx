import React from 'react'
import "./css/footer.css"

export const Footer = () => {
  return (
    <footer className="site-footer">
    <div className="footer-container">
        {/* <!-- Cột 1: Giới thiệu ngắn --> */}
        <div className="footer-column">
            <h3>Trắc Nghiệm Lịch Sử</h3>
            <p>Nền tảng ôn luyện kiến thức lịch sử hiệu quả, sinh động với hàng ngàn câu hỏi trắc nghiệm đa dạng và bám sát chương trình.</p>
        </div>

        {/* <!-- Cột 2: Đường dẫn nhanh --> */}
        <div className="footer-column">
            <h3>Liên Kết Nhanh</h3>
            <ul>
                <li><a href="/">Trang chủ</a></li>
                <li><a href="/exam">Đề thi</a></li>
                <li><a href="profile">Thông tin</a></li>
                {/* <li><a href="/document">Tài liệu</a></li> */}
            </ul>
        </div>

        {/* <!-- Cột 3: Thông tin liên hệ / Mạng xã hội --> */}
        {/* <div className="footer-column"> */}
            {/* <h3>Liên Hệ & Hỗ Trợ</h3>
            <p> Email: support@tracnghiemlichsu.com</p> */}
            {/* <p>Hotline: 0123 456 789</p> */}
            {/* <div class="footer-socials">
                {/* <!-- Thay # bằng link mạng xã hội của bạn nếu có --> */}
                {/* <a href="#" class="social-icon">Facebook</a>
                <a href="#" class="social-icon">YouTube</a>
            </div> */} 
        {/* </div> */}
    </div>

    {/* <!-- Dòng bản quyền (Giữ lại từ image_56ec27.png nhưng tối ưu hơn) --> */}
    <div className="footer-bottom">
        <p>&copy; 2026 Trắc nghiệm lịch sử. All rights reserved.</p>
    </div>
</footer>
  )
}

export default Footer;