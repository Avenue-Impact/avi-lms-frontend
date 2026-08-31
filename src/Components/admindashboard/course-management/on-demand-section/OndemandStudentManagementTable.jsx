import Table from "@/Components/Table";
import { EllipsisVertical } from "lucide-react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import StudentPopover from "./StudentPopover";

const durationMap = {
  "one": "One Month Access",
  "three": "3 Months Access",
  "six": "6 Months Access",
  "twelve": "Annual Subscription",
  "life time": "Lifetime Access",
};

const formatDate = (dateString, justDate = false) => {
  if (!dateString) return "---";
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = date
    .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    .replace(" ", "");
  return justDate ? formattedDate : `${formattedDate} | ${formattedTime}`;
};

const OndemandStudentManagementTable = ({ data }) => {
  const [queryString] = useSearchParams();

  const courseTitle = queryString.get("title");

  return (
    <div>
      <Table cols={"0.5fr 1.5fr 1.6fr 0.8fr 1.4fr 1.2fr 1.0fr 0.4fr"}>
        <Table.Header className={"gap-1 *:text-sm *:font-medium *:capitalize"}>
          <div>S/N</div>
          <div>Name</div>
          <div>Course Title</div>
          <div>Course Type</div>
          <div>Enrollment Date</div>
          <div>Access Exp</div>
          <div className="text-center">Progress</div>
          <div className="text-center">Action</div>
        </Table.Header>
        <div className="divide-y">
          {data?.map((student, i) => (
            <Table.Row className={"gap-2 *:truncate"} key={student.id}>
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
                  on Demand
                </span>
              </span>

              <span className="text-[14px] text-[#344054]">
                {formatDate(student.created_at)}
              </span>
              <span className="text-[14px] text-[#344054]">
                {student.subscription_expires
                  ? formatDate(student.subscription_expires, true)
                  : durationMap[student.subscription_limit] ||
                    student.subscription_limit ||
                    "---"}
              </span>
              <div className="flex justify-center items-center">
                <Link
                  to={`/admin/certificate/requests/progress/${student.id}`}
                  className="px-3 py-1.5 bg-gray-50 border border-gray-250 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md text-[13px] font-semibold transition-all duration-200 shadow-3xs"
                >
                  View Progress
                </Link>
              </div>
              <div className="flex justify-center">
                <StudentPopover studentId={student.student_id}>
                  <button className="flex h-8 w-8 items-center justify-center rounded border border-[#E4E7EC] hover:bg-gray-50">
                    <EllipsisVertical className="w-4" />
                  </button>
                </StudentPopover>
              </div>
            </Table.Row>
          ))}
        </div>
      </Table>
    </div>
  );
};

export default OndemandStudentManagementTable;
