import React, { useState } from "react";
import { useFetchInstructorCohorts } from "@/hooks/instructor/use-fetch-instructor-cohorts";
import { useCreateAssignmentTask } from "@/hooks/instructor/use-assignment-management";
import { X, Upload, CalendarDays, FileText, Link as LinkIcon } from "lucide-react";

const CreateAssignmentModal = ({ onClose }) => {
  const { data: cohortsData, isLoading: cohortsLoading } = useFetchInstructorCohorts();
  const { mutate: createTask, isPending: isCreating } = useCreateAssignmentTask();
  const cohorts = cohortsData?.data?.cohorts || [];

  const [title, setTitle] = useState("");
  const [selectedCohort, setSelectedCohort] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [submissionType, setSubmissionType] = useState("file");
  const [file, setFile] = useState(null);

  const selectedCohortObj = cohorts.find((c) => c.id === selectedCohort);

  const handlePublish = () => {
    if (!title || !selectedCohort || !dueDate) return;

    createTask(
      {
        title,
        description,
        course_id: selectedCohortObj?.course_id?._id || selectedCohortObj?.course_id,
        cohort_id: selectedCohort,
        due_date: dueDate,
      },
      {
        onSuccess: () => onClose(),
      }
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
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            Create Assignment
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Assignment Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter assignment title"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-color-200 focus:border-primary-color-400"
            />
          </div>

          {/* Course / Cohort dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Select Course / Cohort
            </label>
            <select
              value={selectedCohort}
              onChange={(e) => setSelectedCohort(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-color-200 focus:border-primary-color-400 bg-white"
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
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Assignment instructions..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-color-200 focus:border-primary-color-400 resize-none"
            />
          </div>

          {/* Upload Materials */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Upload Materials
            </label>
            <label className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-primary-color-300 hover:bg-primary-color-50/30 transition-all">
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
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
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
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-color-200 focus:border-primary-color-400"
              />
            </div>
          </div>

          {/* Submission Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Submission Type
            </label>
            <div className="flex gap-4">
              <label
                className={`flex items-center gap-2.5 px-4 py-3 rounded-lg border cursor-pointer transition-all flex-1 ${
                  submissionType === "file"
                    ? "border-primary-color-400 bg-primary-color-50 text-primary-color-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="submissionType"
                  value="file"
                  checked={submissionType === "file"}
                  onChange={() => setSubmissionType("file")}
                  className="accent-primary-color-600"
                />
                <FileText size={18} />
                <span className="text-sm font-medium">File Upload</span>
              </label>
              <label
                className={`flex items-center gap-2.5 px-4 py-3 rounded-lg border cursor-pointer transition-all flex-1 ${
                  submissionType === "link"
                    ? "border-primary-color-400 bg-primary-color-50 text-primary-color-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="submissionType"
                  value="link"
                  checked={submissionType === "link"}
                  onChange={() => setSubmissionType("link")}
                  className="accent-primary-color-600"
                />
                <LinkIcon size={18} />
                <span className="text-sm font-medium">Link</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handlePublish}
            disabled={isCreating || !title || !selectedCohort || !dueDate}
            className="px-6 py-2.5 rounded-lg bg-primary-color-600 text-white text-sm font-semibold hover:bg-primary-color-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreating ? "Publishing..." : "Publish Assignment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignmentModal;
