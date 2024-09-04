import { FaRegCircleCheck } from "react-icons/fa6";

import AvenueList from "@/Components/Assets/AvenueList";

import iconDark from "../../../../assets/icons/icon-dark.png";
import img from "../../../../assets/images/join_team.png";
import { CommonButton } from "@/Components/ui/button";
import { PencilIcon } from "lucide-react";
import { HiOutlinePencil } from "react-icons/hi";

const CourseInfo = ({ editButton = false }) => {
  return (
    <main className="rounded-md border-2 border-[#F0F2F5] p-12 pr-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium text-[#344054]">
          Course Information
        </h2>
        {editButton && (
          <CommonButton variant="outline" className="space-x-2 text-[#667185]">
            <span className="text-lg">
              <HiOutlinePencil />
            </span>
            <span>Edit section</span>
          </CommonButton>
        )}
      </div>
      <main className="mt-8 grid grid-cols-2 gap-9">
        <div className="space-y-9">
          <article>
            <h3 className="mb-[14px] text-xl font-medium text-[#475367]">
              Course Title
            </h3>
            <p className="text-justify text-xl text-[#667185]">
              Business Analysis Agile Project Management Software Testing{" "}
            </p>
          </article>
          <article>
            <h3 className="mb-[14px] text-xl font-medium text-[#475367]">
              Overview
            </h3>
            <p className="text-justify text-[#667185]">
              The 3.5 Months Project Consultant Training Programme (Bundle) is a
              comprehensive and intensive course designed for aspiring project
              consultants who aim to excel in the dynamic field of project
              management. Scheduled to commence in May 2024, this training
              programme equips participants with the essential skills,
              knowledge, and hands-on experience necessary to thrive as project
              consultants in various industries.
            </p>
          </article>
          <article>
            <h3 className="mb-[14px] text-xl font-medium text-[#475367]">
              Tools and Technologies:
            </h3>
            <div className="mb-9 mt-6 space-y-6">
              <AvenueList
                src={iconDark}
                textColor={"#667185"}
                className="items-start text-[16px] font-[300] lg:text-[18px]"
                imgClass={"self-start mt-[6px]"}
              >
                Mastery of project management software (e.g., MS Project, Jira,
                Asana)
              </AvenueList>
              <AvenueList
                src={iconDark}
                textColor={"#667185"}
                className="text-[16px] font-[300] lg:text-[18px]"
              >
                Data analysis and reporting tools
              </AvenueList>
              <AvenueList
                src={iconDark}
                textColor={"#667185"}
                className="text-[16px] font-[300] lg:text-[18px]"
              >
                Emerging technologies in project management
              </AvenueList>
            </div>
          </article>

          <div className="flex gap-6 *:space-y-[14px]">
            <div>
              <h4 className="text-xl font-medium text-[#475367]">
                cover image
              </h4>
              <img
                src={img}
                alt="people sitting around the table"
                className="h-[153px] w-full max-w-[200px] rounded-lg"
              />
            </div>
            <div>
              <h4 className="text-xl font-medium text-[#475367]">
                cover image
              </h4>
              <img
                src={img}
                alt="people sitting around the table"
                className="h-[153px] w-full max-w-[200px] rounded-lg"
              />
            </div>
          </div>
        </div>

        <section>
          <p className="text-xl font-medium capitalize text-[#475367]">
            Benefit
          </p>

          <div className="mt-[14px] space-y-6">
            <AvenueList
              src={iconDark}
              textColor={"#667185"}
              className="text-[16px] font-[300] lg:text-[18px]"
              imgClass={"self-start mt-[6px]"}
            >
              <span className="font-[400]"> Career Advancement:</span> Open
              doors to new career opportunities and promotions.
            </AvenueList>

            <AvenueList
              src={iconDark}
              textColor={"#667185"}
              className="text-[16px] font-[300] lg:text-[18px]"
              imgClass={"self-start mt-[6px]"}
            >
              <span className="font-[400]"> Industry Recognition:</span> Gain
              credibility and recognition as a certified project consultant.
            </AvenueList>

            <AvenueList
              src={iconDark}
              textColor={"#667185"}
              className="text-[16px] font-[300] lg:text-[18px]"
              imgClass={"self-start mt-[6px]"}
            >
              <span className="font-[400]">Networking Opportunities: </span>
              Connect with peers, mentors, and industry experts.
            </AvenueList>

            <AvenueList
              src={iconDark}
              textColor={"#667185"}
              className="text-[16px] font-[300] lg:text-[18px]"
              imgClass={"self-start mt-[6px]"}
            >
              <span className="font-[400]">Lifetime Access:</span> Continue to
              access course materials and updates even after the programme ends.
            </AvenueList>
          </div>
          <div className={"mt-9"}>
            <p className="text-xl font-medium text-[#475367]">overview</p>

            <div className="space-y-3 pt-3 lg:pt-9">
              <div className="flex items-start">
                <span className="mr-2 mt-1">
                  <FaRegCircleCheck className="text-[#667185]" />
                </span>
                <div className="grid lg:grid-cols-[1fr_2fr]">
                  <p className="text-[#3A4C6C]">Format:</p>
                  <p>Blended learning with online and in-person sessions</p>
                </div>
              </div>

              <div className="mt-2 flex items-start">
                <span className="mr-2 mt-1">
                  <FaRegCircleCheck className="text-[#667185]" />
                </span>
                <div className="grid flex-1 lg:grid-cols-[1fr_2fr] lg:gap-1">
                  <p className="text-[#3A4C6C]">Modules:</p>
                  <p>
                    Comprehensive coverage of project management principles,
                    methodologies, and tools
                  </p>
                </div>
              </div>

              <div className="mt-2 flex items-start">
                <span className="mr-2 mt-1">
                  <FaRegCircleCheck className="text-[#667185]" />
                </span>
                <div className="grid flex-1 lg:grid-cols-[1fr_2fr] lg:gap-1">
                  <p className="text-[#3A4C6C]">Expert Instructors:</p>
                  <p>
                    Learn from industry-leading professionals and experienced
                    consultants
                  </p>
                </div>
              </div>

              <div className="mt-2 flex items-start">
                <span className="mr-2 mt-1">
                  <FaRegCircleCheck className="text-[#667185]" />
                </span>
                <div className="grid flex-1 lg:grid-cols-[1fr_2fr] lg:gap-1">
                  <p className="text-[#3A4C6C]">Practical Experience:</p>
                  <p>
                    Real-world projects and case studies to apply learned
                    concepts
                  </p>
                </div>
              </div>

              <div className="mt-2 flex items-start">
                <span className="mr-2 mt-1">
                  <FaRegCircleCheck className="text-[#667185]" />
                </span>
                <div className="grid flex-1 lg:grid-cols-[1fr_2fr] lg:gap-1">
                  <p className="text-[#3A4C6C]">Certification:</p>
                  <p>
                    Earn a recognized certification upon successful completion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </main>
  );
};

export default CourseInfo;
