import { formatDate } from "@/lib/format-date";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { CommonButton } from "../ui/button";
import { MobileContent } from "./MobileContent";
import { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useViewCourseSections } from "@/hooks/students/use-course-secion-view";

function LiveSession({ data }) {
  const [queryString] = useSearchParams();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { setSession } = useViewCourseSections();

  const [isActive, setIsActive] = useState(false);

  const {
    title,
    description,
    password,
    start_time,
  } = data?.data?.course_detail?.live_session ?? {};

  // Example logic to determine if session is active 
  // (In real scenario, compare current time with start/end_date)
  useEffect(() => {
    // For now, if we have time, we can mimic active state based on data or keep it simple.
    // If it's a test, you could set setIsActive based on time.
    setIsActive(true); 
  }, []);

  return (
    <div className="mb-6 flex flex-col justify-between h-full min-h-[75vh]">
      <div>
        <div className="pb-4">
          <p className="text-sm md:text-base font-normal text-tertiary-color-700">
            Join Live Sessions
          </p>
        </div>
        <section className="mt-2 md:mt-4">
          <h2 className="text-3xl md:text-[40px] font-bold capitalize text-[#111827] leading-tight md:leading-[1.2]">
            {title || "Business AnalysisLive Session"}
          </h2>
          <p className="mt-4 md:mt-6 text-base md:text-[18px] font-normal text-[#374151]">
            {description || "Become a Business Analyst/Agile Consultant (Live Session)"}
          </p>
          <div className="mt-8 space-y-4">
            <p className="text-sm md:text-base text-[#374151]">
              <span className="font-bold text-[#111827]">Started From:</span> {start_time ? formatDate(start_time, true) : "November 12, 2025"}
            </p>
            <p className="text-sm md:text-base text-[#374151]">
              <span className="font-bold text-[#111827]">Meeting Date:</span> {start_time ? formatDate(start_time, true) : "January 15, 2026"}
            </p>
            <p className="text-sm md:text-base text-[#374151]">
              <span className="font-bold text-[#111827]">Add to:</span>{" "}
              <a href="#" className="text-primary-color-600 hover:underline">Google Calendar</a>,{" "}
              <a href="#" className="text-primary-color-600 hover:underline">iCal Export</a>
            </p>
          </div>

          <div className="mt-8">
            {isActive ? (
              <CommonButton
                className="rounded-md bg-[#111827] px-6 py-6 text-base font-medium text-white hover:bg-gray-800 w-full sm:w-auto"
                onClick={() =>
                  navigate(
                    `/user/meeting/${courseId}?cohortId=${
                      data?.data?.course_detail?.live_session?.cohort_id
                    }&title=${queryString.get("title")}`,
                  )
                }
              >
                Join Meeting Now
              </CommonButton>
            ) : (
              <button
                disabled
                className="rounded-md bg-[#DFDDDF] px-6 py-4 text-base font-bold text-[#111827] w-full sm:w-auto"
              >
                Meeting hasn’t Started Yet
              </button>
            )}
          </div>
        </section>
      </div>

      <div className="mt-auto pt-16 md:pt-24 flex items-end justify-end">
        <div className="flex items-center gap-3 text-right">
          <div>
            <p className="text-[10px] md:text-xs text-[#6B7280]">Business Analyst Recordings</p>
            <h4 className="text-xs md:text-sm font-bold text-[#111827] mt-1 max-w-[200px] md:max-w-[400px]">
              21 July 2025 Introduction to Business Analysis (Taster Session Recording) <br className="hidden md:block"/>Plus Success Stories
            </h4>
          </div>
          <button 
             onClick={() => setSession("recorded")}
             className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#E11D48] text-white hover:bg-rose-700 shrink-0">
            <IoIosArrowForward size={24} />
          </button>
        </div>
      </div>

      {/* Mobile nav removed to match Figma layout, which uses overlay grid menu */}
      <div className="invisible h-0">
        <MobileContent data={data} />
      </div>
    </div>
  );
}

export default LiveSession;
