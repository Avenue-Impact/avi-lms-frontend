import SectionPopover from "./SectionPopover";
import { LiaEllipsisVSolid } from "react-icons/lia";
import { VidIcon } from "@/Components/Icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";

const sectionContent = [
  {
    title: "Introduction to Project Consulting Recordings",
  },
  {
    title: "Roles and Responsibilities of a Project Consultant Recordings",
  },
  {
    title: "Roles and Responsibilities of a Project Consultant Recordings",
  },
];

const CoursesRecordedSection = () => {
  return (
    <aside className="overflow-y-auto overflow-x-hidden">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <div className="grid grid-cols-[8fr_1fr] items-center">
            <AccordionTrigger className="w-full">Section 1</AccordionTrigger>
            <SectionPopover>
              <span className="cursor-pointer justify-self-end">
                <LiaEllipsisVSolid className="self-end text-2xl" />
              </span>
            </SectionPopover>
          </div>
          <AccordionContent>
            <h2 className="font-medium leading-[23.2px] text-[#344054]">
              Business Analysis Agile Project Management Software Testing
            </h2>
            <ul className="mt-6 space-y-6">
              {sectionContent.map((item, i) => {
                return (
                  <li className="text-[#667185]" key={i}>
                    <article className="flex gap-2">
                      <div className="flex gap-2">
                        <span>{i + 1}</span>
                        <span>{item.title}</span>
                      </div>
                      <div>
                        <SectionPopover>
                          <span className="cursor-pointer justify-self-end">
                            <LiaEllipsisVSolid className="self-end text-2xl" />
                          </span>
                        </SectionPopover>
                      </div>
                    </article>
                    <div className="mt-3 flex items-start gap-4">
                      <VidIcon />
                      <article>
                        <h3 className="font-medium">Recorded Video</h3>
                        <p className="text-sm font-light text-[#98A2B3]">
                          11 Sep, 2023 | 12:24pm <span>13MB</span>
                        </p>
                      </article>
                    </div>
                  </li>
                );
              })}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <div className="grid grid-cols-[8fr_1fr] items-center">
            <AccordionTrigger className="w-full">Section 2</AccordionTrigger>
            <SectionPopover>
              <span className="cursor-pointer justify-self-end">
                <LiaEllipsisVSolid className="self-end text-2xl" />
              </span>
            </SectionPopover>
          </div>
          <AccordionContent>
            <h2 className="font-medium leading-[23.2px] text-[#344054]">
              Business Analysis Agile Project Management Software Testing
            </h2>
            <ul className="mt-6 space-y-6">
              {sectionContent.map((item, i) => {
                return (
                  <li className="text-[#667185]" key={i}>
                    <article className="flex gap-2">
                      <div className="flex gap-2">
                        <span>{i + 1}</span>
                        <span>{item.title}</span>
                      </div>
                      <div>
                        <SectionPopover>
                          <span className="cursor-pointer justify-self-end">
                            <LiaEllipsisVSolid className="self-end text-2xl" />
                          </span>
                        </SectionPopover>
                      </div>
                    </article>
                    <div className="mt-3 flex items-start gap-4">
                      <VidIcon />
                      <article>
                        <h3 className="font-medium">Recorded Video</h3>
                        <p className="text-sm font-light text-[#98A2B3]">
                          11 Sep, 2023 | 12:24pm <span>13MB</span>
                        </p>
                      </article>
                    </div>
                  </li>
                );
              })}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default CoursesRecordedSection;
