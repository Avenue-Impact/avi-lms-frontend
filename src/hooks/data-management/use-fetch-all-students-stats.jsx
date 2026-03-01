import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";


const fetchAllStudent = async () =>
    
  await axiosAdmin.get("/data/students");

export const useFetchAllManagementStudent = () => {
  return useQuery({
    queryKey: ["fetch-all-student"],
    queryFn: fetchAllStudent,
  });
};
