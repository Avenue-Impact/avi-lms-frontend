import React, { useState, useEffect } from "react";
import certificate from "../../../assets/images/certificate.png";
import AVIbg from "../../../assets/images/live_coaching.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashButton from "@/pages/auth/ButtonDash";
import { useGetAllCohorts } from "@/hooks/course-management/use-fetch-all-cohorts";
import { z } from "zod";
import { useIssueCertificate } from "@/hooks/certificate/use-issue-certificate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import CertificateCohort from "./CertificateCohort";
import { useFetchCourseInfo } from "@/hooks/course-management/use-fetch-course-information";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

const issueCertificate = z.object({
  course_title: z.string().min(2, "Course title is required"),
  issue_date: z.string().min(10, "Issue date is required"),
});

import { useSafeBack } from "@/hooks/use-safe-back";

const CertificateIssue = () => {
  const navigate = useNavigate();
  const goBack = useSafeBack();

  const [selectedCourseType, setSelectedCourseType] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const title = searchParams.get("title") ? decodeURIComponent(searchParams.get("title")) : "";
  const liveSession = searchParams.get("live_session") === "true";
  const onDemand = searchParams.get("on_demand") === "true";

  const { data, isLoading } = useGetAllCohorts(id);
  const { data: courseInfo, isLoading: isCourseInfoLoading } = useFetchCourseInfo(id);
  const courseDetails = courseInfo?.data?.data;

  useEffect(() => {
    if (courseDetails) {
      if (courseDetails.available_course_types?.live_session && !courseDetails.available_course_types?.on_demand) {
        setSelectedCourseType("live class");
      } else if (courseDetails.available_course_types?.on_demand && !courseDetails.available_course_types?.live_session) {
        setSelectedCourseType("on demand");
      }
    } else {
      if (liveSession && !onDemand) {
        setSelectedCourseType("live class");
      } else if (onDemand && !liveSession) {
        setSelectedCourseType("on demand");
      }
    }
  }, [courseDetails, liveSession, onDemand]);

  const { createCert, isPending } = useIssueCertificate(id);

  const form = useForm({
    resolver: zodResolver(issueCertificate),
    defaultValues: {
      course_title: title || "",
      issue_date: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = async (data) => {
    if (!selectedCourseType) {
      alert("Please select a course type");
      return;
    }

    if (selectedCourseType === "live class" && !selectedCourseId) {
      alert("Please select a cohort");
      return;
    }

    if (selectedCourseType === "on demand" && !selectedCourseId) {
      alert("Please select a duration");
      return;
    }

    createCert({
      cohort: selectedCourseId,
      course_title: data.course_title,
      issue_date: data.issue_date,
      course_type: selectedCourseType,
    });
  };

  return (
    <div className="mb-4 mt-5 gap-10 rounded border border-gray-300 p-10 md:mb-0">
      <div className="w-full gap-6 rounded-lg lg:grid lg:grid-cols-12">
        {/* Certificate Image */}
        <div className="col-span-5 mb-4 text-justify md:mb-0">
          <div className="relative">
            <img src={certificate} alt="certificate" className="w-full" />
          </div>

          {/* Certificate Recipient Content */}
          <div className="col-span-7 mb-4 text-justify md:mb-0">
            <div className="relative lg:p-6">
              <h3 className="text-[24px] font-[500]">Certificate Recipient</h3>
              <p className="py-4 text-[15px] italic">
                This certificate certifies that{" "}
                <span className="text-[#F53366]">Maxwell Samantha</span>{" "}
                successfully completed the course{" "}
                <span className="text-[#F53366]">{title}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-7 mb-4 px-16">
          <div className="flex items-start justify-between gap-3 lg:justify-normal">
            <button
              onClick={goBack}
              type="button"
              className="flex items-center gap-1"
            >
              <span className="flex items-center justify-center rounded-sm border-[#E4E7EC] text-base text-black md:h-6 md:w-6 md:border md:text-[10px]">
                <FontAwesomeIcon icon={faArrowLeft} className="m-4" />
              </span>
            </button>
            <p className="font-[700] text-[#101928] lg:text-[20px] 2xl:text-[28px]">
              {title.length > 27 ? title.substring(0, 27) + "..." : title}
            </p>
          </div>

          <div className="py-4">
            <p className="text-[16px] font-[400] text-[#667185]">
              Issue certificates for the live session to all students enrolled
              in the <span className="font-medium 2xl:block">{title}</span>
              {/* <span className="2xl:block">Programme (Bundle).</span> */}
            </p>
          </div>

          {/* Input for course type and cohort/duration */}
          <div className="space-y-5">
            <div>
              <p className="font-[600] text-gray-600 mb-2">
                Select Course Type
              </p>
              <Select 
                value={selectedCourseType} 
                onValueChange={(value) => {
                  setSelectedCourseType(value);
                  setSelectedCourseId(null);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Course Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {(courseDetails?.available_course_types?.live_session ?? liveSession) && (
                      <SelectItem value="live class">Live Session</SelectItem>
                    )}
                    {(courseDetails?.available_course_types?.on_demand ?? onDemand) && (
                      <SelectItem value="on demand">On-Demand</SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {selectedCourseType === "live class" && (
              <div>
                <p className="font-[600] text-gray-600 mb-2">
                  Select cohort to issue certificate
                </p>
                <CertificateCohort
                  selectedCourseId={selectedCourseId}
                  setSelectedCourseId={setSelectedCourseId}
                  cohorts={data}
                  isLoading={isLoading}
                />
              </div>
            )}

            {selectedCourseType === "on demand" && (
              <div>
                <p className="font-[600] text-gray-600 mb-2">
                  Select course duration to print on certificate
                </p>
                <Select 
                  value={selectedCourseId || ""} 
                  onValueChange={(value) => setSelectedCourseId(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Duration" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    <SelectGroup>
                      {(courseDetails?.pricing?.on_demand ?? courseDetails?.pre_recorded_price ?? [])
                        .map((p) => p.duration)
                        .filter(Boolean)
                        .map((duration) => (
                          <SelectItem key={duration} value={duration}>
                            {duration}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="col-span-3">
                  <FormInput
                    label="Course Title"
                    name="course_title"
                    control={form.control}
                    input="text"
                    id="course_title"
                    placeholder="Project Consultant Training Programme (Bundle)"
                    className="w-full rounded border border-gray-300 p-4"
                  />
                </div>

                <div className="flex-1">
                  <FormInput
                    label="Issue Date"
                    name="issue_date"
                    control={form.control}
                    type="date"
                    defaultValue="2024-09-09"
                    id="issue_date"
                    className="w-full rounded border border-gray-300 p-4"
                  />
                </div>

                <div className="mt-5 flex justify-end">
                  <DashButton
                    type="submit"
                    // onClick={() => setModal(true)}
                    className="rounded py-4 text-white"
                    disabled={isPending}
                  >
                    {isPending ? "Issuing Certificate" : "Issue Certificate"}
                  </DashButton>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* {modal && (
        <Modal>
          <BorderCard className="w-2/5 space-x-4 rounded-lg bg-white p-6 shadow-lg">
            <button
              className="float-right text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setModal(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <div className="mt-4 text-center">
              <FontAwesomeIcon
                icon={faCheck}
                className="mb-4 rounded-3xl bg-green-500 p-4 text-[24px] text-white"
              />
              <h2 className="mb-4 text-[20px] font-[600] text-[#23314A]">
                Certificate Issued Successfully
              </h2>
              <p className="mb-6 text-[14px] text-[#98A2B3]">
                You have successfully issued a new certificate
              </p>

              <div className="flex justify-center">
                <CommonButton className="hover:bg-primary-color-700 rounded-md bg-primary-color-600 px-9 py-2 text-white">
                  Ok
                </CommonButton>
              </div>
            </div>
          </BorderCard>
        </Modal>
      )} */}
    </div>
  );
};

export default CertificateIssue;
