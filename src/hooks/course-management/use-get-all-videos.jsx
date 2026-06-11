import { getAllVideos } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllVideos = (page = 1, limit = 20, search = "", courseFilter = "", enabled = true) => {
  return useQuery({
    queryKey: ["get-all-videos", { page, limit, search, courseFilter }],
    queryFn: () => getAllVideos(page, limit, search, courseFilter),
    enabled,
  });
};
