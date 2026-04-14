// import { Outlet } from "react-router-dom";
// import ReferralBonusModal from "../Components/ReferralBonusModal";
// import { useAuth } from "@/hooks/useAuth";

// const RootLayout = () => {
//   const { isAuthenticated, token } = useAuth ? useAuth() : { isAuthenticated: false, token: null };
//   const loggedIn = isAuthenticated || !!token;
//   return (
//     <>
//       <Outlet />
//       {loggedIn && <ReferralBonusModal />}
//     </>
//   );
// };

// export default RootLayout; 


import { Outlet, ScrollRestoration } from "react-router-dom";

import Cookies from "js-cookie";

const RootLayout = () => {
  const token = Cookies.get("token");
  const user = Boolean(token);
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
};

export default RootLayout;