import React from "react";
import { Download, ExternalLink, Eye, Sparkles } from "lucide-react";
import { format } from "date-fns";

export default function MaterialCard({
  material,
  onSelect,
  onDownload,
  showStats = false,
  onDelete,
}) {
  const {
    title,
    instructions,
    type,
    file_type = "pdf",
    file_size,
    createdAt,
    views = 0,
    downloads = 0,
    is_unseen = false,
  } = material;

  const getFileExtension = () => {
    // 1. If file_type is a specific file extension (not a generic word like 'document' or 'link')
    if (
      file_type &&
      !["document", "link", "video", "image"].includes(file_type.toLowerCase())
    ) {
      const clean = file_type.toLowerCase().replace(/^\./, "").trim();
      if (!clean.includes("/")) return clean;
    }
    // 2. Extract from file_name (e.g. "Lecture_Notes.pdf" -> "pdf")
    const name = (material.file_name || "").split("?")[0].trim();
    if (name.includes(".")) {
      return name.split(".").pop().toLowerCase().trim();
    }
    // 3. Extract from file_url (e.g. "https://.../file.pdf" -> "pdf")
    const url = (material.file_url || "").split("?")[0].trim();
    if (url.includes(".")) {
      const candidate = url.split(".").pop().toLowerCase().trim();
      if (candidate && candidate.length <= 5) return candidate;
    }
    return "";
  };

  const ext = getFileExtension();

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return "";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const formattedDate = createdAt
    ? format(new Date(createdAt), "dd MMM yyyy")
    : "";

  const handleDownloadClick = (e) => {
    e.stopPropagation();
    if (onDownload) {
      onDownload(material);
    } else if (material.file_url) {
      window.open(material.file_url, "_blank", "noopener,noreferrer");
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(material);
    }
  };

  // Render file-type specific top illustration banner matching screenshot
  const renderBanner = () => {
    // PDF Document
    if (ext === "pdf" || (type === "document" && (!ext || ext === "pdf"))) {
      return (
        <div className="relative w-full h-36 sm:h-40 bg-[#E11D48] flex items-center justify-center overflow-hidden">
          {/* Subtle diagonal shadow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/15 to-transparent pointer-events-none" />

          {/* White sheet illustration */}
          <div className="relative w-24 h-28 sm:w-28 sm:h-32 bg-white rounded-t-xl rounded-b-md shadow-xl flex flex-col items-center justify-center p-2 transform transition-transform duration-300 group-hover:scale-105">
            {/* Folded dog-ear corner */}
            <div className="absolute top-0 right-0 w-6 h-6 bg-slate-100 rounded-bl-lg shadow-xs border-b border-l border-slate-200" />
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-t-[#E11D48] border-l-[24px] border-l-transparent pointer-events-none" />

            {/* Inner Red PDF Badge */}
            <div className="w-16 h-9 sm:w-20 sm:h-11 bg-[#E11D48] rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-space font-extrabold text-xs sm:text-sm tracking-wider">
                PDF
              </span>
            </div>
          </div>
        </div>
      );
    }

    // Word Document
    if (["docx", "doc"].includes(ext)) {
      return (
        <div className="relative w-full h-36 sm:h-40 bg-gradient-to-br from-[#1E1B8A] via-[#1E293B] to-[#2563EB] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />

          {/* White sheet illustration */}
          <div className="relative w-24 h-28 sm:w-28 sm:h-32 bg-white rounded-t-xl rounded-b-md shadow-xl flex flex-col justify-between p-2.5 transform transition-transform duration-300 group-hover:scale-105">
            {/* Folded dog-ear corner */}
            <div className="absolute top-0 right-0 w-6 h-6 bg-blue-50 rounded-bl-lg shadow-xs border-b border-l border-blue-200" />
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-t-[#1E1B8A] border-l-[24px] border-l-transparent pointer-events-none" />

            {/* Blue DOCX Badge */}
            <div className="inline-block self-start px-2 py-0.5 rounded-md bg-[#2563EB] text-white font-space font-bold text-[9px] sm:text-[10px] tracking-wide shadow-xs">
              DOCX
            </div>

            {/* Word "W" Graphic with Lines */}
            <div className="flex items-center gap-2 mt-auto pb-1">
              <span className="font-space font-black text-xl sm:text-2xl text-[#1E3A8A] leading-none">
                W
              </span>
              <div className="space-y-1 flex-1">
                <div className="h-1 bg-[#1E3A8A] rounded-full w-full" />
                <div className="h-1 bg-[#1E3A8A] rounded-full w-3/4" />
                <div className="h-1 bg-[#1E3A8A] rounded-full w-4/5" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Excel / Spreadsheet
    if (["xlsx", "xls", "csv"].includes(ext)) {
      return (
        <div className="relative w-full h-36 sm:h-40 bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#10B981] flex items-center justify-center overflow-hidden">
          <div className="relative w-24 h-28 sm:w-28 sm:h-32 bg-white rounded-t-xl rounded-b-md shadow-xl flex flex-col justify-between p-2.5 transform transition-transform duration-300 group-hover:scale-105">
            <div className="inline-block self-start px-2 py-0.5 rounded-md bg-[#047857] text-white font-space font-bold text-[9px] sm:text-[10px] tracking-wide shadow-xs">
              SHEET
            </div>
            <div className="flex items-center gap-2 mt-auto pb-1">
              <span className="font-space font-black text-xl sm:text-2xl text-[#064E3B] leading-none">
                X
              </span>
              <div className="grid grid-cols-2 gap-1 flex-1">
                <div className="h-1.5 bg-[#047857] rounded-xs" />
                <div className="h-1.5 bg-[#047857] rounded-xs" />
                <div className="h-1.5 bg-[#047857] rounded-xs" />
                <div className="h-1.5 bg-[#047857] rounded-xs" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Generic Document (txt, ppt, pptx, or any file where type is document)
    if (type === "document" || ["txt", "rtf", "odt", "ppt", "pptx", "document"].includes(ext)) {
      const badgeText = ext && ext.length <= 4 && ext !== "document" ? ext.toUpperCase() : "DOC";
      return (
        <div className="relative w-full h-36 sm:h-40 bg-[#E11D48] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-black/15 to-transparent pointer-events-none" />
          <div className="relative w-24 h-28 sm:w-28 sm:h-32 bg-white rounded-t-xl rounded-b-md shadow-xl flex flex-col items-center justify-center p-2 transform transition-transform duration-300 group-hover:scale-105">
            <div className="absolute top-0 right-0 w-6 h-6 bg-slate-100 rounded-bl-lg shadow-xs border-b border-l border-slate-200" />
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-t-[#E11D48] border-l-[24px] border-l-transparent pointer-events-none" />
            <div className="w-16 h-9 sm:w-20 sm:h-11 bg-[#E11D48] rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-space font-extrabold text-xs sm:text-sm tracking-wider">
                {badgeText}
              </span>
            </div>
          </div>
        </div>
      );
    }

    // Video
    if (["mp4", "mov", "webm", "mkv", "avi"].includes(ext) || type === "video") {
      return (
        <div className="relative w-full h-36 sm:h-40 bg-gradient-to-br from-[#3B0764] via-[#581C87] to-[#7C3AED] flex items-center justify-center overflow-hidden">
          <div className="relative w-24 h-28 sm:w-28 sm:h-32 bg-white rounded-t-xl rounded-b-md shadow-xl flex flex-col justify-between p-2.5 transform transition-transform duration-300 group-hover:scale-105">
            <div className="inline-block self-start px-2 py-0.5 rounded-md bg-[#7C3AED] text-white font-space font-bold text-[9px] sm:text-[10px] tracking-wide shadow-xs">
              VIDEO
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#581C87] text-white flex items-center justify-center mx-auto my-auto shadow-md">
              <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      );
    }

    // Image
    if (["jpg", "jpeg", "png", "webp", "svg", "gif"].includes(ext) || type === "image") {
      return (
        <div className="relative w-full h-36 sm:h-40 bg-gradient-to-br from-[#0F766E] via-[#0D9488] to-[#14B8A6] flex items-center justify-center overflow-hidden">
          <div className="relative w-24 h-28 sm:w-28 sm:h-32 bg-white rounded-t-xl rounded-b-md shadow-xl flex flex-col justify-between p-2.5 transform transition-transform duration-300 group-hover:scale-105">
            <div className="inline-block self-start px-2 py-0.5 rounded-md bg-[#0D9488] text-white font-space font-bold text-[9px] sm:text-[10px] tracking-wide shadow-xs">
              IMG
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center mx-auto my-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2" />
                <path d="M21 15l-5-5L5 21" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      );
    }

    // External Link Banner (ONLY if type is explicitly link or ext is link)
    if (type === "link" || ext === "link") {
      return (
        <div className="relative w-full h-36 sm:h-40 bg-gradient-to-br from-[#0369A1] via-[#0284C7] to-[#38BDF8] flex items-center justify-center overflow-hidden">
          <div className="relative w-24 h-28 sm:w-28 sm:h-32 bg-white rounded-t-xl rounded-b-md shadow-xl flex flex-col justify-between p-2.5 transform transition-transform duration-300 group-hover:scale-105">
            <div className="inline-block self-start px-2 py-0.5 rounded-md bg-[#0284C7] text-white font-space font-bold text-[9px] sm:text-[10px] tracking-wide shadow-xs">
              LINK
            </div>
            <div className="w-10 h-10 rounded-full bg-[#0369A1] text-white flex items-center justify-center mx-auto my-auto shadow-sm">
              <ExternalLink size={20} />
            </div>
          </div>
        </div>
      );
    }

    // Fallback for files: Default to Document Banner
    return (
      <div className="relative w-full h-36 sm:h-40 bg-[#E11D48] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/15 to-transparent pointer-events-none" />
        <div className="relative w-24 h-28 sm:w-28 sm:h-32 bg-white rounded-t-xl rounded-b-md shadow-xl flex flex-col items-center justify-center p-2 transform transition-transform duration-300 group-hover:scale-105">
          <div className="absolute top-0 right-0 w-6 h-6 bg-slate-100 rounded-bl-lg shadow-xs border-b border-l border-slate-200" />
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-t-[#E11D48] border-l-[24px] border-l-transparent pointer-events-none" />
          <div className="w-16 h-9 sm:w-20 sm:h-11 bg-[#E11D48] rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-space font-extrabold text-xs sm:text-sm tracking-wider">
              DOC
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      onClick={() => onSelect && onSelect(material)}
      className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#CC1747]/40 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Top Banner */}
      {renderBanner()}

      {/* Unseen Badge (Red Theme) */}
      {is_unseen && (
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 bg-[#CC1747] text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-md animate-pulse">
          <Sparkles size={10} />
          <span>NEW</span>
        </div>
      )}

      {/* Scope Pill Badge (Live vs On-Demand if instructor/admin viewing) */}
      {material.course_type && (
        <span className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-md bg-black/60 text-white text-[9px] font-medium backdrop-blur-xs uppercase">
          {material.course_type}
        </span>
      )}

      {/* Bottom Content Area */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h4 className="font-space font-bold text-sm sm:text-[15px] text-[#0A1430] group-hover:text-[#CC1747] transition-colors line-clamp-2 leading-snug">
            {title}
          </h4>

          {instructions && (
            <p className="mt-1 text-xs text-slate-500 line-clamp-1 leading-relaxed">
              {instructions}
            </p>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Meta & Date */}
          <div className="text-[11px] text-slate-400 font-medium">
            <span>{formattedDate}</span>
            {file_size > 0 && <span> &bull; {formatFileSize(file_size)}</span>}
          </div>

          {/* Action Button: Circular Pink Download Button */}
          <div className="flex items-center gap-1.5">
            {showStats && (
              <div className="flex items-center gap-2 text-[11px] text-slate-500 mr-1">
                <span className="flex items-center gap-0.5" title="Views">
                  <Eye size={12} className="text-slate-400" />
                  {views}
                </span>
                <span className="flex items-center gap-0.5" title="Downloads">
                  <Download size={12} className="text-slate-400" />
                  {downloads}
                </span>
              </div>
            )}

            {onDelete && (
              <button
                type="button"
                onClick={handleDeleteClick}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 flex items-center justify-center transition-colors"
                title="Delete Material"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}

            <button
              type="button"
              onClick={handleDownloadClick}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FFEBF0] text-[#CC1747] hover:bg-[#CC1747] hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95"
              title={type === "link" ? "Open Link" : "Download Material"}
            >
              {type === "link" ? <ExternalLink size={16} /> : <Download size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
