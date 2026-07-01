import React, { useState } from "react";
import { useFetchInstructorCohorts } from "@/hooks/instructor/use-fetch-instructor-cohorts";
import { useCreateAssignmentTask } from "@/hooks/instructor/use-assignment-management";
import {
  X,
  Upload,
  CalendarDays,
  FileText,
  Link as LinkIcon,
} from "lucide-react";

const CreateAssignmentModal = ({ onClose }) => {
  const { data: cohortsData, isLoading: cohortsLoading } =
    useFetchInstructorCohorts();
  const { mutate: createTask, isPending: isCreating } =
    useCreateAssignmentTask();
  const cohorts = cohortsData?.data?.cohorts || [];

  const [title, setTitle] = useState("");
  const [selectedCohort, setSelectedCohort] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [submissionType, setSubmissionType] = useState("both");
  const [file, setFile] = useState(null);

  const selectedCohortObj = cohorts.find((c) => c.id === selectedCohort);

  const handlePublish = () => {
    if (!title || !selectedCohort || !dueDate) return;

    const courseId = selectedCohortObj?.course_id?.id || selectedCohortObj?.course_id?._id || selectedCohortObj?.course_id;

    const formData = new FormData();
    formData.append("title", title);
    if (description) formData.append("description", description);
    formData.append("course_id", courseId);
    formData.append("cohort_id", selectedCohort);
    formData.append("due_date", dueDate);
    formData.append("submission_type", submissionType);

    if (file) {
      formData.append("resources", file);
    }

    createTask(
      formData,
      {
        onSuccess: () => onClose(),
      },
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
      <div className="relative mx-4 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900">Create Assignment</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 p-6">
          {/* Title */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Assignment Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter assignment title"
              className="focus:ring-primary-color-200 focus:border-primary-color-400 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
            />
          </div>

          {/* Course / Cohort dropdown */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Select Course / Cohort
            </label>
            <select
              value={selectedCohort}
              onChange={(e) => setSelectedCohort(e.target.value)}
              className="focus:ring-primary-color-200 focus:border-primary-color-400 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
            >
              <option value="">Choose a cohort...</option>
              {cohortsLoading ? (
                <option disabled>Loading...</option>
              ) : (
                cohorts.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.course_id?.title || "Course"} – {c.cohort}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Assignment instructions..."
              rows={3}
              className="focus:ring-primary-color-200 focus:border-primary-color-400 w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
            />
          </div>

          {/* Upload Materials */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Upload Materials
            </label>
            <label className="hover:bg-primary-color-50/30 flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-200 px-4 py-3 transition-all hover:border-primary-color-300">
              <Upload size={20} className="text-gray-400" />
              <span className="text-sm text-gray-500">
                {file ? file.name : "PDF, Images or Word documents"}
              </span>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0])}
              />
            </label>
          </div>

          {/* Due Date */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Due Date
            </label>
            <div className="relative">
              <CalendarDays
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="focus:ring-primary-color-200 focus:border-primary-color-400 w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2"
              />
            </div>
          </div>

          {/* Submission Type */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Submission Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "file", label: "File Upload", icon: FileText },
                { value: "link", label: "Link Only", icon: LinkIcon },
                { value: "both", label: "File or Link", icon: Upload },
              ].map(({ value, label, icon: Icon }) => (
                <label
                  key={value}
                  className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all ${
                    submissionType === value
                      ? "border-primary-color-400 bg-primary-color-50 text-primary-color-700"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
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
                  <span className="text-xs font-semibold">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 p-6">
          <button
            onClick={onClose}
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handlePublish}
            disabled={isCreating || !title || !selectedCohort || !dueDate}
            className="hover:bg-primary-color-700 rounded-lg bg-primary-color-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCreating ? "Publishing..." : "Publish Assignment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignmentModal;
