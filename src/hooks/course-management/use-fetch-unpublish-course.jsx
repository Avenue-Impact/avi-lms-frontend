import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchUnpublishCourse = async (page = 1, perPage = 10, searchQuery = "") =>
  await axiosAdmin.get(`/courses/unpublished?page=${page}&perPage=${perPage}&searchQuery=${searchQuery}`);

export const useUnpublishCourses = (page = 1, perPage = 10, searchQuery = "") => {
  return useQuery({
    queryKey: ["fetch-unpublish-course", { page, perPage, searchQuery }],
    queryFn: () => fetchUnpublishCourse(page, perPage, searchQuery),
  });
};
