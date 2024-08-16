import CourseSection from "./CourseSection";
import JoinProjectTeam from "@/pages/dashboard/JoinProjectTeam";
import Documents from "@/pages/dashboard/Documents";
import Assignment from "@/pages/dashboard/Assignment";
import GetCertificate from "@/pages/dashboard/GetCertificate";
import Overview from "@/pages/dashboard/Overview";
import LeaveRating from "@/pages/dashboard/LeaveRating";

export const MobileContent = ({
  name,
  setSession,
  setSectionDetails,
  active,
  setActive,
}) => {
  if (name === "course sections")
    return (
      <CourseSection
        setSession={setSession}
        setSectionDetails={setSectionDetails}
        active={active}
        setActive={setActive}
      />
    );
  if (name === "project area") return <JoinProjectTeam />;
  if (name === "share documents") return <Documents />;
  if (name === "assignments") return <Assignment />;
  if (name === "get certification") return <GetCertificate />;
  if (name === "overview") return <Overview />;
  if (name === "leave a review") return <LeaveRating />;
};

export const DesktopContent = ({ section }) => {
  if (section === "share documents") return <Documents />;
  if (section === "assignments") return <Assignment />;
  if (section === "overview") return <Overview />;
};
