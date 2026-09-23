import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const AssignmentCard = ({
  title,
  cohort,
  dueDate,
  submissionStats,
  onClick,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative flex cursor-pointer flex-col rounded-[12px] border border-[#E5E5E5] bg-[#FFFFFF] p-[20px] transition-all hover:bg-[#F9F9F9] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
    >
      {/* Top row: Title and optional Action Buttons */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-[18px] font-bold text-[#1A1A2E] group-hover:text-[#CC1747] transition-colors leading-snug">
          {title}
        </h3>
        {(onEdit || onDelete) && (
          <div className="flex items-center gap-1 shrink-0">
            {onEdit && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
                title="Edit Assignment"
              >
                <Pencil size={15} />
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                title="Delete Assignment"
              >
                <Trash2 size={15} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Line 2 - Cohort */}
      <p className="mt-[6px] text-[13.5px] text-[#1A1A2E]">
        <span className="font-normal text-slate-500">Cohort:</span>{" "}
        <span className="font-medium text-[#C8102E]">{cohort}</span>
      </p>

      {/* Line 3 - Due Date */}
      <p className="mt-[6px] text-[13.5px] text-[#1A1A2E]">
        <span className="font-normal text-slate-500">Due Date:</span>{" "}
        <span className="font-medium text-[#C8102E]">{dueDate}</span>
      </p>

      {/* Line 4 - Submission Stats */}
      {submissionStats && (
        <p className="mt-[6px] text-[13.5px] text-[#1A1A2E]">
          <span className="font-normal text-slate-500">Submission Stats:</span>{" "}
          <span className="font-medium text-[#C8102E]">
            {submissionStats.submitted} / {submissionStats.total} submitted
          </span>
        </p>
      )}
    </div>
  );
};

export default AssignmentCard;
