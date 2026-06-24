// import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

// import SaveButton from "@/Components/admindashboard/course-management/courses/SaveButton";
import { useParams } from "react-router-dom";

import CohortSelection from "@/Components/admindashboard/course-management/courses/CohortSelection";
import { CommonButton } from "@/Components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { useEffect } from "react";
import FormInput from "@/Components/ui/form-input";
import { useEditCourseType } from "@/hooks/course-management/use-edit-course-type";
import { useFetchGlobalCohorts } from "@/hooks/admin-global/use-fetch-global-cohorts";
import { courseTypeSchema } from "@/lib/form-schemas/forms-schema";
import { cn } from "@/lib/utils";
import { ClipLoader } from "react-spinners";
import WeekdaysSelector from "@/Components/ui/weekday-selector";
import { useZoomAccounts } from "@/hooks/zoom-management/use-zoom-accounts";

function convertTo24Hour(timeStr) {
  if (!timeStr) return null;
  let [time, modifier] = timeStr
    .toLowerCase()
    .split(/(am|pm)/)
    .filter(Boolean);
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "pm" && hours < 12) hours += 12;
  if (modifier === "am" && hours === 12) hours = 0;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

const EditLiveSessionCourseType = ({
  priceInfo,
  cohorts: existingCohorts,
  setModalOpen,
}) => {
  const str = "dkj";
  str.endsWith;
  const [cohort, setCohort] = useState(
    () => existingCohorts?.[0]?.cohort || "",
  );
  const { data: globalCohorts } = useFetchGlobalCohorts();
  const { data: zoomAccounts } = useZoomAccounts();

  const getTime = (timeStr) => {
    const t = timeStr;
    const time = t.slice(0, -2).split(":");

    if (timeStr.includes("am") && timeStr < 10) {
      return `0${time[0]}:${time[1]} for am`;
    }

    if (timeStr.includes("pm") && timeStr < "12:00") {
      console.log(`${Number(time[0]) + 12}:${time[1]} for pm`, "from console");
      return `${Number(time[0]) + 12}:${time[1]} for pm`;
    }
  };

  const { courseId } = useParams();

  const [cohortErr, setCohortErr] = useState("");

  const { editCourseType, isPending } = useEditCourseType();

  const onSubmit = async (data) => {
    if (!cohort) return setCohortErr("Input cohort");

    // Convert 24-hour time to 12-hour format with am/pm
    const convertTo12Hour = (time24) => {
      const [hours, minutes] = time24.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "pm" : "am";
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes}${ampm}`;
    };

    const courseType = {
      live_session: {
        original_price: Number(data.coursePrice),
        discounted_price: Number(data.discountPrice),
        duration: data.duration,
        time: convertTo12Hour(data.time), // Convert to "7:00pm" format
        timezone: data.timezone,
        cohort,
        start_date: data.startDate,
        year: 2025,
        currency: "Pounds",
        currency_symbol: "£",
        discount_type: data.discountType,
        discount_value: Number(data.discountValue),
        zoom_account_id: data.zoom_account_id && data.zoom_account_id !== "none" ? data.zoom_account_id : null,
      },
    };

    editCourseType(
      { data: courseType, courseId },
      {
        onSuccess: () => {
          // Close the modal on successful submission
          if (setModalOpen) {
            setModalOpen(false);
          }
        },
      },
    );
  };

  // Only process time if it exists and has am/pm format
  const time =
    priceInfo?.time && priceInfo.time.match(/(am|pm)$/i)
      ? priceInfo.time.slice(0, -2).split(":")
      : null;
  const checkFormat = priceInfo?.time ? priceInfo.time.endsWith("am") : false;

  const existingStartDate = existingCohorts?.[0]?.start_date
    ? new Date(existingCohorts[0].start_date).toISOString().split("T")[0]
    : "";

  const form = useForm({
    resolver: zodResolver(courseTypeSchema),
    defaultValues: {
      duration: existingCohorts?.[0]?.class_days || priceInfo?.duration || "",
      discountPrice: existingCohorts?.[0]?.discounted_price?.amount ?? priceInfo?.discounted_price?.amount ?? 0,
      coursePrice: existingCohorts?.[0]?.original_price?.amount ?? priceInfo?.original_price?.amount ?? 0,
      time: convertTo24Hour(existingCohorts?.[0]?.time) || convertTo24Hour(priceInfo?.time) || "13:00",
      timezone: priceInfo?.timezone || "UTC",
      startDate: existingStartDate,
      discountType: existingCohorts?.[0]?.discounted_price?.discount_type || priceInfo?.discount_type || "None",
      discountValue: existingCohorts?.[0]?.discounted_price?.discount_value ?? priceInfo?.discount_value ?? 0,
      zoom_account_id: existingCohorts?.[0]?.zoom_account_id?.id || existingCohorts?.[0]?.zoom_account_id?._id || existingCohorts?.[0]?.zoom_account_id || "none",
    },
  });

  const coursePrice = form.watch("coursePrice");
  const discountType = form.watch("discountType");
  const discountValue = form.watch("discountValue");

  useEffect(() => {
    if (!coursePrice) return;
    const price = parseFloat(coursePrice);
    let discounted = price;
    const val = parseFloat(discountValue) || 0;

    if (discountType === "Percentage") {
      discounted = price - (price * val) / 100;
    } else if (discountType === "Fiat") {
      discounted = price - val;
    } else {
      discounted = price;
    }

    // Ensure not negative
    discounted = Math.max(0, discounted);

    form.setValue("discountPrice", discounted.toString());
  }, [coursePrice, discountType, discountValue, form]);

  return (
    <>
      <Form {...form}>
        <form action="" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-4 mt-5 grid grid-cols-10 gap-10 rounded border border-gray-300 p-10 md:mb-0">
            <div className="col-span-4">
              <h3 className="text-[20px] font-[500] text-[#344054] lg:text-[24px]">
                Live session + Mentoring
              </h3>
              <p>
                Add Course Original Price, Discounted Price, Cohort, and
                Duration
              </p>
            </div>

            <div className="col-span-6 space-y-4">
              {/* Course Original Price and Discounted Price */}
              <div className="flex flex-col gap-4">
                <div className="flex space-x-4">
                  <FormInput
                    label={"Course Original Price"}
                    className="w-full rounded border border-gray-300 p-2"
                    placeholder="£2,200"
                    control={form.control}
                    name="coursePrice"
                    labelClass={"text-base font-medium"}
                    id="coursePrice"
                    type="number"
                  />

                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="discountType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">
                            Discount Type
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-10 w-full rounded border border-gray-300 p-2">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="None">None</SelectItem>
                              <SelectItem value="Percentage">
                                Percentage
                              </SelectItem>
                              <SelectItem value="Fiat">Fiat</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <FormInput
                    label={"Discount Value"}
                    className="w-full rounded border border-gray-300 p-2"
                    placeholder="0"
                    control={form.control}
                    name="discountValue"
                    labelClass={"text-base font-medium"}
                    id="discountValue"
                    type="number"
                  />

                  <FormInput
                    label={"Discounted Price"}
                    className="w-full rounded border border-gray-300 bg-gray-100 p-2"
                    placeholder="£2,200"
                    control={form.control}
                    name="discountPrice"
                    labelClass={"text-base font-medium"}
                    id="discountPrice"
                    type="number"
                    disabled={true}
                  />
                </div>
              </div>

              {/* Duration and Time */}
              <div className="flex space-x-4">
                <div>
                  <WeekdaysSelector control={form.control} name="duration" />
                </div>
              </div>
              <div className="flex space-x-4">
                {/* Time (7:00pm default) */}
                <div className="flex-1">
                  <FormInput
                    label={"Time"}
                    className="w-full rounded border border-gray-300 p-2"
                    type="time"
                    control={form.control}
                    name="time"
                    labelClass={"text-base font-medium"}
                    id="time"
                  />
                </div>

                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="timezone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-2 block text-base font-[500] text-[#344054]">
                          Timezone
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-[42px] w-full rounded border border-gray-300 p-2">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-[300px]">
                            <SelectItem value="Europe/London">
                              London (GMT/BST)
                            </SelectItem>
                            <SelectItem value="America/New_York">
                              New York (EST/EDT)
                            </SelectItem>
                            <SelectItem value="America/Chicago">
                              Chicago (CST/CDT)
                            </SelectItem>
                            <SelectItem value="America/Denver">
                              Denver (MST/MDT)
                            </SelectItem>
                            <SelectItem value="America/Los_Angeles">
                              Los Angeles (PST/PDT)
                            </SelectItem>
                            <SelectItem value="Asia/Dubai">
                              Dubai (GST)
                            </SelectItem>
                            <SelectItem value="Africa/Lagos">
                              Lagos (WAT)
                            </SelectItem>
                            <SelectItem value="Asia/Kolkata">
                              India (IST)
                            </SelectItem>
                            <SelectItem value="Asia/Singapore">
                              Singapore (SGT)
                            </SelectItem>
                            <SelectItem value="Australia/Sydney">
                              Sydney (AEST/AEDT)
                            </SelectItem>
                            <SelectItem value="UTC">UTC (GMT)</SelectItem>
                            {/* Feel free to add more static commonly supported IANA timezones here */}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Start Date */}
              <div className="flex-1">
                <FormInput
                  label={"Start Date"}
                  className="w-full rounded border border-gray-300 p-2"
                  type="date"
                  control={form.control}
                  name="startDate"
                  labelClass={"text-base font-medium"}
                  id="startDate"
                />
              </div>

              <div className="w-full pt-9">
                <p className="font-[600] text-gray-600">Cohort</p>
                <select
                  value={cohort}
                  onChange={(e) => setCohort(e.target.value)}
                  className="w-full rounded border border-gray-300 p-2"
                >
                  <option value="">Select cohort</option>
                  {globalCohorts?.map((c) => (
                    <option key={c.id} value={`${c.month} ${c.year}`}>
                      {c.month} {c.year}
                    </option>
                  ))}
                </select>

                {/* <CohortSelection
                  data={cohorts}
                  setCohort={setCohort}
                  text={"Select cohort"}
                /> */}
                <div>
                  <span
                    className={cn("text-primary-color-600", cohort && "hidden")}
                  >
                    {cohortErr}
                  </span>
                  {cohort && (
                    <p className="mt-5 flex items-center gap-2 capitalize text-primary-color-600">
                      <span>
                        <FaCheck />
                      </span>
                      <span>{cohort} </span>
                    </p>
                  )}
                </div>
              </div>

              {/* Zoom Account */}
              <div className="w-full pt-4">
                <FormField
                  control={form.control}
                  name="zoom_account_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">Zoom Account</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full rounded border border-gray-300 p-2 h-[42px] bg-white text-sm"
                        >
                          <option value="none">No Zoom Account</option>
                          {zoomAccounts?.data?.data?.map((acc) => (
                            <option key={acc.id} value={acc.id}>
                              {acc.name}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="w-full pt-10">
            <CommonButton
              className="min-w-32 ml-auto block rounded bg-primary-color-600"
              disabled={isPending}
            >
              {isPending ? (
                <ClipLoader size={20} color={"#fff"} />
              ) : (
                "Save & Continue"
              )}
            </CommonButton>
          </div>
        </form>
      </Form>
    </>
  );
};

export default EditLiveSessionCourseType;
