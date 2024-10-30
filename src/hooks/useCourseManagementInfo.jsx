import { CourseManagementContext } from "@/providers/CourseManagementProvider";
import { useContext } from "react";

export const useCourseManagementInfo = () => {
  return useContext(CourseManagementContext);
};
