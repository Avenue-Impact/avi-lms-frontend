import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchWishlists = async () =>
  await axios.get(
    `https://avi-lms-5478f16284c6.herokuapp.com/api/v1/courses/wishlists`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    },
  );

export const useFetchWishlist = () =>
  useQuery({
    queryKey: ["fetch-wishlists"],
    queryFn: fetchWishlists,
  });
