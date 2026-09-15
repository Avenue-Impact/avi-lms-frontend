import BorderCard from "@/Components/BorderCard";
import { Filter } from "@/Components/dashboard/Filter";
import DashboardDiscover from "@/Components/DashboardDiscover";
import {
  liveSessionDetailQuery,
  recordedSessionDetailQuery,
} from "@/loaders/student/home-page-loader";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DashButton from "../auth/ButtonDash";
import DashSelect from "../auth/components/DashSelect";
import Modal from "../auth/components/Modal";
import NoDemandCourses from "../auth/components/NoDemandCourses";
import NoCoursesMessage from "../auth/components/NoLiveCourses";
import ModalContent from "../lms-pages/ReminderModalContent";
import LiveSessionCourseCard from "../../Components/student/live-session/course-card";
import RecordedSessionCourseCard from "@/Components/student/recorded-session/course-card";
import { useFetchWishlist } from "@/hooks/wishlists/use-fetch-wishlist";
import Courses from "@/Components/dashboard/Courses";
import { useGetRegisteredCourses } from "@/hooks/students/use-get-registered-courses";
import { useFetchPreviewlist } from "@/hooks/wishlists/use-fetch-previewlist";
import { useNavigate } from "react-router-dom";
import fallbackCourseImage from "@/assets/images/join_team.png";
import TakeAssessmentButton from "@/Components/assessment/TakeAssessmentButton";
import { useCareerAssessment } from "@/utils/careerAssessment";
// import Cookies from "js-cookie";
// import { useProfile } from "@/services/queries";

// import ReminderModal from '../auth/components/ReminderModal';

const DashBoardHomePage = () => {
  const [modal, setShowModal] = useState(false);

  const { data: liveData } = useQuery(liveSessionDetailQuery());
  const { data: onDemandData } = useQuery(recordedSessionDetailQuery());
  
  const liveCourses = liveData?.data?.data?.courses || [];
  const onDemandCourses = onDemandData?.data?.data?.courses || [];
  const allCourses = [...liveCourses, ...onDemandCourses];

  const completedCount = allCourses.filter((c) => c.progress >= 99).length;
  const inProgressCount = allCourses.filter((c) => (c.progress > 0 || c.last_watched_video_id) && c.progress < 99).length;

  return (
    <div>
      <div className="flex">
        <div className="flex w-full max-w-5xl flex-col space-y-6 rounded-lg md:flex-row md:space-x-6 md:space-y-0">
          <div className="mb-4 w-full rounded-lg bg-[#B3123F] p-6 text-justify text-[#fff] md:mb-0 md:w-1/3 lg:bg-transparent lg:p-0 lg:text-black">
            <h3 className="mb-2 text-xl font-semibold">Learning Reminders</h3>
            <p className="mb-4 text-sm">
              Use push notifications or calendar events to stay on top of your
              learning goals.
            </p>

            <DashButton
              onClick={() => setShowModal((prev) => !prev)}
              className="mt-2 bg-white text-sm font-[500] text-primary-color-600 lg:bg-[#B3123F] lg:text-[#fff]"
            >
              Add a learning reminder
            </DashButton>
          </div>
          <div className="flex w-full justify-around gap-2 md:w-3/5">
            <div className="flex-1 rounded-lg border-2 border-gray-300 bg-white p-4 lg:mx-2">
              <p className="text-[14px] text-gray-600">Completed Courses</p>
              <h1 className="pt-4 text-6xl font-[500]">{completedCount}</h1>
            </div>
            <div className="flex-1 rounded-lg border-2 border-gray-300 bg-white p-4 lg:mx-2">
              <p className="text-[14px] text-gray-600">In Progress Courses</p>
              <h1 className="pt-4 text-6xl font-[500]">{inProgressCount}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* CONTINUE FROM WHERE YOU LEFT OFF (PREVIEW LIST) */}
      <PreviewListCourses />

      {/* EXPLORE ANY OF THESE PATHWAYS (SCENARIO 12) */}
      <ExplorePathwaysDashboardSection />

      {/* LIVE SESSION */}
      <div className="lg:border-white-300 my-6 rounded-lg border-2 bg-white p-6">
        <div className="flex flex-row items-center justify-between rounded-lg bg-white pb-6 lg:p-2">
          <div className="flex-1 md:mb-0 lg:mb-4">
            <h3 className="text-l font-semibold text-gray-800">
              Live Session + Mentoring
            </h3>
          </div>
          <div className="hidden items-center space-x-2 lg:flex">
            <p className="text-gray-600">Filter by</p>
            <DashSelect />
          </div>

          <div className="items-center space-x-2 lg:hidden">
            <Filter />
          </div>
        </div>

        <div>
          <LiveSessionCourses />
        </div>
      </div>

      {/* ON DEMAND */}
      <div className="border-white-300 my-6 rounded-lg border-2 bg-white p-6">
        <div className="flex flex-row items-center justify-between rounded-lg bg-white pb-6 lg:p-2">
          <div className="flex-1 md:mb-0 lg:mb-4">
            <h3 className="text-l font-semibold text-gray-800">
              On Demand Courses (Pre Recorded Sessions)
            </h3>
          </div>
          <div className="hidden items-center space-x-2 lg:flex">
            <p className="text-gray-600">Filter by</p>
            <DashSelect />
          </div>

          <div className="items-center space-x-2 lg:hidden">
            <Filter />
          </div>
        </div>

        <div>
          <OnDemandSessionCourses />
        </div>
      </div>

      {/* WISHLISTED COURSES */}
      <div className="border-white-300 my-6 rounded-lg border-2 bg-white p-6">
        <div className="flex flex-row items-center justify-between rounded-lg bg-white pb-6 lg:p-2">
          <div className="flex-1 md:mb-0 lg:mb-4">
            <h3 className="text-l font-semibold text-gray-800">
              My Wishlist
            </h3>
          </div>
        </div>

        <div>
          <WishlistedCourses />
        </div>
      </div>

      {modal && (
        <Modal>
          <BorderCard className="bg-white">
            <button onClick={() => setShowModal((prev) => !prev)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <div>{modal && <ModalContent setShowModal={setShowModal} />}</div>
          </BorderCard>
        </Modal>
      )}
    </div>
  );
};

