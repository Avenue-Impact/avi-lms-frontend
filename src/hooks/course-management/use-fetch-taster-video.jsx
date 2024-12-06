import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchVideo = async (courseId) => {
  return axiosAdmin.get(`/courses/${courseId}/preview`, {
    responseType: "blob",
  });
};

export const useFetchVideo = (courseId) => {
  return useQuery({
    queryKey: ["fetch-taster-video", courseId],
    queryFn: () => fetchVideo(courseId),
  });
};
