import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const streamVideo = (courseId, section, videoId) => {
  return axiosAdmin.get(
    `/courses/${courseId}/on-demand-section/${section}/recordings?videoId=${videoId}`
  );
};

export const useStreamRecordedVideo2 = (courseId, section, videoId) => {
  return useQuery({
    queryKey: ["streamRecordedVideo2", { courseId, section, videoId }],
    queryFn: () => streamVideo(courseId, section, videoId),
    enabled: !!courseId && !!videoId && !!section,

    onError: (error) => {
      console.error(error);
    },
  });
};
