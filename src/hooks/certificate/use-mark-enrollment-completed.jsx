import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";
import toast from "react-hot-toast";

const markEnrollmentCompleted = async (enrollmentId) => {
  const { data } = await axiosAdmin.post(
    `/certificates/enrollments/${enrollmentId}/complete`,
    {}
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
