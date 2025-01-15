import { STUDENT_BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const streamVideo = async (courseId, cohortId, section, videoId) =>
  axios.get(
    `${STUDENT_BASE_URL}/courses/enrolled/${courseId}/cohorts/${cohortId}/sections/${section}/recordings?videoId=${videoId}`,
  );

export const useStreamLiveSessionVideo = (
  courseId,
  cohortId,
  section,
  videoId,
) =>
  useQuery({
    queryKey: ["streamLiveSessionVideo"],
    queryFn: () => streamVideo(courseId, cohortId, section, videoId),
    enabled: !!courseId && !!videoId && !!section && !!cohortId,
    refetchInterval: 10000, // every 10 seconds
  });
