import { useState } from "react";
import AdminNav from "../../Components/admindashboard/AdminNav";
import { Outlet } from "react-router-dom";
import DashButton from "@/pages/auth/ButtonDash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function ZoomManagementLayout() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div>
      <AdminNav>
        <div className="flex items-center gap-8 pt-2">
          <div>
            <p className="text-[20px] font-[500] text-[#344054]">
              Zoom Account Management
            </p>
            <p className="text-sm text-gray-500 max-w-[500px]">
              Manage independent Zoom integrations. Each account can be bound to specific courses.
            </p>
          </div>
          <DashButton
            onClick={() => setShowAddModal(true)}
            className="text-[14px] text-[white]"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Zoom Account
          </DashButton>
        </div>
      </AdminNav>
      <div className="min-h-screen bg-[#F8F9FB] p-6">
        <Outlet context={{ showAddModal, setShowAddModal }} />
      </div>
    </div>
  );
}

export default ZoomManagementLayout;
