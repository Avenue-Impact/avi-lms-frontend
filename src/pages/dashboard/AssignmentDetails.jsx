import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft, Calendar, FileText, Download, Trash2,
  ExternalLink, Upload, AlertTriangle, CheckCircle,
  Clock, BookOpen, MessageSquare, Paperclip,
} from "lucide-react";
import { axiosStudent } from "@/services/api";
import { UploadAssignmentModal } from "./components/UploadAssignmentModal";
import toast from "react-hot-toast";

/* ── Status helpers ──────────────────────────── */
const STATUS_CONFIG = {
  reviewing: {
    label: "Under Review",
    className: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Clock,
  },
  reviewed: {
    label: "Reviewed",
    className: "bg-green-50 text-green-700 border-green-200",
    icon: CheckCircle,
  },
  "not reviewed": {
    label: "Submitted",
    className: "bg-blue-50 text-blue-700 border-blue-200",
    icon: CheckCircle,
  },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["not reviewed"];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border shadow-sm ${cfg.className}`}>
      <Icon size={13} />
      {cfg.label}
    </span>
  );
}

/* ── Tab button ──────────────────────────────── */
function Tab({ label, active, onClick, count }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
        active
          ? "border-[#E11D48] text-[#E11D48]"
          : "border-transparent text-gray-500 hover:text-gray-800"
      }`}
    >
      {label}
      {count != null && (
        <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
          active ? "bg-rose-100 text-rose-600" : "bg-gray-100 text-gray-500"
        }`}>
          {count}
        </span>
      )}
    </button>
  );
}

/* ── Main Page ───────────────────────────────── */
export default function AssignmentDetails() {
  const { taskId } = useParams();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("instructions");

  const { data: response, isLoading, isError } = useQuery({
    queryKey: ["student-task-details", taskId],
    queryFn: async () => {
      const { data } = await axiosStudent.get(`/tasks/${taskId}`);
      return data?.data;
    },
    enabled: !!taskId,
  });

  const task        = response?.task || {};
  const submissions = response?.submissions || [];
  const hasSubmissions = submissions.length > 0;

  // Latest submission for status display
  const latestSub = submissions[0];
  const subStatus = latestSub?.status || null;

  // Resources — real data only, no mock fallback
  const resources = task.resources || [];

  // Feedback thread from latest submission
  const feedbackThread = Array.isArray(latestSub?.feedback) ? latestSub.feedback : [];

  // submission_type: "link" | "file" | "both" (default "both")
  const submissionType = task.submission_type || "both";

  const deleteMutation = useMutation({
    mutationFn: async (submissionId) =>
      await axiosStudent.delete(`/assignments/submissions/${submissionId}`),
    onSuccess: (res) => {
      toast.success(res?.data?.message || "Submission deleted successfully");
      queryClient.invalidateQueries(["student-task-details", taskId]);
      queryClient.invalidateQueries(["active-assignments"]);
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Failed to delete submission"),
  });

  const handleDelete = (submissionId) => {
    if (confirm("Are you sure you want to delete this submission?"))
      deleteMutation.mutate(submissionId);
  };

  /* ── Loading ── */
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-3">
        <div className="w-10 h-10 border-4 border-rose-500/20 border-t-rose-500 rounded-full animate-spin" />
        <p className="text-sm font-medium text-gray-500">Loading task details...</p>
      </div>
    );
  }

  /* ── Error ── */
  if (isError || !task.title) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <AlertTriangle className="text-rose-500" size={48} />
        <div>
          <h2 className="text-lg font-bold text-gray-900">Task Not Found</h2>
          <p className="text-sm text-gray-500 mt-1 max-w-sm">
            We couldn't retrieve this assignment. It may have been removed.
          </p>
        </div>
        <Link
          to="/dashboard/assignment"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to list
        </Link>
      </div>
    );
  }

  const dueDateFormatted = new Date(task.due_date).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        to="/dashboard/assignment"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Assignments
      </Link>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Left: Details (2/3) ──────────────────── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Title card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                  {task.title}
                </h1>
                <p className="text-xs font-semibold text-rose-500 uppercase tracking-wider mt-1.5">
                  {task.cohort_id?.cohort || ""}
                </p>
              </div>
              {hasSubmissions && <StatusBadge status={subStatus} />}
              {!hasSubmissions && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-amber-200 bg-amber-50 text-amber-700 shadow-sm whitespace-nowrap">
                  <AlertTriangle size={13} />
                  Not Submitted
                </span>
              )}
            </div>

            {/* Due date row */}
            <div className="mt-5 flex items-center gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
              <div className="p-2 bg-white text-rose-500 rounded-lg shadow-sm border border-gray-100">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Due Date</p>
                <p className="text-sm font-bold text-gray-800 mt-0.5">{dueDateFormatted}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-5 border-b border-gray-100 flex gap-1">
              <Tab label="Instructions" active={activeTab === "instructions"} onClick={() => setActiveTab("instructions")} />
              <Tab
                label="Resources"
                active={activeTab === "resources"}
                onClick={() => setActiveTab("resources")}
                count={resources.length}
              />
              <Tab
                label="Feedback"
                active={activeTab === "feedback"}
                onClick={() => setActiveTab("feedback")}
                count={feedbackThread.length || undefined}
              />
            </div>

            {/* Tab content */}
            <div className="mt-5">
              {/* Instructions */}
              {activeTab === "instructions" && (
                <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50/50 p-5 rounded-xl border border-gray-100">
                  {task.description || "No instructions provided."}
                </div>
              )}

              {/* Resources */}
              {activeTab === "resources" && (
                <div>
                  {resources.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
                      <div className="p-3 bg-gray-50 rounded-full">
                        <Paperclip size={24} className="text-gray-300" />
                      </div>
                      <p className="text-sm font-semibold text-gray-500">No resources attached</p>
                      <p className="text-xs text-gray-400">Your instructor hasn't attached any materials yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {resources.map((res, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-gray-50/50 hover:border-gray-200 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="p-2 bg-rose-50 rounded-lg text-rose-500">
                              <FileText size={16} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-gray-800 truncate">{res.name}</p>
                              {res.size && (
                                <p className="text-xs text-gray-400 mt-0.5">{res.size}</p>
                              )}
                            </div>
                          </div>
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-colors"
                            title="Download"
                          >
                            <Download size={15} />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Feedback */}
              {activeTab === "feedback" && (
                <div>
                  {feedbackThread.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
                      <div className="p-3 bg-gray-50 rounded-full">
                        <MessageSquare size={24} className="text-gray-300" />
                      </div>
                      <p className="text-sm font-semibold text-gray-500">No feedback yet</p>
                      <p className="text-xs text-gray-400">
                        {hasSubmissions
                          ? "Your instructor will leave feedback after reviewing your submission."
                          : "Submit your assignment to receive feedback from your instructor."}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {feedbackThread.map((entry, i) => (
                        <div
                          key={i}
                          className={`flex flex-col gap-1 ${
                            entry.sent_by === "instructor" ? "items-start" : "items-end"
                          }`}
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-1 capitalize">
                            {entry.sent_by === "instructor" ? "Instructor" : "You"}
                          </span>
                          <div
                            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-snug ${
                              entry.sent_by === "instructor"
                                ? "bg-gray-100 text-gray-800 rounded-tl-sm"
                                : "bg-[#E11D48] text-white rounded-tr-sm"
                            }`}
                          >
                            {entry.message}
                          </div>
                          {entry.sent_at && (
                            <span className="text-[10px] text-gray-300 px-1">
                              {new Date(entry.sent_at).toLocaleString("en-US", {
                                month: "short", day: "numeric",
                                hour: "numeric", minute: "2-digit", hour12: true,
                              })}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Submission history card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">Submitted Work</h2>
              {!hasSubmissions && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#E11D48] text-white rounded-xl text-xs font-bold shadow hover:bg-rose-700 transition-all"
                >
                  <Upload size={14} />
                  Upload Assignment
                </button>
              )}
            </div>

            {!hasSubmissions ? (
              <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-200 rounded-2xl bg-gray-50 text-center space-y-3">
                <BookOpen size={32} className="text-gray-300" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">No submissions yet</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Click "Upload Assignment" to submit your work.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {submissions.map((sub) => {
                  const subDate = new Date(sub.date_submitted || sub.created_at).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", year: "numeric",
                    hour: "2-digit", minute: "2-digit",
                  });
                  return (
                    <div
                      key={sub.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-gray-100 bg-gray-50/50 rounded-xl"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="p-2.5 bg-rose-50 rounded-lg text-rose-500 flex-shrink-0">
                          <FileText size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {sub.file_details?.name || "Link Submission"}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">Submitted on {subDate}</p>
                          {sub.google_drive_link && (
                            <a
                              href={sub.google_drive_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold mt-1.5"
                            >
                              <ExternalLink size={11} />
                              View Project Link
                            </a>
                          )}
                          {sub.additional_informations && (
                            <p className="text-xs text-gray-500 italic mt-1 bg-gray-100 px-2 py-1 rounded-lg inline-block">
                              Note: {sub.additional_informations}
                            </p>
                          )}
                          {/* Status */}
                          <div className="mt-2">
                            <StatusBadge status={sub.status} />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        {sub.file_details?.url && (
                          <a
                            href={sub.file_details.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                            title="Download File"
                          >
                            <Download size={15} />
                          </a>
                        )}
                        {sub.status === "reviewing" && (
                          <button
                            onClick={() => handleDelete(sub.id)}
                            className="p-2 border border-red-100 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                            title="Delete Submission"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── Right sidebar (1/3) ──────────────────── */}
        <div className="space-y-5">

          {/* Submission type hint card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              How to Submit
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              {(submissionType === "file" || submissionType === "both") && (
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-rose-50 rounded-lg text-rose-500">
                    <Upload size={14} />
                  </div>
                  <span>Upload a file (PDF, Word, etc.)</span>
                </div>
              )}
              {(submissionType === "link" || submissionType === "both") && (
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-rose-50 rounded-lg text-rose-500">
                    <ExternalLink size={14} />
                  </div>
                  <span>Paste a Drive, GitHub, or Figma link</span>
                </div>
              )}
            </div>
          </div>

          {/* Resources quick-view card (sidebar mirror) */}
          {resources.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Materials ({resources.length})
              </h3>
              <div className="space-y-2">
                {resources.map((res, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 bg-gray-50/50"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText size={14} className="text-rose-500 flex-shrink-0" />
                      <p className="text-xs font-semibold text-gray-700 truncate">{res.name}</p>
                    </div>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-colors"
                    >
                      <Download size={13} />
                    </a>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setActiveTab("resources")}
                className="text-xs font-semibold text-rose-500 hover:underline"
              >
                View in Resources tab →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      <UploadAssignmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskId={taskId}
        taskTitle={task.title}
        submissionType={submissionType}
        onSuccess={() => {
          queryClient.invalidateQueries(["student-task-details", taskId]);
          queryClient.invalidateQueries(["active-assignments"]);
        }}
      />
    </div>
  );
}
