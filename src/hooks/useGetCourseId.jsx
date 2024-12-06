import { useParams } from "react-router-dom";

export const useGetCourseId = () => {
  const { courseId } = useParams();
  return courseId;
};
