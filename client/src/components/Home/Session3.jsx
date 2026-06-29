import React from 'react'
import "./css/Main3.css"

export const Session3 = () => {
  return (
    <div className='home-feature'>
        {/* Khung trái */}
        <div className="home-feature-left">
            <div className="home-feature-img">
                <img src="/imghome/anhnen.png" alt="feature" />
            </div>
        </div>
        {/* Khung phải */}
        <div className="home-feature-right">
            <div className="home-feature-list">
                {/* Câu hỏi phong phú */}
                <div className="feature-list-main3">
                    <div className="list-main3-item">
                        <div className="main3-item-img">
                            <img src="/imghome/feature-1.svg" alt="feature" />
                        </div>
                        <h4>Câu hỏi phong phú</h4>
                        <p>Với câu hỏi đa dạng, bao phủ nhiều dạng bài từ cơ bản đến nâng cao với chương trình mới nhất có đáp án. </p>
                    </div>
                </div>
                {/* Đề thi đa dang */}
                <div className="feature-list-main3">
                    <div className="list-main3-item">
                        <div className="main3-item-img">
                            <img src="/imghome/feature-2.svg" alt="feature" />
                        </div>
                        <h4>Đa dạng đề thi</h4>
                        <p>Bộ đề thi theo lớp đầy đủ các chương, các học kì có ôn tập và chấm điểm</p>
                    </div>
                </div>
                {/* Cá nhân hóa */}
                <div className="feature-list-main3">
                    <div className="list-main3-item">
                        <div className="main3-item-img">
                            <img src="/imghome/feature-3.svg" alt="feature" />
                        </div>
                        <h4>Kiến thức cô đọng</h4>
                        <p>Nội dung được chọn lọc, ngắn gọn, dễ hiểu, giúp người học nắm bắt nhanh những phần trọng tâm.</p>
                    </div>
                </div>
                {/* Trải nghiệm  */}
                <div className="feature-list-main3">
                    <div className="list-main3-item">
                        <div className="main3-item-img">
                            <img src="/imghome/feature-4.svg" alt="feature" />
                        </div>
                        <h4>Học tập tối ưu</h4>
                        <p>Hệ thống bài tập và kiểm tra củng cố kiến thức, rèn luyện kỹ năng và cải thiện kết quả học tập.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

// export default Session3:
export default Session3;
