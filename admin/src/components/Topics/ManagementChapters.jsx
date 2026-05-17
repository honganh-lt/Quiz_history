import React, { useEffect, useState } from 'react'
import "./ManageChapters.css"
import { deleteChapter, getChapters } from '../../api/chapterApi';
import AddChapterModal from './AddChapterModal';
import { getSubjects } from '../../api/subjectApi';
import EditChapterModal from './EditChapterModal';

export const ManagementChapters = () => {

  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);  

  // Thêm state điều khiển modal
  const [isOpen, setIsOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);

  //==========Search========
  // const [search, setSearch] = useState("");


  //Edit 
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedChap, setSelectedChap] = useState(null); //lí do?

  //==============Phân trang================
  const [currentPage, setCurrentPage] = useState(1);
  //số lượng dữ liệu cho 1 trang
  const chaptersPerPage = 5;



  useEffect (() => {
    fetchData();
    fetchSubjects();
  }, []);


  // Component render lần đầu -> gọi API -> set state hiển thị dữ liệu
  //================GET chapters======================
  const fetchData = async () => {
    try {
      const data = await getChapters();
      setChapters(data);
    } catch (error) {
      console.error(error);
    } finally { //Nếu trống dữ liệu
      setLoading(false);
    }
  };

  //==================ADD==============
   //Dùng cho modal "/chapters" để chọn môn học 
  //  GET subjects : lấy dữ liệu môn học để chọn
  const fetchSubjects = async () => {
      try{
      const data = await getSubjects();
      setSubjects(data);
    } catch (error) {
      console.error(error);
    }
  };
    
//Thêm hàm lấy tên môn  ==== ADD 
  const getSubjectName = (id) => {
    const subject = subjects.find(sub => sub.subject_id === id);
    return subject ? subject.subject_name : " "
  };

  //==========Search + Subject + Chapter======
  // const normalize = (str) => 
  //   String(str || "")
  //     ?.normalize("NFD") //tách chữ và dấu ra riêng: toán = t+o+a+n
  //     .replace(/[\u0300-\u036f]/g, "") //xóa toàn bộ dấu tiếng việt
  //     .toLowerCase(); //chuyển thành chữ thường 
  //     //-> "Toán" -> "toan" nên khi tìm "toan, TOÁN, Toán" giống nhau

  // const filteredChap = chapters.filter((c) => 
  //   normalize(c.subject_id).includes(normalize(search)) ||
  //   normalize(c.chapter_name).includes(normalize(search))
  // );
  //Edit
  const updateChap = (updatedChapter) => {
    setChapters(prevChap => 
      prevChap.map(chap => 
        chap.chapter_id === updatedChapter.chapter_id ? updatedChapter : chap
      )
    )
  }

  //Delete
  const handleDelete = async (id) => {

    //Check FE có gọi không
        console.log("Delete id: ", id);
    
    if(window.confirm("Bạn có chắc muốn xóa không?")) {
      await deleteChapter(id);
      fetchData(); //bắt buộc
    }
  }

  //====Phân trang
  const indexOfLastChap = currentPage * chaptersPerPage;
  const indexOfFirstChap = indexOfLastChap - chaptersPerPage;

  //slice từ danh sách chapters
  const currentChapters =chapters.slice(indexOfFirstChap, indexOfLastChap);
  // const currentChapters =filteredChap.slice(indexOfFirstChap, indexOfLastChap);


  //tính tổng số trang
  const totalPages = Math.ceil(chapters.length / chaptersPerPage);
  // const totalPages = Math.ceil(filteredChap.length / chaptersPerPage);



  return (
    <div className='admin-container'>
        {/* Sidebar */}
      <div className='top-bar'>
            <h2 className='title'>Quản lý chương</h2>
            <div className="action-chap">
                {/* <input 
                  type="text" 
                  className='search-chap'
                  placeholder='Search...'
                  value={search}
                  onChange={(e) => {setSearch(e.target.value)
                    setCurrentPage(1);
                  }}
                /> */}
                <button 
                  className='add-btn'
                  onClick={() => setIsOpen(true)}
                >+</button>
            </div>
        </div>

      {/* Main content */}
      <div className="main-content">
        {/* <div className="header">
            <button className='add-btn'>+ Thêm chương</button>
        </div> */}
      {loading ? <p>Loading...</p>: (
        <table className="topic-table">
            <thead>
                <tr>
                    <th>Mã chương</th>
                    {/* chapter_id */}
                    {/* <th>Grade_id</th> */}
                    {/* chapter_number */}
                    <th>Tên chương</th>
                    <th>Môn học</th>
                    <th>Chương số</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
              {/* vì phân trang nên: chapters.map((chap) */}
              {currentChapters.map((chap) => {
                return (
                  <tr key={chap.chapter_id}>
                    <td>{chap.chapter_id}</td>
                    
                    <td>{chap.chapter_name}</td>
                    {/* ???????????????? */}
                    <td>{getSubjectName(chap.subject_id)}</td>
                    <td>{chap.chapter_number}</td>
                    <td>
                      <button className='edit-btn'
                          onClick={() => {
                            setSelectedChap(chap); //Mở modal-> cần đổ dữ liệu vào input
                            setShowEditModal(true);
                          }}
                      >
                        {/* Edit */}
                        <i class="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button 
                        className='delete-btn' 
                        onClick={() => handleDelete(chap.chapter_id)}
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
          onClick={() => setCurrentPage(currentPage - 1)}
        >
        {/* sử dụng thư viện */}
          <i className="fa-solid fa-angle-left"></i> 
        </button> 
        {Array.from({length: totalPages}, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
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

      {/* Render modal Add */}
      <AddChapterModal 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={fetchData}
        subjects={subjects}
      />
      {/* MOdal Edit */}
      {showEditModal && selectedChap && (
        <EditChapterModal 
        chap = {selectedChap}
        onClose = {() => setShowEditModal(false)}
        updateChap = {updateChap}
        subjects={subjects} //lấy danh sách môn học để sửa
      />
      )}
      </div>

    </div>
  )
}

export default ManagementChapters