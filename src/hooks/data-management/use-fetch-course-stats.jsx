import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchStats = async () =>
  await axios.get(`${BASE_URL}/data/courses`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")} `,
    },
  });

export const useFetchCourseStats = () =>
  useQuery({
    queryKey: ["fetch-course-stats"],
    queryFn: fetchStats,
    staleTime: 60 * 1000, // 1 minute
  });
