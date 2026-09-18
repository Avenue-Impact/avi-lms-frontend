import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { saveCareerAssessmentApi, submitCareerAssessmentApi } from "../services/api";
import { useProfile } from "../hooks/students/use-fetch-student-profile";
import { calculateAssessmentResults } from "../pages/assessment/components/AssessmentData";

const ASSESSMENT_STORAGE_KEY = "avi_career_assessment";
const USER_DETAILS_STORAGE_KEY = "avi_career_assessment_user";
const DRAFT_ANSWERS_STORAGE_KEY = "avi_assessment_draft_answers";

export const getAssessmentDraftAnswers = () => {
  try {
    const raw = localStorage.getItem(DRAFT_ANSWERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

export const setAssessmentDraftAnswers = (answers) => {
  try {
    localStorage.setItem(DRAFT_ANSWERS_STORAGE_KEY, JSON.stringify(answers));
  } catch (e) {
    console.error("Failed to save draft answers:", e);
  }
};

export const clearAssessmentDraftAnswers = () => {
  try {
    localStorage.removeItem(DRAFT_ANSWERS_STORAGE_KEY);
  } catch (e) {}
};

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
 * Automatically calculates draft answers if any exist and submits them to the backend,
 * ensuring the student's result email is sent immediately upon signup/login.
 */
export const submitAssessmentDraftForUser = async (user) => {
  if (!user || !user.email) return null;
  const draftAnswers = getAssessmentDraftAnswers();
  if (!draftAnswers || Object.keys(draftAnswers).length === 0) return null;

  try {
    const rawResults = calculateAssessmentResults(draftAnswers);
    const firstName = user.firstName || user.firstname || user.first_name || "Student";
    const lastName = user.lastName || user.lastname || user.last_name || "";

    const payload = await persistCareerAssessment({
      pathwayKey: rawResults.topMatch?.id || "",
      pathwayTitle: rawResults.topMatch?.title || "",
      recommendedCourses: [],
      userDetails: {
        email: user.email,
        firstName,
        lastName,
      },
      matchScore: rawResults.topMatch?.percentageMatch || rawResults.topMatch?.matchScore || 95,
      summary: rawResults.topMatch?.summary || "",
      isTied: rawResults.isTied || false,
      topMatch: {
        pathwayKey: rawResults.topMatch?.id || "",
        pathwayTitle: rawResults.topMatch?.title || "",
        matchScore: rawResults.topMatch?.percentageMatch || rawResults.topMatch?.matchScore || 95,
        summary: rawResults.topMatch?.summary || "",
      },
      runnerUp: rawResults.runnerUp ? {
        pathwayKey: rawResults.runnerUp?.id || "",
        pathwayTitle: rawResults.runnerUp?.title || "",
        matchScore: rawResults.runnerUp?.percentageMatch || rawResults.runnerUp?.matchScore || 85,
        summary: rawResults.runnerUp?.summary || "",
      } : null,
      matches: (rawResults.allRanked || []).map((m, idx) => ({
        pathwayKey: m.id || "",
        pathwayTitle: m.title || "",
        matchScore: m.percentageMatch || m.matchScore || 0,
        summary: m.summary || "",
        rank: idx + 1,
      })),
      answers: draftAnswers,
    });

    return payload;
  } catch (err) {
    console.error("Failed to submit draft assessment for user:", err);
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
  isTied = false,
  topMatch = null,
  runnerUp = null,
  matches = [],
  answers = {},
}) => {
  const payload = {
    completed: true,
    completedAt: new Date().toISOString(),
    pathwayKey,
    pathwayTitle,
    matchScore,
    summary,
    isTied,
    topMatch,
    runnerUp,
    matches,
    answers,
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

  const effectiveUser = userDetails || getStoredAssessmentUser();
  const assessmentPayload = {
    pathway_key: pathwayKey,
    pathway_title: pathwayTitle,
    match_score: matchScore,
    summary,
    is_tied: isTied,
    top_match: topMatch ? {
      pathway_key: topMatch.pathwayKey || topMatch.id || pathwayKey,
      pathway_title: topMatch.pathwayTitle || topMatch.title || pathwayTitle,
      match_score: topMatch.matchScore || matchScore,
      summary: topMatch.summary || summary,
    } : undefined,
    runner_up: runnerUp ? {
      pathway_key: runnerUp.pathwayKey || runnerUp.id || "",
      pathway_title: runnerUp.pathwayTitle || runnerUp.title || "",
      match_score: runnerUp.matchScore || 0,
      summary: runnerUp.summary || "",
    } : undefined,
    matches: (matches || []).map((m, idx) => ({
      pathway_key: m.pathwayKey || m.id || "",
      pathway_title: m.pathwayTitle || m.title || "",
      match_score: m.matchScore || m.percentageMatch || 0,
      summary: m.summary || "",
      rank: m.rank || idx + 1,
    })),
    answers: answers && Object.keys(answers).length > 0 ? answers : getAssessmentDraftAnswers(),
    recommended_courses: courseIds,
  };

  // 2. Submit to backend to trigger email report (Scenario 5)
  if (effectiveUser?.email) {
    try {
      await submitCareerAssessmentApi({
        email: effectiveUser.email,
        firstName: effectiveUser.firstName || effectiveUser.firstname || effectiveUser.first_name || "Student",
        lastName: effectiveUser.lastName || effectiveUser.lastname || effectiveUser.last_name || "",
        ...assessmentPayload,
      });
    } catch (submitErr) {
      console.warn("Could not submit assessment results email:", submitErr);
    }
  } else {
    // If logged in without explicit userDetails, save directly to profile
    const token = Cookies.get("token");
    if (token) {
      try {
        await saveCareerAssessmentApi(assessmentPayload);
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
