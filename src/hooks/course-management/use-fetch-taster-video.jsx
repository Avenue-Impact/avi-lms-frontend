import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

// const fetchVideo = async (courseId) => {
//   return axiosAdmin.get(`/courses/${courseId}/preview`, {
//     responseType: "blob",
//   });
// };

const fetchVideo = async (courseId) => {
  const response = await axiosAdmin.get(`/courses/${courseId}/preview`);
  return response.data;
};


export const useFetchVideo = (courseId) => {
  return useQuery({
    queryKey: ["fetch-taster-video", courseId],
    queryFn: () => fetchVideo(courseId),
  });
};
