import { getAllVideos } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllVideos = (page = 1, limit = 20, search = "", enabled = true) => {
  return useQuery({
    queryKey: ["get-all-videos", { page, limit, search }],
    queryFn: () => getAllVideos(page, limit, search),
    enabled,
  });
};
