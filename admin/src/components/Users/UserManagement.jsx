import React, { useEffect, useState } from 'react'
import './UserManagement.css'
// import axios from 'axios';
import EditUserModal from './EditUserModal';
// import DeleteUserModal from './DeleteUserModal';
import { deleteUser, getUser, toggleBlockUsers } from '../../api/userApi';
import AddUserModal from './AddUserModal';
// import { blockUser } from '../../../../server/controllers/userController';
// import AddUserModal from './AddUserModal';
// import { data } from 'react-router-dom';
// import { getUsers } from '../../api/userApi';

export const UserManagement = () => {

    //1: Tạo state lưu bảng database
    const [users, setUsers] = useState([]);

     //2: Tạo state lưu filter? ======ALL======ADMIN=======User
    const [roleFilter, setRoleFilter] = useState("all");

    //3: Tạo state lưu từ khóa tìm kiếm
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState("");

    //5: Edit ==============
    // // Mở modal bằng state -> thêm xong closeModal -> chạy setShowAddModal(false)
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); //Lí do?

    //6: Delete: thông tin người dùng==================
    // const [showDeleteModal, setShowDeleteModal] = useState(false);
    // const [deleteUserId, setDeleteUserId] = useState(null); //tạo state lưu user cần xóa

     //4: Phân trang Pagination =================
    //  để là một vì trang đầu tiên là 1 - nếu để 0 là sẽ bị sai
    const [currentPage, setCurrentPage] = useState(1);
    // số lượng dữ liệu có ở một trang
    const usersPerPage = 5;

    useEffect (() => {
        fetchData();
        // fetchUser();
    }, []);

    // Component render lần đầu -> gọi API -> set state hiển thị dữ liệu
  //================GET chapters======================
  const fetchData = async () => {
    try {
        const data = await getUser();
        setUsers(data);
    } catch (err) {
        console.error(err);
    }
  }
    //refesh sau khi delete -> Update user sau khi delete
    //=====================Delete=========================
    // const deleteUser = (id) => {
    //     setUsers(prevUsers =>
    //         prevUsers.filter(user => user.id !== id)
    //     );
    // };

    //1: lấy dữ liệu từ CSDL useState([]);
    // useEffect(() => {
    //     // axios.get("http://localhost:3000/api/users") : có thể thay bằng getUsers()
    //     getUsers() bỏ ở dưới
    //     .then(res => setUsers(res.data))
    //     .catch(err => console.log(err));
    // },[]);


    //2: Lọc filter theo role ======ALL======ADMIN=======User
    const roleFilteredUsers = roleFilter === "all"
        ? users
        : users.filter((user) => user.role === roleFilter);


    //================Tìm Kiếm=================== 
    //3: Lọc danh sách user -> tìm kiếm theo username + email + role
    // ?: Nếu usernam NULL howcj undefined thì không chyaj toLowerCase -> tránh crash
    // const filteredUsers = users.filter((user) => 
    //     user.username?.toLowerCase().includes(search.toLowerCase()) ||
    //     user.email?.toLocaleLowerCase().includes(search.toLowerCase())
    // );
    // Không phân biệt dấu
    const normalize = (str) =>
        str
            ?.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            // .replace(/đ/g, "d")
            // .replace(/Đ/g, "D")
            .toLowerCase();

    const filteredUsers = roleFilteredUsers.filter((user) => { //tìm kiếm trên dữ liệu đã filter
        const keyword = normalize(search);

        return (
            normalize(user.username)?.includes(keyword) ||
            normalize(user.full_name)?.includes(keyword) ||
            normalize(user.email)?.split("@")[0].includes(keyword) || //split: bỏ đuôi: @gmail
            normalize(user.role)?.includes(keyword)
        );
    });
