import Assignments from "@/Components/admindashboard/course-work-area/Assignments";
import EmptyAssingment from "@/Components/admindashboard/course-work-area/EmptyAssingment";
import { assignment } from "@/lib/assignment";

function CourseWorkAssignment() {
  return (
    <div>{assignment.length < 0 ? <EmptyAssingment /> : <Assignments />}</div>
  );
}

export default CourseWorkAssignment;
