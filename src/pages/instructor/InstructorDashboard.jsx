import React, { useState } from "react";
import { useFetchDashboardStats } from "@/hooks/instructor/use-fetch-dashboard-stats";
import { useFetchRecentSubmissions } from "@/hooks/instructor/use-fetch-recent-submissions";
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

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="flex-1 rounded-lg border-2 border-[#CC1747] bg-[#CC1747]/5 p-4 lg:mx-2">
    <p className="text-[16px] text-gray-800">{label}</p>
    <h1 className="pt-4 text-6xl font-[500]">{value}</h1>
  </div>
);

const InstructorDashboard = () => {
  const { data: statsData, isLoading: statsLoading } = useFetchDashboardStats();
  const { data: subsData, isLoading: subsLoading } =
    useFetchRecentSubmissions();
  const { data: instructor } = useInstructorAuth();
  const [reviewSubmission, setReviewSubmission] = useState(null);

  const stats = statsData?.data || {};
  const submissions = subsData?.data?.submissions || [];

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
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Upcoming Class
        </h2>
        {stats.nextClass ? (
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-primary-color-50 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl">
                <Video size={24} className="text-primary-color-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">
                  {stats.nextClass.courseTitle} –{" "}
                  <span className="text-primary-color-600">
                    {stats.nextClass.cohort}
                  </span>
                </h3>
                <div className="mt-1.5 flex items-center gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {stats.nextClass.classDays}
                  </span>
                  <span>@ {stats.nextClass.time}</span>
                </div>
              </div>
            </div>
            <button className="hover:bg-primary-color-700 flex items-center gap-2 rounded-lg bg-primary-color-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors">
              Join Live Session
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-200 bg-white p-12 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
                <Video size={32} className="text-gray-300" />
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
