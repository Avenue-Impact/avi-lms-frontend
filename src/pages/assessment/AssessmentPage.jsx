import React, { useState } from "react";
import AssessmentHeader from "./components/AssessmentHeader";
import AssessmentProgressBar from "./components/AssessmentProgressBar";
import QuestionView from "./components/QuestionView";
import SingleResultView from "./components/SingleResultView";
import TiedResultView from "./components/TiedResultView";
import {
  ASSESSMENT_QUESTIONS,
  calculateAssessmentResults,
  resolveCoursesForAssessment,
} from "./components/AssessmentData";
import { useFetchAllCourses } from "@/hooks/students/use-fetch-all-courses";

export default function AssessmentPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState(null);

  const { data: coursesData } = useFetchAllCourses({ perPage: 50 });
  const liveCourses = coursesData?.data?.data?.courses || coursesData?.data?.courses || [];

  const totalSteps = ASSESSMENT_QUESTIONS.length;
  const currentQuestion = ASSESSMENT_QUESTIONS[currentStepIndex];
  const selectedOption = answers[currentQuestion?.id] || null;

  const handleSelectOption = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
  };

  const handleContinue = () => {
    if (!selectedOption) return;

    if (currentStepIndex + 1 < totalSteps) {
      setCurrentStepIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Calculate raw results and dynamically resolve real database courses
      const rawResults = calculateAssessmentResults(answers);
      const enrichedResults = resolveCoursesForAssessment(rawResults, liveCourses);
      setResults(enrichedResults);
      setIsCompleted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Re-enrich results when liveCourses arrive from network
  React.useEffect(() => {
    if (isCompleted && Object.keys(answers).length > 0 && liveCourses.length > 0) {
      const rawResults = calculateAssessmentResults(answers);
      const enrichedResults = resolveCoursesForAssessment(rawResults, liveCourses);
      setResults(enrichedResults);
    }
  }, [liveCourses, isCompleted]);

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setAnswers({});
    setIsCompleted(false);
    setResults(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#EFF1F8] flex flex-col font-inter text-[#0A1430] antialiased">
      {/* Global Assessment Header */}
      <AssessmentHeader onExit={() => window.location.href = "/"} />

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
