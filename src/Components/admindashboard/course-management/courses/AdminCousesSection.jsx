import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { CommonButton } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";

function AdminCoursesSection({
  data,
  setShowLive,
  setSectionDetails,
  setIsEdit,
  setVideoId,
}) {
  const [active, setActive] = useState("1");
  const [videoActive, setvideoActive] = useState("");

  if (!data) return <p>no data yet!!</p>;

  return (
    <div className="rounded-2xl border border-lms-border px-2 py-6">
      <aside className="h-screen overflow-y-auto">
        <div className={cn("mb-4 flex items-center justify-between")}>
          <h3 className={cn("whitespace-nowrap text-lg font-medium")}>
            Course section
          </h3>

          <CommonButton
            variant="outline"
            className="space-x-1 px-[6px] py-2 text-xs text-[#667185]"
            onClick={() => setIsEdit((prev) => !prev)}
          >
            <span className="text-xs">
              <HiOutlinePencil />
            </span>
            <span className="text-sm">Edit section</span>
          </CommonButton>
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
                    Section 1
                  </p>
                  <p
                    className={cn(
                      "text-base font-light capitalize leading-6 text-tertiary-color-700 group-hover/section:font-semibold group-hover/section:text-primary-color-600",
                      active === "1" && "font-semibold text-primary-color-600",
                    )}
                  >
                    Join live session
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
                    <div className="text-left">
                      <p className="font-poppins text-lg font-light capitalize text-tertiary-color-900 lg:text-xl">
                        Section {section.section}
                      </p>
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
                        <div
                          className={cn(
                            "flex items-start gap-3 text-sm group-hover/topic:text-primary-color-600 md:text-base",
                            videoActive === video.id &&
                              "text-primary-color-600",
                          )}
                        >
                          <span>0{i + 1}.</span>
                          <p>{video.video_title}</p>
                        </div>
                      </AccordionContent>
                    );
                  })}
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
