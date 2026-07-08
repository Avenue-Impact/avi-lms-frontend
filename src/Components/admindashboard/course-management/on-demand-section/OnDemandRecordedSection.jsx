import { LiaEllipsisVSolid } from "react-icons/lia";
import { VidIcon } from "@/Components/Icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useFetchondemandCourse } from "@/hooks/course-management/on-demand-section/use-fetch-ondemand-course";
import { GripVertical, Trash2 } from "lucide-react";

import OndemandSectionPopover from "./OndemandSectionPopover";
import EditModal from "./EditModal";
import CreateOnDemandSectionForm from "./CreateOnDemandSectionForm";
import AddVideoForm from "./AddVideoForm";

import { useDeleteOndemandVideo } from "@/hooks/course-management/on-demand-section/use-mutate-ondemand-video";
import { useReorderOndemandVideos } from "@/hooks/course-management/on-demand-section/use-move-demand-video";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatDate = (date) => {
  if (!date) return "";
  const createdAt = new Date(date);

  const day = createdAt.getDate();
  const month = months[createdAt.getMonth()];
  const year = createdAt.getFullYear();
  const hour = createdAt.getHours();
  const min = createdAt.getMinutes();

  const get12hrs = hour > 12 ? hour - 12 : hour;
  const amOrPm = hour >= 12 ? "PM" : "AM";
  const formattedMin = min < 10 ? `0${min}` : min;

  return `${day} ${month}, ${year} | ${get12hrs}:${formattedMin}${amOrPm}`;
};

const OnDemandRecordedSection = ({
  courseId,
  setSection = () => {},
  setSectionDetails,
  setVideoUrl,
}) => {
  const { data, isLoading, error } = useFetchondemandCourse(courseId);
  const [activeSection, setActiveSection] = useState("");
  const [videoActive, setVideoActive] = useState("");
  const [addSectionModal, setAddSectionModal] = useState(false);
  const [addVideoModalId, setAddVideoModalId] = useState("");

  const { deleteVideo, isDeleting: isDeletingVideo } = useDeleteOndemandVideo();
  const { reorderVideos } = useReorderOndemandVideos();

  const sectionsList = data?.data?.data || [];

  if (isLoading) return <p className="p-4 text-sm text-gray-500">Loading sections...</p>;

  if (error || !data) {
    return (
      <p className="p-4 text-sm text-red-500">
        {error?.response?.data?.message || error.message || "Something went wrong"}
      </p>
    );
  }

  return (
    <aside className="rounded-2xl border border-lms-border px-2 py-6 bg-white shadow-sm h-screen overflow-y-auto">
      <div className="mb-6 flex items-center justify-between px-3">
        <h3 className="text-lg font-semibold text-gray-800">
          Course sections
        </h3>
        
        <EditModal
          open={addSectionModal}
          setOpen={setAddSectionModal}
          header="Create On-Demand Section"
          className="w-full sm:max-w-[640px]"
          form={
            <CreateOnDemandSectionForm setModal={setAddSectionModal} />
          }
        >
          <span className="flex items-center gap-1 px-3 py-1.5 text-xs border border-primary-color-200 text-primary-color-600 rounded-md hover:bg-primary-color-50 font-medium">
            + Add Section
          </span>
        </EditModal>
      </div>

      {sectionsList.length < 1 ? (
        <p className="capitalize text-slate-400 px-3 text-sm">No sections yet...</p>
      ) : (
        <Accordion
          type="single"
          collapsible
          value={activeSection}
          onValueChange={setActiveSection}
          className="w-full space-y-3"
        >
          {sectionsList.map((course) => {
            const sectionIdVal = course.id || course._id;
            return (
              <OnDemandSectionItem
                key={sectionIdVal}
                course={course}
                courseId={courseId}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                videoActive={videoActive}
                setVideoActive={setVideoActive}
                setSectionDetails={setSectionDetails}
                setVideoUrl={setVideoUrl}
                setSection={setSection}
                addVideoModalId={addVideoModalId}
                setAddVideoModalId={setAddVideoModalId}
                deleteVideo={deleteVideo}
                isDeletingVideo={isDeletingVideo}
                reorderVideos={reorderVideos}
              />
            );
          })}
        </Accordion>
      )}
    </aside>
  );
};

