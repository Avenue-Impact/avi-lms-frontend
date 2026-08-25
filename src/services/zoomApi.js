import { axiosAdmin } from "./api";

// Zoom Account Management
export const fetchZoomAccounts = async () => {
  return await axiosAdmin.get("/zoom/list");
};

export const addZoomAccountApi = async (data) => {
  return await axiosAdmin.post("/zoom/add", data);
};

export const updateZoomAccountApi = async ({ id, data }) => {
  return await axiosAdmin.put(`/zoom/${id}`, data);
};

export const toggleZoomAccountApi = async (id) => {
  return await axiosAdmin.put(`/zoom/${id}/toggle`);
};

export const testZoomAccountApi = async (id) => {
  return await axiosAdmin.post(`/zoom/${id}/test`);
};

export const assignZoomToCohortApi = async ({ cohortId, zoom_account_id }) => {
  return await axiosAdmin.put(`/zoom/cohorts/${cohortId}/assign`, { zoom_account_id });
};

export const fetchZoomAccountScheduleApi = async (id) => {
  return await axiosAdmin.get(`/zoom/${id}/schedule`);
};
