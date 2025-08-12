import CourseSection from "@/Components/dashboard/CourseSection";
import CourseVideoSection from "@/Components/dashboard/CourseVideoSection";
import LiveSession from "@/Components/dashboard/LiveSession";
import { useViewCourseSections } from "@/hooks/students/use-course-secion-view";
import { useCourseData } from "@/hooks/use-course-data";
import { CourseSectionViewProvider } from "@/providers/course-section-view-provider";

function LiveSessionView({ editButton = false }) {
  const { data } = useCourseData();

  const { sections, session } = useViewCourseSections();
  return (
    <div className="w-full gap-4 lg:grid lg:grid-cols-[2.8fr_1fr]">
      {/* {session === "" && <p>click to show content </p>} */}

      {session === "live" && data?.data?.data?.live_session.time && (
        <LiveSession data={data} />
      )}
      {session === "recorded" && <CourseVideoSection data={data} />}
      <aside
        className={`${sections.mobile === "course sections" ? "block" : "hidden"} rounded-[12px] border border-[#E4E7EC] bg-white px-4 py-6 lg:block`}
      >
        <CourseSection editButton={editButton} data={data} />
      </aside>
    </div>
  );
}

export default LiveSessionView;
