import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import AssessmentHeader from "./components/AssessmentHeader";
import AssessmentProgressBar from "./components/AssessmentProgressBar";
import QuestionView from "./components/QuestionView";
import SingleResultView from "./components/SingleResultView";
import TiedResultView from "./components/TiedResultView";
import JoinCommunityModal from "@/Components/JoinCommunityModal";
import {
  ASSESSMENT_QUESTIONS,
  calculateAssessmentResults,
  resolveCoursesForAssessment,
} from "./components/AssessmentData";
import { useFetchAllCourses } from "@/hooks/students/use-fetch-all-courses";
import { useProfile } from "@/hooks/students/use-fetch-student-profile";
import {
  persistCareerAssessment,
  getAssessmentDraftAnswers,
  setAssessmentDraftAnswers,
  clearAssessmentDraftAnswers,
  getStoredAssessmentUser,
} from "@/utils/careerAssessment";

export default function AssessmentPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isViewResultParam = searchParams.get("viewResult") === "true";

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState(() => getAssessmentDraftAnswers());
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
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

    // After completing Question 4 (index 3), prompt with JoinCommunityModal if not logged in
    if (currentStepIndex === 3 && !isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    if (currentStepIndex + 1 < totalSteps) {
      setCurrentStepIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      finishAssessment(answers);
    }
  };

  const handleGoogleSuccess = (loggedUser) => {
    setShowAuthModal(false);
    const currentAnswers = Object.keys(answers).length > 0 ? answers : getAssessmentDraftAnswers();
    finishAssessment(currentAnswers, loggedUser);
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

      {/* Auth Modal after Question 4 / Auth Gate matching Learning Hub */}
      <JoinCommunityModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        redirectUrl="/assessment?viewResult=true"
        onSuccess={handleGoogleSuccess}
        title={
          <span>
            Join the Avenue Impact <br className="hidden md:block" /> Community
          </span>
        }
        subtitle="Create a free account or sign in to view your career assessment results and receive your personalized career plan via email."
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
