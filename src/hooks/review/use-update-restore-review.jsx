import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const updateRestoreReview = async ({ courseId, reviewId }) =>
  await axios.patch(
    `${BASE_URL}/courses/${courseId}/reviews/${reviewId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
      },
    },
  );

export const useRestoreReview = () => {
  const queryClient = useQueryClient();
  const { mutate: restoreReview, isPending } = useMutation({
    mutationFn: updateRestoreReview,
    onSuccess: ({ data }) => {
      toast.success(data?.message ?? "Review restored successfully");
      queryClient.invalidateQueries("fetch-deleted-reviews"); // Ensure correct query key
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? "Failed to restore review");
    },
  });

  return { restoreReview, isPending };
};
