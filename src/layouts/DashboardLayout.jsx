import DashboardNav from "@/Components/dashboard/DashboardNav";
import DashboardSideNav from "@/Components/dashboard/DashboardSideNav";

import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="">
      <DashboardSideNav />

      <div className="ml-[58px] lg:ml-[272px]">
        <DashboardNav />

        <div className="h-full bg-[#FDFDFD] p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
