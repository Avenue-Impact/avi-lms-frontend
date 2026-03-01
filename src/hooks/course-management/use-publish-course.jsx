import { axiosAdmin } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const publishCourse = async () => {
  const courseId = localStorage.getItem("courseId");
  
  return await axiosAdmin.patch(`/courses/${courseId}/publish`, {});
};

export const usePublishCourse = () => {
  const { mutate: publish, isPending: isPublishing } = useMutation({
    mutationFn: publishCourse,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      localStorage.removeItem("courseId");
      localStorage.removeItem("recordedSection");
      localStorage.removeItem("demandSectionNumber");
      localStorage.removeItem("cohortId");
      localStorage.removeItem("cohorts");
      localStorage.removeItem("course-information");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSettled: () => {
      //
    },
  });

  return {
    publish,
    isPublishing,
  };
};
