import './css/Main2.css'
import img10 from "../../assets/images/lop10.jpg";
import img11 from "../../assets/images/lop11.jpg";
import img12 from "../../assets/images/lop12.jpg";



function Main2() {
    return (
        // <main className='main2'>

        // </main>
        <section className="timeline-section">
            <h2 className='timeline-title'>Chinh phục điểm 10 môn Lịch sử</h2>

            <div className="timeline">
                <div className="timeline-step">
                    <div className="circle">1</div>
                    <p>Nắm chắc kiến thức trọng tâm</p>
                </div>

                <div className="arrow">→</div>

                {/* <div className="timeline-step">
                    <div className="circle">2</div>
                    <p>Hệ thống hóa</p>
                </div> */}

                {/* <div className="arrow">→</div> */}

                <div className="timeline-step">
                    <div className="circle">2</div>
                    <p>Luyện kỹ năng làm trắc nghiệm</p>
                </div>

                <div className="arrow">→</div>

                <div className="timeline-step">
                    <div className="circle">3</div>
                    <p>Tổng ôn & giữ tâm lý vững vàng</p>
                </div>

            </div>
        </section>


    )
}

export default Main2
