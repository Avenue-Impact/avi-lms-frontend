import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchProjectAreaCards = async (courseId, cohortId) => {
  const url = `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/projects/general`;

  console.log("fetchProjectAreaCards", url);

  return await axios.get(url, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });
};

export const useFetchAllProjectCards = (courseId, cohortId) => {
  return useQuery({
    queryKey: ["project-area-cards", { courseId, cohortId }],
    queryFn: () => fetchProjectAreaCards(courseId, cohortId),
  });
};
