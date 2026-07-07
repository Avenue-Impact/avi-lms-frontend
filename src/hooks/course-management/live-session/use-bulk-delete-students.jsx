import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";
import toast from "react-hot-toast";

const bulkDeleteStudentsApi = async ({ data, courseId, cohortId }) => {
  return await axiosAdmin.delete(
    `/courses/${courseId}/cohorts/${cohortId}/enrolled-students/bulk`,
    {
      data,
    },
  );
};

export const useBulkDeleteStudents = () => {
  const queryClient = useQueryClient();
  const { mutate: bulkDeleteStudents, isPending } = useMutation({
    mutationFn: bulkDeleteStudentsApi,
    onSuccess: ({ data }) => {
      toast.success(data.message || "Students removed successfully");
      queryClient.invalidateQueries("fetch-all-live-student");
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || "Something went wrong"),
  });

  return {
    bulkDeleteStudents,
    isPending,
  };
};
