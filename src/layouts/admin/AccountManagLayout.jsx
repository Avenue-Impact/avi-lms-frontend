import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import AdminNav from "@/Components/admindashboard/AdminNav";
// import { cn } from "@/lib/utils";
import DashButton from "@/pages/auth/ButtonDash";
import Modal from "@/pages/auth/components/Modal";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BorderCard from "@/Components/BorderCard";
import { Popover, PopoverContent } from "@/Components/ui/popover";
import { AdminSelectOption } from "@/Components/admindashboard/account-management/AdminSelectOption";

const AccountManagLayout = () => {
  const { pathname } = useLocation();
  const [adminModal, setAdminModal] = useState();



  return (
    <div>
      <AdminNav>
        <div  className="flex items-center gap-8">
          <p className="text-[#344054] text-[20px] font-[500]">List All Admins</p>
          <DashButton onClick={() =>setAdminModal(true)} className="text-[14px] text-[white] ">
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add New Admin
          </DashButton>
        </div>
      </AdminNav>
      <Outlet />


    {adminModal && (
      <Modal>
        <BorderCard className="bg-white p-6 rounded-lg shadow-lg w-2/5">
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none float-right"
            onClick={() => setAdminModal(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>

          {/* Coupon Creation Content */}
          <div className="space-y-4 pb-8">
            <h3 className="text-[20px] font-[500] text-[#344054] lg:text-[24px]">Add New Admin</h3>
            <p className="text-[#667185]">Enter credentials to create admin account</p>
          </div>

          <div className="mb-4">
            <p className="font-[500]">First Name</p>
            <input type="text" placeholder="Enter First Name"
              className="border border-gray-300 rounded p-3 w-full"
            />
          </div>

          <div className="mb-4">
            <p className="font-[500]">Last Name</p>
              <input type="text"
                placeholder="Enter Last Name" className="border border-gray-300 rounded p-3 w-full"/>
          </div>

          <div className="mb-6">
            <p className="font-[500]">Email Address</p>
            <input type="text" placeholder="Enter Email Address"
              className="border border-gray-300 rounded p-3 w-full"
            />
          </div>

          <div className="mb-6">
            <p className="font-[500]">Select Admin Role</p>
            <AdminSelectOption/>
          </div>

          <div className="w-full">
            <DashButton className="w-full  px-9 py-2 bg-primary-color-600 text-white rounded-md hover:bg-primary-color-700">
                Create Account
            </DashButton>
          </div>
        </BorderCard>
      </Modal>
    )}

    </div>
  );
};

export default AccountManagLayout;

