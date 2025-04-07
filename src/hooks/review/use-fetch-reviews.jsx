import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const getReviews = async (courseId) => {
  const token = Cookies.get("adminToken");

  const response = await axios.get(`${BASE_URL}/courses/${courseId}/reviews`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const useFetchReviews = (courseId) => {
  return useQuery({
    queryKey: ["fetch-reviews", courseId],
    queryFn: () => getReviews(courseId),
  });
};
