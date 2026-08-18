import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedSuccessStoryRoute = ({ children }) => {
  const location = useLocation();
  const token = Cookies.get("token");

  if (!token || token === "undefined") {
    const currentPath = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirectTo=${currentPath}`} replace />;
  }

  return children;
};

export default ProtectedSuccessStoryRoute;
