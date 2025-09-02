import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/user/log-in" replace />;
  }

  if (user && window.location.pathname === "/") {
    return <Navigate to="/user/ordi/main" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
