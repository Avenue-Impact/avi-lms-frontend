import React from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

export default function GlobalPagination({ pagination, onPageChange, onLimitChange }) {
  if (!pagination) return null;

  const { page, perPage, total, lastPage } = pagination;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t mt-4 border-[#E4E7EC] sm:px-6">
      <div className="flex items-center gap-4">
        <p className="text-sm text-[#475367]">
          Showing{" "}
          <span className="font-medium">{(page - 1) * perPage + (total > 0 ? 1 : 0)}</span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min(page * perPage, total)}
          </span>{" "}
          of <span className="font-medium">{total}</span> results
        </p>
        <div className="flex items-center space-x-2">
           <label className="text-sm text-[#475367]">Per page:</label>
           <select 
             className="text-sm border-[#D0D5DD] rounded-md focus:ring-primary-color-500 focus:border-primary-color-500 p-1 bg-white border"
             value={perPage} 
             onChange={(e) => onLimitChange(Number(e.target.value))}
           >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
           </select>
        </div>
      </div>
      <div>
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-[#98A2B3] ring-1 ring-inset ring-[#D0D5DD] hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="sr-only">Previous</span>
            <HiOutlineChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-[#101928] ring-1 ring-inset ring-[#D0D5DD] focus:outline-offset-0">
            {page} / {lastPage || 1}
          </span>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= lastPage}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-[#98A2B3] ring-1 ring-inset ring-[#D0D5DD] hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="sr-only">Next</span>
            <HiOutlineChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  );
}
