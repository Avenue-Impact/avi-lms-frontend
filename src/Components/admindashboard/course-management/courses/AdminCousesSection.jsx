import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { CommonButton } from "@/Components/ui/button";
import { courseSections } from "@/lib/courseSection";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";

function AdminCoursesSection() {
  const [active, setActive] = useState("1");

  return (
    <div className="rounded-2xl border border-lms-border px-2 py-6">
      <aside className="h-screen overflow-y-auto">
        <div className={cn("mb-4 flex items-center justify-between")}>
          <h3 className={cn("whitespace-nowrap text-lg font-medium")}>
            Course section
          </h3>

          <CommonButton
            variant="outline"
            className="space-x-1 px-[6px] py-2 text-xs text-[#667185]">
            <span className="text-xs">
              <HiOutlinePencil />
            </span>
            <span className="text-sm">Edit section</span>
          </CommonButton>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {courseSections.map((section) => {
            return (
              <AccordionItem value={section.section} key={section.section_id}>
                <AccordionTrigger
                  className={cn(
                    "group/section [&[data-state=open]]:bg-bg-primary-color-300/20 px-5 pb-[10px] hover:bg-primary-color-300/20",
                    active === section.section_id && "bg-primary-color-300/20",
                  )}
                  onClick={() => setActive(section.section_id)}
                >
                  <div className="text-left">
                    <p className="font-poppins text-lg font-light capitalize text-tertiary-color-900 lg:text-xl">
                      {section.section}
                    </p>
                    <p
                      className={cn(
                        "text-base font-light leading-6 text-tertiary-color-700 group-hover/section:font-semibold group-hover/section:text-primary-color-600",
                        active === section.section_id &&
                          "font-semibold text-primary-color-600",
                      )}
                    >
                      {section.section_title}
                    </p>
                  </div>
                </AccordionTrigger>
                {section?.section_topics?.map((topic) => {
                  return (
                    <AccordionContent
                      key={topic.id}
                      className="group/topic cursor-pointer px-5 py-[10px] hover:bg-primary-color-300/20"
                    >
                      <div className="flex items-start gap-3 text-sm group-hover/topic:text-primary-color-600 md:text-base">
                        <span>{topic.id}.</span>
                        <p>{topic.topic}</p>
                      </div>
                    </AccordionContent>
                  );
                })}
              </AccordionItem>
            );
          })}
        </Accordion>
      </aside>
    </div>
  );
}

export default AdminCoursesSection;
