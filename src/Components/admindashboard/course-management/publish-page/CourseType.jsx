import { CommonButton } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import React from "react";
import { HiOutlinePencil } from "react-icons/hi";

const Cohort = [
  {
    time: "May Cohort",
  },
  {
    time: "July Cohort",
  },
  {
    time: "October Cohort",
  },
  {
    time: "January Cohort",
  },
];

const durations = [
  {
    duration: "One Month Access",
    price: "£100",
  },
  {
    duration: "3 Months Access ",
    price: "£200",
  },
  {
    duration: "6 Months Access ",
    price: " £400",
  },
  {
    duration: "Annual Year Subscription ",
    price: " £600",
  },
];

function CourseType({ editButton = false }) {
  return (
    <section className="rounded-md border-2 border-[#F0F2F5] p-12 pr-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium text-[#344054]">Course Type</h2>
        {editButton && (
          <CommonButton variant="outline" className="space-x-2 text-[#667185]">
            <span className="text-lg">
              <HiOutlinePencil />
            </span>
            <span>Edit section</span>
          </CommonButton>
        )}
      </div>
      <main className="mt-8 grid grid-cols-2">
        <section className="border-r border-r-[#F0F2F5] pr-11">
          <h3 className="w-full max-w-[530px] text-xl font-light text-[#23314A]">
            Live session + Mentoring (May Cohorts 3.5 months programme - 3.5
            Months Programme)
          </h3>
          <div className="mb-3 mt-[42px] flex gap-6">
            <span className="text-xl font-semibold text-[#23314A]">
              Price £2,200
            </span>
            <span className="text-xl italic text-[#23314A] line-through">
              £39,900
            </span>
            <span className="text-xl font-light text-[#667185]">85% off</span>
          </div>
          <p className="text-xl font-light text-[#667185]">
            Every Monday to Friday 7PM
          </p>

          <div className="mt-10">
            <h3 className="mb-6 text-xl font-light text-[#23314A]">
              Select Cohort
            </h3>
            <RadioGroup defaultValue="" className="space-y-3">
              {Cohort.map((item, i) => {
                return (
                  <div
                    className="flex items-center space-x-2 rounded-md border border-[#E0E0E0] px-3 py-[18px]"
                    key={i}
                  >
                    <RadioGroupItem
                      value={item.time}
                      id={item.time}
                      className="border-[#98A2B3]"
                    />
                    <Label
                      htmlFor={item.time}
                      className="font-normal capitalize text-[#8F8F8E]"
                    >
                      {item.time}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        </section>
        <section className="pl-10">
          <h3 className="mb-[42px] w-full max-w-[530px] text-xl font-light text-[#23314A]">
            On Demand Course (Pre Recorded Session)
          </h3>
          <RadioGroup defaultValue="" className="space-y-3">
            {durations.map((item, i) => {
              return (
                <div
                  className="flex items-center space-x-2 rounded-md border border-[#E0E0E0] px-3 py-[18px]"
                  key={i}
                >
                  <RadioGroupItem
                    value={item.duration}
                    id={item.duration}
                    className="border-[#98A2B3]"
                  />
                  <Label
                    htmlFor={item.duration}
                    className="font-normal capitalize text-[#8F8F8E]"
                  >
                    <span>{item.duration} - </span>
                    <span>{item.price}</span>
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </section>
      </main>
    </section>
  );
}

export default CourseType;
