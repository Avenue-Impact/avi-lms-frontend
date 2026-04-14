import React from "react";

const AssignmentCard = ({
  title,
  cohort,
  dueDate,
  submissionStats,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative flex cursor-pointer flex-col rounded-[8px] border border-[#E5E5E5] bg-[#FFFFFF] p-[20px] transition-all hover:bg-[#F9F9F9] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
    >
      {/* Line 1 - Title */}
      <h3 className="mb-2 text-[20px] font-bold text-[#1A1A2E]">{title}</h3>

      {/* Line 2 - Cohort */}
      <p className="mt-[6px] text-[13.5px] text-[#1A1A2E]">
        <span className="font-normal">Cohort:</span>{" "}
        <span className="font-medium text-[#C8102E]">{cohort}</span>
      </p>

      {/* Line 3 - Due Date */}
      <p className="mt-[6px] text-[13.5px] text-[#1A1A2E]">
        <span className="font-normal">Due Date:</span>{" "}
        <span className="font-medium text-[#C8102E]">{dueDate}</span>
      </p>

      {/* Line 4 - Submission Stats */}
      <p className="mt-[6px] text-[13.5px] text-[#1A1A2E]">
        <span className="font-normal">Submission Stats:</span>{" "}
        <span className="font-medium text-[#C8102E]">
          {submissionStats.submitted} / {submissionStats.total} submitted
        </span>
      </p>
    </div>
  );
};

export default AssignmentCard;
