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
      <main className="mt-8 grid grid-cols-1 gap-9 lg:grid-cols-2">
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
              Course Visibility
            </h3>
            <p className="text-justify text-xl text-[#667185]">
              {data?.data?.data.course.is_private ? "Non-Public (Hidden from catalog)" : "Public (Appears in catalog and search)"}
            </p>
          </article>
          <article>
            <h3 className="mb-[14px] text-xl font-medium text-[#475367]">
              Overview
            </h3>
            <p className="text-justify capitalize text-[#667185] break-words">
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
                      <li className="list-none normal-case break-words">{tool}</li>{" "}
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

          <div className="flex gap-4 mt-8">
            <div className="flex-1">
              <h4 className="text-xl font-medium text-[#475367] mb-4">
                Cover Image
              </h4>
              <img
                src={data?.data?.data.course.cover_image ?? img}
                alt="Course cover"
                className="h-[120px] w-full object-cover rounded-lg border border-gray-200"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-medium text-[#475367] mb-4">
                Video Preview
              </h4>
               <div className="h-[120px] w-full bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 relative overflow-hidden">
                    <img
                        src={data?.data?.data.course.cover_image ?? img}
                        alt="Video Thumbnail"
                        className="absolute inset-0 w-full h-full object-cover opacity-50 blur-[2px]"
                    />
                    <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center z-10 shadow-sm">
                         <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 6.40192C13.1667 6.78682 13.1667 7.74907 12.5 8.13397L3.5 13.3301C2.83333 13.715 2 13.2339 2 12.4641L2 2.0718C2 1.30199 2.83333 0.820869 3.5 1.20577L12.5 6.40192Z" fill="#344054"/>
                        </svg>
                    </div>
               </div>
            </div>
          </div>
        </div>

        <section>
          <p className="text-xl font-medium capitalize text-[#475367] mb-4">
            Benefits:
          </p>
          <div className="space-y-4">
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
          </div>

          <div className={"mt-9"}>
            <p className="text-xl font-medium text-[#475367] mb-4">
              Overview
            </p>

            <div className="space-y-4">
                {data?.data?.data?.course?.program_highlights.map(
                (highlight, index) => (
                    <AvenueList
                    key={index}
                    src={iconDark}
                    textColor={"#667185"}
                    className="items-start text-[16px] font-[300] lg:text-[18px] break-words"
                    imgClass={"self-start mt-[6px]"}
                    >
                    <ul className="break-words">
                        <li className="list-none normal-case break-words">{highlight}</li>
                    </ul>
                    </AvenueList>
                ),
                )}
            </div>
          </div>
        </section>
      </main>
    </main>
  );
};

export default CourseInfo;
