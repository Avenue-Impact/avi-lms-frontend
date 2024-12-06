import CreatedCourseCard from "../../../Components/admindashboard/course-management/CreatedCourseCard";

import { useFetchAllAdminCourses } from "@/hooks/course-management/use-fetch-all-courses";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreatedCourse = () => {
  const formatDate = (date) => {
    const createdAt = new Date(date);
    const locale = navigator.language;

    return new Intl.DateTimeFormat(locale).format(createdAt);
  };

  const { data, isLoading, error } = useFetchAllAdminCourses(1, 10, true);
  console.log("project area", data);

  console.log(error);

  return (
    <div>
      <div className="flex justify-between py-6">
        <div className="text-[24px] font-[500] text-[#344054]">
          <p>Course Management</p>
        </div>

        <div className="relative w-2/4">
          <input
            type="text"
            className="w-full rounded-md border bg-gray-50 px-1 py-2 pl-10 text-[14px] focus:outline-none"
            placeholder="Search Course"
          />
          <div className="absolute left-3 top-1.5 text-gray-400">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
      </div>

      {isLoading ? (
        "Loading..."
      ) : error ? (
        <p>{error?.response?.data?.message ?? "Something went wrong"}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.data?.data?.courses.map((course) => (
            <CreatedCourseCard
              key={course.id}
              imgSrc={course.cover_image}
              altText={course.title}
              title={course.title}
              date={
                course?.cohorts[0]
                  ? formatDate(course?.cohorts[0].created_at)
                  : "not published"
              }
              path={`/admin/course/management/preview/${course.id}?title=${course.title}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CreatedCourse;
