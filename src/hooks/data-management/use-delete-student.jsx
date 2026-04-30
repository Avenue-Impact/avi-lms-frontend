import { deleteStudentApi } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (studentId) => deleteStudentApi(studentId),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-students"]); // Adjust query key if necessary
      toast.success("Student deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete student");
    },
  });
};
