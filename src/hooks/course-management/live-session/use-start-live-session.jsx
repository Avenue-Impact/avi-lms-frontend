import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
const url = import.meta.env.VITE_ADMIN_URL;

const startSession = async (courseId, cohortId) => {
  return await axios.get(
    `${url}/courses/${courseId}/cohorts/${cohortId}/live-session/start`,
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
