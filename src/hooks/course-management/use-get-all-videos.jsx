import { getAllVideos } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllVideos = () => {
  return useQuery({
    queryKey: ["get-all-videos"],
    queryFn: () => getAllVideos(),
  });
};
