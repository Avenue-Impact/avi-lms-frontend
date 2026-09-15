import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { saveCareerAssessmentApi } from "../services/api";
import { useProfile } from "../hooks/students/use-fetch-student-profile";

const ASSESSMENT_STORAGE_KEY = "avi_career_assessment";

/**
 * Read the local assessment record from localStorage
 */
export const getStoredAssessment = () => {
  try {
    const raw = localStorage.getItem(ASSESSMENT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse stored assessment:", e);
    return null;
  }
};

/**
 * Persist assessment result locally and to the backend if logged in
 */
export const persistCareerAssessment = async ({
  pathwayKey = "",
  pathwayTitle = "",
  recommendedCourses = [],
}) => {
  const payload = {
    completed: true,
    completedAt: new Date().toISOString(),
    pathwayKey,
    pathwayTitle,
    recommendedCourses: recommendedCourses.slice(0, 3).map((c) => ({
      id: c.id || c._id,
      title: c.title,
      slug: c.slug,
      cover_image: c.cover_image || c.coverImage,
      overview: c.overview || c.description,
      average_rating: c.average_rating,
    })),
  };

  // 1. Save to localStorage
  try {
    localStorage.setItem(ASSESSMENT_STORAGE_KEY, JSON.stringify(payload));
    window.dispatchEvent(new Event("career-assessment-updated"));
  } catch (e) {
    console.error("Failed to write to localStorage:", e);
  }

  // 2. If logged in, save to backend
  const token = Cookies.get("token");
  if (token) {
    try {
      const courseIds = recommendedCourses
        .slice(0, 3)
        .map((c) => c.id || c._id)
        .filter(Boolean);

      await saveCareerAssessmentApi({
        pathway_key: pathwayKey,
        pathway_title: pathwayTitle,
        recommended_courses: courseIds,
      });
    } catch (err) {
      console.warn("Could not sync assessment to backend:", err);
    }
  }

  return payload;
};

/**
 * Custom React hook to get career assessment status and recommendations.
 * Combines authenticated user profile with localStorage fallback.
 */
export const useCareerAssessment = () => {
  const { data: profileData, isLoading: profileLoading } = useProfile();
  const [localAssessment, setLocalAssessment] = useState(() => getStoredAssessment());

  useEffect(() => {
    const handleUpdate = () => {
      setLocalAssessment(getStoredAssessment());
    };
    window.addEventListener("career-assessment-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("career-assessment-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const profileAssessment = profileData?.data?.data?.career_assessment;

  // If backend profile has completed assessment
  if (profileAssessment?.completed) {
    const courses = (profileAssessment.recommended_courses || []).slice(0, 3);
    return {
      isLoading: profileLoading,
      hasCompleted: true,
      pathway: profileAssessment.pathway_title || profileAssessment.pathway_key,
      courses,
      count: courses.length,
    };
  }

  // Fallback to local assessment if completed
  if (localAssessment?.completed) {
    const courses = (localAssessment.recommendedCourses || []).slice(0, 3);
    return {
      isLoading: profileLoading,
      hasCompleted: true,
      pathway: localAssessment.pathwayTitle || localAssessment.pathwayKey,
      courses,
      count: courses.length,
    };
  }

  // User has NOT completed the assessment
  return {
    isLoading: profileLoading,
    hasCompleted: false,
    pathway: null,
    courses: [],
    count: 0,
  };
};
