import React, { useState, useEffect } from "react";
import { useFetchInstructorCohorts } from "@/hooks/instructor/use-fetch-instructor-cohorts";
import {
  useCreateAssignmentTask,
  useUpdateAssignmentTask,
} from "@/hooks/instructor/use-assignment-management";
import {
  X,
  Upload,
  CalendarDays,
  FileText,
  Link as LinkIcon,
  Trash2,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function AssignmentModal({
  isOpen = true,
  onClose,
  cohortId = null,
  courseId = null,
  initialData = null,
  onSuccess,
}) {
  const isEditMode = Boolean(initialData);
  const activeCohortId = cohortId || initialData?.cohort_id || "";

  const { data: cohortsData, isLoading: cohortsLoading } =
    useFetchInstructorCohorts();
  const cohorts = cohortsData?.data?.cohorts || [];

  const { mutateAsync: createTask, isPending: isCreating } =
    useCreateAssignmentTask(activeCohortId);
  const { mutateAsync: updateTask, isPending: isUpdating } =
    useUpdateAssignmentTask(activeCohortId);

  const isSubmitting = isCreating || isUpdating;

  const [title, setTitle] = useState("");
  const [selectedCohort, setSelectedCohort] = useState(activeCohortId);
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [submissionType, setSubmissionType] = useState("both");
  const [status, setStatus] = useState("Published");
  const [existingResources, setExistingResources] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setSubmissionType(initialData.submission_type || "both");
      setStatus(initialData.status || "Published");
      setExistingResources(initialData.resources || []);
      setNewFiles([]);
      setErrorMsg("");

      if (initialData.due_date) {
        try {
          const d = new Date(initialData.due_date);
          if (!isNaN(d.getTime())) {
            setDueDate(d.toISOString().split("T")[0]);
          }
        } catch {
          setDueDate("");
        }
      }

      const cid =
        typeof initialData.cohort_id === "object"
          ? initialData.cohort_id?._id || initialData.cohort_id?.id
          : initialData.cohort_id;
      if (cid) setSelectedCohort(cid.toString());
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setSubmissionType("both");
      setStatus("Published");
      setExistingResources([]);
      setNewFiles([]);
      setErrorMsg("");
      if (cohortId) setSelectedCohort(cohortId);
    }
  }, [initialData, cohortId, isOpen]);

  if (!isOpen) return null;

  const selectedCohortObj = cohorts.find(
    (c) => (c.id || c._id) === selectedCohort
  );

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const added = Array.from(e.target.files);
      setNewFiles((prev) => [...prev, ...added]);
    }
  };

  const handleRemoveNewFile = (index) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingResource = (index) => {
    setExistingResources((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg("");

    if (!title.trim()) {
      setErrorMsg("Please enter an assignment title.");
      return;
    }

    const effectiveCohortId = selectedCohort || activeCohortId;
    if (!effectiveCohortId) {
      setErrorMsg("Please select a cohort for this assignment.");
      return;
    }

    if (!dueDate) {
      setErrorMsg("Please select a valid due date.");
      return;
    }

    const resolvedCourseId =
      courseId ||
      selectedCohortObj?.course_id?._id ||
      selectedCohortObj?.course_id?.id ||
      selectedCohortObj?.course_id ||
      (typeof initialData?.course_id === "object"
        ? initialData?.course_id?._id
        : initialData?.course_id);

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("due_date", dueDate);
    formData.append("submission_type", submissionType);
    formData.append("status", status);

    if (newFiles.length > 0) {
      newFiles.forEach((file) => {
        formData.append("resources", file);
      });
    }

    try {
      if (isEditMode) {
        formData.append("existing_resources", JSON.stringify(existingResources));
        const assignmentId = initialData._id || initialData.id;
        await updateTask({ assignmentId, data: formData });
      } else {
        if (resolvedCourseId) {
          formData.append("course_id", resolvedCourseId);
        }
        formData.append("cohort_id", effectiveCohortId);
        await createTask(formData);
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error("Assignment submission error:", err);
      setErrorMsg(
        err?.response?.data?.message ||
          "Failed to save assignment. Please try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-[#FDF2F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#CC1747] text-white flex items-center justify-center shadow-md">
              <FileText size={20} />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#CC1747]">
                Instructor Workspace
              </span>
              <h3 className="font-space font-bold text-lg text-[#0A1430] leading-snug">
                {isEditMode ? "Edit Assignment" : "Create Assignment"}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors shadow-xs"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {errorMsg && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium animate-in fade-in">
              <AlertCircle size={16} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Assignment Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Module 1: Data Analysis & Visualization Project"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#CC1747]/30 focus:border-[#CC1747]"
              required
            />
          </div>

          {/* Cohort selection if not pre-locked */}
          {!activeCohortId ? (
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                Target Cohort <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedCohort}
                onChange={(e) => setSelectedCohort(e.target.value)}
                disabled={isEditMode}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#CC1747]/30 focus:border-[#CC1747] disabled:bg-slate-50 disabled:text-slate-500"
              >
                <option value="">Select a cohort...</option>
                {cohortsLoading ? (
                  <option disabled>Loading cohorts...</option>
                ) : (
                  cohorts.map((c) => {
                    const cid = c.id || c._id;
                    return (
                      <option key={cid} value={cid}>
                        {c.course_id?.title || "Course"} – {c.cohort}
                      </option>
                    );
                  })
                )}
              </select>
            </div>
          ) : null}

          {/* Description / Instructions */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Instructions & Requirements
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail the steps, criteria, guidelines, and expectations for students..."
              rows={3}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#CC1747]/30 focus:border-[#CC1747] resize-none"
            />
          </div>

          {/* Due Date & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                Due Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <CalendarDays
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#CC1747]/30 focus:border-[#CC1747]"
                  required
                />
              </div>
            </div>

            {isEditMode && (
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Publication Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#CC1747]/30 focus:border-[#CC1747]"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
            )}
          </div>

          {/* Submission Type */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Accepted Submission Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "file", label: "File Upload", icon: FileText },
                { value: "link", label: "Link Only", icon: LinkIcon },
                { value: "both", label: "File or Link", icon: Upload },
              ].map(({ value, label, icon: Icon }) => (
                <label
                  key={value}
                  className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all ${
                    submissionType === value
                      ? "border-[#CC1747] bg-red-50 text-[#CC1747] font-semibold"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="submissionType"
                    value={value}
                    checked={submissionType === value}
                    onChange={() => setSubmissionType(value)}
                    className="sr-only"
                  />
                  <Icon size={18} />
                  <span className="text-xs">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Resources / Attachments */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Resource Attachments (Optional)
            </label>

            {/* Existing Resources */}
            {existingResources.length > 0 && (
              <div className="mb-3 space-y-2">
                <p className="text-[11px] text-slate-400 font-medium">
                  Current Resources:
                </p>
                {existingResources.map((resItem, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Paperclip size={14} className="text-slate-400 shrink-0" />
                      <a
                        href={resItem.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-700 hover:text-[#CC1747] font-medium truncate"
                      >
                        {resItem.name || "Resource"}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingResource(idx)}
                      className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                      title="Remove attachment"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* New Files List */}
            {newFiles.length > 0 && (
              <div className="mb-3 space-y-2">
                <p className="text-[11px] text-slate-400 font-medium">
                  New Attachments to Add:
                </p>
                {newFiles.map((f, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs"
                  >
                    <div className="flex items-center gap-2 truncate text-emerald-800">
                      <Paperclip size={14} className="shrink-0" />
                      <span className="font-medium truncate">{f.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveNewFile(idx)}
                      className="p-1 rounded-lg text-emerald-700 hover:text-red-600 hover:bg-red-50 transition"
                      title="Remove file"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <label className="flex cursor-pointer items-center justify-center gap-2.5 rounded-xl border-2 border-dashed border-slate-200 px-4 py-4 text-center transition-colors hover:border-[#CC1747] hover:bg-red-50/20">
              <Upload size={18} className="text-slate-400" />
              <span className="text-xs font-semibold text-slate-600">
                Attach reference files, PDFs, or instructions
              </span>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp,.xls,.xlsx,.csv,.txt,.ppt,.pptx"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* Actions */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title || !dueDate}
              className="px-6 py-2.5 rounded-xl bg-[#CC1747] hover:bg-[#B0133D] text-sm font-semibold text-white shadow-md shadow-[#CC1747]/20 transition disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>{isEditMode ? "Updating..." : "Creating..."}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} />
                  <span>{isEditMode ? "Save Changes" : "Publish Assignment"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
