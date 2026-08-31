import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";
import toast from "react-hot-toast";

const updateOndemandDurationApi = async ({
  courseId,
  studentId,
  subscription_expires,
}) => {
  return await axiosAdmin.put(
    `/courses/${courseId}/on-demand-section/enrolled-students/${studentId}/access-duration`,
    { subscription_expires }
  );
};

export const useUpdateOndemandDuration = () => {
  const queryClient = useQueryClient();
  const { mutate: updateDuration, isPending } = useMutation({
    mutationFn: updateOndemandDurationApi,
    onSuccess: ({ data }) => {
      toast.success(data.message || "Subscription duration updated successfully");
      queryClient.invalidateQueries({ queryKey: ["get-ondemand-student"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  return { updateDuration, isPending };
};