const OnDemandSectionItem = ({
  course,
  courseId,
  activeSection,
  setActiveSection,
  videoActive,
  setVideoActive,
  setSectionDetails,
  setVideoUrl,
  setSection,
  addVideoModalId,
  setAddVideoModalId,
  deleteVideo,
  isDeletingVideo,
  reorderVideos,
}) => {
  const sectionIdVal = course.id || course._id;
  const [localLessons, setLocalLessons] = useState([]);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  useEffect(() => {
    if (course.lessons) {
      setLocalLessons(course.lessons);
    }
  }, [course.lessons]);

  const handleDragStart = (e, index) => {
    setDraggedItemIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === index) return;

    const updated = [...localLessons];
    const [draggedItem] = updated.splice(draggedItemIndex, 1);
    updated.splice(index, 0, draggedItem);

    setDraggedItemIndex(index);
    setLocalLessons(updated);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedItemIndex === null) return;
    setDraggedItemIndex(null);

    const videoIds = localLessons.map((l) => l.id || l._id);
    reorderVideos({
      courseId,
      section: course.section,
      videoIds,
    });
  };

  const handleDelete = (e, videoId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this video?")) {
      deleteVideo({ section: course.section, id: videoId, courseId });
    }
  };

  return (
    <AccordionItem value={sectionIdVal} className="border-none">
      <div className="grid grid-cols-[8fr_1fr] items-center pr-3">
        <AccordionTrigger
          className={cn(
            "group/section [&[data-state=open]]:bg-[#FDF2F5] px-4 py-3 hover:bg-slate-50 transition-colors rounded-md text-left text-sm font-semibold text-gray-700",
            activeSection === sectionIdVal && "bg-[#FDF2F5]",
          )}
          onClick={() => setActiveSection(sectionIdVal)}
        >
          <div className="text-left">
            <p className="font-poppins text-xs font-medium capitalize text-gray-500">
              Section {course.section}
            </p>
            <p
              className={cn(
                "text-sm font-semibold capitalize leading-6 text-gray-800 transition-colors group-hover/section:text-primary-color-600",
                activeSection === sectionIdVal && "text-primary-color-600",
              )}
            >
              {course.title}
            </p>
          </div>
        </AccordionTrigger>
        <OndemandSectionPopover
          id={sectionIdVal}
          section={course.section}
          course={course}
        >
          <span className="cursor-pointer text-gray-400 hover:text-primary-color-600 transition-colors">
            <LiaEllipsisVSolid className="self-end text-2xl" />
          </span>
        </OndemandSectionPopover>
      </div>
      <AccordionContent className="pb-4 pt-2">
        <div className="flex flex-col gap-2 pl-4 pr-2 border-l border-gray-150 ml-4 mt-2">
          {course.overview && (
            <p className="text-xs text-gray-400 font-light italic mb-2 leading-relaxed">
              {course.overview}
            </p>
          )}

          {localLessons.length < 1 ? (
            <p className="text-xs text-slate-400 pl-4 py-2">No videos in this section yet...</p>
          ) : (
            localLessons.map((item, i) => {
              const videoIdVal = item.id || item._id;
              return (
                <div
                  key={videoIdVal}
                  draggable
                  onDragStart={(e) => handleDragStart(e, i)}
                  onDragOver={(e) => handleDragOver(e, i)}
                  onDrop={handleDrop}
                  className={cn(
                    "group/topic cursor-pointer px-5 py-[10px] hover:bg-primary-color-300/20 rounded-md transition-colors",
                    videoActive === videoIdVal && "bg-primary-color-300/20",
                  )}
                >
                  <div className="flex w-full items-center justify-between">
                    <div
                      className={cn(
                        "flex cursor-pointer items-center gap-3 text-sm group-hover/topic:text-primary-color-600 md:text-base",
                        videoActive === videoIdVal ? "text-primary-color-600 font-semibold" : "text-gray-600",
                      )}
                      onClick={() => {
                        if (setSectionDetails) {
                          setSectionDetails({
                            topic: course.title,
                            section: course.section,
                            videoTitle: item.video_title,
                          });
                        }
                        if (setVideoUrl) {
                          setVideoUrl(item.video_url?.link || item.video_url);
                        }
                        setVideoActive(videoIdVal);
                        setSection(course.section);
                      }}
                    >
                      <div className="cursor-grab text-gray-400 hover:text-gray-600 active:cursor-grabbing mr-2">
                        <GripVertical size={16} />
                      </div>
                      <p className="leading-tight">
                        0{i + 1}. {item.video_title}
                      </p>
                    </div>

                    <button
                      className="p-1 text-[#cc1747] opacity-70 hover:text-[#a6133a] hover:opacity-100 disabled:opacity-50"
                      title="Delete video"
                      disabled={isDeletingVideo}
                      onClick={(e) => handleDelete(e, videoIdVal)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2 pl-7 text-xs text-gray-400">
                    <VidIcon />
                    <span>{formatDate(item.created_at)}</span>
                    {item.video_url?.size && (
                      <span>• {Number.parseFloat(item.video_url.size).toFixed(2)} MB</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <div className="mt-2 pr-2">
            <EditModal
              open={addVideoModalId === sectionIdVal}
              setOpen={(isOpen) => setAddVideoModalId(isOpen ? sectionIdVal : "")}
              header={`Add video to Section ${course.section}`}
              className="w-full sm:max-w-4xl"
              form={
                <AddVideoForm
                  sectionToAddVideo={course}
                  setModal={(isOpen) => setAddVideoModalId(isOpen ? sectionIdVal : "")}
                />
              }
            >
              <span className="flex items-center justify-center w-full mt-2 border border-primary-color-200 text-primary-color-600 hover:bg-primary-color-50 text-xs py-1.5 rounded-md font-medium">
                + Add Video
              </span>
            </EditModal>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default OnDemandRecordedSection;
