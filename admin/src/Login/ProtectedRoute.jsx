import { Navigate } from "react-router-dom";

//Phân quyền đã làm chỉ có admin mới login được
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // chưa login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // không phải admin
  if (user.role !== "ADMIN") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
// export default AdminRoute;