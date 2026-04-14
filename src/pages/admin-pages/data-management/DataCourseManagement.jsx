import Table from "@/Components/Table";
import { CommonButton } from "@/Components/ui/button";
import { Popover, PopoverTrigger } from "@/Components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { IoSearch } from "react-icons/io5";

import { LiveSessionIcon, OnDemandIcon } from "@/Components/Icon";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { useCallback, useState, useEffect } from "react";
import { useFetchCourseStats } from "@/hooks/data-management/use-fetch-course-stats";
import GlobalPagination from "@/Components/ui/GlobalPagination";
import _ from "lodash";

export default function DataCourseManagement() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { isLoading, error, data} = useFetchCourseStats(page, perPage);
  
  // Update courses when data is fetched
  useEffect(() => {
    if (data?.data?.data?.courses) {
      setCourses(data.data.data.courses);
    }
  }, [data]);

  const handleSearch = useCallback(
    _.debounce((query) => {
      setSearchQuery(query);
    }, 500),
    []
  );

  const handleChange = (event) => {
    handleSearch(event.target.value);
  };

  const filteredCourse = courses.filter((course) =>
    course.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );


  if (isLoading) {
    return (
      <div className="py-5">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-5">
        <p> {error?.response?.data?.message ?? "Something went wrong"}</p>
      </div>
    );
  }



  const filterDemand = (type) => {
    if (!data?.data?.data?.courses) return;
    
    const filtered = data.data.data.courses.filter(
      (course) => course.course_type?.toLowerCase() === type.toLowerCase()
    );
    setCourses(filtered);
    setIsFilterOpen(false); // Close popover
  };

  // Sort by enrollment count
  const sortByEnrollment = (order) => {
    if (!courses || courses.length === 0) return;
    
    const sorted = [...courses].sort((a, b) => {
      const aCount = a.enrolled_students || 0;
      const bCount = b.enrolled_students || 0;
      
      if (order === "highest") {
        return bCount - aCount; // Descending order
      } else {
        return aCount - bCount; // Ascending order
      }
    });
    
    setCourses(sorted);
    setIsFilterOpen(false); // Close popover
  };

  const resetFilter = () => {
    if (data?.data?.data?.courses) {
      setCourses(data.data.data.courses);
    }
    setIsFilterOpen(false); // Close popover
  };

  if (!courses || courses.length < 1) {
    return (
      <p className="text-lg capitalize italic text-slate-400">
        No courses yet...
      </p>
    );
  }

  return (
    <div>
      <header className="mt-7 flex items-center justify-between px-4 py-5">
        <p className="text-xl text-[#475367]">Courses Management</p>
        <div className="flex items-center gap-2">
          <div className="flex w-full max-w-[528px] items-center gap-x-4 rounded-md border border-[#D0D5DD] px-4 py-2">
            <label htmlFor="search">
              <IoSearch className="text-xl text-[#667185]" />
            </label>

            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search here..."
              className="w-full placeholder:text-[#667185]"
                onChange={handleChange}

            />
          </div>
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger>
              <CommonButton
                variant={"outline"}
                className="font-normal capitalize"
              >
                filter
              </CommonButton>
            </PopoverTrigger>
            <PopoverContent>
              <div className="w-52 divide-y rounded-md bg-white shadow-md">
                <CommonButton
                  className="flex w-full items-center justify-start gap-4 px-3 py-[14px] capitalize"
                  variant="ghost"
                  onClick={() => filterDemand("on-demand")}
                >
                  <span>
                    <OnDemandIcon />
                  </span>
                  <span>on demand</span>
                </CommonButton>
                <CommonButton
                  className="flex w-full items-center justify-start gap-4 px-3 py-[14px] text-start capitalize"
                  variant="ghost"
                  onClick={() => filterDemand("live-session")}
                >
                  <span>
                    <LiveSessionIcon />
                  </span>
                  <span>live session</span>
                </CommonButton>
                <CommonButton
                  className="flex w-full items-center justify-start gap-4 px-3 py-[14px] capitalize"
                  variant="ghost"
                  onClick={() => sortByEnrollment("highest")}
                >
                  <span>
                    <GoArrowUpRight />
                  </span>
                  <span>highest registered</span>
                </CommonButton>
                <CommonButton
                  className="flex w-full items-center justify-start gap-4 px-3 py-[14px] capitalize"
                  variant="ghost"
                  onClick={() => sortByEnrollment("lowest")}
                >
                  <span>
                    <GoArrowDownLeft />
                  </span>
                  <span>lowest registered</span>
                </CommonButton>
                <CommonButton
                  className="flex w-full items-center justify-start gap-4 px-3 py-[14px] capitalize"
                  variant="ghost"
                  onClick={resetFilter}
                >
                  <span>All Courses</span>
                </CommonButton>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>

      <div className="mt-10">
        {filteredCourse.length === 0 ? (
          <p className="col-span-3 text-center font-medium text-[#CC1747]">
            No courses found
          </p>
        ) : (
          <Table cols={"0.3fr 1.6fr 1.3fr 1.3fr 1fr 1.3fr "}>
            <Table.Header className={"*:text-sm *:font-medium *:capitalize"}>
              <h4>S/N</h4>
              <h4>course title</h4>
              <h4>course type</h4>
              <h4>date created</h4>
              <h4>level</h4>
              <h4>No. of students registered</h4>
            </Table.Header>
            <div className="divide-y">
              {filteredCourse.map((course, i) => {
                const formatDate = (dateString) => {
                  if (!dateString) return "N/A";
                  const date = new Date(dateString);
                  return date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });
                };

                return (
                  <Table.Row key={course._id}>
                    <p>{i + 1}</p>
                    <p className="text-ellipsis text-sm text-[#344054]">
                      {course.title}
                    </p>
                    <p className="text-left">
                      <span className="w-min text-nowrap rounded-[12px] bg-[#FFECE5] px-3 py-[2px] text-xs font-medium text-[#AD3307]">
                        {course.course_type || "N/A"}
                      </span>
                    </p>
                    <p className="text-sm text-[#344054]">
                      {formatDate(course.created_at)}
                    </p>
                    <p className="text-sm text-[#344054]">
                      {course.level || "N/A"}
                    </p>
                    <p className="text-sm text-[#344054]">
                      {course.enrolled_students || 0}
                    </p>
                  </Table.Row>
                );
              })}
            </div>
          </Table>
        )}
        {data?.data?.pagination && (
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
    </div>
  );
}
