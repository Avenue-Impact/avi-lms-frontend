import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";

const deleteStudentApi = async ({ data, courseId, cohortId }) => {
  return await axiosAdmin.delete(
    `/courses/${courseId}/cohorts/${cohortId}/enrolled-students`,
    {
      data,
    },
  );
};

export const useDeleteLiveStudent = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteStudent, isPending } = useMutation({
    mutationFn: deleteStudentApi,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries("fetch-all-live-student");
    },
    onError: (error) =>
      toast.error(error.response.data.message || "something went wrong"),
  });

  return {
    deleteStudent,
    isPending,
  };
};
