import React, { useState } from "react";
import {
  X,
  Upload,
  Link as LinkIcon,
  FileText,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Plus,
  Film,
  Image as ImageIcon,
} from "lucide-react";

export default function UploadMaterialModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
  isLoading = false,
  cohortId,
  cohortName = "Current Cohort",
  courseId,
  courseDurations = [], // Configured on-demand durations for this course
  availableCohorts = [], // Available cohorts if admin
  isAdmin = false,
  initialData = {},
}) {
  if (!isOpen) return null;

  const cleanId = (val) => {
    if (!val) return "";
    if (typeof val === "object") {
      const id = val._id || val.id;
      return id ? id.toString().trim() : "";
    }
    const s = String(val).trim();
    if (s === "undefined" || s === "null" || s === "[object Object]") return "";
    return s;
  };

  const effectiveCohortId = cleanId(cohortId || initialData?.cohort_id);
  const effectiveCourseId = cleanId(courseId || initialData?.course_id);
  const effectiveCohortName = cohortName !== "Current Cohort" ? cohortName : (initialData?.cohort_name || cohortName);
  const submitting = isSubmitting || isLoading;

  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [materialType, setMaterialType] = useState("document"); // document, video, image, link
  const [files, setFiles] = useState([]);
  const [linkUrl, setLinkUrl] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Admin Scope Controls
  const [adminCourseType, setAdminCourseType] = useState("live"); // live, on demand
  const [selectedCohortId, setSelectedCohortId] = useState(effectiveCohortId || "");
  const [selectedDuration, setSelectedDuration] = useState("all");

  const formatBytes = (bytes) => {
    if (!bytes && bytes !== 0) return "0 B";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getFileIcon = (fileName) => {
    const ext = (fileName || "").split(".").pop().toLowerCase();
    if (["mp4", "mov", "webm", "avi", "mkv"].includes(ext)) {
      return <Film size={16} className="text-purple-600 shrink-0" />;
    }
    if (["jpg", "jpeg", "png", "webp", "svg", "gif"].includes(ext)) {
      return <ImageIcon size={16} className="text-blue-600 shrink-0" />;
    }
    return <FileText size={16} className="text-amber-600 shrink-0" />;
  };

  const handleFilesAdded = (incomingFiles) => {
    if (!incomingFiles || incomingFiles.length === 0) return;
    const incomingArray = Array.from(incomingFiles);
    const maxSizeBytes = 200 * 1024 * 1024;

    const oversized = incomingArray.filter((f) => f.size > maxSizeBytes);
    if (oversized.length > 0) {
      setErrorMsg(`${oversized.length} file(s) exceed 200MB limit and were skipped.`);
    } else {
      setErrorMsg("");
    }

    const validFiles = incomingArray.filter((f) => f.size <= maxSizeBytes);
    if (validFiles.length === 0) return;

    setFiles((prev) => {
      const existingKeys = new Set(prev.map((f) => `${f.name}_${f.size}`));
      const newUnique = validFiles.filter((f) => !existingKeys.has(`${f.name}_${f.size}`));
      const combined = [...prev, ...newUnique];

      if (!title && combined.length > 0) {
        setTitle(combined[0].name.replace(/\.[^/.]+$/, ""));
      }
      return combined;
    });
  };

  const handleRemoveFile = (indexToRemove) => {
    setFiles((prev) => {
      const updated = prev.filter((_, idx) => idx !== indexToRemove);
      return updated;
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesAdded(e.dataTransfer.files);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (materialType === "link") {
      if (!linkUrl.trim()) {
        setErrorMsg("Please enter a valid link URL.");
        return;
      }
      if (!title.trim()) {
        setErrorMsg("Please provide a material name.");
        return;
      }
    } else if (files.length === 0) {
      setErrorMsg("Please select or drop at least one file to upload.");
      return;
    }

    const effectiveTitle = title.trim() || (files[0] ? files[0].name.replace(/\.[^/.]+$/, "") : "Material");

    const formData = new FormData();
    formData.append("title", effectiveTitle);
    formData.append("instructions", instructions.trim());
    formData.append("type", materialType);

    if (effectiveCourseId) {
      formData.append("course_id", effectiveCourseId);
    }

    if (materialType === "link") {
      formData.append("link_url", linkUrl.trim());
    } else {
      files.forEach((f) => {
        formData.append("files", f);
      });
      if (files.length === 1) {
        formData.append("file", files[0]);
      }
    }

    if (isAdmin) {
      formData.append("course_type", adminCourseType);
      if (adminCourseType === "live") {
        if (selectedCohortId) {
          formData.append("cohort_id", selectedCohortId);
        }
      } else if (adminCourseType === "on demand") {
        formData.append("on_demand_duration", selectedDuration);
      }
    } else {
      // Instructor is locked to cohort
      formData.append("course_type", "live");
      if (effectiveCohortId) {
        formData.append("cohort_id", effectiveCohortId);
      }
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] transform transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-[#FDF2F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#CC1747] text-white flex items-center justify-center shadow-md">
              <Upload size={20} />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#CC1747]">
                {isAdmin ? "Admin Portal" : "Instructor Workspace"}
              </span>
              <h3 className="font-space font-bold text-lg text-[#0A1430] leading-snug">
                Upload Course Material
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
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              <AlertCircle size={16} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Scope Indicator for Instructor */}
          {!isAdmin && (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 flex items-center justify-between">
              <span>Target Cohort:</span>
              <span className="font-semibold text-[#0A1430]">{effectiveCohortName}</span>
            </div>
          )}

          {/* Scope Controls for Admin */}
          {isAdmin && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
              <span className="text-xs font-semibold text-slate-700 block uppercase tracking-wide">
                Target Audience & Scope
              </span>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAdminCourseType("live")}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                    adminCourseType === "live"
                      ? "bg-[#0E1736] text-white border-[#0E1736] shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Live Cohort
                </button>

                <button
                  type="button"
                  onClick={() => setAdminCourseType("on demand")}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                    adminCourseType === "on demand"
                      ? "bg-[#0E1736] text-white border-[#0E1736] shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  On-Demand Course
                </button>
              </div>

              {adminCourseType === "live" ? (
                <div>
                  <label className="text-[11px] font-medium text-slate-500 block mb-1">
                    Assign to Cohort
                  </label>
                  <select
                    value={selectedCohortId}
                    onChange={(e) => setSelectedCohortId(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-[#CC1747] focus:outline-none"
                  >
                    <option value="">All Cohorts in Course</option>
                    {availableCohorts.map((c) => (
                      <option key={c.id || c._id} value={c.id || c._id}>
                        {c.cohort || c.name || "Cohort"}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="text-[11px] font-medium text-slate-500 block mb-1">
                    Target Subscription Duration
                  </label>
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-[#CC1747] focus:outline-none"
                  >
                    <option value="all">All On-Demand Students (All Durations)</option>
                    {courseDurations && courseDurations.length > 0 ? (
                      courseDurations.map((dur, i) => {
                        const val = typeof dur === "string" ? dur : dur?.duration || "";
                        if (!val) return null;
                        return (
                          <option key={i} value={val}>
                            {val}
                          </option>
                        );
                      })
                    ) : (
                      <option disabled value="">
                        No specific on-demand durations found for this course
                      </option>
                    )}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Material Name */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Material Name {files.length > 1 ? <span className="text-slate-400 font-normal">(Optional for multiple files)</span> : <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              placeholder={files.length > 1 ? "Defaults to each file's name" : "e.g. Sprint Planning Template & Guidelines"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 focus:border-[#CC1747] focus:ring-1 focus:ring-[#CC1747] focus:outline-none"
              required={files.length <= 1}
            />
          </div>

          {/* Type Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Material Format
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: "document", label: "Document" },
                { id: "video", label: "Video" },
                { id: "image", label: "Image" },
                { id: "link", label: "Link" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setMaterialType(t.id)}
                  className={`py-2 text-xs font-semibold rounded-xl border transition ${
                    materialType === t.id
                      ? "bg-[#CC1747] text-white border-[#CC1747] shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Instructions & Guidance
            </label>
            <textarea
              rows={3}
              placeholder="Provide context, instructions, or notes for students..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 focus:border-[#CC1747] focus:ring-1 focus:ring-[#CC1747] focus:outline-none resize-none"
            />
          </div>

          {/* File Upload or Link Input */}
          {materialType === "link" ? (
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                External Resource URL <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <LinkIcon size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="url"
                  placeholder="https://..."
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-3 pl-10 text-sm text-slate-800 focus:border-[#CC1747] focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Upload Files (Max 200MB per file) <span className="text-red-500">*</span>
                </label>
                {files.length > 0 && (
                  <span className="text-xs font-medium text-slate-500">
                    {files.length} file{files.length > 1 ? "s" : ""} selected &bull;{" "}
                    {formatBytes(files.reduce((acc, f) => acc + f.size, 0))}
                  </span>
                )}
              </div>

              {files.length === 0 ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("material-file-input")?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                    dragOver
                      ? "border-[#CC1747] bg-[#FFF1F4]"
                      : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                  }`}
                >
                  <input
                    id="material-file-input"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleFilesAdded(e.target.files);
                        e.target.value = "";
                      }
                    }}
                  />

                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center text-slate-400 mb-2">
                      <Upload size={20} />
                    </div>
                    <p className="text-sm font-semibold text-slate-700">
                      Drag & drop files here, or <span className="text-[#CC1747]">browse</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Select one or multiple files up to 200MB each (PDF, TXT, DOCX, XLSX, MP4, etc.)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* File List */}
                  <div className="max-h-48 overflow-y-auto space-y-2 border border-slate-200 rounded-xl p-2.5 bg-slate-50/50">
                    {files.map((f, idx) => (
                      <div
                        key={`${f.name}_${f.size}_${idx}`}
                        className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200/80 shadow-xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                            {getFileIcon(f.name)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-slate-800 truncate" title={f.name}>
                              {f.name}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {formatBytes(f.size)}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveFile(idx)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
                          title="Remove file"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add More Files Area */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("material-file-input-more")?.click()}
                    className={`border border-dashed rounded-xl py-2.5 px-4 text-center cursor-pointer transition flex items-center justify-center gap-2 ${
                      dragOver
                        ? "border-[#CC1747] bg-[#FFF1F4]"
                        : "border-slate-300 hover:border-slate-400 bg-white"
                    }`}
                  >
                    <input
                      id="material-file-input-more"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          handleFilesAdded(e.target.files);
                          e.target.value = "";
                        }
                      }}
                    />
                    <Plus size={15} className="text-[#CC1747]" />
                    <span className="text-xs font-medium text-slate-600">
                      Add more files or drag & drop here
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-[#CC1747] hover:bg-[#B0133D] text-sm font-semibold text-white shadow-md shadow-[#CC1747]/20 transition disabled:opacity-50 flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <span>
                  {files.length > 1 ? `Upload ${files.length} Materials` : "Upload Material"}
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
