import { Link, Outlet, useLocation } from "react-router-dom";

import AdminNav from "@/Components/admindashboard/AdminNav";
import { cn } from "@/lib/utils";

const AdminCertificateLayout = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <AdminNav>
        <p className="text-[#344054] text-[20px] font-[500]">Certificate</p>
      </AdminNav>
      <Outlet />
    </div>
  );
};

export default AdminCertificateLayout;

