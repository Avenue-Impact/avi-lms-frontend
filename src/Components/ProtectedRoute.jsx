import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ tokin, path, requiredRole }) => {
  const token = Cookies.get(tokin);
  const userRole = Cookies.get("userRole");
  const location = useLocation();
  const currentPath = location.pathname + location.search;

  const isAuthenticated = token && token !== "undefined";
  const hasRequiredRole = !requiredRole || userRole === requiredRole;

  if (!isAuthenticated) {
    return <Navigate to={`${path}?_r=${encodeURIComponent(currentPath)}`} replace />;
  }

  if (!hasRequiredRole) {
    return <Navigate to={`${path}?_r=${encodeURIComponent(currentPath)}`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
