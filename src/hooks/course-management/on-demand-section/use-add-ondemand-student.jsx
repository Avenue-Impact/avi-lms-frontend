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
  const { mutate: addStudent, isPending } = useMutation({
    mutationFn: addStudentApi,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["get-ondemand-student"] });
    },
  });

  return {
    addStudent,
    isPending,
  };
};
