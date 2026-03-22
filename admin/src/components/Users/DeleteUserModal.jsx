import React from 'react'
import './DeleteUserModal.css'
import axios from 'axios'

export const DeleteUserModal = ({id, closeModal, deleteUser}) => {

    const handleDelete = async () => {

        // console.log("Id delete: ", id) //kiểm tra
        try {
           const res =  await axios.delete(`http://localhost:3000/api/users/${id}`);

            deleteUser(id); //cập nhật lại bảng
            closeModal();

            alert(res.data.message);

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='modal'>
        <div className="modal-delete">
            <h3>Bạn có đồng ý xóa không?</h3>
        <div className="modal-actions-delete">
            <button onClick={handleDelete}>Xóa</button>
            <button onClick={closeModal}>Đóng</button>
        </div>
        </div>
    </div>
  )
}

export default DeleteUserModal;
