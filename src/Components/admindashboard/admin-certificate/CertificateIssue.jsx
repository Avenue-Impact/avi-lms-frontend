import React, { useState } from "react";
import certificate from "../../../assets/images/certificate.png";
import AVIbg from "../../../assets/images/live_coaching.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { CertificateCohort } from "./CertificateCohort";
import DashButton from "@/pages/auth/ButtonDash";
// import Modal from "@/pages/auth/components/Modal";
// import BorderCard from "@/Components/BorderCard";
// import { CommonButton } from "@/Components/ui/button";
import { useGetAllCohorts } from "@/hooks/course-management/use-fetch-all-cohorts";
import { z } from "zod";
import { useIssueCertificate } from "@/hooks/certificate/use-issue-certificate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/Components/ui/form";
import FormInput from "@/Components/ui/form-input";
import CertificateCohort from "./CertificateCohort";

const issueCertificate = z.object({
  course_title: z.string().min(2, "Course title is required"),
  issue_date: z.string().min(10, "Issue date is required"),

});

const CertificateIssue = () => {
  const navigate = useNavigate();
  
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const title = searchParams.get("title");
  

  const { data, isLoading } = useGetAllCohorts(id);
  

  const { createCert, isPending } = useIssueCertificate(id);

  const form = useForm({
    resolver: zodResolver(issueCertificate),
    defaultValues: {
      course_title: "",
      issue_date: "",
    },
  });

  const onSubmit = async (data) => {
      if (!selectedCourseId) {
        alert("Please select a course");
        return;
      }

    createCert({
      cohort: selectedCourseId,
      course_title: data.course_title,
      issue_date: data.issue_date,
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
                successfully completed the course
                <span className="text-[#F53366]">
                  "Project Consultant Training Programme (Bundle)"
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-7 mb-4 px-16">
          <div className="flex items-start justify-between gap-3 lg:justify-normal">
            <button
              onClick={() => navigate(-1)}
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
              Issue certificates for the live session to all students
              <span className="2xl:block">
                enrolled in the Project Consultant Training
              </span>
              <span className="2xl:block">Programme (Bundle).</span>
            </p>
          </div>

          {/* Input for cohort  */}
          <div className="space-y-5">
            <div className="">
              <p className="font-[600] text-gray-600">
                Select cohort to issue certificate
              </p>
              <CertificateCohort
                selectedCourseId={selectedCourseId}
                setSelectedCourseId={setSelectedCourseId}
                cohorts={data}
                isLoading={isLoading}
              />
            </div>

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
