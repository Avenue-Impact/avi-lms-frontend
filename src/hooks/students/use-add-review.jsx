import { STUDENT_BASE_URL } from "@/constant";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const addRating = async ({ data, courseId }) =>
  await axios.post(`${STUDENT_BASE_URL}/courses/${courseId}/add-review`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

export const useAddRating = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: addRating,
    onSuccess: ({ data }) => {
      toast.success(data?.message ?? "Review added successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Failed to add review");
    },
  });

  return { mutate, isPending };

  // This is a simple example, in a real-world application, you would also want to handle the rating value and user id.

  // const { mutate, isPending } = useMutation({
  //   mutationFn: addRating,
  //   onSuccess: ({ data }) => {
  //     toast.success(data?.message?? "Review added successfully");
  //   },
  //   onError: (error) => {
  //     toast.error(error.response?.data?.message?? "Failed to add review");
  //   },
  //   onSettled: (data, error) => {
  //     if (error) {
  //       // Handle any error that occurred during the mutation
  //     } else {
  //       // Handle the successful mutation
  //     }
  //   },
  // });
};
