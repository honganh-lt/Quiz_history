import React, { useEffect, useState } from 'react'
import "./ManagementSubject.css"
import { deleteSubject, getSubjects } from '../../api/subjectService';
import SubjectModal from './SubjectModal';

export const ManagementSubject = () => {

    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    //Modal
    const [isOpen, setIsOpen] = useState(false); //??????
    const [selectedSubject, setSelectedSubject] = useState(null); // ????


    // Component render lần đầu -> gọi API -> set state hiển thị dữ liệu
    // chuẩn senior : không cần tạo function ngoài gọn hơn
    const fetchData = async () => {
        try {
            const data = await getSubjects();
            setSubjects(data);
        } catch (error) {
            console.error(error);
        } finally { //hiện tại load chậm -> user thấy trống (không có load cho thấy UX chưa tốt)
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
        // fetchSubjects(); //Dùng cho modal "/chapters"
    }, []);
    // //Dùng cho modal "/chapters" để chọn môn học
    // const fetchSubjects = async () => {
    //     const data = await getSubjects();
    //     setSubjects(data);
    // }

    // Gọi API từ sibjectService -> lấy dữ liệu -> Lưu vào state subjects
    // const fetchData = async () => {
    //     const data = await getSubjects();
    //     setSubjects(data);
    // }

    //Add
    const handleAdd = () => {
        setSelectedSubject(null);
        setIsOpen(true);
    };

    //Edit
    const handleEdit = (sub) => {
        setSelectedSubject(sub);
        setIsOpen(true);
    };
    
    //Delete
    const handleDelete = async (id) => {

        //Check FE có gọi không
        console.log("Delete id: ", id);

        if(window.confirm("Bạn có chắc muốn xóa không?")) {
            await deleteSubject(id);
             fetchData(); //bắt buộc
        }
    }

  return (
     <div className='admin-container'>
        {/* Sidebar */}
      <div className='top-bar'>
            <h2 className='title'>Quản lý môn học</h2>
            <button className='add-btn' onClick={handleAdd}>+</button>
        </div>

      {/* Main content */}
      <div className="main-content">
        {/* <div className="header">
            <button className='add-btn'>+ Thêm chương</button>
        </div> */}

        {/* Render nếu user trong sẽ loading.... */}
        {loading ? <p>Loading....</p> : (
        <table className="subject-table">
            <thead>
                <tr>
                    <th>Mã môn học</th>
                    <th>Tên môn học</th>
                    <th>Mô tả</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {subjects.map((sub) => {
            return (
                <tr key={sub.subject_id}>
                <td>{sub.subject_id}</td>
                {/* <td>{item.grade_id}</td> */}
                <td>{sub.subject_name}</td>
                <td>{sub.description}</td>
                <td>
                    <button className='edit-btn' onClick={() => handleEdit(sub)}>Edit</button>
                    <button className='delete-btn' onClick={() => handleDelete(sub.subject_id)}>Delete</button>
                </td>
                </tr>
            );
            })}
            </tbody>
        </table>
        ) }
        < SubjectModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSuccess={fetchData}
            subject={selectedSubject}
        />
      </div>

    </div>
  )
}

export default ManagementSubject;
