import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
const fetchStudent = (courseId, cohortId, groupId) =>
  axios.get(
    `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/projects/groups/${groupId}/students?page=1`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
      },
    },
  );

export const useFetchStudentsInGroup = (courseId, cohortId, groupId) => {
  return useQuery({
    queryKey: ["fetch-student-in-group", { courseId, cohortId, groupId }],
    queryFn: () => fetchStudent(courseId, cohortId, groupId),
  });
};
