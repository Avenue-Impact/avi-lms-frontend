import CourseSection from "./CourseSection";
import JoinProjectTeam from "@/pages/dashboard/JoinProjectTeam";
import Documents from "@/pages/dashboard/Documents";
import Assignment from "@/pages/dashboard/Assignment";
import GetCertificate from "@/pages/dashboard/GetCertificate";
import Overview from "@/pages/dashboard/Overview";
import LeaveRating from "@/pages/dashboard/LeaveRating";
import { DocumentContext } from "@/pages/dashboard/ShareDocument";
import { useContext } from "react";

export const MobileContent = ({ data }) => {
  const { sections } = useContext(DocumentContext);
  if (sections.mobile === "course sections")
    return <CourseSection data={data?.data?.data?.recorded_sessions} />;
  if (sections.mobile === "project area") return <JoinProjectTeam />;
  if (sections.mobile === "share documents")
    return <Documents data={data?.data?.data} />;
  if (sections.mobile === "assignments")
    return <Assignment data={data?.data?.data} />;
  if (sections.mobile === "get certification") return <GetCertificate />;
  if (sections.mobile === "overview") return <Overview />;
  if (sections.mobile === "leave a review") return <LeaveRating />;
};

export const DesktopContent = ({ data }) => {
  const { sections } = useContext(DocumentContext);
  if (sections.desktop === "share documents")
    return <Documents data={data?.data?.data} />;
  if (sections.desktop === "assignments")
    return <Assignment data={data?.data?.data} />;
  if (sections.desktop === "overview") return <Overview />;
};
