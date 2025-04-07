import { STUDENT_BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
const fetchDocuments = async (courseId, cohortId, section) =>
  await axios.get(
    `${STUDENT_BASE_URL}/courses/enrolled/${courseId}/cohorts/${cohortId}/sections/${section}/shared-documents`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    },
  );

export const useFetchSharedDocuments = (courseId, cohortId, section) =>
  useQuery({
    queryKey: ["fetch-shared-documents", { courseId, cohortId, section }],
    queryFn: () => fetchDocuments(courseId, cohortId, section),
    enabled: !!courseId && !!cohortId && !!section,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
