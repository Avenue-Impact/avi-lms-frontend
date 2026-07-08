import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";
import { toast } from "react-hot-toast";

const addStudentApi = async ({ data, courseId }) => {
  return await axiosAdmin.post(
    `/courses/${courseId}/on-demand-section/enrolled-students`,
    data,
  );
};

export const useAddOndemandStudent = () => {
  const queryClient = useQueryClient();
  const { mutate: addStudent, isPending, error } = useMutation({
    mutationFn: addStudentApi,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["get-ondemand-student"] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to add student");
    },
  });

  return {
    addStudent,
    isPending,
    error,
  };
};
