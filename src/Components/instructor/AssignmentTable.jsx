import React from "react";
import {
  FileText,
  Calendar,
  Clock,
  Pencil,
  Trash2,
  Eye,
  Users,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  Link as LinkIcon,
} from "lucide-react";
import { format, isPast } from "date-fns";
import { Link } from "react-router-dom";

export default function AssignmentTable({
  assignments = [],
  onEdit,
  onDelete,
  onViewSubmissions,
  totalStudents = null,
}) {
  const formatDateSafe = (dateVal) => {
    if (!dateVal) return "No due date";
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return "Invalid date";
      return format(d, "dd MMM yyyy");
    } catch {
      return "Invalid date";
    }
  };

  const getDueStatus = (dateVal) => {
    if (!dateVal) return null;
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return null;
      const overdue = isPast(d);
      return {
        overdue,
        label: overdue ? "Overdue" : "Upcoming",
        badgeClass: overdue
          ? "bg-red-50 text-red-700 border-red-200/80"
          : "bg-emerald-50 text-emerald-700 border-emerald-200/80",
      };
    } catch {
      return null;
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[720px]">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <th className="py-3.5 px-4 sm:px-6 font-semibold">Assignment</th>
              <th className="py-3.5 px-4 font-semibold">Due Date</th>
              <th className="py-3.5 px-4 font-semibold">Status</th>
              <th className="py-3.5 px-4 font-semibold">Submissions</th>
              <th className="py-3.5 px-4 sm:px-6 font-semibold text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {assignments.map((assignment) => {
              const assignmentId = assignment._id || assignment.id;
              const dueInfo = getDueStatus(assignment.due_date);
              const dueDateFormatted = formatDateSafe(assignment.due_date);
              const resourceCount = assignment.resources?.length || 0;
              const submissionsCount = assignment.submissions_count || 0;

              return (
                <tr
                  key={assignmentId}
                  className="group hover:bg-[#FFF8F9] transition-colors"
                >
                  {/* Column 1: Assignment Title & Details */}
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-[#CC1747] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                        <FileText size={20} />
                      </div>
                      <div className="min-w-0 max-w-sm sm:max-w-md lg:max-w-lg">
                        <Link
                          to={`/instructor/submissions?taskId=${assignmentId}`}
                          className="text-sm font-bold text-slate-800 hover:text-[#CC1747] transition-colors line-clamp-1 group-hover:text-[#CC1747]"
                        >
                          {assignment.title}
                        </Link>
                        {assignment.description && (
                          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                            {assignment.description}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          {assignment.submission_type && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 capitalize">
                              {assignment.submission_type === "link" && <LinkIcon size={10} />}
                              {assignment.submission_type === "file" && <FileText size={10} />}
                              {assignment.submission_type} submission
                            </span>
                          )}
                          {resourceCount > 0 && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                              <Paperclip size={10} />
                              {resourceCount} {resourceCount === 1 ? "resource" : "resources"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Column 2: Due Date */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                        <Calendar size={13} className="text-slate-400" />
                        {dueDateFormatted}
                      </span>
                      {dueInfo && (
                        <span
                          className={`inline-flex items-center w-max px-2 py-0.5 rounded-md border text-[10px] font-bold tracking-wide ${dueInfo.badgeClass}`}
                        >
                          {dueInfo.label}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Column 3: Status */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        assignment.status === "Published"
                          ? "bg-green-50 text-green-700 border border-green-200/80"
                          : assignment.status === "Draft"
                          ? "bg-gray-100 text-gray-700 border border-gray-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {assignment.status === "Published" ? (
                        <CheckCircle2 size={12} className="text-green-600" />
                      ) : (
                        <AlertCircle size={12} className="text-gray-500" />
                      )}
                      {assignment.status || "Published"}
                    </span>
                  </td>

                  {/* Column 4: Submissions */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <Link
                      to={`/instructor/submissions?taskId=${assignmentId}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-red-50 text-slate-700 hover:text-[#CC1747] border border-slate-200/80 transition shadow-2xs group/btn text-xs font-medium"
                    >
                      <Users size={13} className="text-slate-400 group-hover/btn:text-[#CC1747]" />
                      <span>
                        {totalStudents !== null && totalStudents !== undefined
                          ? `${submissionsCount} / ${totalStudents}`
                          : `${submissionsCount}`}
                      </span>
                      <span className="text-[11px] text-slate-400 group-hover/btn:text-[#CC1747]">
                        reviewed
                      </span>
                    </Link>
                  </td>

                  {/* Column 5: Actions */}
                  <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                    <div className="inline-flex items-center justify-end gap-1.5">
                      {/* View Submissions */}
                      <Link
                        to={`/instructor/submissions?taskId=${assignmentId}`}
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition shadow-2xs"
                        title="View Submissions"
                      >
                        <Eye size={17} />
                      </Link>

                      {/* Edit Assignment */}
                      {onEdit && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(assignment);
                          }}
                          className="p-2 rounded-xl bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition shadow-2xs cursor-pointer"
                          title="Edit Assignment"
                        >
                          <Pencil size={17} />
                        </button>
                      )}

                      {/* Delete Assignment */}
                      {onDelete && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(assignment);
                          }}
                          className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 transition shadow-2xs cursor-pointer"
                          title="Delete Assignment"
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
