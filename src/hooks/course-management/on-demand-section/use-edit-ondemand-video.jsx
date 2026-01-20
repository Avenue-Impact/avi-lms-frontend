import { axiosAdmin } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const editVideo = async ({ data, section, id, courseId }) => {
  return axiosAdmin.patch(
    `/courses/${courseId}/on-demand-section/${section}/recordings/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const useEditOnDemandVideo = () => {
  const queryClient = useQueryClient();
  const { mutate: editOnDemandVideo, isPending: isEditing } = useMutation({
    mutationFn: editVideo,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries("get-single-cohort");
    },
    onError: (err) =>
      toast.error(err.response.data.message || "something went wrong"),
  });

  return {
    editOnDemandVideo,
    isEditing,
  };
};
