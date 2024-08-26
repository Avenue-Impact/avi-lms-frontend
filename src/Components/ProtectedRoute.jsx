import { useAuth } from "@/hooks/useAuth";
import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const token = Cookies.get("token");
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to={"login"} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
