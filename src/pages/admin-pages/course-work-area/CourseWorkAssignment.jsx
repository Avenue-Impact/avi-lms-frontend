import Assignments from "@/Components/admindashboard/course-work-area/Assignments";
import EmptyAssingment from "@/Components/admindashboard/course-work-area/EmptyAssingment";
import { useFetchAssignments } from "@/hooks/course-work-area/use-fetch-assignments";

import { useParams, useSearchParams } from "react-router-dom";

function CourseWorkAssignment({ data, active }) {
  return (
    <div>
      {data?.data?.data?.recorded_sessions.length < 1 ? (
        <EmptyAssingment />
      ) : (
        <SharedAssignments active={active} />
      )}
    </div>
  );
}

function SharedAssignments({ active }) {
  const [queryString] = useSearchParams();
  const cohortId = queryString.get("cohortId");
  const { courseId } = useParams();
  const { isLoading, data, error } = useFetchAssignments(
    courseId,
    cohortId,
    active,
  );

  if (isLoading) return <p>Loading...</p>;

  if (error)
    return <p>{error.response.data.message ?? "Something went wrong"}</p>;

  console.log("assingments ", data);

  return (
    <div className="">
      <div>
        {data?.data?.data?.assignments.length < 1 ? (
          <EmptyAssingment />
        ) : (
          <Assignments data={data} />
        )}
      </div>
    </div>
  );
}

export default CourseWorkAssignment;
