import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";


const fetchAllStudent = async (page, perPage) =>
  await axiosAdmin.get(`/data/students?page=${page}&perPage=${perPage}`);

export const useFetchAllManagementStudent = (page = 1, perPage = 10) => {
  return useQuery({
    queryKey: ["fetch-all-student", page, perPage],
    queryFn: () => fetchAllStudent(page, perPage),
  });
};
