import { STUDENT_BASE_URL } from "@/constant";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const removeFromWishlist = async ({ courseId }) =>
  await axios.delete(`${STUDENT_BASE_URL}/courses/wishlists/${courseId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

export const useRemoveFromWishlist = () => {
  const { mutate: removeFromList, isPending: isRemoving } = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: ({ data }) => {
      toast.success(data?.message ?? "Course added to wishlist successfully");
    },
    onError: (error) => {
      toast.error(
        error.response.data.message || "Failed to add course to wishlist",
      );
    },
  });

  return { removeFromList, isRemoving };
};
