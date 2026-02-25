import Cookies from "js-cookie";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";

const AuthProtectedRoute = ({ tokin, path }) => {
  const token = Cookies.get(tokin);
  const [searchParams] = useSearchParams();
  const _r = searchParams.get("_r");

  return !token ? (
    <Outlet />
  ) : (
    <Navigate to={_r ? decodeURIComponent(_r) : path} replace />
  );
};

export default AuthProtectedRoute;
