import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const deleteReview = ({ courseId, reviewId }) => {
  
  const url = `${BASE_URL}/courses/${courseId}/reviews/${reviewId}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  const { mutate: delReview, isPending } = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      toast.success("Review deleted successfully");
      queryClient.invalidateQueries("review-deleted");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err?.response?.data?.message ?? "something went wrong");
    },
  });
  return { delReview, isPending };
};
