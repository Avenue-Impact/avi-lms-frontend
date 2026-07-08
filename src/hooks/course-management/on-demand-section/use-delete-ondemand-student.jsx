import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";
import toast from "react-hot-toast";

const deleteStudentApi = async ({ data, courseId }) => {
  return await axiosAdmin.delete(
    `/courses/${courseId}/on-demand-section/enrolled-students`,
    {
      data,
    },
  );
};

export const useDeleteOndemandStudent = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteOndemandStudent, isPending } = useMutation({
    mutationFn: deleteStudentApi,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["get-ondemand-student"] });
    },
    onError: (error) =>
      toast.error(error.response.data.message || "something went wrong"),
  });

  return {
    deleteOndemandStudent,
    isPending,
  };
};
