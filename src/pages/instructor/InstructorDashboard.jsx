import React, { useState } from "react";
import { useFetchDashboardStats } from "@/hooks/instructor/use-fetch-dashboard-stats";
import { useFetchRecentSubmissions } from "@/hooks/instructor/use-fetch-recent-submissions";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Users,
  FileCheck,
  Video,
  Calendar,
  ArrowRight,
} from "lucide-react";
import AssignmentReviewModal from "@/Components/instructor/AssignmentReviewModal";
import { useInstructorAuth } from "@/hooks/instructor/use-instructor-auth";
import fallbackCourseImage from "@/assets/images/join_team.png";

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="flex-1 rounded-lg border-2 border-[#CC1747] bg-[#CC1747]/5 p-4 lg:mx-2">
    <p className="text-[16px] text-gray-800">{label}</p>
    <h1 className="pt-4 text-6xl font-[500]">{value}</h1>
  </div>
);

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const { data: statsData, isLoading: statsLoading } = useFetchDashboardStats();
  const { data: subsData, isLoading: subsLoading } =
    useFetchRecentSubmissions();
  const { data: instructor } = useInstructorAuth();
  const [reviewSubmission, setReviewSubmission] = useState(null);

  const stats = statsData?.data || {};
  const submissions = subsData?.data?.submissions || [];

  // 3. Navigation Helper
  const handleJoin = (courseId, title, cohort, cohortId) => {
    const params = new URLSearchParams({
      title: title || "",
      cohort: cohort,
      cohortId: cohortId || "",
    });
    navigate(`/meeting/${courseId}?${params.toString()}`);
  };

  if (statsLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary-color-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {instructor?.firstname || "Instructor"}!
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your courses, cohorts, and student activity
        </p>
      </div>

      {/* Stat Cards */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={BookOpen}
          label="Total Courses"
          value={stats.totalCourses ?? 0}
          color="bg-indigo-500"
        />
        <StatCard
          icon={Users}
          label="Active Cohorts"
          value={stats.activeCohorts ?? 0}
          color="bg-emerald-500"
        />
        <StatCard
          icon={FileCheck}
          label="Assignments to Review"
          value={stats.assignmentsToReview ?? 0}
          color="bg-amber-500"
        />
        <StatCard
          icon={Video}
          label="Upcoming Live Sessions"
          value={stats.upcomingLiveSessions ?? 0}
          color="bg-rose-500"
        />
      </div>

      {/* Upcoming Class */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Upcoming Class</h2>

        {stats.nextClass && stats.nextClass.length > 0 ? (
          stats.nextClass.map((session, index) => (
            <div
              key={session.cohortId || index}
              className="relative flex flex-col gap-6 overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="flex flex-1 flex-col gap-1">
                {/* Time Label */}
                <span className="text-xs font-medium text-gray-400">
                  {session.classDays} at {session.time}
                </span>

                {/* Main Title */}
                <h3 className="text-xl font-bold text-gray-900">
                  {session.courseTitle} – {session.cohort}
                </h3>

                {/* Subtitle/Overview (Introduction to...) */}
                <p className="text-sm text-gray-400">
                  {session.liveSessionTitle || "Introduction to Analytics"}
                </p>
              </div>

              {/* Course Image - matches the right side placement in your image */}
              <div className="flex flex-col items-end">
                <div className="h-48 w-full flex-shrink-0 overflow-hidden rounded-lg sm:h-48 sm:w-72">
                  <img
                    src={session.courseImage || fallbackCourseImage}
                    alt={session.courseTitle}
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Join Button - positioned at bottom for mobile, or beside text for desktop */}
                <div className="mt-4">
                  <button
                    onClick={() =>
                      handleJoin(
                        session.courseId,
                        session.courseTitle,
                        session.cohort,
                        session.cohortId,
                      )
                    }
                    className="flex items-center justify-center gap-2 rounded-md bg-[#D91E49] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#b5193d]"
                  >
                    Join Live Session
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div className="rounded-xl border border-dashed border-gray-200 bg-white p-12 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-50 text-gray-300">
                <Video size={32} />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              No Upcoming classes yet
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              You haven't scheduled any live classes yet.
            </p>
          </div>
        )}
      </div>

      {/* Recent Submissions Table */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Recent Submissions
        </h2>
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          {subsLoading ? (
            <div className="p-10 text-center text-gray-400">
              Loading submissions...
            </div>
          ) : submissions.length === 0 ? (
            <div className="p-10 text-center">
              <FileCheck size={32} className="mx-auto mb-3 text-gray-300" />
              <p className="font-medium text-gray-500">
                No submissions to review
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Student submissions will appear here.
              </p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="w-12 px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    S/N
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Student
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Assignment
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Submitted
                  </th>
                  <th className="w-28 px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub, idx) => (
                  <tr
                    key={sub.id}
                    className="border-b border-gray-50 transition-colors hover:bg-gray-50/50"
                  >
                    <td className="px-5 py-3.5 font-medium text-gray-500">
                      {idx + 1}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-color-100 text-xs font-bold text-primary-color-600">
                          {sub.student_id?.firstname?.[0] || "?"}
                          {sub.student_id?.lastname?.[0] || ""}
                        </div>
                        <span className="font-medium text-gray-800">
                          {sub.student_id?.firstname || "Unknown"}{" "}
                          {sub.student_id?.lastname || ""}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">{sub.title}</td>
                    <td className="px-5 py-3.5 text-gray-500">
                      {sub.date_submitted
                        ? new Date(sub.date_submitted).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )
                        : sub.created_at
                          ? new Date(sub.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )
                          : "—"}
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => setReviewSubmission(sub)}
                        className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors ${
                          sub.status === "reviewed"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-600 hover:bg-red-100"
                        }`}
                      >
                        {sub.status === "reviewed" ? "Reviewed" : "Review"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Assignment Review Modal */}
      {reviewSubmission && (
        <AssignmentReviewModal
          submission={reviewSubmission}
          onClose={() => setReviewSubmission(null)}
        />
      )}
    </div>
  );
};

export default InstructorDashboard;
