import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthProtectedRoute = () => {
  const token = Cookies.get("token");
  const location = useLocation();
  return !token ? (
    <Outlet />
  ) : (
    <Navigate to={"dashboard"} state={{ from: location }} replace />
  );
};

export default AuthProtectedRoute;
