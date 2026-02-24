import OtherSideNav from "@/Components/other-layout/OtherSideNav";
import OtherTopNav from "@/Components/other-layout/OtherTopNav";
import Modal from "@/pages/auth/components/Modal";
import LeaveRating from "@/pages/dashboard/LeaveRating";
import { CourseDataProvider } from "@/providers/CourseDataProvider";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { QuestionsDrawer } from "@/Components/dashboard/QuestionsDrawer";

const OtherLayout = () => {
  const [showModal, setShowModal] = useState(false);
  const [isQuestionDrawerOpen, setIsQuestionDrawerOpen] = useState(false);

  return (
    <div className="bg-[#FDFDFD] min-h-screen">
      <OtherSideNav setIsQuestionDrawerOpen={setIsQuestionDrawerOpen} />
      
      {/* Questions Drawer (toggled by the Question icon in SideNav) */}
      <QuestionsDrawer 
        isOpen={isQuestionDrawerOpen} 
        onClose={() => setIsQuestionDrawerOpen(false)} 
      />

      {/* Main Content Area - Pushed right on desktop to clear the 76px sidebar */}
      <div className="lg:ml-[76px] flex flex-col min-h-screen">
        <CourseDataProvider>
          <OtherTopNav setShowModal={setShowModal} />
          <main className="flex-1 w-full px-4 py-8 md:px-8 lg:px-12 bg-[#FDFDFD] max-w-[1400px] mx-auto">
            <Outlet />
          </main>
        </CourseDataProvider>
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
