import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import InstructorSideNav from "@/Components/instructor/InstructorSideNav";
import CreateAssignmentModal from "@/Components/instructor/CreateAssignmentModal";
import { Search, Plus, Bell, Menu, X } from "lucide-react";

const InstructorLayout = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">
      {/* Sidebar — receives open state for mobile */}
      <InstructorSideNav
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content — offset on large screens, full-width on small */}
      <div className="flex flex-grow flex-col lg:ml-[280px] min-w-0">
        {/* Top navigation bar */}
        <header className="sticky top-0 z-10 flex h-16 items-center border-b border-gray-200 bg-white px-4 md:px-6 lg:px-8">
          <div className="flex w-full items-center justify-between gap-4">

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="flex-shrink-0 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 lg:hidden"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Search */}
            <div className="relative hidden w-72 sm:block flex-shrink-0">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search sessions or assignments..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm transition-all focus:border-primary-color-400 focus:outline-none focus:ring-2 focus:ring-primary-color-200"
              />
            </div>

            <div className="ml-auto flex items-center gap-2">
              {/* Notification bell */}
              <button className="relative rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700">
                <Bell size={20} />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
              </button>

              {/* Create Assignment CTA */}
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 rounded-md bg-primary-color-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-color-700 whitespace-nowrap"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">Create Assignment</span>
                <span className="sm:hidden">New</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-grow p-4 md:p-6 lg:p-8">
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
