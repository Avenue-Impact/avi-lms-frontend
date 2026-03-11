import { getSectionVideos } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useGetSectionVideos = (
  courseId,
  cohortId,
  sectionId,
  enabled = false,
) => {
  return useQuery({
    queryKey: ["get-section-videos", { courseId, cohortId, sectionId }],
    queryFn: () => getSectionVideos(courseId, cohortId, sectionId),
    enabled: !!sectionId && !!courseId && !!cohortId && enabled,
  });
};
