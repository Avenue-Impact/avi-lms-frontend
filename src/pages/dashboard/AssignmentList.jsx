import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, CheckCircle, AlertCircle, Eye, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { axiosStudent } from "@/services/api";
import { useActiveAssignments } from "@/hooks/students/use-active-assignments";
import { liveSessionDetailQuery, recordedSessionDetailQuery } from "@/loaders/student/home-page-loader";

export default function AssignmentList() {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  // 1. Fetch Enrolled Courses
  const { data: liveData } = useQuery(liveSessionDetailQuery());
  const { data: onDemandData } = useQuery(recordedSessionDetailQuery());

  const liveCourses = liveData?.data?.data?.courses || [];
  const onDemandCourses = onDemandData?.data?.data?.courses || [];
  
  // Combine unique enrolled courses
  const enrolledCourses = [];
  const seenCourseIds = new Set();

  [...liveCourses, ...onDemandCourses].forEach((courseItem) => {
    const course = courseItem.course || courseItem;
    if (course && course._id && !seenCourseIds.has(course._id)) {
      seenCourseIds.add(course._id);
      enrolledCourses.push({
        id: course._id,
        title: course.title,
      });
    }
  });

  // Set default selected course once list loads
  useEffect(() => {
    if (enrolledCourses.length > 0 && !selectedCourseId) {
      setSelectedCourseId(enrolledCourses[0].id);
    }
  }, [enrolledCourses, selectedCourseId]);

  // 2. Fetch Assignments for active course
  const { data: assignmentsResponse, isLoading, isError } = useActiveAssignments(
    page,
    limit,
    selectedCourseId
  );

  const assignments = assignmentsResponse?.data || [];
  const meta = assignmentsResponse?.meta || { totalCount: 0, totalPages: 1 };

  // Filter local assignments by search query
  const filteredAssignments = assignments.filter((task) =>
    task.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6 lg:p-10 space-y-8">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
            Assignments
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            View, track and submit assignments for your active courses.
          </p>
        </div>

        {/* ACTIVE COURSE SELECTOR */}
        <div className="flex items-center gap-2.5">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
            Active Course:
          </label>
          <select
            value={selectedCourseId}
            onChange={(e) => {
              setSelectedCourseId(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm focus:border-rose-500 focus:outline-none transition-colors"
          >
            {enrolledCourses.length === 0 ? (
              <option value="">No enrolled courses</option>
            ) : (
              enrolledCourses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {/* FILTER & SEARCH */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assignments..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-rose-500 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <div className="w-10 h-10 border-4 border-rose-500/20 border-t-rose-500 rounded-full animate-spin" />
            <p className="text-sm font-medium text-gray-500">Loading assignments...</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-2">
            <AlertCircle className="text-rose-500" size={40} />
            <h3 className="font-bold text-gray-900 text-lg">Failed to load assignments</h3>
            <p className="text-sm text-gray-500 max-w-xs">
              Something went wrong on our end. Please try again.
            </p>
          </div>
        ) : filteredAssignments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="p-4 bg-rose-50 text-rose-500 rounded-full">
              <BookOpen size={36} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">No Assignments Found</h3>
              <p className="text-sm text-gray-500 max-w-sm mt-1">
                There are no published tasks for the selected course right now.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-[#FCFCFC]">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-16">
                    S/N
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Assignment
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-28">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAssignments.map((task, idx) => {
                  const isSubmitted = !!task.user_submission;
                  const sn = (page - 1) * limit + idx + 1;
                  const formattedDueDate = new Date(task.due_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });

                  return (
                    <tr
                      key={task.id}
                      className="hover:bg-[#FCFCFC] transition-colors"
                    >
                      {/* S/N */}
                      <td className="px-6 py-4 text-sm font-semibold text-gray-500">
                        {sn}
                      </td>

                      {/* ASSIGNMENT TITLE */}
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900 hover:text-rose-600 transition-colors">
                          {task.title}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          Cohort: {task.cohort_info?.name || "N/A"}
                        </div>
                      </td>

                      {/* DUE DATE */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                          <Calendar size={16} className="text-gray-400" />
                          {formattedDueDate}
                        </div>
                      </td>

                      {/* STATUS BADGE */}
                      <td className="px-6 py-4">
                        {isSubmitted ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                            <CheckCircle size={12} />
                            Submitted
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            <AlertCircle size={12} />
                            Not submitted
                          </span>
                        )}
                      </td>

                      {/* ACTION BUTTON */}
                      <td className="px-6 py-4">
                        <Link
                          to={`/dashboard/assignment/${task.id}`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
                        >
                          <Eye size={14} />
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION PANEL */}
        {meta.totalPages > 1 && (
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 bg-[#FCFCFC]">
            <p className="text-xs font-semibold text-gray-500">
              Showing page {page} of {meta.totalPages}
            </p>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                disabled={page >= meta.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
