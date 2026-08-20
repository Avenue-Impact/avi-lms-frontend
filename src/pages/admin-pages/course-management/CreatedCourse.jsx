import CreatedCourseCard from "../../../Components/admindashboard/course-management/CreatedCourseCard";

import { useFetchAllAdminCourses } from "@/hooks/course-management/use-fetch-all-courses";
import { formatDate } from "@/lib/utils";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GlobalPagination from "@/Components/ui/GlobalPagination";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import _ from "lodash";

const CreatedCourse = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(24);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { data, isLoading, error } = useFetchAllAdminCourses(page, perPage, true, searchQuery);

  console.log("These are all the courses", data);
  const handleSearch = useCallback(
    _.debounce((query) => {
      setSearchQuery(query);
      setPage(1); // Reset page to 1 on search
    }, 500),
    [],
  );

  const handleChange = (event) => {
    handleSearch(event.target.value);
  };

  const handleClone = (course) => {
    const clonedCourse = {
      ...course,
      title: `${course.title} (Clone)`,
    };
    
    // Remove unique identifiers so it's treated as a new course
    delete clonedCourse.id;
    delete clonedCourse._id;
    delete clonedCourse.slug;

    // Convert preview_video object to upload_from_url string for the form
    if (clonedCourse.preview_video && clonedCourse.preview_video.url) {
      clonedCourse.upload_from_url = clonedCourse.preview_video.url;
    }

    localStorage.setItem("course-information", JSON.stringify(clonedCourse));
    navigate("/admin/course/management/create-course");
  };

  const courses = data?.data?.data?.courses || [];

  return (
    <div className="pb-20">
      <div className="flex justify-between py-6">
        <div className="text-[24px] font-[500] text-[#344054]">
          <p>Course Management</p>
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
        <p className="col-span-3 text-center font-medium text-[#CC1747]">
          No courses found
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const path = `/admin/course/management/preview/${course.id}?title=${course.title}`;

            return (
              <div key={course.id}>
                <Link to={path}>
                  <CreatedCourseCard
                    key={course.id}
                    imgSrc={course.cover_image}
                    altText={course.title}
                    title={course.title}
                    rating={course.average_rating}
                    review={course.total_reviews}
                    onClone={() => handleClone(course)}
                    date={
                      course?.cohorts[0]
                        ? formatDate(course?.cohorts[0].created_at)
                        : "N/A"
                    }
                  />
                </Link>
              </div>
            );
          })}
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

export default CreatedCourse;
