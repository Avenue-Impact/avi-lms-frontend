import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

// Function to fetch project area data
export const getProjectGroups = async (courseId, cohortId) => {
  const token = Cookies.get("adminToken");
  //    const { courseId, cohortId } = JSON.parse(
  //      localStorage.getItem("fetch-all-admin-courses") || "{}",
  //     );
  
  // https://avi-lms-backend.onrender.com/api/v1/admins/courses/:courseId/cohorts/:cohortId/projects/groups
  const response = await axios.get(
    `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/projects/groups/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

    // console.log("groupID API", response);

  return response.data;
};

// Custom hook to fetch all project area data using React Query
export const useProjectGroups = (courseId, cohortId) => {
  return useQuery({
    queryKey: ["fetch-project-groups", courseId, cohortId],
    queryFn: () => getProjectGroups(courseId, cohortId),
  });
};
