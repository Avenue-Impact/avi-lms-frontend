import { useCallback, useState } from "react";
import FloatingWhatsApp from "@/Components/FloatingWhatsApp";
import Container from "@/Components/Container";
import CourseCard from "@/Components/CourseCard";
import { DarkLogo } from "@/Components/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { FaRegBell } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/services/api";
import { Skeleton } from "@/Components/ui/skeleton";
import { useFetchAllCourses } from "@/hooks/students/use-fetch-all-courses";
import fallbackCourseImage from "../../assets/images/join_team.png";
import _ from "lodash";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import PopUp from "@/Components/dashboard/PopUp";
import { useEnrolledCourses } from "@/hooks/students/use-enrolled-courses";
import GlobalPagination from "@/Components/ui/GlobalPagination";

const DiscoverCourses = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseType = searchParams.get("course_type") || "";
  const initialSearch = searchParams.get("search") || "";

  const [inputValue, setInputValue] = useState(initialSearch);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  // Debounced backend search — resets to page 1 on new query
  const handleSearch = useCallback(
    _.debounce((query) => {
      setSearchQuery(query);
      setPage(1);
    }, 500),
    [],
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    handleSearch(value);
  };

  const { data: allCourses, isLoading: isFetchingAllCourses } =
    useFetchAllCourses({ courseType, page, perPage, searchQuery });

  const { data, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });
  const { cohortCourseIds, onDemandCourseIds } = useEnrolledCourses();

  const isAuthenticated = !!data?.data?.data;

  // Enrollment Lock Filter
  const allEnrolledIds = new Set([...cohortCourseIds, ...onDemandCourseIds]);
  const rawCourses = allCourses?.data?.data?.courses || [];
  const displayedCourses = rawCourses.filter((c) => !allEnrolledIds.has(c.id));

  // Pagination meta from backend — map to GlobalPagination shape
  const meta = allCourses?.data?.data;
  const pagination = meta
    ? {
        page: meta.page ?? page,
        perPage: meta.per_page ?? perPage,
        total: meta.total ?? 0,
        lastPage: meta.last_page ?? 1,
      }
    : null;

  const totalAvailable = meta?.total ?? 0;
  const allEnrolled =
    totalAvailable > 0 &&
    displayedCourses.length === 0 &&
    allEnrolledIds.size >= totalAvailable;

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between gap-6 px-6 py-7 lg:px-20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center rounded-full bg-gray-100 p-2 px-3 text-gray-600 hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <Link to={isAuthenticated ? "/dashboard" : "/digital-learning-hub"}>
            <DarkLogo />
          </Link>
        </div>

        {/* Desktop search */}
        <div className="hidden w-full max-w-lg items-center rounded-lg border border-gray-300 bg-white px-4 py-2 lg:flex">
          <FontAwesomeIcon
            onClick={() => setSearchQuery(inputValue)}
            icon={faSearch}
            className="cursor-pointer pr-3 text-gray-500"
          />
          <input
            placeholder="What do you want to learn?"
            className="flex-grow border-none bg-transparent outline-none"
            value={inputValue}
            onChange={handleChange}
          />
        </div>

        {isAuthenticated && (
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="rounded bg-[#CC1747] px-4 py-2 text-sm text-white"
            >
              Dashboard
            </Link>
            <Link to="/dashboard/notification">
              <FaRegBell />
            </Link>
            <PopUp>
              <Avatar>
                <AvatarImage src={data?.data?.data.avatar || ""} />
                {isLoading && <Skeleton className="h-12 w-12 rounded-full" />}
                <AvatarFallback>
                  {isLoading
                    ? ""
                    : data?.data?.data.firstname[0].toUpperCase() +
                      data?.data?.data.lastname[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </PopUp>
          </div>
        )}
      </div>

      <Container>
        {/* Mobile search */}
        <div className="my-4 flex items-center gap-2 rounded-full border border-gray-300 px-4 py-1 md:hidden">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
          <input
            type="text"
            className="border-none p-2 outline-none"
            placeholder="Search courses..."
            value={inputValue}
            onChange={handleChange}
          />
        </div>

        {/* Heading */}
        <h1 className="mb-2 text-3xl">Checkout our top courses</h1>
        <p className="mb-6 text-gray-700">
          Discover our most popular courses from Avenue Impact.
        </p>

        {/* Course Grid */}
        <div className="grid min-h-[200px] grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {isFetchingAllCourses ? (
            <p>Loading Courses...</p>
          ) : allEnrolled ? (
            <div className="col-span-full flex min-h-[300px] w-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF0F0]">
                <span className="text-4xl">🎓</span>
              </div>
              <h3 className="text-xl font-bold text-[#23314A]">
                You're enrolled in all available courses!
              </h3>
              <p className="max-w-sm text-[#667185]">
                Check your dashboard to continue learning your enrolled courses.
              </p>
              <Link
                to="/dashboard"
                className="rounded-lg bg-[#CC1747] px-6 py-2.5 font-medium text-white transition-colors hover:bg-[#b5193d]"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : displayedCourses.length === 0 ? (
            <div className="col-span-full flex min-h-[200px] w-full flex-col items-center justify-center">
              <p className="text-gray-500">No courses found.</p>
            </div>
          ) : (
            displayedCourses.map((course) => (
              <CourseCard
                key={course.id}
                imgSrc={course.cover_image || fallbackCourseImage}
                altText={course.title}
                title={course.title}
                rating={course.average_rating}
                review={course.total_reviews}
                path={`/preview-course/${course.id}`}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {!isFetchingAllCourses && pagination && (
          <GlobalPagination
            pagination={pagination}
            onPageChange={setPage}
            onLimitChange={(limit) => {
              setPerPage(limit);
              setPage(1);
            }}
          />
        )}
      </Container>
      <FloatingWhatsApp />
    </>
  );
};

export default DiscoverCourses;
