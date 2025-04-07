import AdminNav from "@/Components/admindashboard/AdminNav";
import { Outlet } from "react-router-dom";

function NotificationLayout() {
  return (
    <>
      <AdminNav>
        <p className="text-xl font-medium text-[#344054]">Notification</p>
      </AdminNav>
      <Outlet />
    </>
  );
}

export default NotificationLayout;
