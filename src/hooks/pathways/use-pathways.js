import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAdminPathwaysApi,
  fetchPublicPathwaysApi,
  createPathwayApi,
  deletePathwayApi,
  togglePathwayStatusApi,
} from "@/services/api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const useFetchAdminPathways = () => {
  return useQuery({
    queryKey: ["admin-pathways"],
    queryFn: async () => {
      const token = Cookies.get("adminToken");
      const hasValidToken = Boolean(token && token !== "undefined" && token !== "null");
      
      if (hasValidToken) {
        try {
          return await fetchAdminPathwaysApi();
        } catch (err) {
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            // Fall back cleanly to public pathways
            return await fetchPublicPathwaysApi();
          }
          throw err;
        }
      }
      return await fetchPublicPathwaysApi();
    },
    staleTime: 60 * 1000,
  });
};

export const useFetchPublicPathways = () => {
  return useQuery({
    queryKey: ["public-pathways"],
    queryFn: fetchPublicPathwaysApi,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreatePathway = () => {
  const queryClient = useQueryClient();
  const { mutate: createPathway, isPending: isCreating } = useMutation({
    mutationFn: createPathwayApi,
    onSuccess: () => {
      toast.success("Pathway created successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-pathways"] });
      queryClient.invalidateQueries({ queryKey: ["public-pathways"] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to create pathway"
      );
    },
  });

  return { createPathway, isCreating };
};

export const useDeletePathway = () => {
  const queryClient = useQueryClient();
  const { mutate: deletePathway, isPending: isDeleting } = useMutation({
    mutationFn: deletePathwayApi,
    onSuccess: () => {
      toast.success("Pathway deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-pathways"] });
      queryClient.invalidateQueries({ queryKey: ["public-pathways"] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete pathway"
      );
    },
  });

  return { deletePathway, isDeleting };
};

export const useTogglePathwayStatus = () => {
  const queryClient = useQueryClient();
  const { mutate: togglePathway, isPending: isToggling } = useMutation({
    mutationFn: togglePathwayStatusApi,
    onSuccess: () => {
      toast.success("Pathway status updated");
      queryClient.invalidateQueries({ queryKey: ["admin-pathways"] });
      queryClient.invalidateQueries({ queryKey: ["public-pathways"] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update pathway status"
      );
    },
  });

  return { togglePathway, isToggling };
};
