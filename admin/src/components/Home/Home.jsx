import React from 'react'
import {
    BsFillArchiveFill,
    BsFillGrid3X3GapFill,
    BsBook,
    BsBookshelf,
} from 'react-icons/bs';
// import PieChartCustom from './PieChartCustom';

function Home() {

    return (
        <main className='main-container'>
            <div className='main-title'>
                {/* <h3>DASHBOARD</h3> */}
            </div>
            <div className="main-cards">
                <div className='card'>
                    <div className="cardr-inner">
                        <h3>Products</h3>
                        <BsFillArchiveFill className='card_icon' />

                    </div>
                    <h1>300</h1>
                </div>
                <div className='card'>
                    <div className="cardr-inner">
                        <h3>Quản lý người dùng</h3>
                        <BsFillGrid3X3GapFill className='card_icon' />

                    </div>
                    <h1>200</h1>
                </div>
                <div className='card'>
                    <div className="cardr-inner">
                        <h3>Quản lý bài thi</h3>
                        <BsBook className='card_icon' />

                    </div>
                    <h1>300</h1>
                </div>
                <div className='card'>
                    <div className="cardr-inner">
                        <h3>Quảng lý chương</h3>
                        <BsBookshelf className='card_icon' />

                    </div>
                    <h1>300</h1>
                </div>
            </div>
            {/* <div className="charts">
                <PieChartCustom />
            </div> */}
        </main>
    )
}


export default Home