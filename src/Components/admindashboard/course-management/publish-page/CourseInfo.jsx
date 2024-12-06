import AvenueList from "@/Components/Assets/AvenueList";

import { CommonButton } from "@/Components/ui/button";
import { useFetchCourseInfo } from "@/hooks/course-management/use-fetch-course-information";
import { HiOutlinePencil } from "react-icons/hi";
import { ClipLoader } from "react-spinners";
import iconDark from "../../../../assets/icons/icon-dark.png";
import img from "../../../../assets/images/join_team.png";
import EditModal from "../on-demand-section/EditModal";
import EditCourseInformationForm from "../courses/EditCourseInformationForm";
import { useState } from "react";

const CourseInfo = ({ editButton = false, courseId }) => {
  const [onOpenChange, setOnOpenChange] = useState(false);

  const { data, isLoading, isError } = useFetchCourseInfo(courseId);

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <ClipLoader color="#CC1747" />
      </div>
    );

  if (isError) return <div>error ....</div>;
  console.log(data?.data?.data?.course?.tools_and_technologies);

  return (
    <main className="rounded-md border-2 border-[#F0F2F5] p-12 pr-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium text-[#344054]">
          Course Information
        </h2>
        {editButton && (
          <EditModal
            open={onOpenChange}
            setOpen={setOnOpenChange}
            header="Edit course Information"
            form={
              <EditCourseInformationForm
                courseInformation={data?.data?.data?.course}
                setOnOpenChange={setOnOpenChange}
              />
            }
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
      <main className="mt-8 grid grid-cols-2 gap-9">
        <div className="space-y-9">
          <article>
            <h3 className="mb-[14px] text-xl font-medium text-[#475367]">
              Course Title
            </h3>
            <p className="text-justify text-xl text-[#667185]">
              {data?.data?.data.course.title}
            </p>
          </article>
          <article>
            <h3 className="mb-[14px] text-xl font-medium text-[#475367]">
              Overview
            </h3>
            <p className="text-justify capitalize text-[#667185]">
              {data?.data?.data.course.overview}
            </p>
          </article>
          <article>
            <h3 className="mb-[14px] text-xl font-medium text-[#475367]">
              Tools and Technologies:
            </h3>
            <div className="mb-9 mt-6 space-y-6">
              {data?.data?.data?.course?.tools_and_technologies?.map(
                (tool, index) => (
                  <AvenueList
                    key={index} // Use combined index for unique key
                    src={iconDark}
                    textColor={"#667185"}
                    className="items-start text-[16px] font-[300] lg:text-[18px]"
                    imgClass={"self-start mt-[6px]"}
                  >
                    <ul>
                      <li className="list-none normal-case">{tool}</li>{" "}
                      {/* Trim spaces */}
                    </ul>
                  </AvenueList>
                ),
              )}

              {/* <AvenueList
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
              </AvenueList> */}
            </div>
          </article>

          <div className="flex gap-6 *:space-y-[14px]">
            <div>
              <h4 className="text-xl font-medium text-[#475367]">
                Cover Image
              </h4>
              <img
                src={data?.data?.data.course.cover_image ?? img}
                alt="people sitting around the table"
                className="h-[153px] w-full max-w-[200px] rounded-lg"
              />
            </div>
            {/* <div>
              <h4 className="text-xl font-medium text-[#475367]">
                Cover Image
              </h4>
              <img
                src={img}
                alt="people sitting around the table"
                className="h-[153px] w-full max-w-[200px] rounded-lg"
              />
            </div> */}
          </div>
        </div>

        <section>
          <p className="text-xl font-medium capitalize text-[#475367]">
            Benefit
          </p>
          {data?.data?.data.course.benefits.map((benefit, index) => (
            <AvenueList
              key={index}
              src={iconDark}
              textColor={"#667185"}
              className="items-start text-[16px] font-[300] lg:text-[18px]"
              imgClass={"self-start mt-[6px]"}
            >
              <ul>
                <li className="list-none normal-case">{benefit}</li>
              </ul>
            </AvenueList>
          ))}

          <div className={"mt-9"}>
            <p className="text-xl font-medium text-[#475367]">
              Program Highlights
            </p>

            {data?.data?.data?.course?.program_highlights.map(
              (highlight, index) => (
                <AvenueList
                  key={index}
                  src={iconDark}
                  textColor={"#667185"}
                  className="items-start text-[16px] font-[300] lg:text-[18px]"
                  imgClass={"self-start mt-[6px]"}
                >
                  <ul>
                    <li className="list-none normal-case">{highlight}</li>
                  </ul>
                </AvenueList>
              ),
            )}
          </div>
        </section>
      </main>
    </main>
  );
};

export default CourseInfo;
