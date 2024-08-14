import OtherSideNav from "@/Components/other-layout/OtherSideNav";
import OtherTopNav from "@/Components/other-layout/OtherTopNav";
import Modal from "@/pages/auth/components/Modal";
import LeaveRating from "@/pages/dashboard/LeaveRating";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const OtherLayout = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>

      <OtherSideNav />
      <div className="ml-[76px]">
        <OtherTopNav setShowModal={setShowModal} />
        <div className="px-3 py-[35px] md:px-5">
          <Outlet />
        </div>

      </div>
      {showModal && (
        <Modal>
          <LeaveRating setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
};

export default OtherLayout;
