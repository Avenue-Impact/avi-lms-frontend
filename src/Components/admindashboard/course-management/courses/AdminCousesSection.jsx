import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { CommonButton } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Trash2, SquarePen, GripVertical } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import { useParams, useSearchParams } from "react-router-dom";
import { AddSectionModal } from "./AddSectionModal";
import { EditSectionModal } from "./EditSectionModal";
import { AddVideoModal } from "./AddVideoModal";
import { useDeleteRecordedSessionVideo } from "@/hooks/course-management/use-delete-recorded-session-video";
import { useGetSectionVideos } from "@/hooks/course-management/use-get-section-videos";
import { useDeleteRecordedSection } from "@/hooks/course-management/recorded-section/use-delete-recorded-section";
import { useReorderRecordedVideos } from "@/hooks/course-management/recorded-section/use-reorder-recorded-videos";
import { ClipLoader } from "react-spinners";

function RecordedSectionItem({
  section,
  active,
  setActive,
  videoActive,
  setvideoActive,
  setSectionDetails,
  setShowLive,
  setVideoUrl,
  courseId,
  cohortId,
  handleDeleteVideo,
  setEditSectionData,
}) {
  const isActive = active === section.id;
  const { data: videosData, isLoading } = useGetSectionVideos(
    courseId,
    cohortId,
    section.id,
    isActive,
  );

  const videos = videosData?.data?.data || [];
  const { deleteRecordedSection, isDeleting } = useDeleteRecordedSection();
  const { reorderVideos } = useReorderRecordedVideos();

  const [localVideos, setLocalVideos] = useState([]);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  useEffect(() => {
    setLocalVideos(videosData?.data?.data || []);
  }, [videosData]);

  const handleDragStart = (e, index) => {
    setDraggedItemIndex(index);
    // e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === index) return;

    const updatedVideos = [...localVideos];
    const [draggedItem] = updatedVideos.splice(draggedItemIndex, 1);
    updatedVideos.splice(index, 0, draggedItem);

    setDraggedItemIndex(index);
    setLocalVideos(updatedVideos);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedItemIndex === null) return;
    setDraggedItemIndex(null);

    const videoIds = localVideos.map((v) => v.id);
    reorderVideos({
      courseId,
      cohortId,
      section: section.section,
      videoIds,
    });
  };

  return (
    <AccordionItem value={section.title}>
      <AccordionTrigger
        className={cn(
          "group/section [&[data-state=open]]:bg-bg-primary-color-300/20 px-5 pb-[10px] hover:bg-primary-color-300/20",
          isActive && "bg-primary-color-300/20",
        )}
        onClick={() => setActive(section.id)}
      >
        <div className="w-full pr-2 text-left">
          <div className="flex w-full items-center justify-start gap-2">
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
            <button
              className="p-1 text-[#cc1747] hover:text-[#a6133a] disabled:opacity-50"
              title="Delete Section"
              disabled={isDeleting}
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm("Are you sure you want to delete this section?")) {
                  deleteRecordedSection({ section: section.section, courseId, cohortId });
                }
              }}
            >
              <Trash2 size={18} />
            </button>
          </div>
          <p
            className={cn(
              "text-base font-light capitalize leading-6 text-tertiary-color-700 group-hover/section:font-semibold group-hover/section:text-primary-color-600",
              isActive && "font-semibold text-primary-color-600",
            )}
          >
            {section.title}
          </p>
        </div>
      </AccordionTrigger>

      {isLoading ? (
        <div className="py-4 text-center">
          <ClipLoader color="#cc1747" size={24} />
        </div>
      ) : (
        localVideos.map((video, index) => (
          <AccordionContent
            key={video.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={handleDrop}
            className={cn(
              "group/topic cursor-pointer px-5 py-[10px] hover:bg-primary-color-300/20",
              videoActive === video.id && "bg-primary-color-300/20",
            )}
          >
            <div className="flex w-full items-center justify-between">
              <div
                className={cn(
                  "flex cursor-pointer items-center gap-3 text-sm group-hover/topic:text-primary-color-600 md:text-base",
                  videoActive === video.id && "text-primary-color-600",
                )}
                onClick={() => {
                  setSectionDetails((prev) => ({
                    ...prev,
                    topic: section.title,
                    section: section.section,
                    videoTitle: video.title,
                  }));
                  setShowLive("contents");
                  setVideoUrl(video?.video_url || video.video_url);
                  setvideoActive(video.id);
                }}
              >
                <div className="cursor-grab text-gray-400 hover:text-gray-600 active:cursor-grabbing mr-2">
                  <GripVertical size={16} />
                </div>
                <p>{video.title}</p>
              </div>
              <button
                className="p-1 text-[#cc1747] opacity-70 hover:text-[#a6133a] hover:opacity-100"
                title="Delete video"
                onClick={(e) => handleDeleteVideo(e, section.section, video.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </AccordionContent>
        ))
      )}

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
}

function AdminCoursesSection({
  data,
  setShowLive,
  setSectionDetails,
  setIsEdit,
  setVideoUrl,
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
            <CommonButton className="h-auto space-x-1 rounded-md bg-[#cc1747] px-4 py-1.5 text-xs text-white hover:bg-[#a6133a]">
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
            {data?.data?.data?.recorded_sessions.map((section) => (
              <RecordedSectionItem
                key={section.id}
                section={section}
                active={active}
                setActive={setActive}
                videoActive={videoActive}
                setvideoActive={setvideoActive}
                setSectionDetails={setSectionDetails}
                setShowLive={setShowLive}
                setVideoUrl={setVideoUrl}
                courseId={courseId}
                cohortId={cohortId}
                handleDeleteVideo={handleDeleteVideo}
                setEditSectionData={setEditSectionData}
              />
            ))}
          </Accordion>
        </>
      </aside>
    </div>
  );
}

export default AdminCoursesSection;
