import { CommonButton } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { useFetchCourseInfo } from "@/hooks/course-management/use-fetch-course-information";

import { HiOutlinePencil } from "react-icons/hi";
import { ClipLoader } from "react-spinners";
import EditModal from "../on-demand-section/EditModal";
import EditCourseType from "../courses/edit-course-type/EditCourseType";
import EditLiveSessionCourseType from "../courses/edit-course-type/EditLiveSessionCourseType";
import { useState, useEffect } from "react";

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
  const [activeCohorts, setActiveCohorts] = useState(null);
  const [editingCohort, setEditingCohort] = useState(null);
  const [isCohortModalOpen, setIsCohortModalOpen] = useState(false);

  const cohorts = data?.data?.data?.course?.cohorts ?? [];
  useEffect(() => {
    if (cohorts.length && !activeCohorts) {
      setActiveCohorts(cohorts[0]);
    }
  }, [cohorts, activeCohorts]);

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
      <main className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {cohorts.length === 0 ? (
          <div>NO Live Course ....</div>
        ) : (
          <section className="border-b border-[#F0F2F5] pb-10 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-11">
            <h3 className="w-full max-w-[530px] text-xl font-light text-[#23314A]">
              Live session + Mentoring ({activeCohorts?.cohort ?? "no cohort"})
            </h3>

            {/* PRICE */}
            <div className="mb-3 mt-[42px] flex gap-6">
              <span className="text-xl font-semibold text-[#23314A]">
                Price {activeCohorts?.discounted_price?.price_string}
              </span>

              <span className="text-xl italic text-[#23314A] line-through">
                {activeCohorts?.original_price?.price_string}
              </span>

              <span className="text-xl font-light text-[#667185]">
                {calcDiscountPercentage(
                  activeCohorts?.original_price?.amount,
                  activeCohorts?.discounted_price?.amount,
                )}
                % off
              </span>
            </div>

            {/* SCHEDULE */}
            <p className="text-xl font-light text-[#667185]">
              {/* Starts{" "} */}
              <span className="uppercase">
                {activeCohorts?.class_days ? activeCohorts?.class_days : "TBA"}
              </span>
              {" • "}
              <span className="uppercase">{activeCohorts?.time ?? "TBA"}</span>
            </p>

            {/* COHORT SELECT */}
            <div className="mt-10">
              <h3 className="mb-6 text-xl font-light text-[#23314A]">
                Select Cohort
              </h3>

              <RadioGroup
                value={activeCohorts?.id ? String(activeCohorts.id) : ""}
                onValueChange={(val) => {
                  const sel = cohorts.find((c) => String(c.id) === String(val));
                  if (sel) setActiveCohorts(sel);
                }}
                className="space-y-3"
              >
                {cohorts.map((cohort) => (
                  <div
                    className="flex items-center space-x-2 rounded-md border border-[#E0E0E0] px-3 py-[18px]"
                    key={cohort.id}
                  >
                    <RadioGroupItem
                      value={String(cohort.id)} // use string values for consistency
                      id={String(cohort.id)}
                      className="border-[#98A2B3]"
                    />

                    <Label
                      htmlFor={String(cohort.id)}
                      className="font-normal capitalize text-[#23314A] flex-1"
                    >
                      <div className="flex flex-col justify-between">
                        <div>
                          <span>{cohort.cohort} - </span>
                          <span className="text-sm font-medium text-[#23314A]">
                            {cohort.discounted_price?.price_string}
                          </span>
                        </div>
                        <span className="text-sm text-[#667185]">
                          {cohort.class_days
                            ? cohort.class_days
                            : "Start date TBA"}{" "}
                          • {cohort.time ?? "Time TBA"}
                        </span>
                      </div>
                    </Label>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setEditingCohort(cohort);
                        setIsCohortModalOpen(true);
                      }}
                      className="p-2 text-[#667185] hover:text-[#23314A]"
                    >
                      <HiOutlinePencil size={20} />
                    </button>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </section>
        )}

        <section className="lg:pl-10">
          <h3 className="mb-[42px] w-full max-w-[530px] text-xl font-light text-[#23314A]">
            On Demand Course (Pre Recorded Session)
          </h3>
          <RadioGroup defaultValue="" className="space-y-3">
            {data?.data?.data.pricing.on_demand.map((item) => {
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
                    <span>{item.discounted_price?.price_string}</span>
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </section>
      </main>

      {editingCohort && (
        <EditModal
          header={`Edit Cohort - ${editingCohort.cohort}`}
          form={
            <EditLiveSessionCourseType
              priceInfo={{}}
              cohorts={[editingCohort]}
              setModalOpen={(val) => {
                setIsCohortModalOpen(val);
                if (!val) setEditingCohort(null);
              }}
            />
          }
          open={isCohortModalOpen}
          setOpen={(val) => {
            setIsCohortModalOpen(val);
            if (!val) setEditingCohort(null);
          }}
        />
      )}
    </section>
  );
}

export default CourseType;
