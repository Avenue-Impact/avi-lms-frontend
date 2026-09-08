import React from "react";
import { X, Download, ExternalLink, FileText, Calendar, User, HardDrive, Eye } from "lucide-react";
import { format } from "date-fns";

export default function MaterialDetailModal({
  material,
  isOpen,
  onClose,
  onDownload,
}) {
  if (!isOpen || !material) return null;

  const {
    title,
    instructions,
    type,
    file_type = "pdf",
    file_name,
    file_size,
    file_url,
    createdAt,
    uploader_name = "Instructor",
    uploader_role = "instructor",
    views = 0,
    downloads = 0,
    course_type,
    on_demand_duration,
  } = material;

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return "N/A";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const formattedDateTime = createdAt
    ? format(new Date(createdAt), "MMMM dd, yyyy 'at' hh:mm a")
    : "N/A";

  const handleDownload = () => {
    if (onDownload) {
      onDownload(material);
    } else if (file_url) {
      window.open(file_url, "_blank", "noopener,noreferrer");
    }
  };

  const handleOpenBrowser = () => {
    if (file_url) {
      window.open(file_url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] transform transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Color Accent */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-[#FDF2F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#CC1747] text-white flex items-center justify-center shadow-md">
              <FileText size={20} />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#CC1747]">
                Course Material
              </span>
              <h3 className="font-space font-bold text-lg text-[#0A1430] leading-snug">
                Material Details
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

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Material Title */}
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Material Name
            </span>
            <h4 className="mt-1 font-space font-bold text-xl text-[#0A1430] leading-snug">
              {title}
            </h4>
          </div>

          {/* Full Instructions */}
          {instructions ? (
            <div className="rounded-2xl bg-slate-50 border border-slate-200/70 p-4">
              <span className="text-xs font-semibold text-slate-600 block mb-1.5 uppercase tracking-wide">
                Instructions & Guidance
              </span>
              <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                {instructions}
              </p>
            </div>
          ) : (
            <div className="rounded-2xl bg-slate-50/70 border border-slate-100 p-4 text-xs text-slate-400 italic">
              No specific instructions provided for this material.
            </div>
          )}

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <FileText size={16} className="text-[#CC1747] shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[11px]">Format / Type</span>
                <span className="font-semibold text-slate-800 uppercase">
                  {file_type || type}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <HardDrive size={16} className="text-[#CC1747] shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[11px]">File Size</span>
                <span className="font-semibold text-slate-800">
                  {formatFileSize(file_size)}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <User size={16} className="text-[#CC1747] shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[11px]">Uploaded By</span>
                <span className="font-semibold text-slate-800">
                  {uploader_name}
                </span>
                <span className="text-[10px] text-slate-500 capitalize block">
                  ({uploader_role})
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <Calendar size={16} className="text-[#CC1747] shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[11px]">Date Uploaded</span>
                <span className="font-semibold text-slate-800">
                  {formattedDateTime}
                </span>
              </div>
            </div>
          </div>

          {/* Engagement Statistics */}
          {/* <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200/60 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1.5">
              <Eye size={14} className="text-slate-400" />
              <span>{views} Student View{views === 1 ? "" : "s"}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Download size={14} className="text-slate-400" />
              <span>{downloads} Download{downloads === 1 ? "" : "s"}</span>
            </span>
          </div> */}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-end gap-2.5">
          {type === "link" ? (
            <button
              type="button"
              onClick={handleOpenBrowser}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0E1736] hover:bg-[#1A254B] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all"
            >
              <ExternalLink size={16} />
              <span>Open Link in New Tab</span>
            </button>
          ) : (
            <>
              {["pdf", "mp4", "webm", "png", "jpg", "jpeg"].includes(file_type.toLowerCase()) && (
                <button
                  type="button"
                  onClick={handleOpenBrowser}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 transition"
                >
                  <ExternalLink size={15} />
                  <span>View in Browser</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleDownload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#CC1747] hover:bg-[#B0133D] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#CC1747]/20 transition-all"
              >
                <Download size={16} />
                <span>Download Material</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
