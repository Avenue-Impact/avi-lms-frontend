import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

// Function to fetch project area data
export const getGeneralProjectArea = async (courseId, cohortId) => {
  const token = Cookies.get("adminToken");
  //    const { courseId, cohortId } = JSON.parse(
  //      localStorage.getItem("fetch-all-admin-courses") || "{}",
  //     );

  const response = await axios.get(
    `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/projects`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

// Custom hook to fetch all project area data using React Query
export const useFetchAllProjectArea = (courseId, cohortId) => {
  return useQuery({
    queryKey: ["fetch-project-course", courseId, cohortId],
    queryFn: () => getGeneralProjectArea(courseId, cohortId),
  });
};

