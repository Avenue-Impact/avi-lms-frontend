import UnpublishedCourseCard from "../../../Components/admindashboard/course-management/UnpublishedCourseCard";
import { useUnpublishCourses } from "@/hooks/course-management/use-fetch-unpublish-course";
import { useUpdatePublishCourse } from "@/hooks/course-management/use-update-publish-course";
import { formatDate } from "@/lib/utils";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GlobalPagination from "@/Components/ui/GlobalPagination";
import { useCallback, useState } from "react";
import _ from "lodash";

const UnpublishedCourse = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(24);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePublishId, setActivePublishId] = useState(null);

  const { data, isLoading, error } = useUnpublishCourses(page, perPage, searchQuery);
  const { publish, isPending } = useUpdatePublishCourse();

  const handleSearch = useCallback(
    _.debounce((query) => {
      setSearchQuery(query);
      setPage(1); // Reset to page 1 on search
    }, 500),
    [],
  );

  const handleChange = (event) => {
    handleSearch(event.target.value);
  };

  const handlePublishCourse = (id) => {
    setActivePublishId(id);
    publish(
      { courseId: id },
      {
        onSettled: () => {
          setActivePublishId(null);
        },
      },
    );
  };

  const courses = data?.data?.data?.courses || [];

  return (
    <div className="pb-20">
      <div className="flex justify-between py-6">
        <div className="text-[24px] font-[500] text-[#344054]">
          <p>Unpublished Courses</p>
        </div>

        <div className="relative w-2/4">
          <input
            type="text"
            className="w-full rounded-md border bg-gray-50 px-1 py-2 pl-10 text-[14px] focus:outline-none"
            placeholder="Search Course"
            onChange={handleChange}
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
      ) : courses.length === 0 ? (
        <p className="text-center font-medium text-[#CC1747]">
          No unpublished courses found
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <UnpublishedCourseCard
              key={course.id}
              imgSrc={course.cover_image}
              altText={course.title}
              title={course.title}
              onLaunch={() => handlePublishCourse(course.id)}
              isPending={isPending && activePublishId === course.id}
              rating={course.average_rating}
              review={course.total_reviews}
              date={
                course?.cohorts[0]
                  ? formatDate(course?.cohorts[0].created_at)
                  : "not published"
              }
            />
          ))}
        </div>
      )}

      {!isLoading && !error && data?.data?.pagination && (
        <GlobalPagination
          pagination={data.data.pagination}
          onPageChange={setPage}
          onLimitChange={(limit) => {
            setPerPage(limit);
            setPage(1);
          }}
        />
      )}
    </div>
  );
};

export default UnpublishedCourse;
