import Table from "@/Components/Table";
import { useFetchOndemandStudent } from "@/hooks/course-management/on-demand-section/use-fetch-ondemand-student";

import { EllipsisVertical } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";
import StudentPopover from "./StudentPopover";

const OndemandStudentManagementTable = () => {
  const { courseId } = useParams();
  const [queryString] = useSearchParams();

  const courseTitle = queryString.get("title");

  const { data } = useFetchOndemandStudent(courseId);

  return (
    <div>
      <Table cols={"0.5fr 1fr 1.6fr 0.8fr 1.1fr 0.85fr 0.5fr"}>
        <Table.Header className={"gap-1 *:text-sm *:font-medium *:capitalize"}>
          <div>S/N</div>
          <div>Name</div>
          <div>Course Title</div>
          <div>Course Type</div>
          <div>Enrollment Date</div>
          <div>Course Duration</div>
        </Table.Header>
        <div className="divide-y">
          {data?.data?.data?.map((student, i) => (
            <Table.Row className={"gap-2 *:truncate"} key={student.id}>
              <span className="font-poppins text-sm text-[#344054]">
                {i + 1 < 9 ? `0${i + 1}` : i + 1}
              </span>
              <span className="font-poppins text-sm text-[#344054]">
                <span className="block font-poppins text-sm font-medium capitalize text-[#101928]">
                  {student.firstname} {student.lastname}
                </span>
                <span className="font-poppins text-sm text-[#475367]">
                  {student.email}
                </span>
              </span>
              <span className="text-sm text-[#344054]">{courseTitle}</span>

              <span>
                <span className="flex items-center justify-center rounded-full bg-[#FFECE5] px-1 py-px text-sm font-medium text-[#AD3307]">
                  on demand
                </span>
              </span>

              <span>---</span>
              <span>---</span>
              <StudentPopover studentId={student.id}>
                <span className="flex max-w-[32px] items-center justify-center rounded border border-[#E4E7EC] px-[]">
                  <EllipsisVertical className="w-4" />
                </span>
              </StudentPopover>
            </Table.Row>
          ))}
        </div>
      </Table>
    </div>
  );
};

export default OndemandStudentManagementTable;
