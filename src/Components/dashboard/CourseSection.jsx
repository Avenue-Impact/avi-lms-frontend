import { courseSections } from "@/lib/courseSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import CourseAccordion from "./CourseAccordion";

function CourseSection() {
  return (
    <div>
      <h3 className="text-2xl font-medium capitalize text-black">
        Course section
      </h3>
      <Accordion type="single" collapsible className="w-full">
        {courseSections.map((section) => {
          return (
            <AccordionItem value={section.section} key={section.section_id}>
              <AccordionTrigger className="hover:bg-primary-color-300/20 group/section [&[data-state=open]]:bg-bg-primary-color-300/20 px-5 py-[10px]">
                <div className="text-left">
                  <p className="font-poppins text-xl font-light capitalize text-tertiary-color-900">
                    {section.section}
                  </p>
                  <p className="text-base font-light leading-6 text-tertiary-color-700 group-hover/section:font-semibold group-hover/section:text-primary-color-600">
                    {section.section_title}
                  </p>
                </div>
              </AccordionTrigger>
              {section?.section_topics?.map((topic) => {
                return (
                  <AccordionContent
                    key={topic.id}
                    className="hover:bg-primary-color-300/20 group/topic cursor-pointer px-5 py-[10px]"
                  >
                    <div className="flex items-start gap-3 group-hover/topic:text-primary-color-600">
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
