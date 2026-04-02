import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import InstructorSideNav from "@/Components/instructor/InstructorSideNav";
import CreateAssignmentModal from "@/Components/instructor/CreateAssignmentModal";
import { Search, Plus, Bell } from "lucide-react";

const InstructorLayout = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">
      <InstructorSideNav />

      <div className="ml-[320px] flex flex-grow flex-col">
        {/* Top navigation bar */}
        <header className="sticky top-0 z-10 flex h-16 items-center border-b border-gray-200 bg-white px-8">
          <div className="flex w-full items-center justify-between">
            {/* Search */}
            <div className="relative w-80">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by session name or date..."
                className="focus:ring-primary-color-200 focus:border-primary-color-400 w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm transition-all focus:outline-none focus:ring-2"
              />
            </div>

            <div className="flex items-center gap-3">
              {/* Notification bell */}
              <button className="relative rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700">
                <Bell size={20} />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              {/* Create Assignment CTA */}
              <button
                onClick={() => setShowCreateModal(true)}
                className="hover:bg-primary-color-700 flex items-center gap-2 rounded-md bg-primary-color-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors"
              >
                <Plus size={18} />
                Create Assignment
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow p-8">
          <div className="mx-auto max-w-full">
            <Outlet context={{ setShowCreateModal, searchTerm }} />
          </div>
        </main>
      </div>

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <CreateAssignmentModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};

export default InstructorLayout;
