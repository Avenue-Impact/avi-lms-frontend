import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchRevenue = async (period) =>
  await axiosAdmin.get(`/data/revenue-by-period?period=${period}`);

export const useFetchRevenue = (period) => {
  return useQuery({
    queryKey: ["fetch-revenue-trend", { period }],
    queryFn: () => fetchRevenue(period),
    enabled: !!period,
  });
};
