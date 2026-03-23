import { useQuery } from "@tanstack/react-query";
import { STUDENT_BASE_URL } from "@/constant";
import axios from "axios";
import Cookies from "js-cookie";

export const useFetchCourseNavigation = ({
  courseId,
  cohortId,
  currentVideoId,
  isLiveSession,
}) => {
  return useQuery({
    queryKey: [
      "course-navigation",
      courseId,
      cohortId,
      currentVideoId,
      isLiveSession,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (cohortId) params.append("cohortId", cohortId);
      if (currentVideoId) params.append("currentVideoId", currentVideoId);
      if (isLiveSession) params.append("isLiveSession", "true");

      const res = await axios.get(
        `${STUDENT_BASE_URL}/courses/enrolled/${courseId}/navigation?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      return res.data;
    },
    enabled: !!courseId,
  });
};
