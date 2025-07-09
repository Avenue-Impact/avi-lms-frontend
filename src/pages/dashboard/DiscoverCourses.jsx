//

import React, { useState } from "react";
import Container from "@/Components/Container";
import CourseCard from "@/Components/CourseCard";
import { DarkLogo } from "@/Components/Logo";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { FaRegBell } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PopUp from "@/Components/dashboard/PopUp";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/services/api";
import { Skeleton } from "@/Components/ui/skeleton";
import { useFetchAllCourses } from "@/hooks/students/use-fetch-all-courses";
import joinTeam from "../../assets/images/accordion-img2.png";

// Demo courses for testing (IDs must match preview logic)
// export const demoCourses = [
//   {
//     id: "01",
//     title: "Demo: Intro to Business Analysis",
//     cover_image: joinTeam,
//     average_rating: 4.5,
//     total_reviews: 32,
//     overview: "Learn the basics of business analysis and how to apply them in real-world scenarios.",
//     course_includes: ["10+ hours of video", "Certificate of completion", "Downloadable resources"],
//     tools_and_technologies: ["Excel", "Power BI", "Jira"],
//     benefits: ["Career advancement", "Practical skills", "Industry insights"],
//     program_highlights: ["Live sessions", "Hands-on projects", "Expert instructors"],
//     reviews: [
//       {
//         id: 1,
//         user_id: { firstname: "Jane", lastname: "Doe", avatar: "https://i.pravatar.cc/150?img=1" },
//         rating: 5,
//         content: "Great introduction to business analysis!"
//       }
//     ]
//   },
//   ...
// ];

const DiscoverCourses = () => {
  // const [useDemo, setUseDemo] = useState(true); // default to demo mode
  const { data: allCourses, isLoading: isFetchingAllCourses } =
    useFetchAllCourses();
  const { userDetails } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  // const displayedCourses = useDemo
  //   ? demoCourses
  //   : allCourses?.data?.data?.courses || [];
  const displayedCourses = allCourses?.data?.data?.courses || [];

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between gap-6 px-6 py-7 lg:px-20">
        <Link to="/dashboard">
          <DarkLogo />
        </Link>
        <div className="hidden w-full max-w-lg items-center rounded-lg bg-white px-4 py-2 lg:flex">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
          <input
            placeholder="What do you want to learn?"
            className="flex-grow border-none bg-transparent"
          />
        </div>
        <div className="flex items-center gap-4">
          <Link to="/discover-courses" className="hidden text-sm md:block">
            View all Courses
          </Link>
          <FontAwesomeIcon
            icon={faSearch}
            className="text-gray-500 md:hidden"
          />
          <Link to="/dashboard/notification">
            <FaRegBell />
          </Link>
          <PopUp>
            <Avatar>
              <AvatarImage
                src={userDetails.avatar || data?.data?.data.avatar || ""}
              />
              {isLoading && <Skeleton className="h-12 w-12 rounded-full" />}
              <AvatarFallback>
                {userDetails.firstname
                  ? userDetails.firstname[0].toUpperCase() +
                    userDetails.lastname[0].toUpperCase()
                  : isLoading
                    ? ""
                    : data?.data?.data.firstname[0].toUpperCase() +
                      data?.data?.data.lastname[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </PopUp>
        </div>
      </div>

      {/* Toggle Demo/Real */}
      <Container>
        {/* <div className="mb-4">
          <button
            onClick={() => setUseDemo(!useDemo)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            {useDemo ? "Use Real Courses" : "Use Demo Courses"}
          </button>
        </div> */}

        {/* Courses Section */}
        <h1 className="mb-2 text-3xl">Checkout our top courses</h1>
        <p className="mb-6 text-gray-700">
          {/* {useDemo 
            ? "You're viewing demo courses for testing purposes." 
            : "Discover our most popular courses from Avenue Impact."} */}
          Discover our most popular courses from Avenue Impact.
        </p>

        <div className="grid min-h-[200px] grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {isFetchingAllCourses ? (
            <p>Loading Courses...</p>
          ) : displayedCourses.length ? (
            displayedCourses.map((course) => (
              <CourseCard
                key={course.id}
                imgSrc={course.cover_image}
                altText={course.title}
                title={course.title}
                rating={course.average_rating}
                review={course.total_reviews}
                path={`/preview-course/${course.id}`}
              />
            ))
          ) : (
            <div className="col-span-full flex min-h-[200px] w-full flex-col items-center justify-center">
              <button
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#CC1747] px-8 py-4 text-xl text-white shadow-md transition-all duration-150 ease-in-out hover:bg-[#d1476c]"
                onClick={() => window.location.reload()}
              >
                No courses available
                <span className="text-sm">(tap to refresh)</span>
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {displayedCourses.length > 0 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button>
              <ChevronLeft />
            </button>
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} className="rounded border px-3 py-1">
                {n}
              </span>
            ))}
            <button>
              <ChevronRight />
            </button>
          </div>
        )}
      </Container>
    </>
  );
};

export default DiscoverCourses;
