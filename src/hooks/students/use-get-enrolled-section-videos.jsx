import { STUDENT_BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const getEnrolledSectionVideos = async (courseId, cohortId, sectionId) => {
  return axios.get(
    `${STUDENT_BASE_URL}/courses/enrolled/${courseId}/cohorts/${cohortId}/recorded-sessions/${sectionId}/videos`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    },
  );
};

export const useGetEnrolledSectionVideos = (
  courseId,
  cohortId,
  sectionId,
  enabled = false,
) => {
  return useQuery({
    queryKey: [
      "get-enrolled-section-videos",
      { courseId, cohortId, sectionId },
    ],
    queryFn: () => getEnrolledSectionVideos(courseId, cohortId, sectionId),
    enabled: !!courseId && !!cohortId && !!sectionId && enabled,
    onError: (error) => {
      console.error(error);
    },
  });
};
