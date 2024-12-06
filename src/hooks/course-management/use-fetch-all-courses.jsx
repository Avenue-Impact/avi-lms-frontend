import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchAllCourses = async (page = 1, perPage = 7, isPublish = true) => {
  const token = Cookies.get("adminToken");
  return await axios.get(
    `${BASE_URL}/courses?page=${page}&perPage=${perPage}&published=${isPublish}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const useFetchAllAdminCourses = (page = 1, perPage = 7, isPublish) => {
  return useQuery({
    queryKey: ["fetch-all-admin-courses", { page, perPage, isPublish }],
    queryFn: () => fetchAllCourses(page, perPage, isPublish),
  });
};
