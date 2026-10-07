import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import AssessmentHeader from "./components/AssessmentHeader";
import AssessmentProgressBar from "./components/AssessmentProgressBar";
import QuestionView from "./components/QuestionView";
import SingleResultView from "./components/SingleResultView";
import TiedResultView from "./components/TiedResultView";
import AssessmentLeadModal from "./components/AssessmentLeadModal";
import {
  ASSESSMENT_QUESTIONS,
  calculateAssessmentResults,
  resolveCoursesForAssessment,
} from "./components/AssessmentData";
import { useFetchAllCourses } from "@/hooks/students/use-fetch-all-courses";
import { useProfile } from "@/hooks/students/use-fetch-student-profile";
import { submitCareerAssessmentApi } from "@/services/api";
import {
  persistCareerAssessment,
  getAssessmentDraftAnswers,
  setAssessmentDraftAnswers,
  clearAssessmentDraftAnswers,
  getStoredAssessmentUser,
  setStoredAssessmentUser,
} from "@/utils/careerAssessment";

export default function AssessmentPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isViewResultParam = searchParams.get("viewResult") === "true";

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState(() => getAssessmentDraftAnswers());
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const notificationSentRef = useRef(false);

  const token = Cookies.get("token");
  const isAuthenticated = Boolean(token);

  const { data: profileData } = useProfile({ enabled: isAuthenticated });
  const currentUser = profileData?.data;

  const { data: coursesData } = useFetchAllCourses({ perPage: 50 });
  const liveCourses = coursesData?.data?.data?.courses || coursesData?.data?.courses || [];

  const totalSteps = ASSESSMENT_QUESTIONS.length;
  const currentQuestion = ASSESSMENT_QUESTIONS[currentStepIndex];
  const selectedOption = answers[currentQuestion?.id] || null;

  const handleSelectOption = (option) => {
    setAnswers((prev) => {
      const updated = {
        ...prev,
        [currentQuestion.id]: option,
      };
      setAssessmentDraftAnswers(updated);
      return updated;
    });
  };

  const finishAssessment = (activeAnswers, userOverride = null) => {
    const rawResults = calculateAssessmentResults(activeAnswers);
    const enrichedResults = resolveCoursesForAssessment(rawResults, liveCourses);
    setResults(enrichedResults);
    setIsCompleted(true);

    const topMatchCourses = enrichedResults.topMatch?.courses || [];
    const runnerUpCourses = enrichedResults.runnerUp?.courses || [];
    const combined = [...topMatchCourses];
    for (const c of runnerUpCourses) {
      if (!combined.some((x) => (x.id || x._id) === (c.id || c._id))) {
        combined.push(c);
      }
    }
    for (const c of liveCourses) {
      if (!combined.some((x) => (x.id || x._id) === (c.id || c._id))) {
        combined.push(c);
      }
      if (combined.length >= 3) break;
    }

    const targetUser = userOverride || currentUser || getStoredAssessmentUser();
    const userPayload = targetUser?.email ? {
      firstName: targetUser.first_name || targetUser.firstName || targetUser.firstname || "Student",
      lastName: targetUser.last_name || targetUser.lastName || targetUser.lastname || "",
      email: targetUser.email,
    } : null;

    persistCareerAssessment({
      pathwayKey: enrichedResults.topMatch?.id || "",
      pathwayTitle: enrichedResults.topMatch?.title || "",
      recommendedCourses: combined.slice(0, 3),
      userDetails: userPayload,
      matchScore: enrichedResults.topMatch?.percentageMatch || enrichedResults.topMatch?.matchScore || 95,
      summary: enrichedResults.topMatch?.summary || "",
      isTied: enrichedResults.isTied || false,
      topMatch: {
        pathwayKey: enrichedResults.topMatch?.id || "",
        pathwayTitle: enrichedResults.topMatch?.title || "",
        matchScore: enrichedResults.topMatch?.percentageMatch || enrichedResults.topMatch?.matchScore || 95,
        summary: enrichedResults.topMatch?.summary || "",
      },
      runnerUp: enrichedResults.runnerUp ? {
        pathwayKey: enrichedResults.runnerUp?.id || "",
        pathwayTitle: enrichedResults.runnerUp?.title || "",
        matchScore: enrichedResults.runnerUp?.percentageMatch || enrichedResults.runnerUp?.matchScore || 85,
        summary: enrichedResults.runnerUp?.summary || "",
      } : null,
      matches: (enrichedResults.allRanked || []).map((m, idx) => ({
        pathwayKey: m.id || "",
        pathwayTitle: m.title || "",
        matchScore: m.percentageMatch || m.matchScore || 0,
        summary: m.summary || "",
        rank: idx + 1,
      })),
      answers: activeAnswers,
    });

    if (userPayload?.email && !notificationSentRef.current) {
      notificationSentRef.current = true;
      toast.success("Welcome! Your career assessment results are ready and have been sent to your email.");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContinue = () => {
    if (!selectedOption) return;

    // After completing Question 4 (index 3), prompt with AssessmentLeadModal if not logged in and details not captured
    const storedUser = getStoredAssessmentUser();
    if (currentStepIndex === 3 && !isAuthenticated && !storedUser?.email) {
      setShowAuthModal(true);
      return;
    }

    if (currentStepIndex + 1 < totalSteps) {
      setCurrentStepIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // If at end of assessment and no user details or auth, prompt before finalizing
      if (!isAuthenticated && !storedUser?.email && !currentUser?.email) {
        setShowAuthModal(true);
        return;
      }
      finishAssessment(answers);
    }
  };

  const handleLeadSubmit = async (leadData) => {
    setIsSubmittingLead(true);
    try {
      setStoredAssessmentUser(leadData);

      const activeAnswers = Object.keys(answers).length > 0 ? answers : getAssessmentDraftAnswers();

      // Trigger backend Salesforce sync and store email lead record upon modal submit button click
      await submitCareerAssessmentApi({
        email: leadData.email,
        firstName: leadData.firstName,
        lastName: leadData.lastName,
        phoneNumber: leadData.phoneNumber,
        subscribe: leadData.subscribe,
        answers: activeAnswers,
      }).catch((err) => console.warn("Background lead sync warning:", err));

      if (currentStepIndex + 1 < totalSteps) {
        setShowAuthModal(false);
        setCurrentStepIndex((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        await finishAssessment(activeAnswers, leadData);
        setShowAuthModal(false);
      }
    } catch (err) {
      console.error("Error saving assessment lead:", err);
      toast.error("An error occurred while saving your details. Please try again.");
    } finally {
      setIsSubmittingLead(false);
    }
  };

  // When redirected back from signup/login (e.g. /assessment?viewResult=true)
  useEffect(() => {
    if (isViewResultParam) {
      const draftAnswers = Object.keys(answers).length > 0 ? answers : getAssessmentDraftAnswers();
      if (Object.keys(draftAnswers).length > 0) {
        setAnswers(draftAnswers);
        const activeUser = currentUser || getStoredAssessmentUser();
        finishAssessment(draftAnswers, activeUser);
      }
    }
  }, [isViewResultParam, currentUser, liveCourses]);

  // Re-enrich results when liveCourses arrive from network
  useEffect(() => {
    if (isCompleted && Object.keys(answers).length > 0 && liveCourses.length > 0) {
      const rawResults = calculateAssessmentResults(answers);
      const enrichedResults = resolveCoursesForAssessment(rawResults, liveCourses);
      setResults(enrichedResults);

      const targetUser = currentUser || getStoredAssessmentUser();
      const userPayload = targetUser?.email ? {
        firstName: targetUser.first_name || targetUser.firstName || targetUser.firstname || "Student",
        lastName: targetUser.last_name || targetUser.lastName || targetUser.lastname || "",
        email: targetUser.email,
      } : null;

      persistCareerAssessment({
        pathwayKey: enrichedResults.topMatch?.id || "",
        pathwayTitle: enrichedResults.topMatch?.title || "",
        recommendedCourses: (enrichedResults.topMatch?.courses || []).slice(0, 3),
        userDetails: userPayload,
        matchScore: enrichedResults.topMatch?.percentageMatch || enrichedResults.topMatch?.matchScore || 95,
        summary: enrichedResults.topMatch?.summary || "",
        isTied: enrichedResults.isTied || false,
        topMatch: {
          pathwayKey: enrichedResults.topMatch?.id || "",
          pathwayTitle: enrichedResults.topMatch?.title || "",
          matchScore: enrichedResults.topMatch?.percentageMatch || enrichedResults.topMatch?.matchScore || 95,
          summary: enrichedResults.topMatch?.summary || "",
        },
        runnerUp: enrichedResults.runnerUp ? {
          pathwayKey: enrichedResults.runnerUp?.id || "",
          pathwayTitle: enrichedResults.runnerUp?.title || "",
          matchScore: enrichedResults.runnerUp?.percentageMatch || enrichedResults.runnerUp?.matchScore || 85,
          summary: enrichedResults.runnerUp?.summary || "",
        } : null,
        matches: (enrichedResults.allRanked || []).map((m, idx) => ({
          pathwayKey: m.id || "",
          pathwayTitle: m.title || "",
          matchScore: m.percentageMatch || m.matchScore || 0,
          summary: m.summary || "",
          rank: idx + 1,
        })),
        answers,
      });
    }
  }, [liveCourses, isCompleted]);

  // If already completed and user profile finishes loading, dispatch notification email
  useEffect(() => {
    if (isCompleted && currentUser?.email && !notificationSentRef.current && results) {
      finishAssessment(answers, currentUser);
    }
  }, [currentUser, isCompleted, results]);

  const handleRestart = () => {
    clearAssessmentDraftAnswers();
    notificationSentRef.current = false;
    setCurrentStepIndex(0);
    setAnswers({});
    setIsCompleted(false);
    setResults(null);
    if (searchParams.has("viewResult")) {
      searchParams.delete("viewResult");
      setSearchParams(searchParams, { replace: true });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#EFF1F8] flex flex-col font-inter text-[#0A1430] antialiased">
      {/* Global Assessment Header */}
      <AssessmentHeader onExit={() => window.location.href = "/"} />

      {/* Assessment Lead Modal matching screenshot design */}
      <AssessmentLeadModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSubmit={handleLeadSubmit}
        isSubmitting={isSubmittingLead}
      />

      <main className="flex-1 flex flex-col justify-start pb-16">
        {!isCompleted ? (
          <>
            {/* Step Progress Bar */}
            <AssessmentProgressBar
              currentStep={currentStepIndex + 1}
              totalSteps={totalSteps}
            />

            {/* Active Question */}
            <QuestionView
              question={currentQuestion}
              selectedOption={selectedOption}
              onSelectOption={handleSelectOption}
              onContinue={handleContinue}
            />
          </>
        ) : (
          <>
            {/* Render appropriate Results view */}
            {results?.isTied ? (
              <TiedResultView
                topMatch={results.topMatch}
                runnerUp={results.runnerUp}
                otherMatches={results.otherMatches}
                onRestart={handleRestart}
              />
            ) : (
              <SingleResultView
                topMatch={results?.topMatch}
                otherMatches={results?.otherMatches}
                onRestart={handleRestart}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
