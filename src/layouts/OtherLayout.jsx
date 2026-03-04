import OtherSideNav from "@/Components/other-layout/OtherSideNav";
import OtherTopNav from "@/Components/other-layout/OtherTopNav";
import Modal from "@/pages/auth/components/Modal";
import LeaveRating from "@/pages/dashboard/LeaveRating";
import { CourseDataProvider } from "@/providers/CourseDataProvider";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { QuestionsDrawer } from "@/Components/dashboard/QuestionsDrawer";
import { CourseSectionViewProvider } from "@/providers/course-section-view-provider";
import { useUnreadNotificationsPrompt } from "@/hooks/students/use-unread-notifications-prompt";

const OtherLayout = () => {
  const [showModal, setShowModal] = useState(false);
  const [isQuestionDrawerOpen, setIsQuestionDrawerOpen] = useState(false);
  useUnreadNotificationsPrompt();

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <OtherSideNav setIsQuestionDrawerOpen={setIsQuestionDrawerOpen} />

      {/* Questions Drawer (toggled by the Question icon in SideNav) */}
      <QuestionsDrawer
        isOpen={isQuestionDrawerOpen}
        onClose={() => setIsQuestionDrawerOpen(false)}
      />

      {/* Main Content Area - Pushed right on desktop to clear the 76px sidebar */}
      <div className="flex min-h-screen flex-col lg:ml-[76px]">
        <CourseDataProvider>
          <CourseSectionViewProvider>
            <OtherTopNav
              setShowModal={setShowModal}
              setIsQuestionDrawerOpen={setIsQuestionDrawerOpen}
            />
            <main
              className={`mx-auto w-full flex-1 bg-[#FDFDFD] px-4 py-8 md:px-8 lg:px-12`}
            >
              <Outlet />
            </main>
          </CourseSectionViewProvider>
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
