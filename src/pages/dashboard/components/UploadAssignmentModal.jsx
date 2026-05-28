import React, { useState, useRef } from "react";
import { X, Upload, CheckCircle2, Trash2, FileText } from "lucide-react";
import { axiosStudent } from "@/services/api";
import toast from "react-hot-toast";

export const UploadAssignmentModal = ({ isOpen, onClose, taskId, taskTitle, onSuccess }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [googleDriveLink, setGoogleDriveLink] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [uploadProgress, setUploadProgress] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (files) => {
    // Limit to 5 files
    const newFiles = [...selectedFiles];
    files.forEach((file) => {
      if (newFiles.length < 5 && !newFiles.some((f) => f.name === file.name)) {
        newFiles.push(file);
        // Simulate progress for premium UX
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
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadProgress((prev) => ({ ...prev, [fileName]: progress }));
    }, 200);
  };

  const removeFile = (fileName) => {
    setSelectedFiles(selectedFiles.filter((f) => f.name !== fileName));
    setUploadProgress((prev) => {
      const updated = { ...prev };
      delete updated[fileName];
      return updated;
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0 && !googleDriveLink.trim()) {
      toast.error("Please upload at least one file or provide a Google Drive Link.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", taskTitle);
    formData.append("additional_informations", additionalInfo);
    if (googleDriveLink.trim()) {
      formData.append("google_drive_link", googleDriveLink.trim());
    }

    selectedFiles.forEach((file) => {
      formData.append("assignments", file);
    });

    try {
      await axiosStudent.post(`/tasks/${taskId}/submit`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      const message = err.response?.data?.message || "Failed to submit assignment";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl transition-all duration-300 border border-gray-100">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Upload Assignment</h2>
              <p className="text-sm text-gray-500 mt-1">
                Submit files or share your Google Drive project link.
              </p>
            </div>

            {/* DRAG & DROP ZONE */}
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all ${
                dragActive
                  ? "border-[#E11D48] bg-rose-50/50"
                  : "border-gray-300 hover:border-rose-400 bg-[#FAFAFA]"
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
              <div className="p-3 bg-white rounded-full shadow-sm text-rose-500 mb-3 border border-gray-100">
                <Upload size={24} />
              </div>
              <p className="text-sm font-semibold text-gray-700">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PDF, Word, Images, or ZIP up to 10MB (max 5 files)
              </p>
            </div>

            {/* LIST OF SELECTED FILES WITH PROGRESS */}
            {selectedFiles.length > 0 && (
              <div className="space-y-3 max-h-36 overflow-y-auto pr-1">
                {selectedFiles.map((file) => {
                  const progress = uploadProgress[file.name] || 0;
                  return (
                    <div
                      key={file.name}
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-[#FCFCFC]"
                    >
                      <div className="p-2 bg-rose-50 rounded text-rose-600">
                        <FileText size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs font-semibold text-gray-700 truncate">
                            {file.name}
                          </p>
                          <span className="text-[10px] text-gray-500">
                            {formatBytes(file.size)}
                          </span>
                        </div>
                        {progress < 100 ? (
                          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-rose-500 transition-all duration-200"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        ) : (
                          <p className="text-[10px] text-green-600 flex items-center gap-1 font-medium">
                            Ready to submit
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(file.name);
                        }}
                        className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* GOOGLE DRIVE LINK */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Paste Project Link
              </label>
              <input
                type="url"
                value={googleDriveLink}
                onChange={(e) => setGoogleDriveLink(e.target.value)}
                placeholder="Google Drive, Figma, or GitHub link"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-rose-500 focus:outline-none transition-colors shadow-sm"
              />
            </div>

            {/* ADDITIONAL INFORMATION */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Additional Information
                </label>
                <span className="text-[10px] text-gray-400 font-medium">
                  {additionalInfo.length}/40
                </span>
              </div>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value.slice(0, 40))}
                placeholder="Brief comments or notes (max 40 chars)..."
                rows={2}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-rose-500 focus:outline-none transition-colors shadow-sm resize-none"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-gray-300 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-xl bg-[#E11D48] py-3 text-sm font-semibold text-white hover:bg-rose-700 transition-colors shadow-md disabled:bg-rose-400"
              >
                {isSubmitting ? "Submitting..." : "Submit Assignment"}
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
            <div className="p-3 bg-green-50 text-green-500 rounded-full animate-bounce">
              <CheckCircle2 size={48} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Assignment Uploaded Successfully
              </h3>
              <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
                Your submission has been saved and is currently under review by your instructor.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full max-w-[200px] rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition-colors shadow"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
