import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { STUDENT_BASE_URL } from "@/constant";
import { axiosAdmin } from "@/services/api";

// Public / User success stories client
const publicApi = axios.create({
  baseURL: `${STUDENT_BASE_URL}/success-stories`,
  withCredentials: true,
});

publicApi.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 1. Fetch public approved stories
export const useGetSuccessStories = (category = "All") => {
  return useQuery({
    queryKey: ["successStories", category],
    queryFn: async () => {
      const res = await publicApi.get("", {
        params: category && category !== "All" ? { category } : {},
      });
      return res.data?.data || [];
    },
  });
};

// 2. Fetch dashboard display stories
export const useGetDashboardSuccessStories = () => {
  return useQuery({
    queryKey: ["dashboardSuccessStories"],
    queryFn: async () => {
      const res = await publicApi.get("dashboard");
      return res.data?.data || [];
    },
  });
};

// 3. Create success story mutation
export const useCreateSuccessStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const res = await publicApi.post("", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Success story submitted successfully!");
      queryClient.invalidateQueries(["successStories"]);
    },
    onError: (error) => {
      const msg = error.response?.data?.message || "Failed to submit success story";
      toast.error(msg);
    },
  });
};

// 4. Admin fetch stories
export const useGetAdminSuccessStories = ({ search = "", status = "all", page = 1, limit = 20 } = {}) => {
  return useQuery({
    queryKey: ["adminSuccessStories", search, status, page, limit],
    queryFn: async () => {
      const res = await axiosAdmin.get("/success-stories", {
        params: { search, status, page, limit },
      });
      return res.data?.data || { stories: [], total: 0, page: 1, totalPages: 1 };
    },
  });
};

// 5. Admin story actions
export const useAdminStoryActions = () => {
  const queryClient = useQueryClient();

  const toggleApprovalMutation = useMutation({
    mutationFn: async ({ id, is_approved }) => {
      const res = await axiosAdmin.patch(`/success-stories/${id}/approve`, { is_approved });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Story status updated");
      queryClient.invalidateQueries(["adminSuccessStories"]);
      queryClient.invalidateQueries(["successStories"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update story status");
    },
  });

  const toggleDashboardDisplayMutation = useMutation({
    mutationFn: async ({ id, dashboard_display }) => {
      const res = await axiosAdmin.patch(`/success-stories/${id}/dashboard-display`, { dashboard_display });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Dashboard display updated");
      queryClient.invalidateQueries(["adminSuccessStories"]);
      queryClient.invalidateQueries(["dashboardSuccessStories"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update dashboard display");
    },
  });

  const bulkActionMutation = useMutation({
    mutationFn: async ({ ids, action }) => {
      const res = await axiosAdmin.post("/success-stories/bulk", { ids, action });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Bulk operation completed successfully");
      queryClient.invalidateQueries(["adminSuccessStories"]);
      queryClient.invalidateQueries(["successStories"]);
      queryClient.invalidateQueries(["dashboardSuccessStories"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Bulk action failed");
    },
  });

  const deleteStoryMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosAdmin.delete(`/success-stories/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Story deleted successfully");
      queryClient.invalidateQueries(["adminSuccessStories"]);
      queryClient.invalidateQueries(["successStories"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete story");
    },
  });

  return {
    toggleApproval: toggleApprovalMutation.mutateAsync,
    isTogglingApproval: toggleApprovalMutation.isPending,
    toggleDashboardDisplay: toggleDashboardDisplayMutation.mutateAsync,
    isTogglingDashboard: toggleDashboardDisplayMutation.isPending,
    bulkAction: bulkActionMutation.mutateAsync,
    isBulkActing: bulkActionMutation.isPending,
    deleteStory: deleteStoryMutation.mutateAsync,
    isDeleting: deleteStoryMutation.isPending,
  };
};
