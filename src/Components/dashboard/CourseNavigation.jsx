import React from 'react';
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useFetchCourseNavigation } from "@/hooks/students/use-course-navigation";
import { useViewCourseSections } from "@/hooks/students/use-course-secion-view";
import { useParams } from "react-router-dom";

export const CourseNavigation = ({ cohortId }) => {
  const { courseId } = useParams();
  const { session, videoId, setSession, setVideoId, setVideoUrl, setSectionDetails, setActive } = useViewCourseSections();
  const isLiveSession = session === "live";

  const { data, isLoading } = useFetchCourseNavigation({
    courseId,
    cohortId,
    currentVideoId: videoId,
    isLiveSession,
  });

  const previousCourse = data?.data?.previousCourse;
  const nextCourse = data?.data?.nextCourse;

  const navigateTo = (item) => {
    if (item.id === "live") {
      setSession("live");
      setVideoId("");
      setActive("1"); // Focus Live Sessions "Join" accordion natively
    } else {
      setSession("recorded");
      setVideoId(item.id);
      if (item.section_id) setActive(item.section_id.toString());
      if (item.video_url) {
        setVideoUrl(item.video_url);
      }
      setSectionDetails(prev => ({
        ...prev,
        topic: item.topic || prev.topic,
        section: item.section_no || prev.section,
        videoTitle: item.title,
      }));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLiveSession || isLoading || (!previousCourse && !nextCourse)) return null;

  return (
    <div className="w-full flex items-center justify-between border-t border-gray-200 bg-white py-6 px-4 md:px-8 mt-8 rounded-b-[12px]">
      
      {/* LEFT SECTION (Previous) */}
      <div className="flex-1 flex justify-start">
        {previousCourse && (
          <button 
            onClick={() => navigateTo(previousCourse)}
            className="group flex flex-row-reverse items-center text-left text-ellipsis transition-opacity hover:opacity-80"
          >
            <div className="ml-4 flex flex-col items-start min-w-[120px]">
              <span className="text-[12px] md:text-[14px] text-gray-500 font-medium">{previousCourse.category}</span>
              <span className="text-[14px] md:text-[16px] font-semibold text-gray-900 line-clamp-2 max-w-[200px] text-left">{previousCourse.title}</span>
            </div>
            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#E11D48] flex items-center justify-center text-white shadow-md transition-transform group-hover:-translate-x-1">
              <ArrowLeft size={24} strokeWidth={2} />
            </div>
          </button>
        )}
      </div>

      {/* CENTER SPACER */}
      <div className="hidden sm:flex flex-1"></div>

      {/* RIGHT SECTION (Next) */}
      <div className="flex-1 flex justify-end">
        {nextCourse && (
          <button 
            onClick={() => navigateTo(nextCourse)}
            className="group flex items-center text-right text-ellipsis transition-opacity hover:opacity-80"
          >
            <div className="mr-4 flex flex-col items-end min-w-[120px]">
              <span className="text-[12px] md:text-[14px] text-gray-500 font-medium">{nextCourse.category}</span>
              <span className="text-[14px] md:text-[16px] font-semibold text-gray-900 line-clamp-2 max-w-[200px] text-right">{nextCourse.title}</span>
            </div>
            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#E11D48] flex items-center justify-center text-white shadow-md transition-transform group-hover:translate-x-1">
              <ArrowRight size={24} strokeWidth={2} />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseNavigation;
