import { useViewCourseSections } from "@/hooks/students/use-course-secion-view";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { CommonButton } from "../ui/button";

function RecordedCourseSection({ editButton, data }) {
  const { setSession, setSectionDetails, setVideoUrl, setVideoId, videoId, active, setActive, setSectionActive } =
    useViewCourseSections();

  const [searchParams] = useSearchParams();
  const urlVideoId = searchParams.get("videoId");

  useEffect(() => {
    if (!data?.data?.data?.recorded_sessions) return;
    const sections = data.data.data.recorded_sessions;
    if (sections.length < 1) return;

    let targetSection = null;
    let targetLesson = null;

    if (urlVideoId) {
      for (const section of sections) {
        const lesson = (section.lessons || section.videos)?.find(
          (l) => l.id === urlVideoId || l._id === urlVideoId
        );
        if (lesson) {
          targetSection = section;
          targetLesson = lesson;
          break;
        }
      }
    }

    if (targetSection && targetLesson) {
      setActive(targetSection._id);
      setSectionActive(targetSection.section);
      setSectionDetails((prev) => ({
        ...prev,
        topic: targetSection.title,
        section: targetSection.section,
        videoTitle: targetLesson.video_title || targetLesson.title,
      }));
      setSession("recorded");
      setVideoUrl(targetLesson.video_url?.link || targetLesson.video_url);
      setVideoId(targetLesson.id || targetLesson._id);
    } else {
      // Default fallback
      const firstSection = sections[0];
      const firstLesson = (firstSection?.lessons || firstSection?.videos)?.[0];
      if (firstSection && firstLesson) {
        // Only set default if no video is currently selected
        // Or if we specifically want to default to the first one
        // Wait, if urlVideoId is not present, we can just default to the first
        setActive(firstSection._id);
        setSectionActive(firstSection.section);
        setSectionDetails((prev) => ({
          ...prev,
          topic: firstSection.title,
          section: firstSection.section,
          videoTitle: firstLesson.video_title || firstLesson.title,
        }));
        setSession("recorded");
        setVideoUrl(firstLesson.video_url?.link || firstLesson.video_url);
        setVideoId(firstLesson.id || firstLesson._id);
      }
    }
  }, [data?.data?.data?.recorded_sessions, urlVideoId, setVideoUrl, setVideoId, setSession, setSectionDetails, setActive, setSectionActive]);

  return (
    <div>
      <div
        className={cn(
          editButton ? "mb-4 flex items-center justify-between" : "",
        )}
      >
        <h3
          className={cn(
            editButton
              ? "whitespace-nowrap text-lg font-medium"
              : "hidden text-2xl font-medium capitalize text-black lg:block",
          )}
        >
          Course section
        </h3>
        {editButton && (
          <CommonButton
            variant="outline"
            className="space-x-1 px-[6px] py-2 text-xs text-[#667185]"
          >
            <span className="text-xs">
              <HiOutlinePencil />
            </span>
            <span className="text-sm">Edit section</span>
          </CommonButton>
        )}
      </div>
      {/* <CourseSections  active={active} /> */}
      <div className="rounded-lg bg-white pt-8">
        {data?.data?.data?.recorded_sessions?.length < 1 ? (
          <p>No courses yet...</p>
        ) : (
          <Accordion type="single" collapsible value={active} onValueChange={setActive} className="w-full space-y-4">
            {data?.data?.data?.recorded_sessions?.map((section, index) => {
              // Check if this section is currently active (contains the active video or is selected)
              const isSectionActive = active === section._id;

              return (
                <AccordionItem
                  value={section._id}
                  key={section._id}
                  className="border-none"
                >
                  <div className="mb-2">
                    <p className="mb-1 text-sm font-medium text-gray-500">
                      Section {section.section}
                    </p>
                    <AccordionTrigger
                      className={cn(
                        "group items-start justify-between py-0 text-left hover:no-underline",
                        isSectionActive
                          ? "text-primary-color-600"
                          : "text-gray-900",
                      )}
                      onClick={() => {
                        setActive(section._id);
                        setSectionActive(section.section);
                      }}
                    >
                      <span className="text-base font-semibold transition-colors group-hover:text-primary-color-600">
                        {section.title}
                      </span>
                    </AccordionTrigger>
                  </div>

                  <AccordionContent className="pb-0 pt-2">
                    <div className="ml-1 flex flex-col space-y-4 border-l-2 border-gray-100 pl-4">
                      {(section?.lessons || section?.videos)?.map((video, i) => {
                        const isVideoActive = videoId === (video._id || video.id);
                        return (
                          <div
                            key={video._id}
                            className={cn(
                              "group/topic flex cursor-pointer items-start gap-3 transition-colors",
                              isVideoActive
                                ? "text-primary-color-600"
                                : "text-gray-500 hover:text-gray-800",
                            )}
                            onClick={() => {
                              setSectionDetails((prev) => ({
                                ...prev,
                                topic: section.title,
                                section: section.section,
                                videoTitle: video.video_title || video.title,
                              }));
                              setSession("recorded");
                              setVideoUrl(
                                video.video_url?.link || video.video_url,
                              );
                              setVideoId(video._id || video.id);
                            }}
                          >
                            <span
                              className={cn(
                                "min-w-[20px] text-xs font-medium",
                                isVideoActive
                                  ? "text-primary-color-600"
                                  : "text-gray-400",
                              )}
                            >
                              {i + 1 < 10 ? `0${i + 1}.` : `${i + 1}.`}
                            </span>
                            <p className="text-sm font-medium leading-tight">
                              {video.video_title || video.title}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </div>
    </div>
  );
}

export default RecordedCourseSection;
