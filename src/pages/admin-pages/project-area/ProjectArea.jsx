import ProjectAreaNav from "@/Components/admindashboard/project-area/ProjectAreaNav";
import ProjectEmpty from "./ProjectEmpty";
import { createdCourses } from "@/lib/courses";
import ProjectAreaWithcourse from "./ProjectAreaWithcourse";

function ProjectArea() {
  return (
    <div>
      <ProjectAreaNav title={"Project Area"} />

      {createdCourses.length < 1 ? <ProjectEmpty /> : <ProjectAreaWithcourse />}
    </div>
  );
}

export default ProjectArea;
