import { axiosAdmin } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const editCourseTypeApi = async ({ data, courseId }) => {
  return await axiosAdmin.patch(`/courses/${courseId}/coursetype`, data);
};

export const useEditCourseType = () => {
  const queryClient = useQueryClient();

  const { mutate: editCourseType, isPending } = useMutation({
    mutationFn: editCourseTypeApi,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["get-course-info"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return {
    editCourseType,
    isPending,
  };
};
