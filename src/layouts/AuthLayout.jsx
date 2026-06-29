// import { useState } from "react";
// import { Outlet } from "react-router-dom";

// import AviNav from "@/Components/avi/AviNav";
// import CredentialsProvider from "@/providers/CredentialsProvider";

// const AuthLayout = () => {
//   const [showNav, setShowNav] = useState(true);

//   const hideNav =
//     window.location.pathname.includes("/login") ||
//     window.location.pathname.includes("/signup");

//   return (
//     <CredentialsProvider>
//       <div className="relative">
//         {!hideNav && (
//           <AviNav showNav={showNav} setShowNav={setShowNav} />
//         )}

//         {!showNav && (
//           <div className="fixed left-0 top-0 z-10 flex h-screen w-full items-center justify-center bg-black/25 md:hidden" />
//         )}
//         <div>
//           <Outlet />
//         </div>
//       </div>
//     </CredentialsProvider>
//   );
// };

// export default AuthLayout;

import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";

import AviNav from "@/Components/avi/AviNav";
import CredentialsProvider from "@/providers/CredentialsProvider";
import { ArrowLeft, ChevronLeft, X } from "lucide-react";
import SignUp from "@/pages/auth/Signup";
import JoinCommunityModal from "@/Components/JoinCommunityModal";

const AuthLayout = () => {
  const [showNav, setShowNav] = useState(true);
  const [hideNav, setHideNav] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  // Engagement Modal State
  const [showModal, setShowModal] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const pathname = location.pathname;

    // Hide nav on login and signup pages
    const shouldHide =
      pathname.includes("/login") || pathname.includes("/signup") || pathname.includes("/forgot-password") || pathname.includes("/new-password");

    setHideNav(shouldHide);
    setShowModal(false);
  }, [location.pathname]); // runs on every route change

  // Interaction Listener
  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);
    };

    // Add one-time listeners
    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("scroll", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });

    return () => {
      // Cleanup
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  // 15-second delayed trigger
  useEffect(() => {
    if (hasInteracted) {
      const timer = setTimeout(() => {
        // Only show modal if NOT on auth pages
        if (!hideNav) {
          setShowModal(true);
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [hasInteracted, hideNav]);

  return (
    <CredentialsProvider>
      <div className="relative">
        {!hideNav && <AviNav showNav={showNav} setShowNav={setShowNav} />}

        {!showNav && (
          <div className="fixed left-0 top-0 z-10 flex h-screen w-full items-center justify-center bg-black/25 md:hidden" />
        )}

        <div>
          <Outlet />
        </div>

        {/* Engagement Modal */}
        {showModal && (
          <JoinCommunityModal open={true} onClose={() => setShowModal(false)} />
        )}
      </div>
    </CredentialsProvider>
  );
};

export default AuthLayout;
