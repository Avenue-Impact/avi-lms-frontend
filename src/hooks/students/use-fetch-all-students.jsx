import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";


const fetchAllStudent = async () =>
    
  await axiosAdmin.get("/users");

export const useFetchAllStudent = () => {
  return useQuery({
    queryKey: ["fetch-all-student"],
    queryFn: fetchAllStudent,
  });
};
