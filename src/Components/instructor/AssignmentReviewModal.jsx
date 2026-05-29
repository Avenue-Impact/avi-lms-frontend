import React, { useState } from "react";
import { useSubmitFeedback } from "@/hooks/instructor/use-submit-feedback";
import {
  X,
  Download,
  CheckCircle,
  Calendar,
  FileText,
  MessageSquare,
  Send,
} from "lucide-react";

const AssignmentReviewModal = ({ submission, onClose }) => {
  const [newMessage, setNewMessage] = useState("");
  const { mutate: sendFeedback, isPending } = useSubmitFeedback();

  const student = submission.student_id;
  const fName = student?.firstname || student?.first_name || "";
  const lName = student?.lastname || student?.last_name || "";
  const studentName = `${fName} ${lName}`.trim() || student?.email || "Unknown Student";
  const studentInitials = `${fName?.[0] || ""}${lName?.[0] || ""}`.toUpperCase() || "?";

  const submittedDate = submission.date_submitted || submission.created_at;
  const feedbackThread = Array.isArray(submission.feedback) ? submission.feedback : [];

  const handleSendFeedback = () => {
    if (!newMessage.trim()) return;
    sendFeedback(
      { submissionId: submission.id || submission._id, feedback: newMessage, mark_reviewed: false },
      {
        onSuccess: () => {
          setNewMessage("");
          onClose();
        },
      }
    );
  };

  const handleMarkReviewed = () => {
    sendFeedback(
      {
        submissionId: submission.id || submission._id,
        feedback: newMessage.trim() || undefined,
        mark_reviewed: true,
      },
      { onSuccess: () => onClose() }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {submission.title}
              </h2>
              <div className="flex items-center gap-3 mt-1.5 text-sm text-gray-400">
                {submission.course_id?.title && <span>{submission.course_id.title}</span>}
                {submission.cohort_id?.cohort && (
                  <>
                    <span className="text-gray-200">|</span>
                    <span>{submission.cohort_id.cohort}</span>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-grow overflow-y-auto flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {/* Left — Submission Details */}
          <div className="flex-1 p-6 space-y-5">
            {/* Student Info */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary-color-100 flex items-center justify-center text-primary-color-700 font-bold text-sm flex-shrink-0">
                {studentInitials}
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">{studentName}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar size={12} />
                  {submittedDate
                    ? new Date(submittedDate).toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : "No date"}
                </p>
              </div>
            </div>

            {/* Status pill */}
            <div>
              {submission.status === "reviewed" ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                  <CheckCircle size={12} /> Reviewed
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  Under Review
                </span>
              )}
            </div>

            {/* File */}
            {submission.file_details?.name && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <FileText size={18} className="text-gray-400 flex-shrink-0" />
                <div className="min-w-0 flex-grow">
                  <p className="text-sm font-medium text-gray-700 truncate">{submission.file_details.name}</p>
                  {submission.file_details.size && (
                    <p className="text-xs text-gray-400">{submission.file_details.size}</p>
                  )}
                </div>
              </div>
            )}

            {/* Google Drive */}
            {submission.google_drive_link && (
              <div className="flex items-start gap-3 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100/50">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse mt-1.5 flex-shrink-0" />
                <div className="min-w-0 flex-grow">
                  <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
                    Google Drive / Project Link
                  </p>
                  <a
                    href={submission.google_drive_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-rose-600 hover:underline break-all block"
                  >
                    {submission.google_drive_link}
                  </a>
                </div>
              </div>
            )}

            {/* Additional Info */}
            {submission.additional_informations && (
              <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Note</p>
                <p className="text-sm text-gray-700">{submission.additional_informations}</p>
              </div>
            )}

            {!submission.file_details?.name && !submission.additional_informations && !submission.google_drive_link && (
              <div className="text-center text-gray-400 py-8">
                <FileText size={32} className="mx-auto mb-2" />
                <p className="text-sm">No submission content</p>
              </div>
            )}
          </div>

          {/* Right — Feedback Thread */}
          <div className="w-full md:w-96 flex flex-col">
            <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-2">
              <MessageSquare size={16} className="text-gray-400" />
              <h3 className="text-sm font-bold text-gray-700">Feedback Thread</h3>
              {feedbackThread.length > 0 && (
                <span className="ml-auto text-xs font-semibold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  {feedbackThread.length}
                </span>
              )}
            </div>

            {/* Thread messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 min-h-[140px]">
              {feedbackThread.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-8 text-center text-gray-400">
                  <MessageSquare size={28} className="mb-2 opacity-30" />
                  <p className="text-xs">No feedback yet. Send the first message.</p>
                </div>
              ) : (
                feedbackThread.map((entry, i) => (
                  <div
                    key={i}
                    className={`flex flex-col gap-1 ${
                      entry.sent_by === "instructor" ? "items-end" : "items-start"
                    }`}
                  >
                    <span className="text-[10px] font-semibold text-gray-400 px-1 capitalize">
                      {entry.sent_by}
                    </span>
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-snug ${
                        entry.sent_by === "instructor"
                          ? "bg-primary-color-600 text-white rounded-tr-sm"
                          : "bg-gray-100 text-gray-800 rounded-tl-sm"
                      }`}
                    >
                      {entry.message}
                    </div>
                    <span className="text-[10px] text-gray-300 px-1">
                      {entry.sent_at
                        ? new Date(entry.sent_at).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })
                        : ""}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Input area */}
            <div className="px-5 py-4 border-t border-gray-100">
              <div className="flex gap-2">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Write feedback..."
                  rows={2}
                  className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-color-200 focus:border-primary-color-400 resize-none"
                />
                <button
                  onClick={handleSendFeedback}
                  disabled={isPending || !newMessage.trim()}
                  className="flex-shrink-0 self-end p-2.5 rounded-xl bg-primary-color-600 text-white hover:bg-primary-color-700 transition-colors disabled:opacity-40"
                  title="Send feedback"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 flex items-center justify-between flex-shrink-0 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            {submission.file_details?.url && (
              <a
                href={submission.file_details.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Download size={16} />
                Download File
              </a>
            )}
            {submission.google_drive_link && (
              <a
                href={submission.google_drive_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary-color-200 text-sm font-medium text-primary-color-600 hover:bg-primary-color-50 transition-colors"
              >
                Open Project Link
              </a>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
            {submission.status !== "reviewed" && (
              <button
                onClick={handleMarkReviewed}
                disabled={isPending}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                <CheckCircle size={15} />
                {isPending ? "Saving..." : "Mark as Reviewed"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentReviewModal;
