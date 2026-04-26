import React, { useEffect, useState } from 'react'
// import { useSearchParams } from 'react-router-dom';
// import { getUser } from '../api/userApi';
import "./Header.css"

export const Header = () => {

    const [users, setUsers] = useState([]);

    //vì phải đăng nhập trước mới vào mà dữ liệu đã đc lưu user ở localStorage
    //nên dùng code dưới đây  (======đã đc lưu user ở localStorage=========)
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if(userData) {
            setUsers(userData);
        }
    }, [])

  return (
    <div className="header">
        <div className="header-right">
            {users && (
                <h4>
                    {users.username}
                    <i className="fa-solid fa-circle-user user-icon"></i>
                </h4>
            )}
        </div>
    </div>
  )
}

 export default Header;


//  import React from 'react'
// import {  BsPersonCircle } from 'react-icons/bs'


// function Header() {
//     return (
//         <header className="header">
//             <div className="header-right">
//                 <a href="/login">
//                     <BsPersonCircle className='icon' />
//                 </a>
//             </div>
//         </header>
//     )
// }


// export default Header