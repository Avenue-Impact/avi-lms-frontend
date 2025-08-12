import { CourseSectionViewContext } from "@/providers/course-section-view-provider";
import { useContext } from "react";

export const useViewCourseSections = () => {
  const context = useContext(CourseSectionViewContext);
  if (!context) {
    throw new Error(
      "useLiveSessionView must be used within a LiveSessionViewProvider",
    );
  }
  return context;
};
