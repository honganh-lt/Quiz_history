import React from 'react'
import {  BsPersonCircle } from 'react-icons/bs'


function Header() {
    return (
        <header className="header">
            <div className="header-right">
                <a href="/login">
                    <BsPersonCircle className='icon' />
                </a>
            </div>
        </header>
    )
}


export default Header