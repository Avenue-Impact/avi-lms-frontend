import { ClosedSidnav } from "@/Components/other-layout/ClosedSidbar";
import OtherSideNav from "@/Components/other-layout/OtherSideNav";
import OtherTopNav from "@/Components/other-layout/OtherTopNav";
import { Outlet } from "react-router-dom";

const OtherLayout = () => {
  return (
    <div>
      <OtherSideNav />
      <div className="ml-[76px]">
        <OtherTopNav />
        <Outlet />
      </div>
    </div>
  );
};

export default OtherLayout;
