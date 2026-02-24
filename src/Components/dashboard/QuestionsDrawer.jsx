import { cn } from "@/lib/utils";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { CommonButton } from "../ui/button";

export function QuestionsDrawer({ isOpen= false, onClose }) {
  const [view, setView] = useState("list"); // 'list' | 'detail' | 'my-questions'

  return (
    <>
      {/* Overlay - visible only on mobile/tablet when open */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={cn(
          "fixed top-0 left-0 lg:left-[76px] h-screen w-[320px] md:w-[400px] bg-white z-50 shadow-xl transition-transform duration-300 ease-in-out border-r border-gray-200 flex flex-col lg:max-w-[360px]",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-xl md:text-[22px] font-bold text-[#111827]">Questions</h2>
          <button 
            onClick={onClose}
            className="text-black hover:text-gray-600 transition-colors lg:hidden"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>

        <div className="px-6 flex-1 overflow-y-auto">
          {view === "list" && (
            <div className="mt-2 space-y-6">
              <div className="relative">
                <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search Questions" 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-color-300"
                />
              </div>

              <CommonButton 
                onClick={() => setView("detail")}
                className="w-full md:w-auto bg-primary-color-600 hover:bg-primary-color-700 text-white rounded-md flex items-center justify-center gap-2 px-6 py-2.5"
              >
                <span>My Questions</span>
                <FaArrowRight size={12} />
              </CommonButton>
            </div>
          )}

          {view === "detail" && (
            <div className="mt-2 flex flex-col h-full space-y-4">
              <button 
                onClick={() => setView("list")}
                className="flex items-center gap-2 text-sm text-[#111827] hover:text-gray-600 transition-colors"
              >
                <FaArrowLeft size={12} />
                <span>Back to Q&A List</span>
              </button>

              <div className="mt-4 flex-1 flex flex-col">
                <textarea 
                  placeholder="Write your question here..."
                  className="w-full h-[200px] p-4 bg-primary-color-100/20 border border-primary-color-300/30 rounded-md text-sm placeholder:text-primary-color-300/70 focus:outline-none focus:ring-1 focus:ring-primary-color-300 resize-none"
                />
                <div className="mt-4">
                  <CommonButton 
                    className="w-full md:w-auto bg-primary-color-600 hover:bg-primary-color-700 text-white rounded-md px-6 py-2.5"
                  >
                    Add Comment
                  </CommonButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
