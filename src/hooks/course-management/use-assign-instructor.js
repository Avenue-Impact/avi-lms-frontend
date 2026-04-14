import { assignInstructor } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useAssignInstructor = (courseId, cohortId) => {
  const queryClient = useQueryClient();

  const { mutate: assign, isLoading: isAssigning } = useMutation({
    mutationFn: (instructorId) => assignInstructor({ courseId, cohortId, instructor_id: instructorId }),
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Instructor assigned successfully");
      queryClient.invalidateQueries(["get-cohorts"]);
      queryClient.invalidateQueries(["get-single-cohort", { courseId, cohortId }]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to assign instructor");
    },
  });

  return { assign, isAssigning };
};
