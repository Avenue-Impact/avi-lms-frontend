import SectionPopover from "./SectionPopover";
import { LiaEllipsisVSolid } from "react-icons/lia";
import { VidIcon } from "@/Components/Icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { useQuery } from "@tanstack/react-query";

import { fetchDemandCourse } from "@/services/api";
import VideoSectionPopover from "./VideoSectionPopover";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatDate = (date) => {
  const createdAt = new Date(date);

  const day = createdAt.getDate();
  const month = months[createdAt.getMonth()];
  const year = createdAt.getFullYear();
  const hour = createdAt.getHours();
  const min = createdAt.getMinutes();

  const get12hrs = hour > 12 ? hour - 12 : hour;

  const amOrPm = hour >= 12 ? "PM" : "AM";

  return `${day} ${month}, ${year} | ${get12hrs}:${min}${amOrPm}`;
};

const CoursesRecordedSection = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-demand-course"],
    queryFn: fetchDemandCourse,
  });

  // console.log(isLoading, isError, data);

  if (isLoading) return <p>loading....</p>;
  if (isError && !data) {
    console.log(error);

    return <p>{error.response.data.message || "something went wrong"}</p>;
  }
  if (data)
    return (
      <aside className="overflow-y-auto overflow-x-hidden">
        {data?.data?.data.length < 1 ? (
          <p className="text-slate-400"> No courses yet .... </p>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {data?.data?.data.map((course) => {
              return (
                <AccordionItem key={course.id} value={course.id}>
                  <div className="grid grid-cols-[8fr_1fr] items-center">
                    <AccordionTrigger className="w-full">
                      Section {course.section}
                    </AccordionTrigger>
                    <SectionPopover
                      id={course.id}
                      section={course.section}
                      course={course}
                    >
                      <span className="cursor-pointer justify-self-end">
                        <LiaEllipsisVSolid className="self-end text-2xl" />
                      </span>
                    </SectionPopover>
                  </div>
                  <AccordionContent>
                    <h2 className="font-medium capitalize leading-[23.2px] text-[#344054]">
                      {course.title}
                    </h2>
                    <ul className="mt-6 space-y-6">
                      {course.lessons.map((item, i) => {
                        return (
                          <li className="text-[#667185]" key={item.id}>
                            <article className="flex items-center justify-between">
                              <div className="flex gap-2">
                                <span>{i + 1}</span>
                                <span className="capitalize">
                                  {item.video_title}
                                </span>
                              </div>
                              <div>
                                <VideoSectionPopover
                                  id={item.id}
                                  section={course.section}
                                >
                                  <span className="cursor-pointer justify-self-end">
                                    <LiaEllipsisVSolid className="self-end text-2xl" />
                                  </span>
                                </VideoSectionPopover>
                              </div>
                            </article>
                            <div className="mt-3 flex items-start gap-4">
                              <VidIcon />
                              <article>
                                <h3 className="font-medium capitalize">
                                  {item.video_title}
                                </h3>
                                <p className="text-sm font-light text-[#98A2B3]">
                                  {formatDate(item.createdAt)}{" "}
                                  <span>{item.video_url.size}MB</span>
                                </p>
                              </article>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </aside>
    );
  return <p>something went wrong ...</p>;
};

export default CoursesRecordedSection;
