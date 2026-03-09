import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { axiosAdmin } from "@/services/api";
import Cookies from "js-cookie";
const url = import.meta.env.VITE_ADMIN_URL;

const startSession = async (courseId, cohortId, sessionId) => {
  return await axiosAdmin.get(
    `${url}/courses/${courseId}/cohorts/${cohortId}/live-session/${sessionId}/start`,
  );
};

export const useStartLiveSession = (courseId, cohortId, sessionId) => {
  return useQuery({
    queryKey: ["startLiveSession", { courseId, cohortId, sessionId }],
    queryFn: () => startSession(courseId, cohortId, sessionId),
  });
};
