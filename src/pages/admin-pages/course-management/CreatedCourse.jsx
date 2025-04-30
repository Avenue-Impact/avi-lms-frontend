import CreatedCourseCard from "../../../Components/admindashboard/course-management/CreatedCourseCard";

import { useFetchAllAdminCourses } from "@/hooks/course-management/use-fetch-all-courses";
import { formatDate } from "@/lib/utils";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UnplishedCreatedCourse from "./UnplishedCreatedCourse";
import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import _ from "lodash";

const CreatedCourse = () => {
  const { data, isLoading, error } = useFetchAllAdminCourses(1, 10, true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback(
    _.debounce((query) => {
      setSearchQuery(query);
    }, 500),
    [],
  );

  const handleChange = (event) => {
    handleSearch(event.target.value);
  };

  // Filter courses by title
  const filteredCourses = data?.data?.data?.courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );
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
      ) : filteredCourses.length === 0 ? (
        <p className="col-span-3 text-center font-medium text-[#CC1747]">
          No courses found
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => {
            const path = `/admin/course/management/preview/${course.id}?title=${course.title}`;

            return (
              <div key={course.id}>
                <Link to={path}>
                  <CreatedCourseCard
                    key={course.id}
                    imgSrc={course.cover_image}
                    altText={course.title}
                    title={course.title}
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

      <UnplishedCreatedCourse />
    </div>
  );
};

export default CreatedCourse;
