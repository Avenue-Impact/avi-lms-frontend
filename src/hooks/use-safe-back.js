import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const useSafeBack = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Check if there is history within the SPA context
    const hasHistory = window.history.state && typeof window.history.state.idx === "number" && window.history.state.idx > 0;
    // Check if document.referrer matches our origin
    const isSameOrigin = document.referrer && document.referrer.includes(window.location.origin);

    if (hasHistory || isSameOrigin) {
      navigate(-1);
    } else {
      const isStudentLoggedIn = !!Cookies.get("token");
      const isAdminLoggedIn = !!Cookies.get("adminToken");
      const userRole = Cookies.get("userRole")?.toLowerCase();

      if (isAdminLoggedIn) {
        navigate("/admin/dashboard");
      } else if (isStudentLoggedIn) {
        if (userRole === "instructor") {
          navigate("/instructor/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        navigate("/");
      }
    }
  };

  return handleBack;
};
