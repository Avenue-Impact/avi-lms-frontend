import CourseSection from "@/Components/dashboard/CourseSection";
import CourseVideoSection from "@/Components/dashboard/CourseVideoSection";
import LiveSession from "@/Components/dashboard/LiveSession";
import { useCourseData } from "@/hooks/use-course-data";
import { createContext, useState } from "react";

export const DocumentContext = createContext();

function ShareDocument({ editButton = false }) {
  const [session, setSession] = useState("live");
  const [sectionDetails, setSectionDetails] = useState({
    section: "",
    topic: "",
  });

  const [sectionActive, setSectionActive] = useState(2);

  const [videoId, setVideoId] = useState("");

  const [sections, setSections] = useState({
    mobile: "course sections",
    desktop: "share documents",
  });
  const { data } = useCourseData();
  // const { data, isLoading, error } = useViewEnrolledCourse(courseId);
  // useEffect(() => {
  //   const updateQuery = (key, value) => {
  //     const newParams = new URLSearchParams(searchParams);
  //     newParams.set(key, value);
  //     setSearchParams(newParams);
  //   };
  //   if (data) {
  //     updateQuery("cohortId", data?.data?.data?.cohort_id ?? "");
  //   }
  // }, [data, searchParams, setSearchParams]);

  // if (isLoading) return <p>Loading...</p>;
  // if (error)
  //   return <p>{error?.response?.data?.message ?? "Something Went wrong!!!"}</p>;

  return (
    <DocumentContext.Provider
      value={{
        session,
        setSession,
        sectionDetails,
        setSectionDetails,
        sections,
        setSections,
        videoId,
        setVideoId,
        sectionActive,
        setSectionActive,
      }}
    >
      {/* <ScrollRestoration /> */}
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
    </DocumentContext.Provider>
  );
}

export default ShareDocument;
