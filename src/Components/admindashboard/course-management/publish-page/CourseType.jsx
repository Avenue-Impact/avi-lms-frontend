import { CommonButton } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { useFetchCourseInfo } from "@/hooks/course-management/use-fetch-course-information";

import { HiOutlinePencil } from "react-icons/hi";
import { ClipLoader } from "react-spinners";
import EditModal from "../on-demand-section/EditModal";
import EditCourseType from "../courses/edit-course-type/EditCourseType";
import { useState } from "react";

const writeDay = (dayString) => {
  if (!dayString || !dayString.includes("-")) {
    return "Invalid duration format";
  }

  // Convert dayString to lowercase to match keys in the day object

  const str = dayString.toLowerCase().split("-");
  const day = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
  };

  return `${day[str[0].trim()]} to ${day[str[1].trim()]}`;
};

const calcDiscountPercentage = (price, discount) => {
  const percent = (Number(discount) * 100) / Number(price);

  return percent.toFixed(2);
};

function CourseType({ editButton = false, courseId }) {
  const { data, isLoading, isError } = useFetchCourseInfo(courseId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <ClipLoader color="#CC1747" />
      </div>
    );

  if (isError) return <p>error..</p>;

  return (
    <section className="rounded-md border-2 border-[#F0F2F5] p-12 pr-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium text-[#344054]">Course Type</h2>
        {editButton && (
          <EditModal
            header="Edit course type"
            form={<EditCourseType data={data} setModalOpen={setIsModalOpen} />}
            open={isModalOpen}
            setOpen={setIsModalOpen}
          >
            <CommonButton
              variant="outline"
              className="space-x-2 text-[#667185]"
            >
              <span className="text-lg">
                <HiOutlinePencil />
              </span>
              <span>Edit section</span>
            </CommonButton>
          </EditModal>
        )}
      </div>
      <main className="mt-8 grid grid-cols-2">
        {data?.data?.data?.course?.cohorts.length === 0 ? (
          <div>NO Live Course ....</div>
        ) : (
          <section className="border-r border-r-[#F0F2F5] pr-11">
            <h3 className="w-full max-w-[530px] text-xl font-light text-[#23314A]">
              Live session + Mentoring (
              {data?.data?.data.course.cohorts.at(0).cohort ?? "no cohort"})
            </h3>
            <div className="mb-3 mt-[42px] flex gap-6">
              <span className="text-xl font-semibold text-[#23314A]">
                Price{" "}
                {
                  data?.data?.data.course.live_class_price.original_price
                    .price_string
                }
              </span>
              <span className="text-xl italic text-[#23314A] line-through">
                {
                  data?.data?.data.course.live_class_price.discounted_price
                    .price_string
                }
              </span>
              <span className="text-xl font-light text-[#667185]">
                {calcDiscountPercentage(
                  data?.data?.data.course.live_class_price.original_price
                    .amount,
                  data?.data?.data.course.live_class_price.discounted_price
                    .amount,
                )}
                % off
              </span>
            </div>
            <p className="text-xl font-light text-[#667185]">
              Every{" "}
              {writeDay(data?.data?.data.course.live_class_price.duration)}{" "}
              <span className="uppercase">
                {data?.data?.data.course.live_class_price.time}
              </span>
            </p>

            <div className="mt-10">
              <h3 className="mb-6 text-xl font-light text-[#23314A]">
                Select Cohort
              </h3>
              <RadioGroup defaultValue="" className="space-y-3">
                {data?.data?.data?.course?.cohorts.map((cohort) => (
                  <div
                    className="flex items-center space-x-2 rounded-md border border-[#E0E0E0] px-3 py-[18px]"
                    key={cohort.id}
                  >
                    <RadioGroupItem
                      value={cohort.cohort}
                      id={cohort.cohort}
                      className="border-[#98A2B3]"
                      disabled={true}
                    />
                    <Label
                      htmlFor={cohort.cohort}
                      className="font-normal capitalize text-[#8F8F8E]"
                    >
                      {cohort.cohort}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </section>
        )}

        <section className="pl-10">
          <h3 className="mb-[42px] w-full max-w-[530px] text-xl font-light text-[#23314A]">
            On Demand Course (Pre Recorded Session)
          </h3>
          <RadioGroup defaultValue="" className="space-y-3">
            {data?.data?.data.course.pre_recorded_price.map((item) => {
              return (
                <div
                  className="flex items-center space-x-2 rounded-md border border-[#E0E0E0] px-3 py-[18px]"
                  key={item.duration}
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
                    <span>{item.price_string}</span>
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
