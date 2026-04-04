import "./css/Revise2.css"

function Revise2() {
    return (
    <div className='revise'>
        <div className='revise-list'>
            <h2>Giới thiệu</h2>
            {/* Left */}
            <div className='card-revise'>
                <div className='img-revise'>
                    <img src="" alt="" />
                </div>
                <div className='text-revise'>
                    <h4>Lớp 10</h4>
                    <p>
                        Học sinh được làm quen với kiến thức nền tảng của lịch sử, từ lịch sử thế giới cổ đại - trung đại đến
                        những khái niệm cơ bản về sử học. Nội dung xây dựng tư duy và cách tiếp cận môn học một cách logic, dễ hiểu.
                    </p>
                </div>
            </div>
            {/* Right */}
            <div className='card-revise'>
                <div className='img-revise'>
                    <img src="" alt="" />
                </div>
                <div className='text-revise'>
                    <h4>Lớp 11</h4>
                    <p>
                        Chương trình học tập trung vào lịch sử thế giới cận - hiện đại và một phần lịch sử Việt Nam, giúp học sinh hiểu rõ các biến động lớn và
                        quá trình phát triển của xã hội. Đây là giai đoạn quan trọng để rèn luyện khả năng phân tích và liên hệ thực tế.
                    </p>
                </div>
            </div>

            {/* Left */}
            <div className='card-revise'>
                <div className='img-revise'>
                    <img src="" alt="" />
                </div>
                <div className='text-revise'>
                    <h4>Lớp 12</h4>
                    <p>
                        Nội dung bám sát chương trình ôn thi, tập trung vào lịch sử Việt Nam hiện đại và các chuyên đề trọng tâm thường xuất hiện trong đề thi.
                        Học sinh củng cố kiến thức, luyện đề và nâng cao kỹ năng làm bài để đạt kết quả tốt trong kỳ thi.
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}


export default Revise2;