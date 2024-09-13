import { ScrollRestoration } from "react-router-dom";

import CourseSection from "@/Components/dashboard/CourseSection";
import CourseVideoSection from "@/Components/dashboard/CourseVideoSection";
import { createContext, useState } from "react";
import LiveSession from "@/Components/dashboard/LiveSession";

export const DocumentContext = createContext();

function ShareDocument({ editButton = false }) {
  const [session, setSession] = useState("live");
  const [sectionDetails, setSectionDetails] = useState({
    section: "",
    topic: "",
  });

  const [sections, setSections] = useState({
    mobile: "course sections",
    desktop: "share documents",
  });

  return (
    <DocumentContext.Provider
      value={{
        session,
        setSession,
        sectionDetails,
        setSectionDetails,
        sections,
        setSections,
      }}
    >
      <ScrollRestoration />
      <div className="w-full gap-4 lg:grid lg:grid-cols-[2.8fr_1fr]">
        {session === "live" && <LiveSession />}
        {session === "recorded" && <CourseVideoSection />}

        <aside className="hidden rounded-[12px] border border-[#E4E7EC] bg-white px-4 py-6 lg:block">
          <CourseSection editButton={editButton} />
        </aside>
      </div>
    </DocumentContext.Provider>
  );
}

export default ShareDocument;
