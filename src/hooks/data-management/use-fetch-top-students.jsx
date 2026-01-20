import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchTopStudents = async () =>
  await axiosAdmin.get("/data/top-students");

export const useFetchTopStudents = () => {
  return useQuery({
    queryKey: ["fetch-top-student"],
    queryFn: fetchTopStudents,
  });
};
