import { useViewCourseSections } from "@/hooks/students/use-course-secion-view";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { CommonButton } from "../ui/button";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetEnrolledSectionVideos } from "@/hooks/students/use-get-enrolled-section-videos";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect } from "react";

function EnrolledSectionItem({
  section,
  active,
  setActive,
  videoId,
  setSectionDetails,
  setSession,
  setVideoUrl,
  setVideoId,
  setSectionActive,
  cohortId,
  courseId,
}) {
  const isActiveSection = active === section.id;
  const { data: videosData, isLoading } = useGetEnrolledSectionVideos(
    courseId,
    cohortId,
    section.id,
    isActiveSection,
  );

  const videos = videosData?.data?.data || [];

  return (
    <AccordionItem value={section.id} className="border-b border-gray-200 py-1">
      <AccordionTrigger
        className={cn(
          "flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-3 text-left transition-colors hover:bg-[#FDF2F5] md:px-4",
          isActiveSection ? "bg-[#FDF2F5]" : "",
        )}
        onClick={() => {
          setActive(section.id);
          setSectionActive(section.section);
        }}
        showChevron={false}
      >
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center justify-between">
            <p
              className={cn(
                "text-base font-normal tracking-wide",
                isActiveSection
                  ? "font-medium text-[#E11D48]"
                  : "text-[#374151]",
              )}
            >
              Section {section.section}
            </p>
            <FiChevronDown
              className={cn(
                "transition-transform duration-200",
                isActiveSection
                  ? "rotate-180 text-[#E11D48]"
                  : "text-[#6B7280]",
              )}
              size={18}
            />
          </div>
          <p
            className={cn(
              "mt-1 text-sm font-medium",
              isActiveSection ? "text-[#E11D48]" : "text-[#6B7280]",
            )}
          >
            {section.title}
          </p>
        </div>
      </AccordionTrigger>

      {isLoading ? (
        <div className="py-4 text-center">
          <ClipLoader color="#E11D48" size={24} />
        </div>
      ) : (
        videos.map((video, i) => {
          const isActiveVideo = videoId === video.id;
          return (
            <AccordionContent
              key={video._id}
              className={cn(
                "cursor-pointer px-4 py-3 pb-4 transition-colors hover:bg-[#FDF2F5]",
                isActiveVideo ? "bg-[#FDF2F5]" : "",
              )}
              onClick={() => {
                setSectionDetails((prev) => ({
                  ...prev,
                  topic: section.title,
                  section: section.section,
                  overview: section.overview,
                  videoTitle: video.title || video.video_title,
                }));
                setSession("recorded");
                setVideoUrl(video.video_url);
                setVideoId(video._id);
              }}
            >
              <div
                className={cn(
                  "flex items-start gap-3 text-sm font-normal",
                  isActiveVideo ? "text-[#E11D48]" : "text-[#6B7280]",
                )}
              >
                <span className="mt-[2px] w-5 shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, "0")}.
                </span>
                <span className="leading-tight">
                  {video.title || video.video_title}
                </span>
              </div>
            </AccordionContent>
          );
        })
      )}
    </AccordionItem>
  );
}

function CourseSection({ editButton, data }) {
  const {
    setSession,
    setSectionDetails,
    setVideoUrl,
    videoId,
    setVideoId,
    active,
    setActive,
    setSectionActive,
    setSections,
  } = useViewCourseSections();
  const { courseId } = useParams();
  const cohortId = data?.data?.data?.cohort_id;
  const [searchParams] = useSearchParams();
  const urlVideoId = searchParams.get("videoId");

  useEffect(() => {
    const recordedSessions = data?.data?.course_detail?.recorded_session;
    if (!recordedSessions || recordedSessions.length < 1) return;

    if (urlVideoId) {
      if (urlVideoId === "live") {
        setActive("1");
        setSession("live");
      } else {
        let targetSection = null;
        let targetVideo = null;
        for (const section of recordedSessions) {
          const video = section.videos?.find(
            (v) => v.id === urlVideoId || v._id === urlVideoId
          );
          if (video) {
            targetSection = section;
            targetVideo = video;
            break;
          }
        }

        if (targetSection && targetVideo) {
          setActive(targetSection.id);
          setSectionActive(targetSection.section);
          setSectionDetails((prev) => ({
            ...prev,
            topic: targetSection.title,
            section: targetSection.section,
            overview: targetSection.overview,
            videoTitle: targetVideo.title || targetVideo.video_title,
          }));
          setSession("recorded");
          setVideoUrl(targetVideo.video_url);
          setVideoId(targetVideo.id || targetVideo._id);
        }
      }
    }
  }, [data?.data?.course_detail?.recorded_session, urlVideoId, setVideoUrl, setVideoId, setSession, setSectionDetails, setActive, setSectionActive]);

  return (
    <div className="flex h-full flex-col bg-white">
      <div
        className={cn(
          "mb-6 flex items-center justify-between pb-2",
          !editButton && "border-b border-transparent", // keeping padding consistent
        )}
      >
        <h3 className="text-xl font-bold capitalize text-[#111827] md:text-[22px]">
          Course sections
        </h3>
        {editButton ? (
          <CommonButton
            variant="outline"
            className="space-x-1 px-[6px] py-2 text-xs text-[#667185]"
          >
            <span className="text-xs">
              <HiOutlinePencil />
            </span>
            <span className="text-sm">Edit section</span>
          </CommonButton>
        ) : (
          <button
            className="text-[#111827] transition-colors hover:text-gray-600 lg:hidden"
            onClick={() => setSections((prev) => ({ ...prev, mobile: "" }))}
          >
            <IoCloseOutline size={24} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        <div className={cn("cursor-pointer border-b border-gray-300 py-1")}>
          <div
            className={cn(
              "group/section px-5 pb-[10px] pt-3 hover:bg-primary-color-300/20",
              active === "1" && "bg-primary-color-300/20",
            )}
            onClick={() => {
              setActive("1");
              setSession("live");
            }}
          >
            <div className="w-full text-left">
              <p className="font-poppins text-lg font-light capitalize text-tertiary-color-900 lg:text-xl">
                Live Section
              </p>

              <p
                className={cn(
                  "text-base font-light capitalize leading-6 text-tertiary-color-700 group-hover/section:font-semibold group-hover/section:text-primary-color-600",
                  active === "1" && "font-semibold text-primary-color-600",
                )}
              >
                Join Live Sessions
              </p>
            </div>
          </div>
        </div>

        {!data?.data?.course_detail?.recorded_session?.length ? (
          <div className="py-8 text-center text-gray-500">
            <p>No sections yet...</p>
          </div>
        ) : (
          <Accordion type="single" collapsible value={active} onValueChange={setActive} className="w-full">
            {data?.data?.course_detail?.recorded_session?.map((section) => (
              <EnrolledSectionItem
                key={section.id}
                section={section}
                active={active}
                setActive={setActive}
                videoId={videoId}
                setSectionDetails={setSectionDetails}
                setSession={setSession}
                setVideoUrl={setVideoUrl}
                setVideoId={setVideoId}
                setSectionActive={setSectionActive}
                cohortId={cohortId}
                courseId={courseId}
              />
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}

export default CourseSection;
