import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthProtectedRoute = ({ tokin, path }) => {
  const token = Cookies.get(tokin);
  const location = useLocation();
  return !token ? (
    <Outlet />
  ) : (
    <Navigate to={path} state={{ from: location }} replace />
  );
};

export default AuthProtectedRoute;
