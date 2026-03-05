import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { CommonButton } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { SquarePen } from "lucide-react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { useParams, useSearchParams } from "react-router-dom";
import { AddSectionModal } from "./AddSectionModal";
import { EditSectionModal } from "./EditSectionModal";
import { AddVideoModal } from "./AddVideoModal";
import { useDeleteRecordedSessionVideo } from "@/hooks/course-management/use-delete-recorded-session-video";

function AdminCoursesSection({
  data,
  setShowLive,
  setSectionDetails,
  setIsEdit,
  setVideoId,
}) {
  const { courseId } = useParams();
  const [queryString] = useSearchParams();
  const cohortId = queryString.get("cohortId");
  const [active, setActive] = useState("1");
  const [videoActive, setvideoActive] = useState("");
  const [editSectionData, setEditSectionData] = useState(null);

  const { mutate: deleteVideo } = useDeleteRecordedSessionVideo(
    courseId,
    cohortId,
  );

  const handleDeleteVideo = (e, sectionId, videoId) => {
    e.stopPropagation(); // prevent accordion from toggling
    if (window.confirm("Are you sure you want to delete this video?")) {
      deleteVideo({
        courseId,
        cohortId,
        section: sectionId,
        recordingId: videoId,
      });
    }
  };

  if (!data) return <p>no data yet!!</p>;

  return (
    <div className="rounded-2xl border border-lms-border px-2 py-6">
      <aside className="h-screen overflow-y-auto">
        <div className={cn("mb-4 flex items-center justify-between")}>
          <h3 className={cn("whitespace-nowrap text-lg font-medium")}>
            Course sections
          </h3>

          <AddSectionModal courseId={courseId} cohortId={cohortId}>
            <CommonButton className="h-auto space-x-1 rounded-md bg-[#cc1747] px-[6px] py-1.5 text-xs text-white hover:bg-[#a6133a]">
              <span className="text-xs">
                <FaPlus />
              </span>
              <span className="text-sm font-medium">Add section</span>
            </CommonButton>
          </AddSectionModal>
        </div>
        <>
          <Accordion type="single" collapsible>
            <AccordionItem value={"section.title"}>
              <AccordionTrigger
                className={cn(
                  "group/section [&[data-state=open]]:bg-bg-primary-color-300/20 px-5 pb-[10px] hover:bg-primary-color-300/20",
                  active === "1" && "bg-primary-color-300/20",
                )}
                onClick={() => {
                  setActive("1");
                  setShowLive("live");
                }}
              >
                <div className="text-left">
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
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="w-full">
            {data?.data?.data?.recorded_sessions.map((section) => {
              return (
                <AccordionItem value={section.title} key={section.id}>
                  <AccordionTrigger
                    className={cn(
                      "group/section [&[data-state=open]]:bg-bg-primary-color-300/20 px-5 pb-[10px] hover:bg-primary-color-300/20",
                      active === section.id && "bg-primary-color-300/20",
                    )}
                    onClick={() => {
                      setActive(section.id);
                    }}
                  >
                    <div className="w-full pr-2 text-left">
                      <div className="flex w-full items-center justify-between">
                        <p className="font-poppins text-lg font-light capitalize text-tertiary-color-900 lg:text-xl">
                          Section {section.section}
                        </p>
                        <EditSectionModal
                          sectionData={{
                            section: section.section,
                            title: section.title,
                            overview: section.overview,
                          }}
                          courseId={courseId}
                          cohortId={cohortId}
                        >
                          <button
                            className="p-1 text-[#cc1747] hover:text-[#a6133a]"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditSectionData({
                                section: section.section,
                                title: section.title,
                                overview: section.overview,
                              });
                            }}
                          >
                            <SquarePen size={18} />
                          </button>
                        </EditSectionModal>
                      </div>
                      <p
                        className={cn(
                          "text-base font-light capitalize leading-6 text-tertiary-color-700 group-hover/section:font-semibold group-hover/section:text-primary-color-600",
                          active === section.id &&
                            "font-semibold text-primary-color-600",
                        )}
                      >
                        {section.title}
                      </p>
                    </div>
                  </AccordionTrigger>
                  {section?.videos?.map((video, i) => {
                    return (
                      <AccordionContent
                        key={video.id}
                        className={cn(
                          "group/topic cursor-pointer px-5 py-[10px] hover:bg-primary-color-300/20",
                          videoActive === video.id && "bg-primary-color-300/20",
                        )}
                      >
                        <div className="flex w-full items-center justify-between">
                          <div
                            className={cn(
                              "flex cursor-pointer items-start gap-3 text-sm group-hover/topic:text-primary-color-600 md:text-base",
                              videoActive === video.id &&
                                "text-primary-color-600",
                            )}
                            onClick={() => {
                              setSectionDetails((prev) => ({
                                ...prev,
                                topic: section.title,
                                section: section.section,
                                videoTitle: video.video_title,
                              }));
                              setShowLive("contents");
                              setVideoId(video.id);
                              setvideoActive(video.id);
                            }}
                          >
                            <p>{video.title}</p>
                          </div>
                          <button
                            className="p-1 text-[#cc1747] opacity-70 hover:text-[#a6133a] hover:opacity-100"
                            title="Delete video"
                            onClick={(e) =>
                              handleDeleteVideo(e, section.section, video.id)
                            }
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </AccordionContent>
                    );
                  })}
                  <AccordionContent className="px-5 py-3">
                    <AddVideoModal
                      sectionId={section.id}
                      courseId={courseId}
                      cohortId={cohortId}
                    >
                      <button className="flex w-full items-center gap-2 rounded-md p-2 text-sm font-medium text-[#cc1747] transition-colors hover:bg-[#cc1747]/10 hover:text-[#a6133a]">
                        <FaPlus size={12} />
                        Add video
                      </button>
                    </AddVideoModal>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </>
      </aside>
    </div>
  );
}

export default AdminCoursesSection;
