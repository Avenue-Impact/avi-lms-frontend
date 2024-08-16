import { courseSections } from "@/lib/courseSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useState } from "react";
import { cn } from "@/lib/utils";

function CourseSection({ setSession, setSectionDetails }) {
  const [active, setActive] = useState("1");
  const changeSession = (courseSection, id) => {
    const { section_title, section } = courseSection;
    setSectionDetails((prevState) => {
      return { ...prevState, topic: section_title, section };
    });
    setActive(id);
    if (section_title.includes("Join Live Sessions")) return setSession("live");
    return setSession("recorded");
  };

  return (
    <div>
      <h3 className="hidden text-2xl font-medium capitalize text-black lg:block">
        Course section
      </h3>
      <Accordion type="single" collapsible className="w-full">
        {courseSections.map((section) => {
          return (
            <AccordionItem value={section.section} key={section.section_id}>
              <AccordionTrigger
                className={cn(
                  "group/section [&[data-state=open]]:bg-bg-primary-color-300/20 px-5 pb-[10px] hover:bg-primary-color-300/20",
                  active === section.section_id && "bg-primary-color-300/20",
                )}
                onClick={() => changeSession(section, section.section_id)}
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
    </div>
  );
}

export default CourseSection;
