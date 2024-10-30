import { createdCourses } from "@/lib/courses";
import CourseWorkAreaWithCourse from "./CourseWorkAreaWithCourse";
import EmptyCourseArea from "./EmptyCourseArea";
import AdminNav from "@/Components/admindashboard/AdminNav";

function CourseWorkArea() {
  return (
    <>
      <AdminNav>
        <p className="text-xl font-medium text-[#344054]">Course Work Area</p>
      </AdminNav>
      <div>
        {createdCourses.length > 1 ? (
          <CourseWorkAreaWithCourse />
        ) : (
          <EmptyCourseArea />
        )}
      </div>
    </>
  );
}

export default CourseWorkArea;
