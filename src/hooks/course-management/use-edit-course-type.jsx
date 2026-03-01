import { axiosAdmin } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const editCourseTypeApi = async ({ data, courseId }) => {
  return await axiosAdmin.patch(`/courses/${courseId}/coursetype`, data);
};

export const useEditCourseType = () => {
  const { mutate: editCourseType, isPending } = useMutation({
    mutationFn: editCourseTypeApi,
    onSuccess: ({ data }) => {
      toast.success(data.message);
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
