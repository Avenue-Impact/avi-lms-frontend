import { STUDENT_BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const getCertificate = (courseId, cohortId, duration) => {
  const params = cohortId === "on-demand" && duration ? `?duration=${encodeURIComponent(duration)}` : "";
  return axios.get(
    `${STUDENT_BASE_URL}/courses/${courseId}/cohorts/${cohortId}/certificate${params}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      responseType: "blob",
    },
  );
};

export const useGetCertificate = (courseId, cohortId, duration) => {
  return useQuery({
    queryKey: ["get-certificate", courseId, cohortId, duration],
    queryFn: () => getCertificate(courseId, cohortId, duration),
    enabled: !!courseId && !!cohortId,
    refetchOnMount: true,
  });
};

