import Table from "@/Components/Table";
import { CommonButton } from "@/Components/ui/button";
import { Popover, PopoverTrigger } from "@/Components/ui/popover";
import { courseManagement } from "@/lib/course_management";
import { PopoverContent } from "@radix-ui/react-popover";
import { IoSearch } from "react-icons/io5";

import { LiveSessionIcon, OnDemandIcon } from "@/Components/Icon";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { useState } from "react";

export default function DataCourseManagement() {
  const [course, setCourse] = useState(courseManagement);

  const filterDemand = (str) => {
    const filteredCourse = courseManagement.filter(
      (course) => course.type === str,
    );

    setCourse(filteredCourse);
  };

  return (
    <div>
      <header className="mt-7 flex items-center justify-between px-4 py-5">
        <p className="text-xl text-[#475367]">Courses Management</p>
        <div className="flex items-center gap-2">
          <div className="flex w-full max-w-[528px] items-center gap-x-4 rounded-md border border-[#D0D5DD] px-4 py-2">
            <label htmlFor="search">
              <IoSearch className="text-xl text-[#667185]" />
            </label>

            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search here..."
              className="w-full placeholder:text-[#667185]"
            />
          </div>
          <Popover>
            <PopoverTrigger>
              <CommonButton
                variant={"outline"}
                className="font-normal capitalize"
              >
                filter
              </CommonButton>
            </PopoverTrigger>
            <PopoverContent>
              <div className="w-52 divide-y rounded-md bg-white shadow-md">
                <CommonButton
                  className="flex w-full items-center justify-start gap-4 px-3 py-[14px] capitalize"
                  variant="ghost"
                  onClick={() => filterDemand("On Demand Courses")}
                >
                  <span>
                    <OnDemandIcon />
                  </span>
                  <span>on demand</span>
                </CommonButton>
                <CommonButton
                  className="flex w-full items-center justify-start gap-4 px-3 py-[14px] text-start capitalize"
                  variant="ghost"
                  onClick={() => filterDemand("live session")}
                >
                  <span>
                    <LiveSessionIcon />
                  </span>
                  <span>live session</span>
                </CommonButton>
                <CommonButton
                  className="flex w-full items-center justify-start gap-4 px-3 py-[14px] capitalize"
                  variant="ghost"
                >
                  <span>
                    <GoArrowUpRight />
                  </span>
                  <span>highest registered</span>
                </CommonButton>
                <CommonButton
                  className="flex w-full items-center justify-start gap-4 px-3 py-[14px] capitalize"
                  variant="ghost"
                >
                  <span>
                    <GoArrowDownLeft />
                  </span>
                  <span>lowest registered</span>
                </CommonButton>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>

      <div className="mt-10">
        <Table cols={"0.3fr 1.6fr 1.3fr 1.3fr 1fr 1.3fr "}>
          <Table.Header className={"*:text-sm *:font-medium *:capitalize"}>
            <h4>S/N</h4>
            <h4>course title</h4>
            <h4>course type</h4>
            <h4>date created</h4>
            <h4>course duration</h4>
            <h4>No. of student registered</h4>
          </Table.Header>
          <div className="divide-y">
            {course.map((course, i) => {
              return (
                <Table.Row key={course.id}>
                  <p>{i + 1}</p>
                  <p className="nor text-ellipsis text-sm text-[#344054]">
                    {course.title}
                  </p>
                  <p className="text-left">
                    <span className="w-min text-nowrap rounded-[12px] bg-[#FFECE5] px-3 py-[2px] text-xs font-medium text-[#AD3307]">
                      {course.type}
                    </span>
                  </p>
                  <p className="text-sm text-[#344054]">{course.createdAt}</p>
                  <p className="text-sm text-[#344054]">{course.duration}</p>
                  <p className="text-sm text-[#344054]">
                    {course.noOfRegisterStudent}
                  </p>
                </Table.Row>
              );
            })}
          </div>
        </Table>
      </div>
    </div>
  );
}
