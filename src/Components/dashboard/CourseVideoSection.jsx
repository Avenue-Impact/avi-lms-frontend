import { useViewCourseSections } from "@/hooks/students/use-course-secion-view";
import { useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "@/Components/VideoPlayer";
import joinTeamImage from "@/assets/images/join_team.png";
import CourseNavigation from "@/Components/dashboard/CourseNavigation";

function CourseVideoSection({ data }) {
  const { sectionDetails, videoUrl, videoId } = useViewCourseSections();
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState("assignment");

  return (
    <section className="relative flex h-auto flex-col">
      <div className="mb-3 text-center md:text-left">
        <p className="mb-2 text-lg text-gray-500">
          Section {sectionDetails?.section} {sectionDetails?.topic}
        </p>
        <h1 className="text-2xl font-bold leading-tight text-[#111827] md:text-3xl lg:text-4xl">
          {sectionDetails?.videoTitle ||
            "21 Jul 2025 Introduction to Business Analysis (Taster Session Recording Plus Success Stories)"}
        </h1>
      </div>
      <div className="mb-8 w-full max-w-[1020px] overflow-hidden rounded-[10px]">
        {videoId && videoUrl ? (
          <VideoPlayer
            key={videoId}
            videoId={videoId}
            courseId={courseId}
            videoUrl={videoUrl}
            coverImage={data?.data?.course_detail?.cover_image || data?.data?.data?.cover_image || joinTeamImage}
          />
        ) : (
          <div className="flex aspect-video w-full items-center justify-center bg-gray-200">
            <p className="text-gray-500">No video selected</p>
          </div>
        )}
      </div>
      <CourseNavigation cohortId={data?.data?.data?.cohort_id} />
    </section>
  );
}

export default CourseVideoSection;
