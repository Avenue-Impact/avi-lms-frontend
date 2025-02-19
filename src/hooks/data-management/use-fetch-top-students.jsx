import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
const fetchTopStudents = async () =>
  await axios.get(`${BASE_URL}/data/top-students`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });

export const useFetchTopStudents = () => {
  return useQuery({
    queryKey: ["fetch-top-student"],
    queryFn: fetchTopStudents,
  });
};
