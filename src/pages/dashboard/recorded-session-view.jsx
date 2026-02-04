import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CourseVideoSection from "@/Components/dashboard/CourseVideoSection";
import RecordedCourseSection from "@/Components/dashboard/RecordedCourseSection";
import { useViewCourseSections } from "@/hooks/students/use-course-secion-view";
import { useCourseData } from "@/hooks/use-course-data";

function RecordedSessionView({ editButton = false }) {
  const { data } = useCourseData();
  const { sections } = useViewCourseSections();
  const navigate = useNavigate();

  return (
    <div className="w-full space-y-6">
      <div className="w-full gap-6 lg:grid lg:grid-cols-[3fr_1.2fr]">
        <CourseVideoSection data={data} />
        <aside
          className={`${sections.mobile === "course sections" ? "block" : "hidden"} lg:block`}
        >
          <RecordedCourseSection editButton={editButton} data={data} />
        </aside>
      </div>
    </div>
  );
}

export default RecordedSessionView;
