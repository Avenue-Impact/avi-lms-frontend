import { createContext, useState } from "react";

export const CourseSectionViewContext = createContext();

export const CourseSectionViewProvider = ({ children }) => {
  const [session, setSession] = useState("live");
  const [sectionDetails, setSectionDetails] = useState({
    section: "",
    topic: "",
  });

  const [sectionActive, setSectionActive] = useState(2);
  const [active, setActive] = useState("1");

  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("");

  const [sections, setSections] = useState({
    mobile: "course sections",
    desktop: "share documents",
  });

  return (
    <CourseSectionViewContext.Provider
      value={{
        session,
        setSession,
        sectionDetails,
        setSectionDetails,
        sections,
        setSections,
        videoUrl,
        setVideoUrl,
        videoId,
        setVideoId,
        sectionActive,
        setSectionActive,
        active,
        setActive,
      }}
    >
      {children}
    </CourseSectionViewContext.Provider>
  );
};
