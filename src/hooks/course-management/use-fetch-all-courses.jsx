import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchAllCourses = async (page = 1, perPage = 7, isPublish = true, searchQuery = "") => {
  return await axiosAdmin.get(
    `/courses?page=${page}&perPage=${perPage}&published=${isPublish}&searchQuery=${searchQuery}`
  );
};

export const useFetchAllAdminCourses = (page = 1, perPage = 7, isPublish, searchQuery = "") => {
  return useQuery({
    queryKey: ["fetch-all-admin-courses", { page, perPage, isPublish, searchQuery }],
    queryFn: () => fetchAllCourses(page, perPage, isPublish, searchQuery),
  });
};
