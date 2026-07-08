import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { CommonButton } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { HiOutlinePencil } from "react-icons/hi";

function OnDemandAdminSection({
  data,
  setSectionDetails,
  setEdit,
  setVideoUrl,
  setEditSectionData,
}) {
  const [active, setActive] = useState("");
  const [videoActive, setVideoActive] = useState("");

  const sectionsList = data?.data?.data || [];

  useEffect(() => {
    if (sectionsList.length > 0 && !active) {
      const firstSection = sectionsList[0];
      const firstId = firstSection.id || firstSection._id;
      setActive(firstId);
    }
  }, [sectionsList, active]);

  return (
    <div className="rounded-2xl border border-lms-border px-2 py-6 bg-white shadow-sm">
      <aside className="h-screen overflow-y-auto">
        <div className={cn("mb-4 flex items-center justify-between px-3")}>
          <h3 className={cn("whitespace-nowrap text-lg font-medium text-gray-800")}>
            Course section
          </h3>

          <CommonButton
            variant="outline"
            className="space-x-1 px-[6px] py-2 text-xs text-[#667185]"
            onClick={() => setEdit(true)}
          >
            <span className="text-xs">
              <HiOutlinePencil />
            </span>
            <span className="text-sm">Edit section</span>
          </CommonButton>
        </div>
        <Accordion type="single" collapsible value={active} onValueChange={setActive} className="w-full space-y-2">
          {sectionsList.map((section) => {
            const sectionIdVal = section.id || section._id;
            return (
              <AccordionItem value={sectionIdVal} key={sectionIdVal} className="border-none">
                <AccordionTrigger
                  className={cn(
                    "group/section [&[data-state=open]]:bg-[#FDF2F5] px-5 py-3 hover:bg-slate-50 transition-colors rounded-md text-left",
                    active === sectionIdVal && "bg-[#FDF2F5]",
                  )}
                  onClick={() => setActive(sectionIdVal)}
                >
                  <div className="text-left">
                    <p className="font-poppins text-sm font-medium capitalize text-gray-500">
                      Section {section.section}
                    </p>
                    <p
                      className={cn(
                        "text-base font-semibold capitalize leading-6 text-gray-800 transition-colors group-hover/section:text-primary-color-600",
                        active === sectionIdVal && "text-primary-color-600",
                      )}
                    >
                      {section.title}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-2">
                  <div className="flex flex-col gap-2 pl-4 pr-2 border-l border-gray-150 ml-4 mt-2">
                    {section?.lessons?.map((video, i) => {
                      const videoIdVal = video.id || video._id;
                      return (
                        <div
                          key={videoIdVal}
                          className={cn(
                            "group/topic cursor-pointer px-4 py-2 hover:bg-slate-50 rounded-md transition-colors",
                            videoActive === videoIdVal && "bg-[#FDF2F5]",
                          )}
                          onClick={() => {
                            setSectionDetails((prev) => ({
                              ...prev,
                              topic: section.title,
                              section: section.section,
                              videoTitle: video.video_title,
                            }));
                            setVideoUrl(video.video_url?.link || video.video_url);
                            setVideoActive(videoIdVal);
                          }}
                        >
                          <div
                            className={cn(
                              "flex items-start gap-3 text-sm transition-colors group-hover/topic:text-primary-color-600",
                              videoActive === videoIdVal ? "text-primary-color-600 font-semibold" : "text-gray-500",
                            )}
                          >
                            <span>0{i + 1}.</span>
                            <p className="leading-tight">{video.video_title}</p>
                          </div>
                        </div>
                      );
                    })}
                    <div className="mt-2 pr-2">
                      <CommonButton
                        type="button"
                        variant="outline"
                        className="w-full mt-2 border-primary-color-200 text-primary-color-600 hover:bg-primary-color-50 text-xs py-1.5"
                        onClick={() => {
                          setEditSectionData(section);
                          setEdit(true);
                        }}
                      >
                        + Add Video
                      </CommonButton>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </aside>
    </div>
  );
}

export default OnDemandAdminSection;