const OnDemandSessionCourses = () => {
  const { data } = useQuery(recordedSessionDetailQuery());
  console.log("on demand data", data)
  return (
    <>
      {data?.data?.data?.courses.length < 1 ? (
        <NoDemandCourses />
      ) : (
        <div
          className={`grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4`}
        >
          {data?.data?.data?.courses.map((course) => {
            return (
              <RecordedSessionCourseCard
                key={course.id}
                imgSrc={course.cover_image || fallbackCourseImage}
                altText={course.title}
                title={course.title}
                rating={course.average_rating}
                numRatings="45,345"
                courseProgress={course.progress > 0 ? `${Math.round(course.progress)}% Completed` : "Not Started"}
                progress={course.progress}
                review={"200"}
                courseId={course.id}
                is_access_revoked={course.is_access_revoked}
                last_watched_video_id={course.last_watched_video_id}
                enrollmentId={course.enrollment_id}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

const LiveSessionCourses = () => {
  // const { data, isLoading, error } = useFetchEnrolledLiveSessionCourse();
  // const data = useLoaderData();

  const { data } = useQuery(liveSessionDetailQuery());
  const registeredCourses = useGetRegisteredCourses();

  // Use API data if available, otherwise fall back to localStorage
  const courses = data?.data?.data?.courses && data?.data?.data?.courses.length > 0 
    ? data?.data?.data?.courses 
    : registeredCourses;

  if (courses && courses.length > 0) {
    return (
      <div
        className={`grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4`}
      >
        {courses.map((course, index) => {
          const uniqueKey = course.enrollment_id || `${course.id || course.courseId}-${course.cohort_details?.id || course.cohort_details?._id || index}`;
          return (
            <LiveSessionCourseCard
              key={uniqueKey}
              imgSrc={course?.cover_image || fallbackCourseImage}
              altText={course?.title}
              title={course?.title}
              rating={Number(course?.average_rating || 0).toFixed(1)}
              numRatings="45,345"
              courseProgress={course.progress > 0 ? `${Math.round(course.progress)}% Completed` : "Not Started"}
              progress={course.progress}
              review={course?.total_reviews || 0}
              courseId={course?.id || course?.courseId}
              cohortId={course.cohort_details?.id || course.cohort_details?._id}
              is_access_revoked={course?.is_access_revoked}
              last_watched_video_id={course?.last_watched_video_id}
              access_expires_at={course?.access_expires_at}
              enrollmentId={course.enrollment_id}
            />
          );
        })}
      </div>
    );
  }

  return <NoCoursesMessage />;
};

const WishlistedCourses = () => {
  const { data } = useFetchWishlist();

  return (
    <>
      {!data?.data?.data || data?.data?.data?.length < 1 ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500 text-center">
            No wishlisted courses yet. Start adding courses to your wishlist!
          </p>
        </div>
      ) : (
        <div
          className={`grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4`}
        >
          {data?.data?.data?.length > 0 ? (
            data.data.data.map((course) => {
              return (
                <div key={course.id} className="bg-white shadow-md rounded-lg">
                  <Courses wishlist={course} />
                </div>
              );
            })
          ) : (
            <p>No wishlisted courses yet. Start adding courses to your wishlist!</p>
          )}
        </div>
      )}
    </>
  );
};

const PreviewListCourses = () => {
  const { data } = useFetchPreviewlist();
  const navigate = useNavigate();

  if (!data?.data?.data || data?.data?.data?.length < 1) {
    return null;
  }

  return (
    <div className="lg:border-white-300 my-6 rounded-lg border-2 bg-white p-6">
      <div className="flex flex-row items-center justify-between rounded-lg bg-white pb-6 lg:p-2">
        <div className="flex-1 md:mb-0 lg:mb-4">
          <h3 className="text-l font-semibold text-gray-800">
            Continue from where you left off
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {data?.data?.data?.map((course) => {
          return (
            <div key={course.id} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
              <div 
                onClick={() => navigate(`/preview-course/${course.slug || course.id}`)}
                className="cursor-pointer"
              >
                <img
                  src={course.cover_image || fallbackCourseImage}
                  className="h-[180px] lg:h-[200px] w-full object-cover"
                  alt={course.title}
                />
              </div>
              <div className="px-[10px] py-3 flex-1 flex flex-col justify-between items-start">
                <p className="text-xs text-tertiary-color-900 md:text-[14px] font-medium mb-3">
                  {course.title.length > 40 ? `${course.title.slice(0, 40)}...` : course.title}
                </p>
                <button 
                  onClick={() => navigate(`/preview-course/${course.slug || course.id}`)}
                  className="w-full bg-[#E11D48] text-white py-2 rounded-md font-medium text-sm hover:bg-rose-700 transition-colors"
                >
                  Watch Free Preview
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ExplorePathwaysDashboardSection = () => {
  const { hasCompleted, pathway, courses } = useCareerAssessment();
  const navigate = useNavigate();

  return (
    <div className="lg:border-white-300 my-6 rounded-lg border-2 bg-white p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-gray-100">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="text-l font-semibold text-gray-800 font-space">
              Explore Any of These Pathways
            </h3>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                hasCompleted
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-slate-100 text-slate-700 border border-slate-200"
              }`}
            >
              {hasCompleted
                ? `${courses.length} courses matched to profile`
                : "0 courses matched to profile"}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1 font-inter">
            {hasCompleted
              ? `Personalized pathway suggestions for ${pathway || "your tech career profile"}`
              : "Complete the career assessment to match your profile to personalized learning pathways and courses"}
          </p>
        </div>
      </div>

      {!hasCompleted ? (
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 px-6 mt-4 bg-[#F8FAFC] border border-slate-200/80 rounded-xl">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <h4 className="text-[15px] font-bold text-[#0A1430] font-space">
                0 courses matched to profile
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-inter">
              You haven't completed your career assessment yet. Discover the right tech career pathway for your skills, interests, and goals to unlock tailored course recommendations.
            </p>
          </div>
          <TakeAssessmentButton
            to="/assessment"
            label="Take career assessment"
            layout="stacked"
            buttonClassName="whitespace-nowrap"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {courses.map((course) => (
            <div
              key={course.id || course._id || course.slug}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <img
                  src={course.cover_image || fallbackCourseImage}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#D7195A] bg-[#FFEBF0] px-2 py-0.5 rounded">
                    MATCHED TO PROFILE
                  </span>
                  <h4 className="font-bold text-[15px] text-[#0A1430] mt-2 line-clamp-2">
                    {course.title}
                  </h4>
                  {course.overview && (
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">
                      {course.overview}
                    </p>
                  )}
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  onClick={() => navigate(`/preview-course/${course.slug || course.id || course._id}`)}
                  className="w-full bg-[#0A1430] hover:bg-[#D7195A] text-white text-xs font-semibold py-2.5 rounded-lg transition-colors"
                >
                  View Course Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashBoardHomePage;
