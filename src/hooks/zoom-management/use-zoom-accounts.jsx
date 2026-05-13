import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchZoomAccounts,
  addZoomAccountApi,
  toggleZoomAccountApi,
  testZoomAccountApi,
  assignZoomToCohortApi,
} from "@/services/zoomApi";
import { toast } from "react-hot-toast";

export const useZoomAccounts = () => {
  return useQuery({
    queryKey: ["zoomAccounts"],
    queryFn: fetchZoomAccounts,
  });
};

export const useAddZoomAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addZoomAccountApi,
    onSuccess: () => {
      toast.success("Zoom account added successfully!");
      queryClient.invalidateQueries({ queryKey: ["zoomAccounts"] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to add Zoom account");
    },
  });
};

export const useToggleZoomAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleZoomAccountApi,
    onSuccess: () => {
      toast.success("Account status updated!");
      queryClient.invalidateQueries({ queryKey: ["zoomAccounts"] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to update account");
    },
  });
};

export const useTestZoomAccount = () => {
  return useMutation({
    mutationFn: testZoomAccountApi,
    onSuccess: () => {
      toast.success("Connection verified successfully!");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Connection test failed");
    },
  });
};

export const useAssignZoomToCohort = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: assignZoomToCohortApi,
    onSuccess: () => {
      toast.success("Zoom account assigned to cohort!");
      queryClient.invalidateQueries({ queryKey: ["cohorts"] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to assign Zoom account");
    },
  });
};
