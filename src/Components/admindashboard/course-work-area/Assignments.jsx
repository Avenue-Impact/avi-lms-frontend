import Table from "@/Components/Table";
import { CommonButton } from "@/Components/ui/button";
import { useUpdateAssignment } from "@/hooks/course-work-area/use-update-assignment-status";
import { assignment } from "@/lib/assignment";
import { EllipsisVertical } from "lucide-react";
import { FaCheck } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

function formatDateString(dateString) {
  // Create a new Date object from the ISO date string
  const date = new Date(dateString);

  // Define an array of month names
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the month, day, and year
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // Get the hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Determine AM/PM and adjust hours
  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format

  // Construct the formatted date string
  const formattedDate = `${month} ${day}, ${year} ${hours}:${minutes}${amPm}`;

  return formattedDate;
}

function Assignments({ data }) {
  const { mutate, isPending } = useUpdateAssignment();

  const handleStatusUpdate = (courseId, cohortId, section, assignmentId) => {
    mutate({
      courseId,
      cohortId,
      assignmentId,
      section,
      data: {
        status: "reviewed",
      },
    });
  };
  return (
    <>
      <header className="mt-7 flex items-center justify-between px-4 py-5">
        <p className="text-xl text-[#475367]">
          Assignments({data?.data?.data?.assignments.length})
        </p>
        <div className="flex gap-6">
          <div className="flex w-full max-w-[528px] items-center gap-x-4 rounded-md border border-[#D0D5DD] px-4 py-2">
            <label htmlFor="search">
              <IoSearch className="text-xl text-[#667185]" />
            </label>

            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search here..."
              className="w-full placeholder:text-[#667185]"
            />
          </div>
          <CommonButton variant={"outline"}>Filter</CommonButton>
        </div>
      </header>
      <Table cols={"0.5fr 1fr 1.02fr 1.5fr 0.8fr 1fr 1fr"}>
        <Table.Header className={"gap-2 *:text-sm *:font-medium *:capitalize"}>
          <h4>S/N</h4>
          <h4>Name </h4>
          <h4>Filename</h4>
          <h4>additional message</h4>
          <h4>date submitted</h4>
          <h4>documents</h4>
          <h4>status</h4>
        </Table.Header>

        <div className="divide-y">
          {data?.data?.data?.assignments.map((assignment, i) => {
            return (
              <Table.Row key={assignment.id} className={"gap-2 *:text-sm"}>
                <p>{i + 1 < 9 ? `0${i + 1}` : i + 1}</p>
                <p className="*:block">
                  <span className="text-sm font-medium text-[#101928]">
                    {assignment?.student_id?.firstname}{" "}
                    {assignment?.student_id?.lastname}
                  </span>
                  <span className="w-20 overflow-x-hidden truncate text-sm text-[#475367]">
                    {assignment?.student_id?.email}
                  </span>
                </p>
                <p>{assignment?.title}</p>
                <p>{assignment.additional_informations}</p>
                <p>{formatDateString(assignment.created_at)}</p>

                <p>
                  <a
                    href={assignment.file_details?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="text-primary-color-600 underline transition duration-300 ease-in-out hover:text-primary-color-500"
                  >
                    {assignment.file_details?.name}
                  </a>
                </p>

                {assignment.status === "not reviewed" ? (
                  <button
                    role="button"
                    className="flex h-min cursor-pointer items-center justify-center rounded-full bg-primary-color-600 text-white disabled:pointer-events-none disabled:opacity-50"
                    onClick={() =>
                      handleStatusUpdate(
                        assignment.course_id,
                        assignment.cohort_id,
                        assignment.section,
                        assignment.id,
                      )
                    }
                    disabled={isPending}
                  >
                    Not reviewed
                  </button>
                ) : (
                  <span className="flex h-min items-center justify-center space-x-1 rounded-full bg-[#F3FFF7] capitalize text-[#00A92F]">
                    <span>
                      <FaCheck />
                    </span>
                    <span>reviewed</span>
                  </span>
                )}
              </Table.Row>
            );
          })}
        </div>
      </Table>
    </>
  );
}

export default Assignments;
