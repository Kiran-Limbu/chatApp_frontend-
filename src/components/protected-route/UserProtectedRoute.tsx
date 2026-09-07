import { Navigate, Outlet } from "react-router-dom";

const UserProtectedRoute = () => {

  const userInfo = localStorage.getItem("info");
   return userInfo ? <Outlet /> : <Navigate to="/" replace />
}

export default UserProtectedRoute
