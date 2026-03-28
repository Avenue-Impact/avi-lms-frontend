import React, { useState, useMemo } from "react";
import { FileCheck, Download, Search } from "lucide-react";
import { useFetchRecentSubmissions } from "@/hooks/instructor/use-fetch-recent-submissions";

const SubmissionsPage = () => {
  const { data: subsData, isLoading } = useFetchRecentSubmissions();
  const [searchQuery, setSearchQuery] = useState("");
  
  const submissions = subsData?.data?.submissions || [];

  const filtered = useMemo(() => {
    if (!searchQuery) return submissions;
    const q = searchQuery.toLowerCase();
    return submissions.filter(
      (s) =>
        s.student_id?.firstname?.toLowerCase().includes(q) ||
        s.student_id?.lastname?.toLowerCase().includes(q) ||
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
      <div className="mb-6">
        <h1 className="text-[32px] font-bold text-[#1A1A2E] leading-tight mb-1">
          Submissions
        </h1>
        <p className="text-[#888] text-[15px]">
          {submissions.length > 0
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
                        {(idx + 1).toString().padStart(2, "0")}
                      </td>
                      <td className="px-6 py-4 font-medium">
                        {sub.student_id?.firstname} {sub.student_id?.lastname}
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
                        <ActionButton status={status} submission={sub} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
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

const ActionButton = ({ status, submission }) => {
  if (status === "Not Submitted") {
    return <span className="text-[#888]">–</span>;
  }
  if (status === "Reviewed") {
    return (
      <a
        href={submission.file_url || "#"}
        download
        className="inline-flex items-center gap-1.5 rounded-full bg-[#C8102E] px-4 py-2 text-xs font-bold text-white hover:bg-red-700 transition-colors"
      >
        <Download size={12} /> Download
      </a>
    );
  }
  return (
    <button className="rounded-full bg-[#C8102E] px-4 py-2 text-xs font-bold text-white hover:bg-red-700 transition-colors">
      Review
    </button>
  );
};

export default SubmissionsPage;
