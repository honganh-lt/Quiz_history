import './css/Main.css'

export const Main = () => {
    return (
        <main className='main'>
            {/* <div className='container'> */}
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
                            {/* <img src={banner1} alt="slide 2" /> */}
                            {/* <img src={banner2} alt="slide 3" /> */}
                            {/* <img src={banner1} alt="slide 4" /> */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Khung dưới */}
            <section className='feature-section'>
                <h2>Luyện theo lớp học - Sách kết nối tri thức</h2>
                <div className='feature-list'>
                    <div className='feature-card'>
                        {/* <img src={img10} alt="Lịch sử lớp 10" /> */}
                        <h3>Lịch sử lớp 10</h3>
                    </div>
                    <div className='feature-card'>
                        {/* <img src={img11} alt="Lịch sử lớp 10" /> */}
                        <h3>Lịch sử lớp 11</h3>
                    </div>
                    <div className='feature-card'>
                        {/* <img src={img12} alt="Lịch sử lớp 10" /> */}
                        <h3>Lịch sử lớp 12</h3>
                    </div>
                </div>
            </section>
            {/* </div> */}
        </main>
    );
};

export default Main;