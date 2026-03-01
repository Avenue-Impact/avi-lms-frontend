import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchEnrollment = async (period) =>
  await axiosAdmin.get(`/data/enrollments-by-period?period=${period}`);

export const useFetchEnrollment = (period) => {
  return useQuery({
    queryKey: ["fetch-enrollment-trend", { period }],
    queryFn: () => fetchEnrollment(period),
    enabled: !!period,
  });
};

// Example usage:
