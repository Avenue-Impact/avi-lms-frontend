import CourseSection from "@/Components/dashboard/CourseSection";
import CourseVideoSection from "@/Components/dashboard/CourseVideoSection";
import LiveSession from "@/Components/dashboard/LiveSession";
import { useViewCourseSections } from "@/hooks/students/use-course-secion-view";
import { useCourseData } from "@/hooks/use-course-data";
import { CourseSectionViewProvider } from "@/providers/course-section-view-provider";
import { VideoOff } from "lucide-react";
import CourseNavigation from "@/Components/dashboard/CourseNavigation";

function LiveSessionView({ editButton = false }) {
  const { data } = useCourseData();

  const { sections, session } = useViewCourseSections();
  return (
    <div className="w-full gap-4 lg:grid lg:grid-cols-[2.8fr_1fr]">
      <main className="w-full">
        {/* {session === "" && <p>click to show content </p>} */}

        {session === "live" &&
          (data?.data?.course_detail?.live_session ? (
            <LiveSession data={data} />
          ) : (
            <div className="flex h-full min-h-[60vh] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-8 text-center text-gray-500">
              <VideoOff
                className="mb-4 h-16 w-16 text-gray-400 opacity-60"
                strokeWidth={1.5}
              />
              <h3 className="mb-2 text-xl font-semibold text-gray-700">
                No Live Session Scheduled
              </h3>
              <p className="max-w-md text-sm text-gray-500">
                There is currently no live session scheduled for this section.
                Please check back later.
              </p>
            </div>
          ))}
        {session === "recorded" && <CourseVideoSection data={data} />}
        
        <div className="col-span-full">
          <CourseNavigation cohortId={data?.data?.data?.cohort_id} />
        </div>
      </main>

      <aside
        className={`${sections.mobile === "course sections" ? "fixed inset-0 z-50 bg-white lg:relative lg:inset-auto lg:z-auto" : "hidden"} h-full w-full overflow-y-auto rounded-none border-none bg-white px-4 py-6 lg:block lg:h-auto lg:w-auto lg:rounded-[12px] lg:border lg:border-[#E4E7EC]`}
      >
        <CourseSection editButton={editButton} data={data} />
      </aside>
    </div>
  );
}

export default LiveSessionView;
