import { cn } from "@/lib/utils";
import { DocumentContext } from "@/pages/dashboard/ShareDocument";
import { useContext, useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";
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
  const { setSession, setSectionDetails, setVideoId, setSectionActive } =
    useContext(DocumentContext);

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
      <>
        {data?.data?.data?.live_session.time && (
          <Accordion type="single" collapsible>
            <AccordionItem value={"section.title"}>
              <AccordionTrigger
                className={cn(
                  "group/section [&[data-state=open]]:bg-bg-primary-color-300/20 px-5 pb-[10px] hover:bg-primary-color-300/20",
                  active === "1" && "bg-primary-color-300/20",
                )}
                onClick={() => {
                  setActive("1");
                  setSession("live");
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
        )}
        {data?.data?.data?.recorded_sessions.length < 1 &&
        !data?.data?.data?.live_session.time ? (
          <p>No courses yet...</p>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {data?.data?.data?.recorded_sessions.map((section) => {
              return (
                <AccordionItem value={section.id} key={section.id}>
                  <AccordionTrigger
                    className={cn(
                      "group/section [&[data-state=open]]:bg-bg-primary-color-300/20 px-5 pb-[10px] hover:bg-primary-color-300/20",
                      active === section.id && "bg-primary-color-300/20",
                    )}
                    onClick={() => {
                      setActive(section.id);
                      setSectionActive(section.section);
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
                          setSession("recorded");
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
        )}
      </>
    </div>
  );
}

export default CourseSection;
