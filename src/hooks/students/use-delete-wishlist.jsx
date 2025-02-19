import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const deleteWishlist = async (courseId) =>
  await axios.delete(
    `https://avi-lms-backend.onrender.com/api/v1/courses/wishlist/${courseId}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    },
  );

export const useDeleteWishlist = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteWishlist,
    onSuccess: ({ data }) => {
      toast.success(data?.message ?? "Wishlist deleted successfully");
      queryClient.invalidateQueries("fetch-wishlists");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? "Error deleting wishlist:");
    },
  });
  return { mutate, isPending };
};
