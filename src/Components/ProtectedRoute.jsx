import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ tokin, path }) => {
  const token = Cookies.get(tokin);
  const location = useLocation();
  const currentPath = location.pathname + location.search;

  return token ? (
    <Outlet />
  ) : (
    <Navigate to={`${path}?_r=${encodeURIComponent(currentPath)}`} replace />
  );
};

export default ProtectedRoute;
