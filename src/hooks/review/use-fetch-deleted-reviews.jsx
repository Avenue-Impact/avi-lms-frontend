import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const getDeletedReviews = async (courseId) => {
  const token = Cookies.get("adminToken");

  const response = await axios.get(
    `${BASE_URL}/courses/${courseId}/deleted-reviews`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const useFetchDeletedReviews = (courseId) => {
  return useQuery({
    queryKey: ["fetch-deleted-reviews", courseId],
    queryFn: () => getDeletedReviews(courseId),
  });
};
