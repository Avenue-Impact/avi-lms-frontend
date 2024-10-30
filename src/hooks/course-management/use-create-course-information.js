import { addCourseInformation, editCourseInformationApi } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateCourseInformation = () => {
  const { mutate: createCourseInformation, isPending: isCreating } =
    useMutation({
      mutationFn: addCourseInformation,
      onSuccess: ({ data }) => {
        toast.success(data.message);
        localStorage.setItem("id", data.data.id);
        console.log(data);

        localStorage.setItem("course-information", JSON.stringify(data.data));
      },
      onError: (err) =>
        toast.error(err.response.data.message || "something went wrong"),
    });

  return { createCourseInformation, isCreating };
};

export const useEditCourseInformation = () => {
  const { mutate: editCourseInformation, isPending: isEditing } = useMutation({
    mutationFn: editCourseInformationApi,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      console.log(data);

      localStorage.setItem("course-information", JSON.stringify(data.data));
    },
    onError: (err) =>
      toast.error(err.response.data.message || "something went wrong"),
  });

  return { editCourseInformation, isEditing };
};
