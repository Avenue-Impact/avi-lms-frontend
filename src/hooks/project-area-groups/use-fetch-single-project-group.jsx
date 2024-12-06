import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

// Function to fetch project area data
export const getSingleProjectGroup = async (courseId, cohortId, groupId) => {
  const token = Cookies.get("adminToken");

  return await axios.get(
    `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/projects/groups/${groupId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

// Custom hook to fetch all project area data using React Query
export const useGetSingleProjectGroup = (courseId, cohortId, groupId) => {
  return useQuery({
    queryKey: ["fetch-single-project-group", courseId, cohortId, groupId],
    queryFn: () => getSingleProjectGroup(courseId, cohortId, groupId),
    enabled: !!courseId && !!cohortId && !!groupId,
  });
};
