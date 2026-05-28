import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  ArrowLeft, Calendar, FileText, Download, Trash2, 
  ExternalLink, Upload, AlertTriangle, CheckCircle 
} from "lucide-react";
import { axiosStudent } from "@/services/api";
import { UploadAssignmentModal } from "./components/UploadAssignmentModal";
import toast from "react-hot-toast";

export default function AssignmentDetails() {
  const { taskId } = useParams();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Fetch Task Details (which includes student's submissions for this task)
  const { data: response, isLoading, isError } = useQuery({
    queryKey: ["student-task-details", taskId],
    queryFn: async () => {
      const { data } = await axiosStudent.get(`/tasks/${taskId}`);
      return data?.data;
    },
    enabled: !!taskId,
  });

  const task = response?.task || {};
  const submissions = response?.submissions || [];
  const hasSubmissions = submissions.length > 0;

  // 2. Delete Submission mutation
  const deleteMutation = useMutation({
    mutationFn: async (submissionId) => {
      return await axiosStudent.delete(`/assignments/submissions/${submissionId}`);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message || "Submission deleted successfully");
      queryClient.invalidateQueries(["student-task-details", taskId]);
      queryClient.invalidateQueries(["active-assignments"]);
    },
    onError: (err) => {
      const message = err.response?.data?.message || "Failed to delete submission";
      toast.error(message);
    },
  });

  const handleDelete = (submissionId) => {
    if (confirm("Are you sure you want to delete this submission?")) {
      deleteMutation.mutate(submissionId);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] space-y-3">
        <div className="w-10 h-10 border-4 border-rose-500/20 border-t-rose-500 rounded-full animate-spin" />
        <p className="text-sm font-medium text-gray-500">Loading task details...</p>
      </div>
    );
  }

  if (isError || !task.title) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] p-6 text-center space-y-4">
        <AlertTriangle className="text-rose-500" size={48} />
        <div>
          <h2 className="text-xl font-bold text-gray-900">Task Not Found</h2>
          <p className="text-sm text-gray-500 mt-1 max-w-sm">
            We couldn't retrieve the assignment task details. It may have been unpublished or removed.
          </p>
        </div>
        <Link
          to="/dashboard/assignment"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold shadow hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to list
        </Link>
      </div>
    );
  }

  // Format Due Date
  const dueDateFormatted = new Date(task.due_date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Default Mock Resources if task resources is empty (to match mockup images perfectly)
  const defaultResources = [
    { name: "Brief.pdf", url: "#", size: "1.2 MB" },
    { name: "Resources.png", url: "#", size: "450 KB" },
  ];
  const resourcesToRender = task.resources && task.resources.length > 0 
    ? task.resources 
    : defaultResources;

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6 lg:p-10 space-y-8">
      
      {/* TOP NAV BAR */}
      <div>
        <Link
          to="/dashboard/assignment"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Assignments
        </Link>
      </div>

      {/* CORE LAYOUT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* TASK DETAILS COLUMN (2/3 width on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* TITLE & META CARD */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
                  {task.title}
                </h1>
                <p className="text-xs text-rose-500 font-bold uppercase tracking-wider mt-2">
                  Cohort: {task.cohort_id?.cohort || "N/A"}
                </p>
              </div>

              {/* STATUS BADGE */}
              <div>
                {hasSubmissions ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200 shadow-sm">
                    <CheckCircle size={14} />
                    Submitted
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 shadow-sm">
                    <AlertTriangle size={14} />
                    Not Submitted
                  </span>
                )}
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* DUE DATE SUMMARY */}
            <div className="flex items-center gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-gray-100">
              <div className="p-2.5 bg-white text-rose-500 rounded-lg shadow-sm border border-gray-100">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Due Date
                </p>
                <p className="text-sm font-bold text-gray-800 mt-0.5">
                  {dueDateFormatted}
                </p>
              </div>
            </div>

            {/* DESCRIPTION/INSTRUCTIONS */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                Instructions
              </h3>
              <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line bg-gray-50/50 p-5 rounded-xl border border-gray-100">
                {task.description || "No description provided."}
              </div>
            </div>
          </div>

          {/* SUBMISSION HISTORY CARD */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                Submitted Assignment
              </h2>
              {!hasSubmissions && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#E11D48] text-white rounded-xl text-xs font-bold shadow hover:bg-rose-700 transition-all hover:scale-[1.02]"
                >
                  <Upload size={14} />
                  Upload Assignment
                </button>
              )}
            </div>

            {!hasSubmissions ? (
              <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-200 rounded-2xl bg-[#FCFCFC] text-center space-y-3">
                <AlertTriangle size={32} className="text-amber-500" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">No submissions yet</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Click the upload button to submit your assignment.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((sub) => {
                  const subDate = new Date(sub.date_submitted).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <div 
                      key={sub.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-gray-100 bg-[#FCFCFC] rounded-xl"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="p-2.5 bg-rose-50 rounded-lg text-rose-500">
                          <FileText size={20} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate">
                            {sub.file_details?.name || "Google Drive Submission"}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Uploaded on {subDate}
                          </p>
                          {sub.google_drive_link && (
                            <a 
                              href={sub.google_drive_link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold mt-1.5"
                            >
                              <ExternalLink size={12} />
                              View Project Link
                            </a>
                          )}
                          {sub.additional_informations && (
                            <p className="text-xs text-gray-500 italic mt-1 bg-gray-100/50 px-2 py-1 rounded inline-block">
                              Note: {sub.additional_informations}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        {sub.file_details?.url && (
                          <a
                            href={sub.file_details.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors shadow-sm"
                            title="Download File"
                          >
                            <Download size={16} />
                          </a>
                        )}
                        <button
                          onClick={() => handleDelete(sub.id)}
                          className="p-2 border border-red-100 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm"
                          title="Delete Submission"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* SIDEBAR RESOURCES COLUMN (1/3 width on desktop) */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
              Resources
            </h3>
            <div className="space-y-3">
              {resourcesToRender.map((res, i) => (
                <div 
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-[#FCFCFC] hover:border-gray-200 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileText size={18} className="text-rose-500" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate">
                        {res.name}
                      </p>
                      {res.size && (
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {res.size}
                        </p>
                      )}
                    </div>
                  </div>
                  <a
                    href={res.url}
                    download
                    className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800 transition-colors"
                  >
                    <Download size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* UPLOAD MODAL */}
      <UploadAssignmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskId={taskId}
        taskTitle={task.title}
        onSuccess={() => {
          queryClient.invalidateQueries(["student-task-details", taskId]);
          queryClient.invalidateQueries(["active-assignments"]);
        }}
      />
    </div>
  );
}
