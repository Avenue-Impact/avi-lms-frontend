import DashboardNav from "@/Components/dashboard/DashboardNav";
import DashboardSideNav from "@/Components/dashboard/DashboardSideNav";
import { cn } from "@/lib/utils";
import { useState } from "react";

import { Outlet, ScrollRestoration } from "react-router-dom";

const DashboardLayout = ({ userInfo }) => {
  const [toggleNav, setToggleNav] = useState(true);

  return (
    <div className="relative">
      <ScrollRestoration />
      <div
        className={cn(
          "fixed left-0 top-0 z-10 flex h-screen w-full items-center justify-center bg-black/25 px-6 transition-transform duration-100 ease-linear lg:hidden",
          toggleNav ? "-translate-x-full" : "translate-x-0",
        )}
      ></div>
      <DashboardSideNav toggleNav={toggleNav} setTogglNav={setToggleNav} />

      <div className="ml-0 h-full lg:ml-[272px] lg:px-0">
        <DashboardNav setToggleNav={setToggleNav} userInfo={userInfo} />

        <div className="h-full bg-[#FDFDFD] p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
