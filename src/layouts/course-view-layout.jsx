import { CourseSectionViewProvider } from "@/providers/course-section-view-provider";
import { Outlet } from "react-router-dom";

const CourseViewLayout = () => {
  return (
    <div className="lg:ml-24">
      <Outlet />
    </div>
  );
};

export default CourseViewLayout;
