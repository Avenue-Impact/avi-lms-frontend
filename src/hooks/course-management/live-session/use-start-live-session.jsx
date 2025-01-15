import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
const startSession = async (courseId, cohortId) => {
  return await axios.get(
    `https://avi-lms-backend.onrender.com/api/v1/admins/courses/672f600db2f3905e23f914e6/cohorts/6732f2f47a0ce8a492cc36e1/live-session/start`,
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
