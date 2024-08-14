import CourseSection from "./CourseSection";
import JoinProjectTeam from "@/pages/dashboard/JoinProjectTeam";
import Documents from "@/pages/dashboard/Documents";
import Assignment from "@/pages/dashboard/Assignment";
import GetCertificate from "@/pages/dashboard/GetCertificate";
import Overview from "@/pages/dashboard/Overview";
import LeaveRating from "@/pages/dashboard/LeaveRating";

const MobileContent = ({ name }) => {
  if (name === "course sections") return <CourseSection />;
  if (name === "project area") return <JoinProjectTeam />;
  if (name === "share documents") return <Documents />;
  if (name === "assignments") return <Assignment />;
  if (name === "get certification") return <GetCertificate />;
  if (name === "overview") return <Overview />;
  if (name === "leave a review") return <LeaveRating />;
};

export default MobileContent;
