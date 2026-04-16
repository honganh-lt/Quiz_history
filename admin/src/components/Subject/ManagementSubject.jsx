import React, { useEffect, useState } from 'react'
import "./css/ManagementSubject.css"
import { deleteSubject, getSubjects } from '../../api/subjectService';
// import SubjectModal from './SubjectModal';
import EditSubjectModal from './EditSubjectModal';
import AddSubjectModal from './AddSubjectModal';

export const ManagementSubject = () => {

    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    //Modal Thêm state điều khiền
    const [isOpen, setIsOpen] = useState(false); //??????

    //===============Edit==============
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null); // ????


    //=============Phân trang============
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 5;
    


    //=========================
    useEffect(() => {
        fetchData();
        // fetchSubjects(); //Dùng cho modal "/chapters"
    }, []);


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
    const handleOpenAdd = () => {
      setIsOpen(true);
    };
    const handleCloseAdd = () => {
      setIsOpen(false);
    };

    //Edit
    const updateSub = (updatedSubject) => {
      setSubjects(prevSub => 
        prevSub.map(sub => 
          sub.subject_id === updatedSubject.subject_id ? updatedSubject : sub
        )
      )
    }
    
    //Delete
    const handleDelete = async (id) => {

        //Check FE có gọi không
        console.log("Delete id: ", id);

        if(window.confirm("Bạn có chắc muốn xóa không?")) {
          //Các file delete khác có thể thêm cái này try-catch
            try {
                await deleteSubject(id);
                fetchData();
              } catch (error) {
                console.error(error);
                alert("Xóa thất bại!");
              }
        }
    }

    //Phân trang
    const indexOfLastChap = currentPage * questionsPerPage;
    const indexOfFirstChap = indexOfLastChap - questionsPerPage;

    //slice từ danh sách chapters
    const currentSubjects = subjects.slice(indexOfFirstChap, indexOfLastChap);
    const totalPages = Math.ceil(subjects.length / questionsPerPage);


  return (
     <div className='admin-container'>
        {/* Sidebar */}
      <div className='top-bar'>
            <h2 className='title'>Quản lý môn học</h2>
            <button 
              className='add-btn' 
              onClick={handleOpenAdd}
            >+</button>
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
            {currentSubjects.map((sub) => {
            return (
                <tr key={sub.subject_id}>
                <td>{sub.subject_id}</td>
                {/* <td>{item.grade_id}</td> */}
                <td>{sub.subject_name}</td>
                <td>{sub.description}</td>
                <td>
                    <button 
                      className='edit-btn' 
                      onClick={() => {
                        setSelectedSubject(sub); //Mở modal _ cần đổ dữ liệu vào input
                        setShowEditModal(true);
                      }}
                    >
                      {/* Edit */}
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button 
                      className='delete-btn' 
                      onClick={() => handleDelete(sub.subject_id)}
                    >
                      {/* Delete */}
                    <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
                </tr>
            );
            })}
            </tbody>
        </table>
        ) }

        {/* Phân trang */}
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1 )}
          >
            <i className="fa-solid fa-angle-left"></i> 
          </button>

          {Array.from({length: totalPages}, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => {setCurrentPage(i+1)}}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>

        {/* < SubjectModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSuccess={fetchData}
            subject={selectedSubject}
        /> */}

        {/* ADD */}
        <AddSubjectModal
          isOpen={isOpen}
          onClose={handleCloseAdd}
          onSuccess={fetchData} //???? reload lại list sau khi thêm
        />

        {/* EDIT */}
        {showEditModal && selectedSubject && (
          <EditSubjectModal
             sub = {selectedSubject}
             onClose={() => setShowEditModal(false)}
             updateSub={updateSub}
            //  Không có lấy thên danh sách từ qly khác
          />
        )}
      </div>

    </div>
  )
}

export default ManagementSubject;
