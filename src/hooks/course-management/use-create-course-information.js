import { addCourseInformation, editCourseInformationApi } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateCourseInformation = () => {
  const { mutate: createCourseInformation, isPending: isCreating } =
    useMutation({
      mutationFn: addCourseInformation,
      onSuccess: ({ data }) => {
        toast.success(data.message);
        localStorage.setItem("courseId", data.data.id);

        localStorage.setItem("course-information", JSON.stringify(data.data));
      },
      onError: (err) =>
        toast.error(err.response.data.message || "something went wrong"),
    });

  return { createCourseInformation, isCreating };
};

export const useEditCourseInformation = () => {
  const queryClient = useQueryClient()
  const { mutate: editCourseInformation, isPending: isEditing } = useMutation({
    mutationFn: editCourseInformationApi,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries('get-course-info')
    },
    onError: (err) =>
      toast.error(err.response.data.message || "something went wrong"),
  });

  return { editCourseInformation, isEditing };
};


