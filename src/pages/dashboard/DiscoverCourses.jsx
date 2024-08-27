import Container from "@/Components/Container";
import CourseCard from "@/Components/CourseCard";
import joinTeam from "../../assets/images/join_team.png";

import { DarkLogo } from "@/Components/Logo";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { FaRegBell } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { DropdownMenuComponent } from "@/Components/dashboard/DropDownMenuComponent";
import PopUp from "@/Components/dashboard/PopUp";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/services/api";
import { Skeleton } from "@/Components/ui/skeleton";

const DiscoverCourses = () => {

  const { userDetails } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between gap-6 px-6 py-7 lg:justify-normal lg:px-20">
        <DarkLogo />
        <div className="hidden w-max items-center gap-3 rounded-lg bg-[#FDFDFD] px-4 py-2 lg:flex lg:w-full">
          <FontAwesomeIcon icon={faSearch} className="text-[#475367]" />
          <input
            type="text"
            placeholder=" What do you want to learn?"
            className="w-36 rounded-none border-none bg-transparent text-[#667185] md:w-full"
          />
        </div>

        <div className="flex items-center gap-3 justify-self-end md:gap-4 lg:gap-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="hidden text-sm text-[#667185] md:block md:text-nowrap"
              onClick={() => navigate("/discover-courses")}
            >
              View all Courses
            </button>
            <span className="lg:hidden">
              <FontAwesomeIcon icon={faSearch} className="text-[#475367]" />
            </span>

            <Link to={"/dashboard/notification"} className="text-xl">
              <FaRegBell />
            </Link>
          </div>
          <div className="relative pr-2">
            <PopUp>
              <div className="absolute right-0 top-0 z-10 h-2 w-2 rounded-full bg-[#008000] md:h-3 md:w-3"></div>
                <Avatar>
                <AvatarImage src={
                      userDetails?.avatar 
                        ? userDetails.avatar 
                        : isLoading 
                        ? '' // Skeleton will be shown when isLoading is true
                        : data?.data?.data.avatar || ''
                    }
                    alt="User Avatar"
                  />
                  {isLoading && (
                    <Skeleton className="h-12 w-12 rounded-full" />
                )}

                <AvatarFallback className="bg-primary-color-100 text-lg text-primary-color-600">
                  {userDetails.firstname ? (
                    `${userDetails.firstname.charAt(0).toUpperCase()}${userDetails.lastname.charAt(0).toUpperCase()}`
                  ) : isLoading ? (
                    <Skeleton className="h-12 w-12 rounded-full" />
                  ) : (
                    `${data?.data?.data.firstname.charAt(0).toUpperCase()}${data?.data?.data.lastname.charAt(0).toUpperCase()}`
                  )}
                </AvatarFallback>
              </Avatar>
            </PopUp>
          </div>
        </div>
      </div>
      <Container>
        <h1 className="text-2xl text-tertiary-color-900 md:text-3xl lg:text-[40px]">
          Checkout our top courses
        </h1>
        <div className="mb-12 mt-5 h-px w-full bg-[#C7D7F4]" />
        <p className="max-w-[710px] text-sm font-light leading-[30px] text-tertiary-color-700 md:text-base">
          Discover our most popular courses, carefully curated to enhance your
          skills and advance your career. Join thousands of learners who have
          already taken the next step with Avenue Impact{" "}
        </p>
        <div className="mb-6 mt-10 grid grid-cols-2 gap-[18px] md:grid-cols-3 lg:grid-cols-4">
          <CourseCard
            imgSrc={joinTeam}
            altText="joinTeam"
            title={
              <>
                {" "}
                Project Consultant <br /> Training Programme (Bundle)
              </>
            }
            rating="4.3"
            numRatings="45,345"
            previewButtonText="Preview this course"
            path="/PreviewVideoCourse"
          />
          <CourseCard
            imgSrc={joinTeam}
            altText="joinTeam"
            title={
              <>
                {" "}
                Project Consultant <br /> Training Programme (Bundle)
              </>
            }
            rating="4.3"
            numRatings="45,345"
            previewButtonText="Preview this course"
            path="/PreviewVideoCourse"
          />
          <CourseCard
            imgSrc={joinTeam}
            altText="joinTeam"
            title={
              <>
                {" "}
                Project Consultant <br /> Training Programme (Bundle)
              </>
            }
            rating="4.3"
            numRatings="45,345"
            previewButtonText="Preview this course"
            path="/PreviewVideoCourse"
          />

          <CourseCard
            imgSrc={joinTeam}
            altText="joinTeam"
            title={
              <>
                {" "}
                Project Consultant <br /> Training Programme (Bundle)
              </>
            }
            rating="4.3"
            numRatings="45,345"
            previewButtonText="Preview this course"
            path="/PreviewVideoCourse"
          />

          <CourseCard
            imgSrc={joinTeam}
            altText="joinTeam"
            title={
              <>
                {" "}
                Project Consultant <br /> Training Programme (Bundle)
              </>
            }
            rating="4.3"
            numRatings="45,345"
            previewButtonText="Preview this course"
            path="/PreviewVideoCourse"
          />

          <CourseCard
            imgSrc={joinTeam}
            altText="joinTeam"
            title={
              <>
                {" "}
                Project Consultant <br /> Training Programme (Bundle)
              </>
            }
            rating="4.3"
            numRatings="45,345"
            previewButtonText="Preview this course"
            path="/PreviewVideoCourse"
          />
          <CourseCard
            imgSrc={joinTeam}
            altText="joinTeam"
            title={
              <>
                {" "}
                Project Consultant <br /> Training Programme (Bundle)
              </>
            }
            rating="4.3"
            numRatings="45,345"
            previewButtonText="Preview this course"
            path="/PreviewVideoCourse"
          />
          <CourseCard
            imgSrc={joinTeam}
            altText="joinTeam"
            title={
              <>
                {" "}
                Project Consultant <br /> Training Programme (Bundle)
              </>
            }
            rating="4.3"
            numRatings="45,345"
            previewButtonText="Preview this course"
            path="/PreviewVideoCourse"
          />
          <CourseCard
            imgSrc={joinTeam}
            altText="joinTeam"
            title={
              <>
                {" "}
                Project Consultant <br /> Training Programme (Bundle)
              </>
            }
            rating="4.3"
            numRatings="45,345"
            previewButtonText="Preview this course"
            path="/PreviewVideoCourse"
          />
          <CourseCard
            imgSrc={joinTeam}
            altText="joinTeam"
            title={
              <>
                {" "}
                Project Consultant <br /> Training Programme (Bundle)
              </>
            }
            rating="4.3"
            numRatings="45,345"
            previewButtonText="Preview this course"
            path="/PreviewVideoCourse"
          />
          <CourseCard
            imgSrc={joinTeam}
            altText="joinTeam"
            title={
              <>
                {" "}
                Project Consultant <br /> Training Programme (Bundle)
              </>
            }
            rating="4.3"
            numRatings="45,345"
            previewButtonText="Preview this course"
            path="/PreviewVideoCourse"
          />
          <CourseCard
            imgSrc={joinTeam}
            altText="joinTeam"
            title={
              <>
                {" "}
                Project Consultant <br /> Training Programme (Bundle)
              </>
            }
            rating="4.3"
            numRatings="45,345"
            previewButtonText="Preview this course"
            path="/PreviewVideoCourse"
          />
        </div>
        <div className="mb-12 mt-5 h-px w-full bg-[#C7D7F4]" />
        <div className="items-enter mx-auto flex w-full max-w-[314px] gap-1">
          <button className="rounded-lg border border-[#D0D5DD] p-3">
            <ChevronLeft />
          </button>
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              className="rounded border border-transparent p-3 text-sm text-[#98A2B3] hover:border hover:border-primary-color-600 hover:text-black"
            >
              {num}
            </span>
          ))}
          <button className="rounded-lg border border-[#D0D5DD] p-3">
            <ChevronRight />
          </button>
        </div>
      </Container>
    </>
  );
};

export default DiscoverCourses;