// console.log("search", search)
// console.log("FILTERED:", filteredUsers);

        useEffect(() => {
                fetchData();
                // fetchSubjects(); //Dùng cho modal "/chapters"
            }, []);



    //5+6: Tạo hàm tự động refesh trang  ============ Edit+Delete
    // tìm user có id giống -> thay bằng uset mới -> react render lại table

    //======================Edit========================
    const updateUser = (updatedUser) => {
    setUsers(prevUsers =>
        prevUsers.map(user =>
            user.user_id === updatedUser.user_id ? updatedUser : user
            )
        );
    };

    //======Hàm block
    const handleBlock = async (user) => {
         const message =
            user.status === "blocked"
            ? "Mở tài khoản này?"
            : "Khóa tài khoản này?";

        if(window.confirm(message)) {
            await toggleBlockUsers(user.user_id);

            fetchData();
        }
    }
    //============================Delete========================
        const handleDelete = async (id) => {
    
            //Check FE có gọi không
            console.log("Delete id: ", id);
    
            if(window.confirm("Bạn có chắc muốn xóa không?")) {
                await deleteUser(id); //ở file api
                 fetchData(); //bắt buộc
            }
        }

    // search + pagination
    //====================4: Tính user hiển thị theo trang ========================
    const indexOfLastUser = currentPage * usersPerPage; //1*5 = 5     0*5=0
    const indexOfFirstUser = indexOfLastUser - usersPerPage; // 5-5 = 0   0-5=-5

    // Trước khi thêm chức năng search: users.slice
    // const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser); //users.slice(0,5) user:1,2,3,4,5  (-5,0): rỗng
    // Sau khi thêm chức năng search: filteredUsers.slice
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);    
    
    // Tính tổng số trang
        // const totalPages = Math.ceil(users.length / usersPerPage); //trước khi thêm search
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage); //sau khi thêm search

  return (
    <main className='main-conatiner'>
        <div className='top-bar'>
            <h2 className='title'>Quản lý User</h2>
            <button 
              className='add-btn'
              onClick={() => setIsOpen(true)}
            >+</button>
        </div>
        <div className='filter-bar'>
            <div>
            <button 
                className={`filter ${roleFilter === "all" ? "active" : ""}`}
                onClick={() => {
                    setRoleFilter("all");
                    setCurrentPage(1); //về trang 1
                }}
            >
                All
            </button>
            <button 
                className={`filter ${roleFilter === "ADMIN" ? "active" : ""}`}
                onClick={() => {
                    setRoleFilter("ADMIN");
                    setCurrentPage(1);
                }}
            >
                Admin
            </button>
            <button 
                className={`filter ${roleFilter === "USER" ? "active" : ""}`}
                onClick={() => {
                    setRoleFilter("USER");
                    setCurrentPage(1);
                }}
            >
                User
            </button>
            </div>
            
            <input 
                className='search' 
                placeholder='Search...' 
                value={search}
                onChange={(e) => {setSearch(e.target.value);
                setCurrentPage(1); // search nên reset về trang 1
                }}
                // setCurrentPage(1)
            />
            {/* {currentUsers.length === 0 && (
                <tr>
                <td colSpan="5">Không tìm thấy người dùng</td>
                </tr>
                )} */}
        </div>
        {/* <div className='table-container'> */}
            <table className='user-table'>
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Tên tài khoản</th>
                        <th>Họ và tên</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {/* sử dụng map() cho việc lấy một mảng dữ liệu */}
                    {/* {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>

                            <td>
                                <button className='edit'>Edit</button>
                                <button className='delete'>Delete</button>
                            </td>
                        </tr>
                    ))} */}
                    {/* {users.length > 0 ?(
                        users.
                    )} */}
                    {/* Sửa lại như này để tránh crash */}
                    {/* Crash là gì? */}
                    {/* đổi users.map() -> currentUsers.map() */}
                    {/* currentUsers lúc này đã là dữ liệu đã search + pagination rồi. */}
                    {/* {Array.isArray(users) && currentUsers.map((user) => ( */}
                    {currentUsers.map((user) => ( 
                        <tr key={user.user_id}>
                            {/* <td>{user.id}</td> */}
                            <td>{user.username}</td>
                            <td>{user.full_name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                {
                                    user.status === "blocked"
                                    ? "Blocked"
                                    : "Active"
                                }
                            </td>

                            <td>
                            {/* click edit->setSelectedUser(user);-> setShowEditModal(true);-> mở modal  */}
                                <button className='edit'
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setShowEditModal(true);
                                    }}
                                >
                                    {/* Edit */}
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                                {/*  */}
                                <button className='delete'
                                    onClick={() => {
                                        handleDelete(user.user_id)
                                        // setDeleteUserId(user.id)
                                        // setShowDeleteModal(true);
                                    }}
                                >
                                    {/* Delete */}
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                                <button
                                    className='block'
                                    onClick={() => handleBlock(user)}
                                >
                                    {
                                        user.status === "blocked"
                                        ? <i class="fa-solid fa-lock-open"></i>
                                        : <i class="fa-solid fa-lock"></i>
                                    }
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Modal*/}
                <AddUserModal 
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    onSuccess={fetchData}
                />

            {/* Edit Modal*/}
                {showEditModal && selectedUser &&(
                    <EditUserModal 
                        //truyền user vào modal
                        user={selectedUser}
                        onClose = {() => setShowEditModal(false)}
                        updateUser={updateUser}
                    />
                )}


                    {/* Phân trang: tạo số trang tự động*/}
            <div className='pagination'>
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    {/* sử dụng thư viện */}
                    <i className="fa-solid fa-angle-left"></i> 
                </button>
                {[...Array(totalPages)].map((_,index) => (
                    <button
                    key={index}
                    className={currentPage === index + 1 ? "active" : ""}
                    onClick={() => setCurrentPage(index + 1)}
                    >
                    {index + 1}
                    </button>
                ))}
                <button 
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled = {currentPage === totalPages}
                >
                    <i className="fa-solid fa-angle-right"></i>
                </button>
            </div>
        {/* </div> */}
    </main>
  )
}

export default UserManagement;
