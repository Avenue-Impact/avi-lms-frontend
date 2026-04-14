import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";

const fetchAccountManagement = async (page = 1, perPage = 10) => {
  return await axiosAdmin.get(`?page=${page}&perPage=${perPage}`);
};

export const useFetchAccountManagement = (page = 1, perPage = 10) =>
  useQuery({
    queryKey: ["get-all-admins-account", { page, perPage }],
    queryFn: () => fetchAccountManagement(page, perPage),
  });
