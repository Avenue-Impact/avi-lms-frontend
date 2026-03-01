import { useCreateLiveSession } from "@/hooks/course-management/use-create-live-session";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import { CommonButton } from "@/Components/ui/button";
import { editLiveSessionSchema } from "@/lib/form-schemas/forms-schema";
import { ClipLoader } from "react-spinners";

import LiveSessionContent from "@/Components/admindashboard/course-management/live-session/liveSessionContent";
import { useGetSingleCohort } from "@/hooks/course-management/use-get-singleCohorts";

const EditLiveSectionForm = () => {
  const { createLiveSession, isCreating } = useCreateLiveSession();
  const [disabledButton, setDisabledButton] = useState(false);

  const [queryString] = useSearchParams();
  const { courseId } = useParams();
  const cohortId = queryString.get("cohortId");

  const { data } = useGetSingleCohort(courseId, cohortId);

  const form = useForm({
    resolver: zodResolver(editLiveSessionSchema),
    defaultValues: {
      title: "",
      time: "19:00",
      start_date: "",
    },
  });

  /* 🔁 Hydrate form when cohort loads */
  useEffect(() => {
    if (data?.data?.data) {
      const cohort = data?.data?.data;
      console.log("Cohort Data:", cohort); // Debug log
      const derivedCohortId = cohortId ?? cohort?.id ?? cohort?.cohort?.id;

      form.reset({
        title: "",
        time: cohort?.time ?? cohort?.cohort?.time ?? "19:00",
        start_date: "",
      });
    }
  }, [data]);

  const onSubmit = async (formData) => {
    // Pass cohortId explicitly to the mutation
    const derivedCohortId =
      cohortId ?? data?.data?.data?.id ?? data?.data?.data?.cohort?.id;

    createLiveSession(
      { ...formData, cohortId: derivedCohortId, courseId: courseId },
      {
        onSuccess: () => {
          form.reset({
            title: "",
            time: data?.data?.data?.time ?? "19:00",
            start_date: "",
          });
          setDisabledButton(true);
        },
      },
    );
  };

  const cohortExists = !!data?.data?.data?.cohort;

  console.log("Form Errors:", form.formState.errors); // Debug log

  return (
    <div>
      <div className="mb-4 mt-5 rounded border border-gray-300 p-10 md:mb-0">
        <div className="mx-auto grid max-w-6xl grid-cols-12 gap-8 pt-5">
          <Form {...form}>
            <form
              className="col-span-8 space-y-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* Session Title */}
              <div className="mb-6">
                <FormInput
                  name="title"
                  id="title"
                  type="text"
                  control={form.control}
                  placeholder="Join Business Analysis Live Session"
                  label={"Session Title"}
                  labelClass={"mb-2 font-[500] text-[#475367] block text-base"}
                  className="h-[56px] w-full resize-none rounded border border-gray-300 p-2 outline-none"
                  disabled={!cohortExists}
                />

                <p className="text-right text-gray-500">
                  {form.watch("title")?.length ?? 0}/70
                </p>
              </div>

              {/* ================= RETAINED COMMENTED INPUTS ================= */}

              {/* <div className="mb-6">
                <FormInput
                  name="subtitle"
                  type="text"
                  id="subtitle"
                  control={form.control}
                  placeholder="Business Analysis Agile Project Management Software Testing May 2024"
                  label={"Session Subtitle"}
                  labelClass={"mb-2 font-[500] text-[#475367] block text-base"}
                  className="h-[56px] w-full resize-none rounded border border-gray-300 p-2 outline-none"
                  disabled={!cohortExists}
                />
              </div> */}

              {/* <div>
                <FormInput
                  name="overview"
                  id="overview"
                  type="text"
                  control={form.control}
                  placeholder="Business Analysis Agile Project Management Software Testing May 2024"
                  label={"Session Overview"}
                  labelClass={"mb-2 font-[500] text-[#475367] block text-base"}
                  textarea={true}
                  className="h-[203px] w-full resize-none rounded border border-gray-300 p-2"
                  disabled={!cohortExists}
                />
              </div> */}

              {/* <div className="mb-6">
                <FormInput
                  name="courseContent"
                  type="text"
                  id="courseContent"
                  control={form.control}
                  placeholder="Overview of Project Consulting"
                  label={"Course Content"}
                  labelClass={"mb-2 font-[500] text-[#475367] block text-base"}
                  className="h-[56px] w-full resize-none rounded border border-gray-300 p-2 outline-none"
                  disabled={!cohortExists}
                />
              </div> */}

              {/* <div className="flex space-x-4">
                <div className="flex-1">
                  <FormInput
                    label={"Started from"}
                    className="w-full rounded border border-gray-300 p-2"
                    type="date"
                    control={form.control}
                    name="startedFrom"
                    labelClass={"text-base font-medium font-[500] text-[#475367]"}
                    id="startedFrom"
                    disabled={!cohortExists}
                  />
                </div>
              </div> */}

              {/* ================= ACTIVE FIELDS ================= */}

              <div className="flex w-full space-x-4 pt-6 text-[#475367]">
                {/* Starting Date */}
                <div className="w-full">
                  <FormInput
                    label={"Starting Date from"}
                    className="w-full rounded border border-gray-300 p-2"
                    type="date"
                    control={form.control}
                    name="start_date"
                    labelClass={
                      "text-base font-medium font-[500] text-[#475367]"
                    }
                    id="meetingDate"
                    disabled={!cohortExists}
                  />
                </div>

                {/* Time */}
                <div className="w-full">
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
              </div>

              <div className="flex items-center justify-end gap-6 pt-10">
                <CommonButton
                  type="submit"
                  className="bg-primary-color-600"
                  disabled={!cohortExists || isCreating}
                >
                  {isCreating ? (
                    <span className="min-w-[89.3px]">
                      <ClipLoader size={20} color={"#fff"} />
                    </span>
                  ) : (
                    <span>Create Live Session</span>
                  )}
                </CommonButton>
              </div>
            </form>
          </Form>

          <LiveSessionContent />
        </div>
      </div>
    </div>
  );
};

export default EditLiveSectionForm;
