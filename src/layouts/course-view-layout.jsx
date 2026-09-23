import { CourseSectionViewProvider } from "@/providers/course-section-view-provider";
import { Outlet } from "react-router-dom";

const CourseViewLayout = () => {
  return (
    <div className="w-full">
      <Outlet />
    </div>
  );
};

export default CourseViewLayout;
