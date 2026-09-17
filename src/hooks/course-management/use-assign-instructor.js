import { assignInstructor, removeInstructor } from "@/services/api";
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
      queryClient.invalidateQueries(["get-cohort", courseId, cohortId]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to assign instructor");
    },
  });

  const { mutate: remove, isLoading: isRemoving } = useMutation({
    mutationFn: (targetCohortId) =>
      removeInstructor({
        courseId,
        cohortId: targetCohortId || cohortId,
      }),
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Instructor removed successfully");
      queryClient.invalidateQueries(["get-cohorts"]);
      queryClient.invalidateQueries(["get-single-cohort", { courseId, cohortId }]);
      queryClient.invalidateQueries(["get-cohort", courseId, cohortId]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to remove instructor");
    },
  });

  return { assign, isAssigning, remove, isRemoving };
};

export const useRemoveInstructor = (courseId) => {
  const queryClient = useQueryClient();

  const { mutate: remove, isLoading: isRemoving } = useMutation({
    mutationFn: (cohortId) => removeInstructor({ courseId, cohortId }),
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Instructor removed successfully");
      queryClient.invalidateQueries(["get-cohorts"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to remove instructor");
    },
  });

  return { remove, isRemoving };
};
