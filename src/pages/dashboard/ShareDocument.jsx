import { ScrollRestoration, useParams } from "react-router-dom";

import CourseSection from "@/Components/dashboard/CourseSection";
import CourseVideoSection from "@/Components/dashboard/CourseVideoSection";
import { createContext, useEffect, useState } from "react";
import LiveSession from "@/Components/dashboard/LiveSession";
import { useViewEnrolledCourse } from "@/hooks/students/use-view-enrolled-course";

export const DocumentContext = createContext();

function ShareDocument({ editButton = false }) {
  const [session, setSession] = useState("");
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
  const { courseId } = useParams();

  const { data, isLoading, error } = useViewEnrolledCourse(courseId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong..</p>;
  if (data) console.log(data, "i am the data");

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
      <ScrollRestoration />
      <div className="w-full gap-4 lg:grid lg:grid-cols-[2.8fr_1fr]">
        {session === "" && <p>click to show content </p>}
        {session === "live" && data?.data?.data?.live_session.time && (
          <LiveSession data={data} />
        )}
        {session === "recorded" && <CourseVideoSection data={data} />}
        <aside className="hidden rounded-[12px] border border-[#E4E7EC] bg-white px-4 py-6 lg:block">
          <CourseSection editButton={editButton} data={data} />
        </aside>
      </div>
    </DocumentContext.Provider>
  );
}

export default ShareDocument;
