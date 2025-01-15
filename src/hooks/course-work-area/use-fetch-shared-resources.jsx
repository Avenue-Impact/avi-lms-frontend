import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
const fetchDocuments = async (courseId, cohortId, section) =>
  await axios.get(
    `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/course-area/sections/${section}/shared-documents`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
      },
    },
  );

export const useFetchSharedResources = (courseId, cohortId, section) =>
  useQuery({
    queryKey: ["fetch-shared-documents", { courseId, cohortId, section }],
    queryFn: () => fetchDocuments(courseId, cohortId, section),
    enabled: !!courseId && !!cohortId && !!section,
  });
