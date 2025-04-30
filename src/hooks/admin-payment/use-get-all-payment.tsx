import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const getPayments = async () =>
  await axios.get(
    "https://avi-lms-backend.onrender.com/api/v1/admins/payments",
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
      },
    },
  );

export const useGetPayment = () =>
  useQuery({
    queryKey: ["fetch-payment"],
    queryFn: getPayments,
  });
