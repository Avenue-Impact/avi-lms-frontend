import { useViewCourseSections } from "@/hooks/students/use-course-secion-view";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { CommonButton } from "../ui/button";

function RecordedCourseSection({ editButton, data }) {
  const [active, setActive] = useState("1");
  const [videoActive, setvideoActive] = useState("");
  const { setSession, setSectionDetails, setVideoId, setSectionActive } =
    useViewCourseSections();

  useEffect(() => {
    if (data?.data?.data?.on_demand_sections.length < 1) return;

    setVideoId(data?.data?.data?.on_demand_sections[0].lessons[0].video_url.link);
  }, [data?.data?.on_demand_sections, setVideoId]);

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
      <div className="bg-white rounded-lg pt-8">
        {data?.data?.data?.on_demand_sections.length < 1 ? (
          <p>No courses yet...</p>
        ) : (
          <Accordion type="single" collapsible className="w-full space-y-4">
            {data?.data?.data?.on_demand_sections.map((section, index) => {
              // Check if this section is currently active (contains the active video or is selected)
              const isSectionActive = active === section._id;
              
              return (
                <AccordionItem value={section._id} key={section._id} className="border-none">
                  <div className="mb-2">
                     <p className="text-sm font-medium text-gray-500 mb-1">Section {section.section}</p>
                     <AccordionTrigger
                        className={cn(
                          "hover:no-underline py-0 text-left items-start justify-between group",
                          isSectionActive ? "text-primary-color-600" : "text-gray-900"
                        )}
                        onClick={() => {
                          setActive(section._id);
                          setSectionActive(section.section);
                        }}
                      >
                         <span className="text-base font-semibold group-hover:text-primary-color-600 transition-colors">
                            {section.title}
                         </span>
                      </AccordionTrigger>
                  </div>

                  <AccordionContent className="pt-2 pb-0">
                    <div className="flex flex-col space-y-4 pl-4 border-l-2 border-gray-100 ml-1">
                    {section?.videos?.map((video, i) => {
                       const isVideoActive = videoActive === video._id;
                      return (
                        <div
                          key={video._id}
                          className={cn(
                            "group/topic cursor-pointer flex items-start gap-3 transition-colors",
                            isVideoActive ? "text-primary-color-600" : "text-gray-500 hover:text-gray-800"
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
                            <span className={cn(
                               "text-xs font-medium min-w-[20px]", 
                               isVideoActive ? "text-primary-color-600" : "text-gray-400"
                            )}>
                               {i + 1 < 10 ? `0${i + 1}.` : `${i + 1}.`}
                            </span>
                            <p className="text-sm font-medium leading-tight">{video.video_title}</p>
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
