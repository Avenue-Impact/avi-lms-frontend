import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";

const streamVideo = (courseId, cohortId, section, videoId) => {
  return axiosAdmin.get(
    `/courses/${courseId}/cohorts/${cohortId}/sections/${section}/recordings?videoId=${videoId}`,
    {
      headers: {
        Range: "bytes=0-",
      },
    },
  );
};

export const useStreamRecordedVideo = (
  courseId,
  cohortId,
  section,
  videoId,
) => {
  return useQuery({
    queryKey: ["streamRecordedVideo", { courseId, cohortId, section, videoId }],
    queryFn: () => streamVideo(courseId, cohortId, section, videoId),
    enabled: !!courseId && !!videoId && !!section && !!cohortId,

    onError: (error) => {
      console.error(error);
    },
  });
};
