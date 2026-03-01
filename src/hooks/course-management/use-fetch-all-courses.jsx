import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchAllCourses = async (page = 1, perPage = 7, isPublish = true) => {
  return await axiosAdmin.get(
    `/courses?page=${page}&perPage=${perPage}&published=${isPublish}`
  );
};

export const useFetchAllAdminCourses = (page = 1, perPage = 7, isPublish) => {
  return useQuery({
    queryKey: ["fetch-all-admin-courses", { page, perPage, isPublish }],
    queryFn: () => fetchAllCourses(page, perPage, isPublish),
  });
};
