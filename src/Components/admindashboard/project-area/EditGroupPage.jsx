import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CourseProjectArea from "./CourseProjectArea";
import { useState } from "react";
import { cn } from "@/lib/utils";
import GroupCourseProjectArea from "./group/GroupCourseProjectArea";
import { useGetSingleProjectGroup } from "@/hooks/project-area-groups/use-fetch-single-project-group";
import CourseTools from "./CourseTools";
import GroupCourseTools from "./group/GroupCourseTools";
import GroupStudentManagement from "./group/GroupStudentManagement";

const EditGroupPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(1);

  const { courseId, groupId } = useParams();

  const [queryString] = useSearchParams();
  const cohortId = queryString.get("cohortId");
  const { data, isLoading, error } = useGetSingleProjectGroup(
    courseId,
    cohortId,
    groupId,
  );

  if (isLoading) return <p>Loading...</p>;

  if (error) {
    return <p>{error?.response?.data?.message ?? "something went wrong"}</p>;
  }

  console.log(data);
  return (
    <section>
      <div className="my-12 flex items-center gap-3">
        <button
          className="flex items-center gap-4"
          onClick={() => navigate(-1)}
        >
          <span className="rounded-sm border border-[#E4E7EC] px-[9px] py-[7.7px]">
            <FaArrowLeft />
          </span>
          <span className="capitalize text-[#667185]">Go back</span>
        </button>
        <h2 className="text-2xl font-medium text-[rgb(52,64,84)]">
          {queryString.get("team") ?? "No team Selected"}
        </h2>
      </div>
      <div className="w-max border-b border-b-[#E4E7EC]">
        <ul className="flex items-center gap-4 *:capitalize">
          <li
            className={cn(
              "after:contents-[''] relative h-full cursor-pointer py-4 text-sm font-medium capitalize text-[#344054] transition-colors duration-150 *:capitalize after:absolute after:-bottom-[2px] after:left-0 after:m-auto after:h-[2px] after:w-0 after:bg-primary-color-600 after:transition-all after:duration-150 hover:text-primary-color-600 hover:after:w-full",
              tab == 1 ? "text-primary-color-600 after:w-full" : "",
            )}
            onClick={() => setTab(1)}
          >
            <span>course project area</span>
          </li>
          <li
            className={cn(
              "after:contents-[''] relative h-full cursor-pointer py-4 text-sm font-medium capitalize text-[#344054] transition-colors duration-150 *:capitalize after:absolute after:-bottom-[2px] after:left-0 after:m-auto after:h-[2px] after:w-0 after:bg-primary-color-600 after:transition-all after:duration-150 hover:text-primary-color-600 hover:after:w-full",
              tab == 2 ? "text-primary-color-600 after:w-full" : "",
            )}
            onClick={() => setTab(2)}
          >
            <span>Course Tools & Resources</span>
          </li>
          <li
            className={cn(
              "after:contents-[''] relative h-full cursor-pointer py-4 text-sm font-medium capitalize text-[#344054] transition-colors duration-150 *:capitalize after:absolute after:-bottom-[2px] after:left-0 after:m-auto after:h-[2px] after:w-0 after:bg-primary-color-600 after:transition-all after:duration-150 hover:text-primary-color-600 hover:after:w-full",
              tab == 3 ? "text-primary-color-600 after:w-full" : "",
            )}
            onClick={() => setTab(3)}
          >
            <span>Student Management</span>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        {tab === 1 && <GroupCourseProjectArea />}
        {tab === 2 && <GroupCourseTools />}
        {tab === 3 && <GroupStudentManagement />}
      </div>
    </section>
  );
};

export default EditGroupPage;
