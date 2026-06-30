import LiveSessionStudentDeletePopover from "@/Components/admindashboard/course-management/live-session/LiveSessionStudentDeletePopover";
import Table from "@/Components/Table";
import { EllipsisVertical } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const formatDate = (dateString, justDate=false) => {
  if (!dateString) return "---";
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).replace(' ', '');
  return justDate ? formattedDate : `${formattedDate} | ${formattedTime}`;
};

const CourseTable = ({ data }) => {
  const [queryString] = useSearchParams();

  const courseTitle = queryString.get("title");
  const cohortName = queryString.get("cohort");
  return (
    <div className="overflow-x-auto">
      <Table cols={"0.5fr 1.5fr 1.6fr 0.8fr 1.4fr 1.2fr 0.4fr"}>
        <Table.Header className={"gap-1 *:text-sm *:font-medium *:capitalize"}>
          <div>S/N</div>
          <div>Name</div>
          <div>Course Title</div>
          <div>Course Type</div>
          <div>Enrollment Date</div>
          <div>Course Duration</div>
          <div className="text-center">Action</div>
        </Table.Header>
        <div className="divide-y">
          {data?.map((student, i) => (
            <Table.Row className={"gap-x-2 *:truncate"} key={student.id}>
              <span className="font-poppins text-sm text-[#344054]">
                {i + 1 < 10 ? `0${i + 1}` : i + 1}
              </span>
              <span className="font-poppins text-sm text-[#344054]">
                <span className="block font-poppins text-[14px] font-[500] capitalize text-[#101928]">
                  {student.first_name} {student.last_name}
                </span>
                <span className="font-poppins text-[12px] text-[#475367]">
                  {student.email}
                </span>
              </span>
              <span className="text-[14px] text-[#344054]">{courseTitle}</span>

              <span>
                <span className="flex items-center justify-center rounded-full bg-[#FFECE5] px-2 py-1 text-[12px] font-[500] text-[#AD3307] w-fit">
                  Live session
                </span>
              </span>

              <span className="text-[14px] text-[#344054]">{formatDate(student.created_at)}</span>
              <span className="text-[14px] text-[#344054]">
                {student.access_expires_at ? formatDate(student.access_expires_at, true) : "---"}
              </span>
              <div className="flex justify-center">
                <LiveSessionStudentDeletePopover id={student.id} studentId={student.student_id}>
                  <button className="flex h-8 w-8 items-center justify-center rounded border border-[#E4E7EC] hover:bg-gray-50">
                    <EllipsisVertical className="w-4" />
                  </button>
                </LiveSessionStudentDeletePopover>
              </div>
            </Table.Row>
          ))}
        </div>
      </Table>
    </div>
  );
};

export default CourseTable;
