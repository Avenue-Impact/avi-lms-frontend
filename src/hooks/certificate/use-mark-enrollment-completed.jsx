import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const markEnrollmentCompleted = async (enrollmentId) => {
  const { data } = await axios.post(
    `${BASE_URL}/certificates/enrollments/${enrollmentId}/complete`,
    {},
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return data;
};

export const useMarkEnrollmentCompleted = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markEnrollmentCompleted,
    onSuccess: (data) => {
      toast.success(data.message || "Student enrollment marked as completed!");
      queryClient.invalidateQueries(["fetch-cohort-students"]);
      queryClient.invalidateQueries(["fetch-ondemand-students"]);
      queryClient.invalidateQueries(["fetch-certificate-requests"]);
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || "Failed to update enrollment status."
      );
    },
  });
};
