import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchUnpublishCourse = async () =>
  await axiosAdmin.get("/courses/unpublished");

export const useUnpublishCourses = () => {
  return useQuery({
    queryKey: ["fetch-unpublish-course"],
    queryFn: () => fetchUnpublishCourse(),
  });
};
