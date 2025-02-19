import AdminNav from "@/Components/admindashboard/AdminNav";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
// import { cn } from "@/lib/utils";
import CreateAdminRole from "@/Components/admindashboard/account-management/CreateAdminRole";
import BorderCard from "@/Components/BorderCard";
import DashButton from "@/pages/auth/ButtonDash";
import Modal from "@/pages/auth/components/Modal";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AccountManagLayout = () => {
  const [adminModal, setAdminModal] = useState(false);

  return (
    <div>
      <AdminNav>
        <div className="flex items-center gap-8">
          <p className="text-[20px] font-[500] text-[#344054]">
            List All Admins
          </p>
          <DashButton
            onClick={() => setAdminModal(true)}
            className="text-[14px] text-[white]"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add New Admin
          </DashButton>
        </div>
      </AdminNav>
      <Outlet />

      {adminModal && (
        <Modal>
          <BorderCard className="max-h-[90vh] w-2/5 overflow-y-scroll rounded-lg bg-white p-6 shadow-lg">
            <button
              className="ml-auto block w-min text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setAdminModal(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <CreateAdminRole setModal={setAdminModal} />

            {/* <CreateAdminRole setModal={setAdminModal} /> */}
          </BorderCard>
        </Modal>
      )}
    </div>
  );
};

export default AccountManagLayout;
