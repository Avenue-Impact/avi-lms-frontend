import ProjectAreaNav from "@/Components/admindashboard/project-area/ProjectAreaNav";
import ProjectEmpty from "./ProjectEmpty";
import { createdCourses } from "@/lib/courses";
import ProjectAreaWithcourse from "./ProjectAreaWithcourse";
import { useFetchAllAdminCourses } from "@/hooks/course-management/use-fetch-all-courses";

function ProjectArea() {
  return (
    <div>
      <ProjectAreaNav title={"Project Area"} />

      <ProjectAreaBody />
    </div>
  );
}

const ProjectAreaBody = () => {
  const { data, isLoading, error } = useFetchAllAdminCourses(1, 10, true);

  if (isLoading) return <p>Loading....</p>;

  if (error) {
    return <p>{error?.response?.data?.message ?? "something went wrong!"}</p>;
  }
  return (
    <>
      {data.data.data.courses.length < 1 ? (
        <ProjectEmpty />
      ) : (
        <ProjectAreaWithcourse data={data} />
      )}
    </>
  );
};

export default ProjectArea;
