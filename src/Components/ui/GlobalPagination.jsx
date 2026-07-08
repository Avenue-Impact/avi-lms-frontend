import React, { useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

export default function GlobalPagination({ pagination, onPageChange, onLimitChange }) {
  if (!pagination) return null;

  const { page, perPage, total, lastPage } = pagination;

  const [basePerPage] = useState(perPage || 10);
  const options = [basePerPage, basePerPage * 2, basePerPage * 3, basePerPage * 4];

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (lastPage <= maxVisiblePages) {
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, page - 2);
      let end = Math.min(lastPage, start + maxVisiblePages - 1);
      
      if (end === lastPage) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t mt-4 border-[#E4E7EC] sm:px-6 bg-white rounded-b-lg">
      <div className="flex flex-wrap items-center gap-4">
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
              {options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
           </select>
        </div>
        <div className="flex items-center space-x-2">
           <label className="text-sm text-[#475367]">Jump to:</label>
           <select 
             className="text-sm border-[#D0D5DD] rounded-md focus:ring-primary-color-500 focus:border-primary-color-500 p-1 bg-white border"
             value={page} 
             onChange={(e) => onPageChange(Number(e.target.value))}
           >
              {Array.from({ length: lastPage || 1 }, (_, i) => i + 1).map(p => (
                <option key={p} value={p}>Page {p}</option>
              ))}
           </select>
        </div>
      </div>
      <div>
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm bg-white" aria-label="Pagination">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-[#98A2B3] ring-1 ring-inset ring-[#D0D5DD] hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="sr-only">Previous</span>
            <HiOutlineChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          
          {getPageNumbers().map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-[#D0D5DD] focus:outline-offset-0 transition-colors duration-150 ${
                page === p
                  ? "z-10 bg-[#CC1747] text-white ring-[#CC1747] hover:bg-[#a6133a]"
                  : "bg-white text-[#101928] hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          ))}

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
