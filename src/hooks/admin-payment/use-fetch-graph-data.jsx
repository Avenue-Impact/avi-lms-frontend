import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchGraphData = async () =>
  await axiosAdmin.get("/payments/graph-data?range=this-year");

export const useFetchGraphData = () =>
  useQuery({
    queryKey: ["fetch", "graph", "data"],
    queryFn: fetchGraphData,
  });
