import { createContext, useState } from "react";

export const CourseSectionViewContext = createContext();

export const CourseSectionViewProvider = ({ children }) => {
  const [session, setSession] = useState("live");
  const [sectionDetails, setSectionDetails] = useState({
    section: "",
    topic: "",
  });

  const [sectionActive, setSectionActive] = useState(2);

  const [videoUrl, setVideoUrl] = useState("");

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
        sectionActive,
        setSectionActive,
      }}
    >
      {children}
    </CourseSectionViewContext.Provider>
  );
};
