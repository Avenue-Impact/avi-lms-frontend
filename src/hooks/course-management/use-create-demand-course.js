import { addDemandSection, addDemandSectionEmpty } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateOnDemandCourse() {
  const queryClient = useQueryClient();
  const { mutate: createOnDemandCourse, isPending: isCreating } = useMutation({
    mutationFn: addDemandSection,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries("get-demand-course");
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "something went wrong"),
  });

  return { createOnDemandCourse, isCreating };
}

export function useCreateEmptyOnDemandCourse() {
  const queryClient = useQueryClient();
  const { mutate: createEmptyOnDemandCourse, isPending: isCreatingEmpty } = useMutation({
    mutationFn: addDemandSectionEmpty,
    onSuccess: ({ data }) => {
      toast.success(data?.message || "Section created");
      queryClient.invalidateQueries("get-demand-course");
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "something went wrong"),
  });

  return { createEmptyOnDemandCourse, isCreatingEmpty };
}