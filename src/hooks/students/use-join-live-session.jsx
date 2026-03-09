import { STUDENT_BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
const joinSession = async (courseId, cohortId, sessionId) => {
  return await axios.get(
    `${STUDENT_BASE_URL}/courses/enrolled/${courseId}/cohorts/${cohortId}/live-session/${sessionId}/join`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    },
  );
};

export const useJoinSession = (courseId, cohortId, sessionId) => {
  return useQuery({
    queryKey: ["join-session", { courseId, cohortId, sessionId }],
    queryFn: () => joinSession(courseId, cohortId, sessionId),
  });
};
