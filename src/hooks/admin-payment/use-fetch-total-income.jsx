import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchIncome = async () =>
  await axios.get(
    "https://avi-lms-5478f16284c6.herokuapp.com/api/v1/admins/payments/total-income",
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
      },
    },
  );

export const useFetchIncome = () =>
  useQuery({
    queryKey: ["fetch-income"],
    queryFn: fetchIncome,
  });
