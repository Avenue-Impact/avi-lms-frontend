import CourseSection from "@/Components/dashboard/CourseSection";
import CourseVideoSection from "@/Components/dashboard/CourseVideoSection";
import RecordedCourseSection from "@/Components/dashboard/RecordedCourseSection";
import { useViewCourseSections } from "@/hooks/students/use-course-secion-view";
import { useCourseData } from "@/hooks/use-course-data";

function RecordedSessionView({ editButton = false }) {
  const { data } = useCourseData();

  const { sections } = useViewCourseSections();
  return (
    <div className="w-full gap-4 lg:grid lg:grid-cols-[2.8fr_1fr]">
      <CourseVideoSection data={data} />
      <aside
        className={`${sections.mobile === "course sections" ? "block" : "hidden"} rounded-[12px] border border-[#E4E7EC] bg-white px-4 py-6 lg:block`}
      >
        <RecordedCourseSection editButton={editButton} data={data} />
      </aside>
    </div>
  );
}

export default RecordedSessionView;
