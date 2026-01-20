import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchAllStudent = async (courseId, cohortId) => {
  const token = Cookies.get("adminToken");
  return await axios.get(
    `${BASE_URL}/admins/courses/${courseId}/cohorts/${cohortId}/enrolled-students`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const useFetchAllLiveStudents = (courseId, cohortId) => {
  return useQuery({
    queryKey: ["fetch-all-live-student", { courseId, cohortId }],
    queryFn: () => fetchAllStudent(courseId, cohortId),
  });
};
