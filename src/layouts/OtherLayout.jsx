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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  useUnreadNotificationsPrompt();

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <CourseDataProvider>
        <CourseSectionViewProvider>
          {/* Course Sidebar Navigation */}
          <OtherSideNav
            setIsQuestionDrawerOpen={setIsQuestionDrawerOpen}
            setShowModal={setShowModal}
            isOpenMobile={isMobileSidebarOpen}
            setIsOpenMobile={setIsMobileSidebarOpen}
          />

          {/* Questions Drawer (toggled by Questions & Help item) */}
          <QuestionsDrawer
            isOpen={isQuestionDrawerOpen}
            onClose={() => setIsQuestionDrawerOpen(false)}
          />

          {/* Main Content Area - Pushed right on desktop to clear the 272px sidebar */}
          <div className="flex min-h-screen flex-col lg:ml-[272px]">
            <OtherTopNav
              setShowModal={setShowModal}
              setIsQuestionDrawerOpen={setIsQuestionDrawerOpen}
              setIsMobileSidebarOpen={setIsMobileSidebarOpen}
            />
            <main
              className="mx-auto w-full flex-1 bg-[#FDFDFD] px-4 py-8 md:px-8 lg:px-12"
            >
              <Outlet />
            </main>
          </div>
        </CourseSectionViewProvider>
      </CourseDataProvider>

      {showModal && (
        <Modal>
          <LeaveRating setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
};

export default OtherLayout;
