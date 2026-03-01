import { IoSearch } from "react-icons/io5";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import AdminNav from "@/Components/admindashboard/AdminNav";
import { useFetchAllAdminCourses } from "@/hooks/course-management/use-fetch-all-courses";
import { formatDate } from "@/lib/utils";
import _ from "lodash";

const Review = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, error } = useFetchAllAdminCourses(1, 10, true);

  // console.log("Fetch Courses under reviews", data);

  // Debounce function to delay search execution
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
      <AdminNav>
        <p className="text-xl font-medium text-[#344054]">Reviews</p>
      </AdminNav>

      <header className="mt-7 flex items-center justify-between px-4 py-5">
        <p className="text-xl text-[#475367]">
          Courses({data?.data?.data?.courses.length})
        </p>

        <div className="flex w-full max-w-[528px] items-center gap-x-4 rounded-md border border-[#D0D5DD] px-4 py-2">
          <label htmlFor="search">
            <IoSearch className="text-xl text-[#667185]" />
          </label>

          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search by title..."
            className="w-full placeholder:text-[#667185]"
            onChange={handleChange} 
          />
        </div>
      </header>

      <div>
        <main className="grid grid-cols-4 gap-[18px]">
          {isLoading ? (
            "Loading..."
          ) : error ? (
            <p>{error?.response?.data?.message ?? "Something went wrong"}</p>
          ) : filteredCourses.length === 0 ? ( // If no courses match the search
            <p className="col-span-3 text-center font-medium text-[#CC1747]">
              No courses found
            </p>
          ) : (
            filteredCourses.map((course) => {
              const path = `/admin/reviews/review-details/${course.id}/${course.title}`;
              return (
                <div key={course.id}>
                  <Link to={path}>
                    <div className="rounded-lg bg-[rgb(252,252,252)] shadow-md">
                      <div className="h-[90px] w-full overflow-hidden rounded-t-lg md:h-[120px] lg:h-[190px] xl:h-[206px]">
                        <img
                          className="h-full w-full object-cover"
                          src={course.cover_image}
                        />
                      </div>

                      <div className="rounded-b-lg px-[7px] py-[6px] text-[14px] text-[#667185] md:py-2 lg:py-[14px] lg:text-[16px]">
                        <p className="truncate py-[14px] font-[500]">
                          {course.title}
                        </p>

                        <div className="flex flex-col justify-between">
                          <div className="flex gap-2 items-center">
                            <p className="text-[12px] font-[300] text-[#CC1747]">
                              Course Duration
                            </p>
                            <p className="text-[14px] font-[400] text-[#23314A]">
                              {course.date}
                            </p>
                          </div>

                          <div className="flex gap-2 items-center">
                            <p className="text-[12px] font-[300] text-[#CC1747]">
                              End Date
                            </p>
                            <p className="text-[14px] font-[400] text-[#23314A]">
                              {course?.cohorts[0]
                                ? formatDate(course?.cohorts[0].created_at)
                                : "not published"}
                            </p>
                          </div>

                          <div className="flex gap-2 items-center">
                            <p className="text-[12px] font-[300] text-[#CC1747]">
                              Total Reviews
                            </p>
                            <p className="text-[14px] font-[400] text-[#23314A]">
                              {course.reviews?.filter(review => !review.is_deleted).length || 0}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          )}
        </main>
      </div>
    </div>
  );
};

export default Review;
