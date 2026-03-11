import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";

const addStudentApi = async ({ data, courseId, cohortId }) => {
  return await axiosAdmin.post(
    `/courses/${courseId}/cohorts/${cohortId}/enrolled-students`,
    data,
  );
};

export const useAddStudentToLive = () => {
  const queryClient = useQueryClient();

  const { mutate: addStudent, isPending } = useMutation({
    mutationFn: addStudentApi,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries("fetch-all-live-student");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { addStudent, isPending };
};
