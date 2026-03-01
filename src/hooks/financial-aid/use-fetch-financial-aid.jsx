import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchSingleFinancialAid = async (id) =>
  //   https://avi-lms-backend.onrender.com/api/v1/admins/financial-aid/:id

  await axiosAdmin.get(`/financial-aid/${id}`);

export const useSingleFinancialAid = (id) => {
  return useQuery({
    queryKey: ["fetch-single-financial-aid", id],
    queryFn: () => fetchSingleFinancialAid(id),
    enabled: !!id,
  });
};
