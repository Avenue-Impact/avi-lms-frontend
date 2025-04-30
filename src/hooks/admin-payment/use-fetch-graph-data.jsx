import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchGraphData = async () =>
  await axios.get(
    "https://avi-lms-backend.onrender.com/api/v1/admins/payments/graph-data?range=this-year",
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
      },
    },
  );

export const useFetchGraphData = () =>
  useQuery({
    queryKey: ["fetch", "graph", "data"],
    queryFn: fetchGraphData,
  });
