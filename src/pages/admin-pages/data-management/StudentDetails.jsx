import BorderCard from "@/Components/BorderCard";
import Table from "@/Components/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { CommonButton } from "@/Components/ui/button";
import { useFetchStudentEnrollmentStats } from "@/hooks/data-management/use-fetch-student-enrollment-stats";
// import { studentDetails } from "@/lib/allStudent";

function formapateString(dateString) {
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

const StudentDetails = ({ studentId, onBack }) => {
  const { data, isLoading, error } = useFetchStudentEnrollmentStats(studentId);
  console.log("The student data", data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading student details</p>;

  const student = data?.data?.data?.student_details;
  console.log("Find the student details", student);

  const enrollments = data?.data?.data?.enrollments;
  console.log("Find the student enrollment", enrollments);


  // const studentEnrollments = enrollments.find((enrollment) => enrollment.id !== studentId);

  // const joinedDate = studentEnrollments.created_at;
  // console.log("The data student join the course", joinedDate);

  // console.log("Find the student enrollment", studentEnrollments);
  
  return (
    <div>
      <div className="flex justify-end">
        <CommonButton
          className="mt-4 flex items-center gap-2 bg-gray-500"
          onClick={onBack}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </CommonButton>
      </div>

      <BorderCard className="mt-10 grid grid-cols-[1.5fr_4fr] rounded-xl border-2 border-[#F0F2F5] px-[28px] py-12">
        
        
        
        <div>
          <Avatar className="h-[120px] w-[120px]">
            <AvatarImage src={student?.avatar} alt="@shadcn" />
            <AvatarFallback className="text-[50px]">
              {student?.firstname
                ? student.firstname.charAt(0).toUpperCase()
                : ""}
              {student?.lastname
                ? student.lastname.charAt(0).toUpperCase()
                : ""}
            </AvatarFallback>
          </Avatar>
          <p className="my-2 text-2xl font-medium capitalize text-[#344054]">
            {/* Emery Torff */}
            {student?.firstname} {student?.lastname}
          </p>
          <div className="space-y-1 *:text-sm *:text-[#667185]">
            <p>{student?.email} </p>
            <p>{student?.createdAt ?? "Date not available"}</p>
          </div>
        </div>

        <Table cols={"0.5fr 2fr 1.3fr 1fr 1.2fr"} cla>
          <Table.Header className={"*:text-sm *:font-medium *:capitalize"}>
            <h4>S/N</h4>
            <h4>Course Title</h4>
            <h4>Course Type</h4>
            <h4>Date Enrolled</h4>
            <h4>Course Duration</h4>
          </Table.Header>
          <div className="divide-y">
            {enrollments.map((details, i) => (
              <Table.Row key={i} className={"*:px-1 *:text-sm"}>
                <p className="text-[#344054]">{i + 1}</p>
                <p className="text-[#344054]">{details.course.title}</p>
                <p>
                  <span className="w-min text-nowrap rounded-[12px] bg-[#FFECE5] px-3 py-[2px] text-xs font-medium capitalize text-[#AD3307]">
                    {details.course_type}
                  </span>
                </p>
                <p className="text-[#344054]">{formapateString(details.created_at) ?? "N/A"}</p>
                <p className="text-[#344054]">{details.course_duration}</p>
              </Table.Row>
            ))}
          </div>
        </Table>
      </BorderCard>
    </div>
  );
};

export default StudentDetails;
