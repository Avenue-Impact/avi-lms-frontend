import { STUDENT_BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const removeFromWishlist = async ({ courseId }) =>
  // https://avi-lms-backend.onrender.com/api/v1/courses/wishlists/:courseId
  await axios.delete(`${STUDENT_BASE_URL}/courses/wishlist/${courseId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();
  const { mutate: removeFromList, isPending: isRemoving } = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: ({ data }) => {
      toast.success(data?.message ?? "Course remove in wishlist successfully");
      queryClient.invalidateQueries("fetch-wishlists");
    },
    onError: (error) => {
      toast.error(
        error.response.data.message || "Failed to add course to wishlist",
      );
    },
  });

  return { removeFromList, isRemoving };
};
