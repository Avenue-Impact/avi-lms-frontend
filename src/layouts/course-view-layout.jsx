import { CourseSectionViewProvider } from "@/providers/course-section-view-provider";
import { Outlet } from "react-router-dom";

const CourseViewLayout = () => {
  return (
    <CourseSectionViewProvider>
      <Outlet />
    </CourseSectionViewProvider>
  );
};

export default CourseViewLayout;
