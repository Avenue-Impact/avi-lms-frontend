import { createdCourses } from "@/lib/courses";
import CourseWorkAreaWithCourse from "./CourseWorkAreaWithCourse";
import EmptyCourseArea from "./EmptyCourseArea";
import AdminNav from "@/Components/admindashboard/AdminNav";
import { useFetchAllAdminCourses } from "@/hooks/course-management/use-fetch-all-courses";
import { IoReturnUpForward } from "react-icons/io5";

function CourseWorkArea() {
  return (
    <>
      <AdminNav>
        <p className="text-xl font-medium text-[#344054]">Course Work Area</p>
      </AdminNav>
      <CourseArea />
    </>
  );
}

const CourseArea = () => {
  const { data, isLoading, error } = useFetchAllAdminCourses(1, 10);

  if (isLoading) return <p>Loading ...</p>;

  if (error)
    return <p>{error?.response?.data?.message ?? "Something went wrong"}</p>;
  return (
    <div>
      {data?.data?.data?.courses?.length < 1 ? (
        <EmptyCourseArea />
      ) : (
        <CourseWorkAreaWithCourse data={data?.data?.data?.courses} />
      )}
    </div>
  );
};

export default CourseWorkArea;
