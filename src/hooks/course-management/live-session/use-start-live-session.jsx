import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { axiosAdmin } from "@/services/api";
import Cookies from "js-cookie";
const url = import.meta.env.VITE_ADMIN_URL;

const startSession = async (courseId, cohortId) => {
  return await axiosAdmin.get(
    `${url}/courses/${courseId}/cohorts/${cohortId}/live-session/start`,
  );
};

export const useStartLiveSession = (courseId, cohortId) => {
  return useQuery({
    queryKey: ["startLiveSession", { courseId, cohortId }],
    queryFn: () => startSession(courseId, cohortId),
  });
};
