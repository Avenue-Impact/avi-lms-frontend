import DashboardNav from "@/Components/dashboard/DashboardNav";
import DashboardSideNav from "@/Components/dashboard/DashboardSideNav";
import { QuestionsDrawer } from "@/Components/dashboard/QuestionsDrawer";
import WhatsAppPromptModal from "@/Components/dashboard/WhatsAppPromptModal";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useUnreadNotificationsPrompt } from "@/hooks/students/use-unread-notifications-prompt";
import { useProfile } from "@/hooks/students/use-fetch-student-profile";
import { Outlet, ScrollRestoration } from "react-router-dom";

const DashboardLayout = ({ userInfo }) => {
  const [toggleNav, setToggleNav] = useState(true);
  const [isHelpDeskOpen, setIsHelpDeskOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  useUnreadNotificationsPrompt();
  const { data: profileResponse } = useProfile();
  const user = profileResponse?.data?.data || userInfo;

  useEffect(() => {
    if (user) {
      const hasWA =
        user.whatsapp_number &&
        user.whatsapp_number !== "null" &&
        user.whatsapp_number !== "NONE";
      const isDismissedInDB = user.whatsapp_dismissed === true;
      const isDismissedInSession =
        sessionStorage.getItem("wa_prompt_dismissed_session") === "true";

      // If whatsapp number is null and not dismissed, show prompt
      if (!hasWA && !isDismissedInDB && !isDismissedInSession) {
        const timer = setTimeout(() => {
          setIsWhatsAppModalOpen(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [user]);

  const handleCloseWhatsAppModal = () => {
    sessionStorage.setItem("wa_prompt_dismissed_session", "true");
    setIsWhatsAppModalOpen(false);
  };

  return (
    <div className="relative">
      <ScrollRestoration />

      {/* WhatsApp Prompt Modal */}
      <WhatsAppPromptModal
        isOpen={isWhatsAppModalOpen}
        onClose={handleCloseWhatsAppModal}
        user={user}
      />

      <div
        className={cn(
          "fixed left-0 top-0 z-10 flex h-screen w-full items-center justify-center bg-black/25 px-6 transition-transform duration-100 ease-linear lg:hidden",
          toggleNav ? "-translate-x-full" : "translate-x-0",
        )}
      ></div>
      <DashboardSideNav
        toggleNav={toggleNav}
        setTogglNav={setToggleNav}
        onOpenHelpDesk={() => setIsHelpDeskOpen(true)}
      />

      {/* Help Desk Hotline Drawer */}
      <QuestionsDrawer
        isOpen={isHelpDeskOpen}
        onClose={() => setIsHelpDeskOpen(false)}
      />

      <div className="ml-0 h-full lg:ml-[272px] lg:px-0">
        <DashboardNav setToggleNav={setToggleNav} userInfo={userInfo} />

        <div className="h-full bg-[#FDFDFD] p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
