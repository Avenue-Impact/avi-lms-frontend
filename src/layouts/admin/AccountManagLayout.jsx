import AdminNav from "@/Components/admindashboard/AdminNav";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import CreateAdminRole from "@/Components/admindashboard/account-management/CreateAdminRole";
import InviteInstructor from "@/Components/admindashboard/account-management/InviteInstructor";
import BorderCard from "@/Components/BorderCard";
import DashButton from "@/pages/auth/ButtonDash";
import Modal from "@/pages/auth/components/Modal";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AccountManagLayout = () => {
  const [adminModal, setAdminModal] = useState(false);
  const [instructorModal, setInstructorModal] = useState(false);

  return (
    <div>
      <AdminNav>
        <div className="flex items-center gap-8 pt-2">
          <p className="text-[20px] font-[500] text-[#344054]">
            List All Admins
          </p>
          <DashButton
            onClick={() => setAdminModal(true)}
            className="text-[14px] text-[white]"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add New Admin
          </DashButton>

          <DashButton
            onClick={() => setInstructorModal(true)}
            className="text-[14px] text-[white]"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Invite New
            Instructor
          </DashButton>
        </div>
      </AdminNav>
      <Outlet />

      {adminModal && (
        <Modal>
          <BorderCard className="max-h-[90vh] w-[90%] overflow-y-scroll rounded-lg bg-white p-6 shadow-lg md:w-2/5">
            <button
              className="ml-auto block w-min text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setAdminModal(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <CreateAdminRole setAdminModal={setAdminModal} />
          </BorderCard>
        </Modal>
      )}

      {instructorModal && (
        <Modal>
          <BorderCard className="max-h-[90vh] w-[90%] overflow-y-scroll rounded-lg bg-white p-6 shadow-lg md:w-2/5">
            <button
              className="ml-auto block w-min text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setInstructorModal(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <InviteInstructor setModal={setInstructorModal} />
          </BorderCard>
        </Modal>
      )}
    </div>
  );
};

export default AccountManagLayout;
