import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const AdminLayout = ({ children }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} />
      {children}
    </div>
  );
};

export default AdminLayout;
//tạo adminLayout để thu gọn App.jsx