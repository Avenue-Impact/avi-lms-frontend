import { cn } from "@/lib/utils";
import { Accordion, AccordionItem, AccordionTrigger } from "../ui/accordion";
//  active === section.section_id

function CourseSectionAccordion({ onClick, active, sections }) {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value={"section.title"}>
          <AccordionTrigger
            className={cn(
              "group/section [&[data-state=open]]:bg-bg-primary-color-300/20 px-5 pb-[10px] hover:bg-primary-color-300/20",
              active === "1" && "bg-primary-color-300/20",
            )}
            onClick={() => {
              // setActive("1");
              // setShowLive("live");
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
      {/* <Accordion type="single" collapsible className="w-full">
        {sections.map((section) => {
          return (
            <AccordionItem value={section.section} key={section.section_id}>
              <AccordionTrigger
                className={cn(
                  "group/section [&[data-state=open]]:bg-bg-primary-color-300/20 px-5 pb-[10px] hover:bg-primary-color-300/20",
                  active === section.section_id && "bg-primary-color-300/20",
                )}
                onClick={() => onClick(section, section.section_id)}
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
      </Accordion> */}
    </>
  );
}

export default CourseSectionAccordion;
