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
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import AviNav from "@/Components/avi/AviNav";
import CredentialsProvider from "@/providers/CredentialsProvider";
import { ArrowLeft, ChevronLeft, X } from "lucide-react";
import SignUp from "@/pages/auth/Signup";

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
      }, 15000);

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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
            <div className="relative max-h-[90vh] w-auto overflow-y-auto overflow-x-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 fade-in duration-300">
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
              <SignUp isPage={false} />
            </div>
          </div>
        )}
      </div>
    </CredentialsProvider>
  );
};

export default AuthLayout;
