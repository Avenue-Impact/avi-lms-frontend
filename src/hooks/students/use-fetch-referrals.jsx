import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchReferrals = async () =>
  await axios.get(
    `https://avi-lms-5478f16284c6.herokuapp.com/api/v1/users/me/referrals`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    },
  );

export const useFetchReferrals = () =>
  useQuery({
    queryKey: ["fetch-wishlists"],
    queryFn: fetchReferrals,
  });
