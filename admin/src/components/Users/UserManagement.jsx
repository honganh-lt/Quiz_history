import React from 'react'
import './UserManagement.css'

export const UserManagement = () => {
  return (
    <main className='main-conatiner'>
        <div className='top-bar'>
            <h2 className='title'>Quản lý người dùng</h2>
            <button className='add-btn'>+ Thêm người dùng</button>
        </div>
        <div className='filter-bar'>
            <div>
            <button className='filter active'>All</button>
            <button className='filter active'>Admin</button>
            <button className='filter active'>User</button>
            </div>
            
            <input className='search' placeholder='Search...' />
        </div>
        {/* <div className='table-container'> */}
            <table className='user-table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {/* {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td> */}

                            <td>
                                <button className='edit'>Edit</button>
                                <button className='delete'>Delete</button>
                            </td>
                        {/* </tr> */}
                    {/* ))} */}
                </tbody>
            </table>

            <div className='pagination'>
                <button className='active'>Prev</button>
                <button className='active'>1</button>
                <button className='active'>2</button>
                <button className='active'>3</button>
                <button className='active'>Next</button>
            </div>
        {/* </div> */}
    </main>
  )
}

export default UserManagement
