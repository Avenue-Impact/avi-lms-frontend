import { useViewEnrolledCourse } from "@/hooks/students/use-view-enrolled-course";
import { createContext } from "react";
import { useParams } from "react-router-dom";

export const CourseDataContext = createContext();

export const CourseDataProvider = ({ children }) => {
  const { courseId } = useParams();
  const { data, isLoading, error } = useViewEnrolledCourse(courseId);
  if (isLoading) return <p>Loading...</p>;
  if (error)
    return <p>{error?.response?.data?.message ?? "Something Went wrong!!!"}</p>;
  if (data) {
    return (
      <CourseDataContext.Provider value={{ data }}>
        {children}
      </CourseDataContext.Provider>
    );
  }
};
