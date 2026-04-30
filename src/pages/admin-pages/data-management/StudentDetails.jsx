import BorderCard from "@/Components/BorderCard";
import Table from "@/Components/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { CommonButton } from "@/Components/ui/button";
import { useFetchStudentEnrollmentStats } from "@/hooks/data-management/use-fetch-student-enrollment-stats";
import { useDeleteStudent } from "@/hooks/data-management/use-delete-student";
import { ClipLoader } from "react-spinners";

function formatDateString(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date)) return "Invalid Date";

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${month} ${day}, ${year} ${hours}:${minutes}${amPm}`;
}

const StudentDetails = ({ studentId, onBack }) => {
  const { data, isLoading, error } = useFetchStudentEnrollmentStats(studentId);
  const { mutate: deleteStudent, isPending: isDeleting } = useDeleteStudent();

  if (isLoading) return <div className="flex h-40 items-center justify-center"><ClipLoader color="#667185" /></div>;
  if (error) return <p className="text-red-500 text-center mt-10">Error loading student details</p>;

  const student = data?.data?.data?.student_details;
  const enrollments = data?.data?.data?.enrollments || [];

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this student? This action cannot be undone.")) {
      deleteStudent(studentId, {
        onSuccess: () => {
          onBack();
        }
      });
    }
  };
  
  return (
    <div>
      <div className="flex justify-end mt-4">
        <CommonButton
          className="flex items-center gap-2 bg-gray-500"
          onClick={onBack}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </CommonButton>
      </div>

      <BorderCard className="mt-10 grid grid-cols-[1.5fr_4fr] rounded-xl border-2 border-[#F0F2F5] px-[28px] py-12">
        
        
        
        <div>
          <Avatar className="h-[120px] w-[120px]">
            <AvatarImage src={student?.avatar} alt="Student Avatar" />
            <AvatarFallback className="text-[50px]">
              {student?.firstname?.charAt(0).toUpperCase()}
              {student?.lastname?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="my-2 text-2xl font-medium capitalize text-[#344054]">
            {student?.firstname} {student?.lastname}
          </p>
          <div className="space-y-1 *:text-sm *:text-[#667185]">
            <p>{student?.email} </p>
            <p>Joined: {formatDateString(student?.createdAt || student?.created_at)}</p>
          </div>
        <CommonButton
          className="flex items-center gap-2 mt-8"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? <ClipLoader size={18} color="#fff" /> : <><FontAwesomeIcon icon={faTrash} /> Delete Student</>}
        </CommonButton>
        </div>

        <div>
          {enrollments.length > 0 ? (
            <Table cols={"0.5fr 2fr 1.3fr 1fr 1.2fr"}>
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
                    <p className="text-[#344054]">{details.course?.title || "N/A"}</p>
                    <p>
                      <span className="w-min text-nowrap rounded-[12px] bg-[#FFECE5] px-3 py-[2px] text-xs font-medium capitalize text-[#AD3307]">
                        {details.course_type}
                      </span>
                    </p>
                    <p className="text-[#344054]">{formatDateString(details.created_at)}</p>
                    <p className="text-[#344054]">{details.course_duration || "N/A"}</p>
                  </Table.Row>
                ))}
              </div>
            </Table>
          ) : (
            <div className="flex h-full items-center justify-center p-10 bg-gray-50 rounded-xl min-h-[200px]">
              <p className="text-gray-500 font-medium italic text-center">This student has no enrollments yet.</p>
            </div>
          )}
        </div>
      </BorderCard>
    </div>
  );
};

export default StudentDetails;
