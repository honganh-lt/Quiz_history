import './css/Main.css'

export const Main = () => {
    return (
        <main className='main'>
            {/* Khung trên */}
            <section className='hero-section'>
                <div className='container'>
                    {/* Phần chữ */}
                    <div className='body-layout'>
                        <div className='body-text'>
                            <h1>Trắc nghiệm lịch sử kết nối tri thức</h1>
                            <p>
                                Nền tảng hỗ trợ ôn luyện, kiểm tra và nâng cao kiến thức với hệ thống
                                bài học trực quan, sinh động.
                            </p>
                        </div>
                        
                        {/* Phần ảnh chuyển động */}
                        <div className='body-images'>
                            <img src="./imghome/banner-ls.png" alt="slide 1" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Khung dưới */}
            <section className='feature-section'>
                <h2>Luyện theo lớp học - Sách kết nối tri thức</h2>
                <div className='feature-list'>
                    <div className='feature-card'>
                        <h3>Lịch sử lớp 10</h3>
                    </div>
                    <div className='feature-card'>
                        <h3>Lịch sử lớp 11</h3>
                    </div>
                    <div className='feature-card'>
                        <h3>Lịch sử lớp 12</h3>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Main;