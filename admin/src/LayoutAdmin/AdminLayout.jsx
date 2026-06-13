import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const AdminLayout = ({ children }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  // Hàm xử lý đảo trạng thái đóng/mở sidebar
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      {/* Phải truyền hàm OpenSidebar vào prop tên là toggleSidebar */}
      <Header toggleSidebar={OpenSidebar} />
      
      {/* Truyền cả trạng thái openSidebarToggle và hàm OpenSidebar xuống cho Sidebar */}
      <Sidebar openSidebarToggle={openSidebarToggle} toggleSidebar={OpenSidebar} />
      
      <main className="main-container">
         {children}
      </main>
    </div>
  );
};

export default AdminLayout;