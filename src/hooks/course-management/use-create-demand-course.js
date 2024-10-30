import { addDemandSection } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateOnDemandCourse() {
  const queryClient = useQueryClient()
  const { mutate: createOnDemandCourse, isPending: isCreating } = useMutation({
    mutationFn: addDemandSection,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries("get-demand-course");
    },
    onError: (err) =>
      toast.error(err.response.data.message || "something went wrong"),
  });

  return { createOnDemandCourse, isCreating, }
}