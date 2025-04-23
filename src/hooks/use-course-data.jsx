import { CourseDataContext } from "@/providers/CourseDataProvider";
import { useContext } from "react";

export const useCourseData = () => useContext(CourseDataContext);
