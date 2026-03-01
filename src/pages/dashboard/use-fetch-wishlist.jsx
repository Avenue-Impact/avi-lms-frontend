import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { STUDENT_BASE_URL } from "@/constant";

const fetchWishlists = async () =>
  await axios.get(
    `${STUDENT_BASE_URL}/courses/wishlist`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );

export const useFetchWishlist = () =>
  useQuery({
    queryKey: ["fetch-wishlists"],
    queryFn: fetchWishlists,
  });
