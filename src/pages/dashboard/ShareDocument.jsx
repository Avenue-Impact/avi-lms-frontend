import { ScrollRestoration } from "react-router-dom";

import CourseSection from "@/Components/dashboard/CourseSection";
import CourseVideoSection from "@/Components/dashboard/CourseVideoSection";
import { useState } from "react";
import LiveSession from "@/Components/dashboard/LiveSession";

function ShareDocument() {
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
    <>
      <ScrollRestoration />
      <div className="w-full gap-4 lg:grid lg:grid-cols-[2.8fr_1fr]">
        {session === "live" && (
          <LiveSession
            sections={sections}
            setSections={setSections}
            setSectionDetails={setSectionDetails}
            setSession={setSession}
          />
        )}
        {session === "recorded" && (
          <CourseVideoSection
            sectionDetails={sectionDetails}
            setSession={setSession}
            setSectionDetails={setSectionDetails}
            sections={sections}
            setSections={setSections}
          />
        )}

        <aside className="hidden rounded-[12px] border border-[#E4E7EC] bg-white px-4 py-6 lg:block">
          <CourseSection
            setSession={setSession}
            setSectionDetails={setSectionDetails}
          />
        </aside>
      </div>
    </>
  );
}

export default ShareDocument;
