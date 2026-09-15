import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstructor, axiosStudent, axiosAdmin } from "@/services/api";
import toast from "react-hot-toast";

// ==========================================
// INSTRUCTOR API CALLS
// ==========================================

const fetchCohortMaterialsApi = async (cohortId) => {
  const { data } = await axiosInstructor.get(`/cohorts/${cohortId}/materials`);
  return data?.data?.materials || [];
};

const createCohortMaterialApi = async ({ cohortId, formData }) => {
  const { data } = await axiosInstructor.post(`/cohorts/${cohortId}/materials`, formData);
  return data;
};

const deleteInstructorMaterialApi = async (materialId) => {
  const { data } = await axiosInstructor.delete(`/materials/${materialId}`);
  return data;
};

export const useFetchCohortMaterials = (cohortId) => {
  return useQuery({
    queryKey: ["cohort-materials", cohortId],
    queryFn: () => fetchCohortMaterialsApi(cohortId),
    enabled: !!cohortId,
  });
};

export const useCreateCohortMaterial = (cohortId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => createCohortMaterialApi({ cohortId, formData }),
    onSuccess: () => {
      queryClient.invalidateQueries(["cohort-materials", cohortId]);
      toast.success("Course material uploaded successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to upload course material");
    },
  });
};

export const useDeleteInstructorMaterial = (cohortId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteInstructorMaterialApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["cohort-materials", cohortId]);
      toast.success("Material deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete material");
    },
  });
};

// ==========================================
// STUDENT API CALLS
// ==========================================

const fetchStudentMaterialsApi = async (courseId, params = {}) => {
  const { data } = await axiosStudent.get(`/enrolled/${courseId}/materials`, {
    params,
  });
  return data?.data?.materials || [];
};

const fetchUnseenMaterialsCountApi = async (courseId, params = {}) => {
  const { data } = await axiosStudent.get(`/enrolled/${courseId}/materials/unseen-count`, {
    params,
  });
  return data?.data?.unseen_count || 0;
};

const recordMaterialViewApi = async ({ courseId, materialId }) => {
  const { data } = await axiosStudent.post(
    `/enrolled/${courseId}/materials/${materialId}/view`
  );
  return data;
};

const recordMaterialDownloadApi = async ({ courseId, materialId }) => {
  const { data } = await axiosStudent.post(
    `/enrolled/${courseId}/materials/${materialId}/download`
  );
  return data;
};

export const useFetchStudentMaterials = (courseId, params = {}) => {
  return useQuery({
    queryKey: ["student-materials", courseId, params],
    queryFn: () => fetchStudentMaterialsApi(courseId, params),
    enabled: !!courseId,
  });
};

export const useFetchUnseenMaterialsCount = (courseId, params = {}) => {
  return useQuery({
    queryKey: ["unseen-materials-count", courseId, params],
    queryFn: () => fetchUnseenMaterialsCountApi(courseId, params),
    enabled: !!courseId,
    refetchInterval: 30000, // Background poll every 30s
  });
};

export const useRecordMaterialView = (courseId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (materialId) => recordMaterialViewApi({ courseId, materialId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["student-materials", courseId]);
      queryClient.invalidateQueries(["unseen-materials-count", courseId]);
    },
  });
};

export const useRecordMaterialDownload = (courseId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (materialId) => recordMaterialDownloadApi({ courseId, materialId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["student-materials", courseId]);
      queryClient.invalidateQueries(["unseen-materials-count", courseId]);
    },
  });
};

// ==========================================
// ADMIN API CALLS
// ==========================================

const fetchAdminMaterialsApi = async (courseId, params = {}) => {
  const { data } = await axiosAdmin.get(`/courses/${courseId}/materials`, {
    params,
  });
  return data?.data?.materials || [];
};

const createAdminMaterialApi = async ({ courseId, formData }) => {
  const { data } = await axiosAdmin.post(`/courses/${courseId}/materials`, formData);
  return data;
};

const deleteAdminMaterialApi = async (materialId) => {
  const { data } = await axiosAdmin.delete(`/courses/materials/${materialId}`);
  return data;
};

export const useFetchAdminMaterials = (courseId, params = {}) => {
  return useQuery({
    queryKey: ["admin-materials", courseId, params],
    queryFn: () => fetchAdminMaterialsApi(courseId, params),
    enabled: !!courseId,
  });
};

export const useCreateAdminMaterial = (courseId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => createAdminMaterialApi({ courseId, formData }),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-materials", courseId]);
      toast.success("Course material uploaded successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to upload course material");
    },
  });
};

export const useDeleteAdminMaterial = (courseId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAdminMaterialApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-materials", courseId]);
      toast.success("Material deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete material");
    },
  });
};
