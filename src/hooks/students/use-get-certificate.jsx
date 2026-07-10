import { STUDENT_BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const getCertificate = (courseId, cohortId) =>
  axios.get(
    `${STUDENT_BASE_URL}/courses/${courseId}/cohorts/${cohortId}/certificate`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      responseType: "blob",
    },
  );

export const useGetCertificate = (courseId, cohortId) => {
  return useQuery({
    queryKey: ["get-certificate", courseId, cohortId],
    queryFn: () => getCertificate(courseId, cohortId),
    enabled: !!courseId && !!cohortId,
    refetchOnMount: true,
  });
};
