import { STUDENT_BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchProject = async (courseId) =>
  await axios.get(
    `${STUDENT_BASE_URL}/courses/enrolled/${courseId}/project-area`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    },
  );

export const useFetchProjectArea = (courseId) =>
  useQuery({
    queryKey: ["fetch-project-area", courseId],
    queryFn: () => fetchProject(courseId),
  });
