import Cookies from "js-cookie";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";

const AuthProtectedRoute = ({ tokin, path }) => {
  const token = Cookies.get(tokin);
  const [searchParams] = useSearchParams();
  const _r = searchParams.get("_r");

  let role;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      role = payload.role || payload.user_role;
    } catch (e) {}
  }

  if (!token) {
    return <Outlet />;
  }

  let redirectPath = _r ? decodeURIComponent(_r) : path;
  if (role && role.toLowerCase() === "instructor" && !redirectPath.includes("instructor")) {
    redirectPath = "/instructor/dashboard";
  }

  return <Navigate to={redirectPath} replace />;
};

export default AuthProtectedRoute;
