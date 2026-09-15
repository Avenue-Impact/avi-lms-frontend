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
  showStats = true,
  showScope = true,
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
    if (!bytes || bytes === 0) return "—";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const formatDateSafe = (dateVal) => {
    if (!dateVal) return "—";
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return "—";
      return format(d, "dd MMM yyyy");
    } catch {
      return "—";
    }
  };

  const getFormatDetails = (m) => {
    const ext = getFileExtension(m);
    const type = m.type;

    if (ext === "pdf" || (type === "document" && (!ext || ext === "pdf"))) {
      return {
        label: "PDF",
        badgeClass: "bg-red-50 text-red-700 border-red-200/70",
        iconContainer: "bg-red-50 text-red-600",
        icon: <FileText size={18} />,
      };
    }
    if (["docx", "doc"].includes(ext)) {
      return {
        label: "DOCX",
        badgeClass: "bg-blue-50 text-blue-700 border-blue-200/70",
        iconContainer: "bg-blue-50 text-blue-600",
        icon: <FileText size={18} />,
      };
    }
    if (["xlsx", "xls", "csv"].includes(ext)) {
      return {
        label: ext ? ext.toUpperCase() : "SHEET",
        badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
        iconContainer: "bg-emerald-50 text-emerald-600",
        icon: <FileSpreadsheet size={18} />,
      };
    }
    if (type === "video" || ["mp4", "mov", "webm", "mkv", "avi"].includes(ext)) {
      return {
        label: ext && ext !== "video" ? ext.toUpperCase() : "VIDEO",
        badgeClass: "bg-purple-50 text-purple-700 border-purple-200/70",
        iconContainer: "bg-purple-50 text-purple-600",
        icon: <Film size={18} />,
      };
    }
    if (type === "image" || ["jpg", "jpeg", "png", "webp", "svg", "gif"].includes(ext)) {
      return {
        label: ext && ext !== "image" ? ext.toUpperCase() : "IMAGE",
        badgeClass: "bg-teal-50 text-teal-700 border-teal-200/70",
        iconContainer: "bg-teal-50 text-teal-600",
        icon: <ImageIcon size={18} />,
      };
    }
    if (type === "link" || ext === "link") {
      return {
        label: "LINK",
        badgeClass: "bg-sky-50 text-sky-700 border-sky-200/70",
        iconContainer: "bg-sky-50 text-sky-600",
        icon: <LinkIcon size={18} />,
      };
    }

    return {
      label: ext ? ext.toUpperCase() : "DOC",
      badgeClass: "bg-amber-50 text-amber-700 border-amber-200/70",
      iconContainer: "bg-amber-50 text-amber-600",
      icon: <FileText size={18} />,
    };
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-4 font-semibold">Material</th>
              <th className="py-3.5 px-4 font-semibold">Format</th>
              {showScope && (
                <th className="py-3.5 px-4 font-semibold">Delivery Scope</th>
              )}
              <th className="py-3.5 px-4 font-semibold">Size</th>
              <th className="py-3.5 px-4 font-semibold">Added Date</th>
              {showStats && (
                <th className="py-3.5 px-4 font-semibold text-center">Engagement</th>
              )}
              <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {materials.map((m) => {
              const formatInfo = getFormatDetails(m);
              const isLink = m.type === "link";

              return (
                <tr
                  key={m._id}
                  onClick={(e) => handleView(m, e)}
                  className="group hover:bg-[#FFF8F9] transition-colors cursor-pointer"
                >
                  {/* Column 1: Material Name & Details */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${formatInfo.iconContainer}`}
                      >
                        {formatInfo.icon}
                      </div>
                      <div className="min-w-0 max-w-xs sm:max-w-sm lg:max-w-md">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-[#CC1747] transition-colors truncate">
                            {m.title}
                          </p>
                          {m.is_unseen && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#CC1747] text-white text-[9px] font-bold tracking-wider animate-pulse shrink-0">
                              <Sparkles size={9} />
                              NEW
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 truncate mt-0.5">
                          {m.file_name && m.file_name !== m.title
                            ? m.file_name
                            : m.instructions || (isLink ? m.file_url : "Course study material")}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Column 2: Format Badge */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[11px] font-bold font-space tracking-wide ${formatInfo.badgeClass}`}
                    >
                      {formatInfo.label}
                    </span>
                  </td>

                  {/* Column 3: Scope / Course Type */}
                  {showScope && (
                    <td className="py-3.5 px-4">
                      {m.course_type ? (
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                            m.course_type === "live"
                              ? "bg-purple-50 text-purple-700 border border-purple-200/60"
                              : "bg-amber-50 text-amber-700 border border-amber-200/60"
                          }`}
                        >
                          {m.course_type === "on demand"
                            ? m.on_demand_duration && m.on_demand_duration !== "all"
                              ? `On Demand (${m.on_demand_duration})`
                              : "On Demand (All)"
                            : "Live Cohort"}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                  )}

                  {/* Column 4: File Size */}
                  <td className="py-3.5 px-4 text-xs font-medium text-slate-600">
                    {isLink ? (
                      <span className="text-slate-400 font-normal">Link URL</span>
                    ) : (
                      formatFileSize(m.file_size)
                    )}
                  </td>

                  {/* Column 5: Added Date */}
                  <td className="py-3.5 px-4 text-xs text-slate-500 font-medium whitespace-nowrap">
                    {formatDateSafe(m.createdAt)}
                  </td>

                  {/* Column 6: Stats (Views & Downloads) */}
                  {showStats && (
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center gap-3 text-xs text-slate-500 font-medium">
                        <span
                          className="flex items-center gap-1 hover:text-slate-700"
                          title={`${m.views || 0} student views`}
                        >
                          <Eye size={13} className="text-slate-400" />
                          {m.views || 0}
                        </span>
                        <span
                          className="flex items-center gap-1 hover:text-slate-700"
                          title={`${m.downloads || 0} downloads`}
                        >
                          <Download size={13} className="text-slate-400" />
                          {m.downloads || 0}
                        </span>
                      </div>
                    </td>
                  )}

                  {/* Column 7: Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center justify-end gap-1.5">
                      {/* View / Detail button */}
                      <button
                        type="button"
                        onClick={(e) => handleView(m, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>

                      {/* Download / Open Link button */}
                      <button
                        type="button"
                        onClick={(e) => handleDownload(m, e)}
                        className="p-1.5 rounded-lg text-[#CC1747] hover:bg-[#FFEBF0] transition"
                        title={isLink ? "Open External Link" : "Download File"}
                      >
                        {isLink ? <ExternalLink size={16} /> : <Download size={16} />}
                      </button>

                      {/* Delete button (if onDelete provided) */}
                      {onDelete && (
                        <button
                          type="button"
                          onClick={(e) => handleDelete(m, e)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                          title="Delete Material"
                        >
                          <Trash2 size={16} />
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
