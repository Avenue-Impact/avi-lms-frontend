import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { saveCareerAssessmentApi, submitCareerAssessmentApi } from "../services/api";
import { useProfile } from "../hooks/students/use-fetch-student-profile";

const ASSESSMENT_STORAGE_KEY = "avi_career_assessment";
const USER_DETAILS_STORAGE_KEY = "avi_career_assessment_user";

export const getStoredAssessmentUser = () => {
  try {
    const raw = localStorage.getItem(USER_DETAILS_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
};

export const setStoredAssessmentUser = (user) => {
  try {
    localStorage.setItem(USER_DETAILS_STORAGE_KEY, JSON.stringify(user));
  } catch (e) {
    console.error("Failed to store assessment user:", e);
  }
};

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
  userDetails = null,
  matchScore = 95,
  summary = "",
}) => {
  const payload = {
    completed: true,
    completedAt: new Date().toISOString(),
    pathwayKey,
    pathwayTitle,
    matchScore,
    summary,
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
    if (userDetails) {
      setStoredAssessmentUser(userDetails);
    }
    window.dispatchEvent(new Event("career-assessment-updated"));
  } catch (e) {
    console.error("Failed to write to localStorage:", e);
  }

  const courseIds = recommendedCourses
    .slice(0, 3)
    .map((c) => c.id || c._id)
    .filter(Boolean);

  // 2. Submit to backend to trigger email report (Scenario 5)
  const effectiveUser = userDetails || getStoredAssessmentUser();
  if (effectiveUser?.email) {
    try {
      await submitCareerAssessmentApi({
        email: effectiveUser.email,
        firstName: effectiveUser.firstName,
        lastName: effectiveUser.lastName,
        pathway_key: pathwayKey,
        pathway_title: pathwayTitle,
        match_score: matchScore,
        summary,
        recommended_courses: courseIds,
      });
    } catch (submitErr) {
      console.warn("Could not submit assessment results email:", submitErr);
    }
  } else {
    // If logged in without explicit userDetails, save directly to profile
    const token = Cookies.get("token");
    if (token) {
      try {
        await saveCareerAssessmentApi({
          pathway_key: pathwayKey,
          pathway_title: pathwayTitle,
          recommended_courses: courseIds,
        });
      } catch (err) {
        console.warn("Could not sync assessment to backend:", err);
      }
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
