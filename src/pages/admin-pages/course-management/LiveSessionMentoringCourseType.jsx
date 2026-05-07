// import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";

import { useCourseManagementInfo } from "@/hooks/useCourseManagementInfo";
// import SaveButton from "@/Components/admindashboard/course-management/courses/SaveButton";
import { ScrollRestoration } from "react-router-dom";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import FormInput from "@/Components/ui/form-input";
import CohortSelection from "@/Components/admindashboard/course-management/courses/CohortSelection";
import { CommonButton } from "@/Components/ui/button";
import { ClipLoader } from "react-spinners";
import { useFetchGlobalCohorts } from "@/hooks/admin-global/use-fetch-global-cohorts";
import { cn } from "@/lib/utils";
import { useCreateCourseType } from "@/hooks/course-management/use-create-course-type";
import { courseTypeSchema } from "@/lib/form-schemas/forms-schema";
import WeekdaysSelector from "@/Components/ui/weekday-selector";
import { useZoomAccounts } from "@/hooks/zoom-management/use-zoom-accounts";

const convertTo12Hour = (time24) => {
  if (!time24) return "";
  const [hours, minutes] = time24.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "pm" : "am";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes}${ampm}`;
};

const LiveSessionMentoringCourseType = () => {
  const savedForm = JSON.parse(localStorage.getItem("liveSessionForm"));

  const [cohort, setCohort] = useState(savedForm?.cohort || "");

  const [cohortErr, setCohortErr] = useState("");

  const { createCourseType, isCreating } = useCreateCourseType();
  const { setActiveTab, setSubTab } = useCourseManagementInfo();
  const { data: globalCohorts } = useFetchGlobalCohorts();
  const { data: zoomAccounts } = useZoomAccounts();

  const onSubmit = async (data) => {
    // const time = data.time.split(":");
    // const hour =
    //   parseInt(time[0]) > 12 ? Number(time[0]) - 12 : parseInt(time[0]);

    // const min = Number(time[1]) < 10 ? `${time[1]}` : Number(time[1]);
    // const amOrPm = Number(time[0]) >= 12 ? "pm" : "am";
    if (!cohort) return setCohortErr("Input  cohort");

    const courseType = {
      live_session: {
        original_price: Number(data.coursePrice),
        discounted_price: isNaN(Number(data.discountPrice))
          ? 0
          : Number(data.discountPrice),
        duration: data.duration,
        time: convertTo12Hour(data.time),
        timezone: data.timezone,
        start_date: data.startDate,
        cohort,
        year: 2025,
        currency: "Pounds",
        currency_symbol: "£",
        discount_type: data.discountType,
        discount_value: Number(data.discountValue),
        zoom_account_id: data.zoom_account_id && data.zoom_account_id !== "none" ? data.zoom_account_id : undefined,
      },
    };

    localStorage.setItem(
      "liveSessionForm",
      JSON.stringify({ ...data, cohort }),
    );

    createCourseType(
      { data: courseType, courseId: localStorage.getItem("courseId") },
      {
        onSuccess: ({ data }) => {
          setSubTab((prev) => prev + 1);
          localStorage.setItem("cohorts", cohort);
          localStorage.setItem("cohortId", data.data.cohorts.at(-1).id);
        },
      },
    );
  };

  const form = useForm({
    resolver: zodResolver(courseTypeSchema),
    defaultValues: {
      duration: savedForm?.duration || "",
      discountPrice: savedForm?.discountPrice || "",
      coursePrice: savedForm?.coursePrice || "",
      time: savedForm?.time || "",
      timezone: savedForm?.timezone || "UTC",
      startDate: savedForm?.startDate || "",
      discountType: savedForm?.discountType || "None",
      discountValue: savedForm?.discountValue || "0",
      zoom_account_id: savedForm?.zoom_account_id || "none",
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
          <div className="mb-4 mt-5 grid grid-cols-12 gap-10 rounded border border-gray-300 p-10 md:mb-0">
            <div className="col-span-5">
              <h3 className="text-[20px] font-[500] text-[#344054] lg:text-[24px]">
                Live session + Mentoring
              </h3>
              <p>
                Add Course Original Price, Discounted Price, Cohort, and
                Duration
              </p>
            </div>

            <div className="col-span-7 space-y-4">
              {/* Course Original Price and Discounted Price */}
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
                          <FormLabel className="text-base font-medium">Discount Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full rounded border border-gray-300 p-2 h-10">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="None">None</SelectItem>
                              <SelectItem value="Percentage">Percentage</SelectItem>
                              <SelectItem value="Fiat">Fiat</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>

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
                  className="w-full rounded border border-gray-300 p-2 bg-gray-100"
                  placeholder="£2,200"
                  control={form.control}
                  name="discountPrice"
                  labelClass={"text-base font-medium"}
                  id="discountPrice"
                  type="number"
                  disabled={true}
                />
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
                        <FormLabel className="text-base font-[500] text-[#344054] block mb-2">Timezone</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full rounded border border-gray-300 p-2 h-[42px]">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-[300px]">
                            <SelectItem value="UTC">UTC (GMT)</SelectItem>
                            <SelectItem value="Europe/London">London (GMT/BST)</SelectItem>
                            <SelectItem value="America/New_York">New York (EST/EDT)</SelectItem>
                            <SelectItem value="America/Chicago">Chicago (CST/CDT)</SelectItem>
                            <SelectItem value="America/Denver">Denver (MST/MDT)</SelectItem>
                            <SelectItem value="America/Los_Angeles">Los Angeles (PST/PDT)</SelectItem>
                            <SelectItem value="Asia/Dubai">Dubai (GST)</SelectItem>
                            <SelectItem value="Africa/Lagos">Lagos (WAT)</SelectItem>
                            <SelectItem value="Asia/Kolkata">India (IST)</SelectItem>
                            <SelectItem value="Asia/Singapore">Singapore (SGT)</SelectItem>
                            <SelectItem value="Australia/Sydney">Sydney (AEST/AEDT)</SelectItem>
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

                <CohortSelection
                  data={globalCohorts}
                  setCohort={setCohort}
                  text={"Select cohort"}
                />
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
                      <FormLabel className="text-base font-medium">Zoom Account (Optional)</FormLabel>
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

          <div className="flex items-center justify-between gap-6 pt-10">
            <CommonButton
              onClick={() => setActiveTab((prev) => prev - 1)}
              className="ml-auto bg-gray-500 text-white hover:bg-gray-700"
            >
              Back
            </CommonButton>

            <CommonButton
              className="min-w-32 rounded bg-primary-color-600"
              disabled={isCreating}
            >
              {isCreating ? (
                <ClipLoader size={20} color={"#fff"} />
              ) : (
                "Save"
              )}
            </CommonButton>
          </div>
        </form>
      </Form>
    </>
  );
};

export default LiveSessionMentoringCourseType;
