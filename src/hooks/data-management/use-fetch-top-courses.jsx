import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchTopCourse = async () =>
  await axios.get(`${BASE_URL}/data/top-courses`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });

export const useFetchTopCourses = () =>
  useQuery({
    queryKey: ["fetch-top-courses"],
    queryFn: fetchTopCourse,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
