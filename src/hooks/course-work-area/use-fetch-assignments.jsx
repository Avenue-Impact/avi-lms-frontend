import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchAssignments = (courseId, cohortId, section) =>
  axios.get(
    `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/course-area/sections/${section}/assignments?page=1`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
      },
    },
  );

export const useFetchAssignments = (courseId, cohortId, section) => {
  return useQuery({
    queryKey: ["fetch-assignments", { courseId, cohortId, section }],
    queryFn: () => fetchAssignments(courseId, cohortId, section),
    enabled: !!courseId && !!cohortId && !!section,
  });
};
