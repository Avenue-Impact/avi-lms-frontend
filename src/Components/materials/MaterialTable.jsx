import React from "react";
import {
  FileText,
  Film,
  Image as ImageIcon,
  Link as LinkIcon,
  Download,
  Eye,
  Trash2,
  ExternalLink,
  Sparkles,
  FileSpreadsheet,
} from "lucide-react";
import { format } from "date-fns";

export default function MaterialTable({
  materials = [],
  onSelect,
  onView,
  onDownload,
  onDelete,
}) {
  const handleView = (m, e) => {
    if (e) e.stopPropagation();
    if (onSelect) onSelect(m);
    else if (onView) onView(m);
  };

  const handleDownload = (m, e) => {
    if (e) e.stopPropagation();
    if (onDownload) {
      onDownload(m);
    } else if (m.file_url) {
      window.open(m.file_url, "_blank", "noopener,noreferrer");
    }
  };

  const handleDelete = (m, e) => {
    if (e) e.stopPropagation();
    if (onDelete) {
      onDelete(m);
    }
  };

  const getFileExtension = (m) => {
    const file_type = m.file_type;
    if (
      file_type &&
      !["document", "link", "video", "image"].includes(file_type.toLowerCase())
    ) {
      const clean = file_type.toLowerCase().replace(/^\./, "").trim();
      if (!clean.includes("/")) return clean;
    }
    const name = (m.file_name || "").split("?")[0].trim();
    if (name.includes(".")) {
      return name.split(".").pop().toLowerCase().trim();
    }
    const url = (m.file_url || "").split("?")[0].trim();
    if (url.includes(".")) {
      const candidate = url.split(".").pop().toLowerCase().trim();
      if (candidate && candidate.length <= 5) return candidate;
    }
    return "";
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return "";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const formatDateSafe = (dateVal) => {
    if (!dateVal) return "";
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return "";
      return format(d, "dd MMM yyyy");
    } catch {
      return "";
    }
  };

  const getFormatDetails = (m) => {
    const ext = getFileExtension(m);
    const type = m.type;

    if (ext === "pdf" || (type === "document" && (!ext || ext === "pdf"))) {
      return {
        label: "PDF Document",
        badgeClass: "bg-red-50 text-red-700 border-red-200/70",
        iconContainer: "bg-red-50 text-red-600",
        icon: <FileText size={18} />,
      };
    }
    if (["docx", "doc"].includes(ext)) {
      return {
        label: "DOCX Document",
        badgeClass: "bg-blue-50 text-blue-700 border-blue-200/70",
        iconContainer: "bg-blue-50 text-blue-600",
        icon: <FileText size={18} />,
      };
    }
    if (["xlsx", "xls", "csv"].includes(ext)) {
      return {
        label: ext ? `${ext.toUpperCase()} Spreadsheet` : "Spreadsheet",
        badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
        iconContainer: "bg-emerald-50 text-emerald-600",
        icon: <FileSpreadsheet size={18} />,
      };
    }
    if (type === "video" || ["mp4", "mov", "webm", "mkv", "avi"].includes(ext)) {
      return {
        label: ext && ext !== "video" ? `${ext.toUpperCase()} Video` : "Video",
        badgeClass: "bg-purple-50 text-purple-700 border-purple-200/70",
        iconContainer: "bg-purple-50 text-purple-600",
        icon: <Film size={18} />,
      };
    }
    if (type === "image" || ["jpg", "jpeg", "png", "webp", "svg", "gif"].includes(ext)) {
      return {
        label: ext && ext !== "image" ? `${ext.toUpperCase()} Image` : "Image",
        badgeClass: "bg-teal-50 text-teal-700 border-teal-200/70",
        iconContainer: "bg-teal-50 text-teal-600",
        icon: <ImageIcon size={18} />,
      };
    }
    if (type === "link" || ext === "link") {
      return {
        label: "Resource Link",
        badgeClass: "bg-sky-50 text-sky-700 border-sky-200/70",
        iconContainer: "bg-sky-50 text-sky-600",
        icon: <LinkIcon size={18} />,
      };
    }

    return {
      label: ext ? `${ext.toUpperCase()} File` : "Document",
      badgeClass: "bg-amber-50 text-amber-700 border-amber-200/70",
      iconContainer: "bg-amber-50 text-amber-600",
      icon: <FileText size={18} />,
    };
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[620px]">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <th className="py-3.5 px-4 sm:px-6 font-semibold">File Name</th>
              <th className="py-3.5 px-4 font-semibold">File Type</th>
              <th className="py-3.5 px-4 sm:px-6 font-semibold text-right">
                {onDelete ? "Download / Delete" : "Download"}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {materials.map((m) => {
              const formatInfo = getFormatDetails(m);
              const isLink = m.type === "link";
              const displayName = m.title || m.file_name || "Material";
              const fileSizeStr = !isLink && m.file_size > 0 ? formatFileSize(m.file_size) : "";
              const dateStr = formatDateSafe(m.createdAt);
              const scopeStr = m.course_type
                ? m.course_type === "live"
                  ? "Live Cohort"
                  : "On Demand"
                : "";

              const secondaryMeta = [
                m.file_name && m.file_name !== displayName ? m.file_name : null,
                fileSizeStr || null,
                dateStr || null,
                scopeStr || null,
              ]
                .filter(Boolean)
                .join(" • ");

              return (
                <tr
                  key={m._id}
                  onClick={(e) => handleView(m, e)}
                  className="group hover:bg-[#FFF8F9] transition-colors cursor-pointer"
                >
                  {/* Column 1: File Name */}
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${formatInfo.iconContainer}`}
                      >
                        {formatInfo.icon}
                      </div>
                      <div className="min-w-0 max-w-sm sm:max-w-md lg:max-w-xl">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-[#CC1747] transition-colors truncate">
                            {displayName}
                          </p>
                          {m.is_unseen && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#CC1747] text-white text-[9px] font-bold tracking-wider animate-pulse shrink-0">
                              <Sparkles size={9} />
                              NEW
                            </span>
                          )}
                        </div>
                        {secondaryMeta ? (
                          <p className="text-xs text-slate-400 truncate mt-0.5">
                            {secondaryMeta}
                          </p>
                        ) : m.instructions ? (
                          <p className="text-xs text-slate-400 truncate mt-0.5">
                            {m.instructions}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </td>

                  {/* Column 2: File Type */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-semibold tracking-wide ${formatInfo.badgeClass}`}
                    >
                      {formatInfo.label}
                    </span>
                  </td>

                  {/* Column 3: Download / Delete */}
                  <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                    <div className="inline-flex items-center justify-end gap-2">
                      {/* View Details */}
                      <button
                        type="button"
                        onClick={(e) => handleView(m, e)}
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                        title="View Details"
                      >
                        <Eye size={17} />
                      </button>

                      {/* Download / Open Link */}
                      <button
                        type="button"
                        onClick={(e) => handleDownload(m, e)}
                        className="p-2 rounded-xl bg-[#FFEBF0] text-[#CC1747] hover:bg-[#CC1747] hover:text-white transition shadow-2xs"
                        title={isLink ? "Open Link" : "Download"}
                      >
                        {isLink ? <ExternalLink size={17} /> : <Download size={17} />}
                      </button>

                      {/* Delete */}
                      {onDelete && (
                        <button
                          type="button"
                          onClick={(e) => handleDelete(m, e)}
                          className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                          title="Delete Material"
                        >
                          <Trash2 size={17} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
