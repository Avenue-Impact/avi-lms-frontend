import { FaRegCircleCheck } from "react-icons/fa6";

import AvenueList from "@/Components/Assets/AvenueList";

import iconDark from "../../../../assets/icons/icon-dark.png";
import img from "../../../../assets/images/join_team.png";
import { CommonButton } from "@/Components/ui/button";
import { HiOutlinePencil } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { fetchCourseInformation } from "@/services/api";
import { ClipLoader } from "react-spinners";

// const data = {
//   course: {
//     id: "66ffa21a424d1743f5b173d0",
//     title: "the course title",
//     coverImage:
//       "https://res.cloudinary.com/dttt6lb9g/image/upload/v1728029212/courses/66ffa21a424d1743f5b173d0_xofxee.png",
//     course_includes: "course includes",
//     tools_and_technologies: "the tool and tecnlogy",
//     benefits: "the benefit",
//     program_highlights: "the program",
//     preview_video: "",
//     enrolledSudents: [],
//     enrollmentOptions: [],
//     reviews: [],
//     total_discount: 0,
//     live_class_price: {
//       original_price: {
//         amount: 3333,
//         currency: "Pounds",
//         currency_symbol: "£",
//         price_string: "£ 3333",
//       },
//       discounted_price: {
//         amount: 100,
//         currency: "Pounds",
//         currency_symbol: "£",
//         price_string: "£ 100",
//       },
//       cohort: ["September Cohort 2024"],
//       duration: "mon-fri",
//       time: "3:42pm",
//     },
//     pre_recorded_price: [
//       {
//         duration: "One Month Access",
//         amount: 100,
//         currency: "Pounds",
//         price_string: "£100",
//         currency_symbol: "£",
//         _id: "66fffec9068e6acd2b2f1af0",
//       },
//     ],
//     is_publishe: false,
//     cohorts: ["66fffec9068e6acd2b2f1af3"],
//   },
//   applied: [],
// };

const CourseInfo = ({ editButton = false }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchCourseInformation,
    queryKey: ["get-course-info"],
  });

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
