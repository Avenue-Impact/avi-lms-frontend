import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FileCheck, Download, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useFetchAssignmentSubmissions } from "@/hooks/instructor/use-assignment-submissions";
import AssignmentReviewModal from "@/Components/instructor/AssignmentReviewModal";

const SubmissionsPage = () => {
  const [searchParams] = useSearchParams();
  const urlTaskId = searchParams.get("taskId") || "all";
  
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const itemsPerPage = 40;

  const { data: subsData, isLoading } = useFetchAssignmentSubmissions(urlTaskId, page, itemsPerPage);
  
  const submissions = subsData?.data?.submissions || [];
  const pagination = subsData?.data?.pagination || {};
  const totalPages = pagination.totalPages || 1;

  // Reset page when taskId or searchQuery changes
  useEffect(() => {
    setPage(1);
  }, [urlTaskId, searchQuery]);

  const filtered = useMemo(() => {
    if (!searchQuery) return submissions;
    const q = searchQuery.toLowerCase();
    return submissions.filter(
      (s) =>
        s.student_id?.firstname?.toLowerCase().includes(q) ||
        s.student_id?.first_name?.toLowerCase().includes(q) ||
        s.student_id?.lastname?.toLowerCase().includes(q) ||
        s.student_id?.last_name?.toLowerCase().includes(q) ||
        s.student_id?.email?.toLowerCase().includes(q) ||
        s.title?.toLowerCase().includes(q)
    );
  }, [submissions, searchQuery]);

  const formatDate = (d) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatus = (sub) => {
    if (!sub.date_submitted && !sub.file_url) return "Not Submitted";
    if (sub.status === "reviewed") return "Reviewed";
    return "Pending Review";
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 text-left">
        <h1 className="text-[32px] font-bold text-[#1A1A2E] leading-tight mb-1">
          Submissions
        </h1>
        <p className="text-[#888] text-[15px]">
          {urlTaskId !== "all" && submissions.length > 0
            ? `${submissions[0]?.assignment_task_id?.title || "Task"} Submissions`
            : submissions.length > 0
            ? `${submissions[0]?.cohort_id?.cohort || "Cohort"} Submissions`
            : "All Cohort Submissions"}
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 relative w-full max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by student or assignment..."
          className="w-full rounded-lg border border-[#E5E5E5] bg-white py-2.5 pl-9 pr-4 text-sm focus:border-primary-color-600 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-[16px] border border-[#E5E5E5] bg-white">
        {isLoading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary-color-600" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FileCheck size={40} className="mb-4 text-gray-300" />
            <p className="font-bold text-[#1A1A2E]">No submissions yet</p>
            <p className="mt-1 text-sm text-[#888]">Student submissions will appear here once assigned.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead className="bg-[#F5F5F5]">
                <tr>
                  {["S/N", "Student", "Assignment", "Submitted On", "Status", "Action"].map((h) => (
                    <th key={h} className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-[#1A1A2E]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F5F5] text-[15px] text-[#1A1A2E]">
                {filtered.map((sub, idx) => {
                  const status = getStatus(sub);
                  return (
                    <tr key={sub._id} className="hover:bg-[#F9F9F9] transition-colors">
                      <td className="px-6 py-4 text-[#888]">
                        {((page - 1) * itemsPerPage + idx + 1).toString().padStart(2, "0")}
                      </td>
                      <td className="px-6 py-4 font-medium">
                        {sub.student_id?.firstname || sub.student_id?.first_name ? (
                          `${sub.student_id.firstname || sub.student_id.first_name} ${sub.student_id.lastname || sub.student_id.last_name || ""}`.trim()
                        ) : (
                          sub.student_id?.email || "Unknown Student"
                        )}
                      </td>
                      <td className="max-w-[220px] truncate px-6 py-4 text-[#555]">
                        {sub.title || "—"}
                      </td>
                      <td className="px-6 py-4 text-[#888] text-sm">
                        {formatDate(sub.date_submitted || sub.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <StatusLabel status={status} />
                      </td>
                      <td className="px-6 py-4">
                        <ActionButton
                          status={status}
                          submission={sub}
                          onReview={() => setSelectedSubmission(sub)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {!isLoading && submissions.length > 0 && (
        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm font-medium text-[#888888]">
            Showing {(page - 1) * itemsPerPage + 1} to{" "}
            {Math.min(page * itemsPerPage, pagination.total)} of{" "}
            {pagination.total} entries
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5E5E5] bg-white text-[#1A1A2E] transition-all hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="hidden items-center gap-1 sm:flex">
              {[...Array(totalPages)].map((_, i) => {
                const p = i + 1;
                // Show first, last, and pages around current
                if (
                  p === 1 ||
                  p === totalPages ||
                  (p >= page - 1 && p <= page + 1)
                ) {
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-bold transition-all ${
                        page === p
                          ? "border-primary-color-600 bg-primary-color-600 text-white"
                          : "border-[#E5E5E5] bg-white text-[#1A1A2E] hover:bg-gray-50"
                      }`}
                    >
                      {p}
                    </button>
                  );
                } else if (p === page - 2 || p === page + 2) {
                  return (
                    <span key={p} className="px-1 text-gray-400">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5E5E5] bg-white text-[#1A1A2E] transition-all hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {selectedSubmission && (
        <AssignmentReviewModal
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </div>
  );
};

const StatusLabel = ({ status }) => {
  const colors = {
    "Pending Review": "text-amber-600",
    Reviewed: "text-green-600",
    "Not Submitted": "text-[#888]",
  };
  return <span className={`text-sm font-medium ${colors[status] || "text-[#888]"}`}>{status}</span>;
};

const ActionButton = ({ status, submission, onReview }) => {
  if (status === "Not Submitted") {
    return <span className="text-[#888]">–</span>;
  }
  if (status === "Reviewed") {
    return (
      <button
        onClick={onReview}
        className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-4 py-2 text-xs font-bold text-green-700 border border-green-200 hover:bg-green-100 transition-colors"
      >
        View Review
      </button>
    );
  }
  return (
    <button
      onClick={onReview}
      className="rounded-full bg-[#C8102E] px-4 py-2 text-xs font-bold text-white hover:bg-red-700 transition-colors"
    >
      Review
    </button>
  );
};

export default SubmissionsPage;
