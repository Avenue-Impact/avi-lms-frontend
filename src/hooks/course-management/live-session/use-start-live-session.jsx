import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
const startSession = async (courseId, cohortId) => {
  return await axios.get(
    `https://avi-lms-5478f16284c6.herokuapp.com/api/v1/admins/courses/${courseId}/cohorts/${cohortId}/live-session/start`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
      },
    },
  );
};

export const useStartLiveSession = (courseId, cohortId) => {
  return useQuery({
    queryKey: ["startLiveSession", { courseId, cohortId }],
    queryFn: () => startSession(courseId, cohortId),
  });
};
