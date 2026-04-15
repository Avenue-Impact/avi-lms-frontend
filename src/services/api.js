console.log("Loading api.js - Version: FIX-TOKEN-UNDEFINED-V2");
import { BASE_URL, STUDENT_BASE_URL } from "@/constant";
import axios from "axios";
import Cookies from "js-cookie";

const url = import.meta.env.VITE_USER_URL;

export const axiosAdmin = axios.create({
  baseURL: `${BASE_URL}`,
  withCredentials: true, // Important for sending cookies
  headers: {
    // Authorization header is managed by interceptors
  },
});

// Request Interceptor: Attach token dynamically
axiosAdmin.interceptors.request.use(
  (config) => {
    const token = Cookies.get("adminToken");
    // Ensure token is valid and not the string "undefined"
    if (token && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (token === "undefined") {
      // Cleanup bad cookie
      Cookies.remove("adminToken");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: Handle 401/403 with Silent Refresh
axiosAdmin.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Attempt Silent Refresh
        // We use a separate instance or raw axios to avoid infinite loop with interceptors
        await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }, // Ensure cookies are sent
        );

        // If successful, retry original request
        return axiosAdmin(originalRequest);
      } catch (refreshError) {
        // Refresh failed (token expired or invalid)
        Cookies.remove("adminSession"); // Clear session flag
        Cookies.remove("adminToken"); // Clear token
        if (!window.location.pathname.includes("/admin/login")) {
          window.location.href = "/admin/login";
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

// Instructor API instance - uses student token, different base URL
export const axiosInstructor = axios.create({
  baseURL: `${BASE_URL}`.replace("/admins", "/instructor"),
  withCredentials: true,
});

axiosInstructor.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (token === "undefined") {
      Cookies.remove("token");
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstructor.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      Cookies.remove("token");
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export const axiosStudent = axios.create({
  baseURL: `${STUDENT_BASE_URL}/courses`,
  withCredentials: true,
});

axiosStudent.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (token === "undefined") {
      Cookies.remove("token");
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosStudent.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  },
);

export const fetchUserProfile = async () => {
  const token = Cookies.get("token");
  console.log("fetchUserProfile Token:", token); 
  console.log("All Cookies (Parsed):", Cookies.get()); 
  console.log("Raw Cookie String:", document.cookie); // DEBUG: Check raw string

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addDemandSection = async ({ data, courseId }) => {
  return axiosAdmin.post(`/courses/${courseId}/on-demand-section`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addDemandSectionEmpty = async ({ data, courseId }) => {
  return axiosAdmin.post(`/courses/${courseId}/on-demand-section/empty`, data);
};

export const addCourseInformation = async (data) => {
  return axiosAdmin.post(`/courses/course-informations`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editCourseInformationApi = async ({ data, courseId }) => {
  return axiosAdmin.patch(`/courses/${courseId}/course-informations`, data);
};

export const addCourseType = async ({ data, courseId }) => {
  return axiosAdmin.post(`/courses/${courseId}/coursetype`, data);
};

export const addLiveSession = async ({ courseId, cohortId, ...data }) => {
  // const cohort = localStorage.getItem("cohorts"); // No longer needed as we pass cohortId explicitly

  return await axiosAdmin.post(
    `/courses/${courseId}/live-session/${cohortId}`,
    data,
  );
};

export const addRecordedSession = async ({ data, courseId, section }) => {
  return await axiosAdmin.post(
    `/courses/${courseId}/sections/${section}/recorded-session`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

export const fetchDemandCourse = async (courseId) => {
  return await axiosAdmin.get(`/courses/${courseId}/on-demand-section`);
};

// Fetch course information
export const fetchCourseInformation = async (courseId) => {
  return await axiosAdmin.get(`/courses/${courseId}/course-informations`);
};

// Fetch cohorts
export const fetchCohorts = async (courseId) => {
  return await axiosAdmin.get(`/courses/${courseId}/cohorts`);
};

// Add a single cohort
export const addSingleCohort = async ({ data, courseId }) => {
  return await axiosAdmin.post(`/courses/${courseId}/cohorts`, data);
};

export const getSingleCohort = async (courseId, cohortId) => {
  return await axiosAdmin.get(`/courses/${courseId}/cohorts/${cohortId}`);
};

export const addRecordedSessionEmpty = async ({ data, courseId, cohortId }) => {
  return await axiosAdmin.post(
    `/courses/${courseId}/cohorts/${cohortId}/recorded-sessions`,
    data,
  );
};

export const addVideosToRecordedSession = async ({
  data,
  courseId,
  cohortId,
  sectionId,
}) => {
  return await axiosAdmin.post(
    `/courses/${courseId}/cohorts/${cohortId}/recorded-sessions/${sectionId}/videos`,
    data,
  );
};

export const editRecordingSection = async ({
  data,
  courseId,
  cohortId,
  section,
}) => {
  return await axiosAdmin.patch(
    `/courses/${courseId}/cohorts/${cohortId}/sections/${section}`,
    data,
  );
};

export const deleteRecordedSessionVideo = async ({
  courseId,
  cohortId,
  section,
  recordingId,
}) => {
  return await axiosAdmin.delete(
    `/courses/${courseId}/cohorts/${cohortId}/sections/${section}/recorded-session/${recordingId}`,
  );
};

export const getAllVideos = async (page = 1, limit = 20) => {
  return await axiosAdmin.get(`/courses/videos?page=${page}&limit=${limit}`);
};

export const getSectionVideos = async (courseId, cohortId, sectionId) => {
  return await axiosAdmin.get(
    `/courses/${courseId}/cohorts/${cohortId}/recorded-sessions/${sectionId}/videos`,
  );
};

// Video Management API calls
export const createVideo = async (data) => {
  return await axiosAdmin.post("/video/uploads", data);
};

export const updateVideo = async ({ id, data }) => {
  return await axiosAdmin.patch(`/video/${id}`, data);
};

export const deleteVideo = async (id) => {
  return await axiosAdmin.delete(`/video/${id}`);
};

export const toggleCohortLive = async ({ courseId, cohortId, is_live }) => {
  return await axiosAdmin.patch(`/courses/${courseId}/cohorts/${cohortId}`, {
    is_live,
  });
};

export const fetchAdmins = async (page = 1, perPage = 100) => {
  return await axiosAdmin.get(`?page=${page}&perPage=${perPage}`);
};

export const assignInstructor = async ({
  courseId,
  cohortId,
  instructor_id,
}) => {
  return await axiosAdmin.patch(
    `/courses/${courseId}/cohorts/${cohortId}/assign-instructor`,
    { instructor_id },
  );
};

export const updateLiveSessionDetails = async ({
  cohortId,
  title,
  description,
}) => {
  return await axiosInstructor.patch(
    `/cohorts/${cohortId}/live-session/details`,
    { title, description },
  );
};


export const regenerateMeeting = async ({ courseId, cohortId }) => {
  return await axiosAdmin.post(
    `/courses/${courseId}/cohorts/${cohortId}/regenerate-meeting`,
    {},
  );
};

export const regenerateMeetingInstructor = async ({ courseId, cohortId }) => {
  return await axiosInstructor.post(
    `/courses/${courseId}/cohorts/${cohortId}/regenerate-meeting`,
    {},
  );
};