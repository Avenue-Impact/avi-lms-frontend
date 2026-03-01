import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const url = import.meta.env.VITE_AUTH_URL;

const fetchReferrals = async () =>
  await axios.get(
    `${url.replace("/auth", "")}/users/me/referrals`,
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
