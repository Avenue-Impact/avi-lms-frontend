import React, { useState } from "react";
import { useSubmitFeedback } from "@/hooks/instructor/use-submit-feedback";
import {
  X,
  Download,
  CheckCircle,
  User,
  Calendar,
  FileText,
} from "lucide-react";

const AssignmentReviewModal = ({ submission, onClose }) => {
  const [feedback, setFeedback] = useState(submission.feedback || "");
  const { mutate: sendFeedback, isPending } = useSubmitFeedback();

  const student = submission.student_id;
  const studentName = student
    ? `${student.firstname || ""} ${student.lastname || ""}`
    : "Unknown Student";
  const studentInitials = student
    ? `${student.firstname?.[0] || ""}${student.lastname?.[0] || ""}`
    : "?";

  const submittedDate = submission.date_submitted || submission.created_at;

  const handleSendFeedback = () => {
    sendFeedback(
      { submissionId: submission.id, feedback },
      { onSuccess: () => onClose() }
    );
  };

  const handleMarkReviewed = () => {
    sendFeedback(
      { submissionId: submission.id, feedback: feedback || "Reviewed" },
      { onSuccess: () => onClose() }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Assignment Review: {submission.title}
              </h2>
              <div className="flex items-center gap-3 mt-1.5 text-sm text-gray-500">
                {submission.course_id?.title && (
                  <span>{submission.course_id.title}</span>
                )}
                {submission.cohort_id?.cohort && (
                  <>
                    <span className="text-gray-300">|</span>
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

        {/* Body — split panel */}
        <div className="flex-grow overflow-y-auto flex flex-col md:flex-row">
          {/* Left — Student Submission */}
          <div className="flex-1 p-6 border-r border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-11 w-11 rounded-full bg-primary-color-100 flex items-center justify-center text-primary-color-700 font-bold text-sm flex-shrink-0">
                {studentInitials}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{studentName}</p>
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

            {/* Submission file info */}
            {submission.file_details?.name && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg mb-4">
                <FileText size={20} className="text-gray-400 flex-shrink-0" />
                <div className="min-w-0 flex-grow">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {submission.file_details.name}
                  </p>
                  {submission.file_details.size && (
                    <p className="text-xs text-gray-400">
                      {submission.file_details.size}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Submission text content */}
            {submission.additional_informations && (
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed bg-gray-50/50 rounded-lg p-4 border border-gray-100">
                <p>{submission.additional_informations}</p>
              </div>
            )}

            {!submission.file_details?.name &&
              !submission.additional_informations && (
                <div className="text-center text-gray-400 py-10">
                  <FileText size={32} className="mx-auto mb-2" />
                  <p className="text-sm">No submission content available</p>
                </div>
              )}
          </div>

          {/* Right — Feedback */}
          <div className="w-full md:w-80 p-6 flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Feedback
            </h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write feedback for the student..."
              rows={8}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-color-200 focus:border-primary-color-400 resize-none flex-grow"
            />

            {submission.status === "reviewed" && (
              <div className="mt-3 flex items-center gap-2 text-emerald-600 text-xs font-medium">
                <CheckCircle size={14} />
                Already reviewed
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex items-center justify-between flex-shrink-0 flex-wrap gap-3">
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
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleMarkReviewed}
              disabled={isPending}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Mark as Reviewed
            </button>
            <button
              onClick={handleSendFeedback}
              disabled={isPending || !feedback.trim()}
              className="px-5 py-2 rounded-lg bg-primary-color-600 text-white text-sm font-semibold hover:bg-primary-color-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Sending..." : "Send Feedback"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentReviewModal;
