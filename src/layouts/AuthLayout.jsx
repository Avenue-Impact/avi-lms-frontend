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
import { ArrowLeft, ChevronLeft } from "lucide-react";

const AuthLayout = () => {
  const [showNav, setShowNav] = useState(true);
  const [hideNav, setHideNav] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;

    // Hide nav on login and signup pages
    const shouldHide =
      pathname.includes("/login") ||
      pathname.includes("/signup");

    setHideNav(shouldHide);
  }, [location.pathname]); // runs on every route change

  return (
    <CredentialsProvider>
      <div className="relative">
        {!hideNav && (
          <AviNav showNav={showNav} setShowNav={setShowNav} />
        )}

       {
        hideNav && (
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 cursor-pointer shadow-lg hover:bg-primary-color-500 hover:text-white mt-4 ml-4 border border-primary-color-500 rounded-full px-4 py-2">
            <ChevronLeft />
          Back
        </button>
        )
       }

        {!showNav && (
          <div className="fixed left-0 top-0 z-10 flex h-screen w-full items-center justify-center bg-black/25 md:hidden" />
        )}

        <div>
          <Outlet />
        </div>
      </div>
    </CredentialsProvider>
  );
};

export default AuthLayout;
