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

function CourseSection({ editButton, data }) {
  const [active, setActive] = useState("1");
  const [videoActive, setvideoActive] = useState("");
  const { setSession, setSectionDetails, setVideoId, setSectionActive, setSections } =
    useViewCourseSections();

  return (
    <div className="flex flex-col h-full bg-white">
      <div
        className={cn(
          "mb-6 flex items-center justify-between pb-2",
          !editButton && "border-b border-transparent" // keeping padding consistent
        )}
      >
        <h3 className="text-xl md:text-[22px] font-bold text-[#111827] capitalize">
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
            className="text-[#111827] hover:text-gray-600 transition-colors lg:hidden"
            onClick={() => setSections(prev => ({ ...prev, mobile: "" }))}
          >
            <IoCloseOutline size={24} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        {data?.data?.course_detail?.live_session?.start_time && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={"1"} className="border-b border-gray-200 py-1">
              <AccordionTrigger
                className={cn(
                  "flex items-center justify-between w-full py-3 px-3 md:px-4 text-left transition-colors cursor-pointer hover:bg-[#FDF2F5] rounded-md",
                  active === "1" ? "bg-[#FDF2F5]" : ""
                )}
                onClick={() => {
                  setActive("1");
                  setSession("live");
                }}
                showChevron={false}
              >
                <div className="flex flex-col w-full">
                  <div className="flex w-full items-center justify-between">
                    <p className={cn(
                      "text-base font-normal tracking-wide",
                      active === "1" ? "text-[#E11D48] font-medium" : "text-[#374151]"
                    )}>
                      Live Section
                    </p>
                    <FiChevronDown className={cn("transition-transform duration-200", active === "1" ? "rotate-180 text-[#E11D48]" : "text-[#6B7280]")} size={18} />
                  </div>
                  <p
                    className={cn(
                      "mt-1 text-sm font-medium",
                      active === "1" ? "text-[#111827]" : "text-[#111827]"
                    )}
                  >
                    Join Live Sessions
                  </p>
                </div>
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>
        )}
        
        {data?.data?.course_detail?.recorded_sessions?.length < 1 &&
        !data?.data?.course_detail?.recorded_sessions?.length ? (
          <div className="py-8 text-center text-gray-500">
            <p>No sections yet...</p>
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {data?.data?.course_detail?.recorded_sessions?.map((section) => {
              const isActiveSection = active === section._id;
              return (
                <AccordionItem value={section._id} key={section._id} className="border-b border-gray-200 py-1">
                  <AccordionTrigger
                    className={cn(
                      "flex items-center justify-between w-full py-3 px-3 md:px-4 text-left transition-colors cursor-pointer hover:bg-[#FDF2F5] rounded-md",
                      isActiveSection ? "bg-[#FDF2F5]" : ""
                    )}
                    onClick={() => {
                      setActive(section._id);
                      setSectionActive(section.section);
                    }}
                    showChevron={false}
                  >
                    <div className="flex flex-col w-full">
                      <div className="flex w-full items-center justify-between">
                        <p className={cn(
                          "text-base font-normal tracking-wide",
                          isActiveSection ? "text-[#E11D48] font-medium" : "text-[#374151]"
                        )}>
                          Section {section.section}
                        </p>
                        <FiChevronDown className={cn("transition-transform duration-200", isActiveSection ? "rotate-180 text-[#E11D48]" : "text-[#6B7280]")} size={18} />
                      </div>
                      <p
                        className={cn(
                          "mt-1 text-sm font-medium",
                          isActiveSection ? "text-[#E11D48]" : "text-[#6B7280]"
                        )}
                      >
                        {section.title}
                      </p>
                    </div>
                  </AccordionTrigger>
                  
                  {section?.videos?.map((video, i) => {
                    const isActiveVideo = videoActive === video._id;
                    return (
                      <AccordionContent
                        key={video._id}
                        className={cn(
                          "cursor-pointer px-4 py-3 pb-4 transition-colors hover:bg-[#FDF2F5]",
                          isActiveVideo ? "bg-[#FDF2F5]" : ""
                        )}
                        onClick={() => {
                          setSectionDetails((prev) => ({
                            ...prev,
                            topic: section.title,
                            section: section.section,
                            videoTitle: video.video_title,
                          }));
                          setSession("recorded");
                          setVideoId(video._id);
                          setvideoActive(video._id);
                        }}
                      >
                        <div
                          className={cn(
                            "flex items-start gap-3 text-sm font-normal",
                            isActiveVideo
                              ? "text-[#E11D48]"
                              : "text-[#6B7280]"
                          )}
                        >
                          <span className="mt-[2px] w-5 shrink-0 tabular-nums">
                            {String(i + 1).padStart(2, '0')}.
                          </span>
                          <span className="leading-tight">{video.video_title}</span>
                        </div>
                      </AccordionContent>
                    );
                  })}
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </div>
    </div>
  );
}

export default CourseSection;
