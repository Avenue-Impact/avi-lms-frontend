// import CourseSection from "./CourseSection";
import { useViewCourseSections } from "@/hooks/students/use-course-secion-view";
import Assignment from "@/pages/dashboard/Assignment";
import Documents from "@/pages/dashboard/Documents";
import GetCertificate from "@/pages/dashboard/GetCertificate";
import JoinProjectTeam from "@/pages/dashboard/JoinProjectTeam";
import LeaveRating from "@/pages/dashboard/LeaveRating";
import Overview from "@/pages/dashboard/Overview";
import CourseSection from "./CourseSection";

export const MobileContent = ({ data }) => {
  const { sections } = useViewCourseSections();
  if (sections.mobile === "course sections")
    return <CourseSection data={data?.data?.data?.recorded_sessions} />;
  if (sections.mobile === "project area") return <JoinProjectTeam />;
  if (sections.mobile === "share documents")
    return <Documents data={data?.data?.data} />;
  if (sections.mobile === "assignments")
    return <Assignment data={data?.data?.data} />;
  if (sections.mobile === "get certification") return <GetCertificate />;
  if (sections.mobile === "overview") return <Overview data={data} />;
  if (sections.mobile === "leave a review") return <LeaveRating />;
};

export const DesktopContent = ({ data }) => {
  const { sections } = useViewCourseSections();
  if (sections.desktop === "share documents")
    return <Documents data={data?.data?.data} />;
  if (sections.desktop === "assignments")
    return <Assignment data={data?.data?.data} />;
  if (sections.desktop === "overview") return <Overview data={data} />;
};
