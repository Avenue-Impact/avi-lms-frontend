import React, { useState, useRef } from "react";
import { X, Upload, CheckCircle2, Trash2, FileText, Link as LinkIcon } from "lucide-react";
import { axiosStudent } from "@/services/api";
import toast from "react-hot-toast";

/**
 * submissionType: "file" | "link" | "both"
 * Controls which input fields are shown.
 */
export const UploadAssignmentModal = ({
  isOpen,
  onClose,
  taskId,
  taskTitle,
  submissionType = "both",
  onSuccess,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [googleDriveLink, setGoogleDriveLink] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [uploadProgress, setUploadProgress] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const showFile = submissionType === "file" || submissionType === "both";
  const showLink = submissionType === "link" || submissionType === "both";

  /* ── Drag handlers ── */
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) addFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) addFiles(Array.from(e.target.files));
  };

  const addFiles = (files) => {
    const newFiles = [...selectedFiles];
    files.forEach((file) => {
      if (newFiles.length < 5 && !newFiles.some((f) => f.name === file.name)) {
        newFiles.push(file);
        simulateProgress(file.name);
      }
    });
    setSelectedFiles(newFiles);
  };

  const simulateProgress = (fileName) => {
    setUploadProgress((prev) => ({ ...prev, [fileName]: 0 }));
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) { progress = 100; clearInterval(interval); }
      setUploadProgress((prev) => ({ ...prev, [fileName]: progress }));
    }, 200);
  };

  const removeFile = (fileName) => {
    setSelectedFiles(selectedFiles.filter((f) => f.name !== fileName));
    setUploadProgress((prev) => {
      const u = { ...prev };
      delete u[fileName];
      return u;
    });
  };

  const formatBytes = (bytes) => {
    if (!bytes) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(1))} ${sizes[i]}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate based on submission type
    if (showFile && !showLink && selectedFiles.length === 0) {
      return toast.error("Please upload at least one file.");
    }
    if (showLink && !showFile && !googleDriveLink.trim()) {
      return toast.error("Please provide a project link.");
    }
    if (submissionType === "both" && selectedFiles.length === 0 && !googleDriveLink.trim()) {
      return toast.error("Please upload a file or provide a project link.");
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", taskTitle);
    formData.append("additional_informations", additionalInfo);
    if (googleDriveLink.trim()) formData.append("google_drive_link", googleDriveLink.trim());
    selectedFiles.forEach((file) => formData.append("assignments", file));

    try {
      await axiosStudent.post(`/tasks/${taskId}/submit`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit assignment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-gray-100">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Upload Assignment</h2>
              <p className="text-sm text-gray-400 mt-0.5">
                {submissionType === "file" && "Upload your assignment file."}
                {submissionType === "link" && "Share your project link below."}
                {submissionType === "both" && "Upload a file or share your project link."}
              </p>
            </div>

            {/* ── File drop zone ── */}
            {showFile && (
              <>
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current.click()}
                  className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-7 cursor-pointer transition-all ${
                    dragActive
                      ? "border-[#E11D48] bg-rose-50/50"
                      : "border-gray-200 hover:border-rose-400 bg-gray-50"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                  />
                  <div className="p-2.5 bg-white rounded-full shadow-sm text-rose-500 mb-3 border border-gray-100">
                    <Upload size={22} />
                  </div>
                  <p className="text-sm font-semibold text-gray-700">Click to upload or drag & drop</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, Word, Images or ZIP · max 5 files</p>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="space-y-2 max-h-36 overflow-y-auto">
                    {selectedFiles.map((file) => {
                      const progress = uploadProgress[file.name] || 0;
                      return (
                        <div key={file.name} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50">
                          <div className="p-1.5 bg-rose-50 rounded text-rose-500">
                            <FileText size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                              <p className="text-xs font-semibold text-gray-700 truncate">{file.name}</p>
                              <span className="text-[10px] text-gray-400">{formatBytes(file.size)}</span>
                            </div>
                            {progress < 100 ? (
                              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-rose-500 transition-all duration-200"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            ) : (
                              <p className="text-[10px] text-green-600 font-medium">Ready</p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); removeFile(file.name); }}
                            className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {/* ── Divider ── */}
            {showFile && showLink && (
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs font-semibold text-gray-400">OR</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
            )}

            {/* ── Link field ── */}
            {showLink && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <LinkIcon size={12} />
                  Project Link
                </label>
                <input
                  type="url"
                  value={googleDriveLink}
                  onChange={(e) => setGoogleDriveLink(e.target.value)}
                  placeholder="Google Drive, GitHub, Figma..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-rose-500 focus:outline-none transition-colors"
                />
              </div>
            )}

            {/* ── Additional note ── */}
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Note
                </label>
                <span className="text-[10px] text-gray-400 font-medium">{additionalInfo.length}/40</span>
              </div>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value.slice(0, 40))}
                placeholder="Brief comments (max 40 chars)..."
                rows={2}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-rose-500 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-xl bg-[#E11D48] py-2.5 text-sm font-semibold text-white hover:bg-rose-700 transition-colors shadow-md disabled:bg-rose-400"
              >
                {isSubmitting ? "Submitting..." : "Submit Assignment"}
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
            <div className="p-3 bg-green-50 text-green-500 rounded-full">
              <CheckCircle2 size={44} />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Submitted Successfully!</h3>
              <p className="text-sm text-gray-400 mt-1 max-w-xs mx-auto">
                Your assignment is under review. You'll see feedback here once your instructor responds.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full max-w-[200px] rounded-xl bg-gray-900 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
