import './css/Main2.css'
// import img10 from "../../assets/images/lop10.jpg";
// import img11 from "../../assets/images/lop11.jpg";
// import img12 from "../../assets/images/lop12.jpg";



function Main2() {
    return (
        // <main className='main2'>

        // </main>
        <section className="timeline-section">
            <h2 className='timeline-title'>Chinh phục điểm 10 môn Lịch sử</h2>

            <div className="timeline">
                {/* <div className='timeline-step-list'> */}
                    <div className="timeline-step">
                        <div className="circle">Bước 1</div>
                        <h5>Nắm chắc kiến thức trọng tâm</h5>
                        <p>
                            Hệ thống nội dung được chọn lọc kỹ lưỡng, bám sát chương trình học và 
                            các dạng bài thường gặp trong kiểm tra, thi cử.
                        </p>

                    </div>
                {/* </div> */}

                <div className="arrow">→</div>

                {/* <div className="timeline-step">
                    <div className="circle">2</div>
                    <p>Hệ thống hóa</p>
                </div> */}

                {/* <div className="arrow">→</div> */}

                <div className="timeline-step">
                    <div className="circle">Bước 2</div>
                    <h5>Luyện kỹ năng làm trắc nghiệm</h5>
                    <p>Rèn luyện tốc độ và nâng cao khả năng tư duy, xử lý câu hỏi, độ chính xác khi làm bài.</p>
                </div>

                <div className="arrow">→</div>

                <div className="timeline-step">
                    <div className="circle">Bước 3</div>
                    <h5>Tổng ôn & giữ tâm lý vững vàng</h5>
                    <p>Tổng hợp toàn bộ kiến thức trước kỳ thi một cách hiệu quả và có hệ thống. Đồng thời tự tin, bình tĩnh bước vào phòng thi.</p>
                </div>

            </div>
        </section>


    )
}

export default Main2
