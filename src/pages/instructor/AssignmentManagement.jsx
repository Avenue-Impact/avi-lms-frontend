import React, { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  useFetchAssignmentTasks,
  useDeleteAssignmentTask,
} from "@/hooks/instructor/use-assignment-management";
import { useFetchInstructorCohorts } from "@/hooks/instructor/use-fetch-instructor-cohorts";
import {
  ChevronLeft,
  Plus,
  FileText,
  Search,
  List,
  LayoutGrid,
  Loader2,
  Calendar,
  CheckCircle2,
  Clock,
  Trash2,
  Pencil,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AssignmentTable from "@/Components/instructor/AssignmentTable";
import AssignmentCard from "@/Components/instructor/AssignmentCard";
import AssignmentModal from "@/Components/instructor/AssignmentModal";
import DeleteConfirmModal from "@/Components/instructor/DeleteConfirmModal";

const AssignmentManagement = () => {
  const { cohortId } = useParams();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState("list"); // "list" (column-row) or "grid"
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [deletingAssignment, setDeletingAssignment] = useState(null);

  const { data: assignmentsData, isLoading } = useFetchAssignmentTasks(cohortId);
  const { data: cohortsData } = useFetchInstructorCohorts();
  const { mutateAsync: deleteAssignment, isPending: isDeleting } =
    useDeleteAssignmentTask(cohortId);

  const cohort = cohortsData?.data?.cohorts?.find(
    (c) => (c.id || c._id) === cohortId
  );
  const assignments = assignmentsData?.data?.tasks || [];

  const filteredAssignments = useMemo(() => {
    return assignments.filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ||
        item.status?.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [assignments, searchQuery, statusFilter]);

  const handleDeleteConfirm = async () => {
    if (!deletingAssignment) return;
    const assignmentId = deletingAssignment._id || deletingAssignment.id;
    try {
      await deleteAssignment(assignmentId);
      setDeletingAssignment(null);
    } catch (err) {
      console.error("Failed to delete assignment:", err);
    }
  };

  const courseTitle = cohort?.course_id?.title || "Course";
  const cohortTitle = cohort?.cohort || "Cohort";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-primary-color-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        to={`/instructor/cohorts/${cohortId}`}
        className="inline-flex items-center gap-2 text-slate-500 hover:text-[#CC1747] transition-colors"
      >
        <ChevronLeft size={16} />
        <span className="text-sm font-medium">Back to Cohort</span>
      </Link>

      {/* Top Banner */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white p-6 rounded-2xl border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Assignments</h1>
          <p className="text-sm text-slate-500 mt-1">
            {courseTitle} — <span className="font-semibold text-[#CC1747]">{cohortTitle}</span>
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#CC1747] text-white text-sm font-semibold hover:bg-[#B0133D] transition shadow-md shadow-[#CC1747]/20 cursor-pointer"
        >
          <Plus size={18} />
          <span>New Assignment</span>
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-red-50 text-[#CC1747] rounded-xl">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Total Assignments
            </p>
            <p className="text-2xl font-bold text-slate-900">{assignments.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Published Tasks
            </p>
            <p className="text-2xl font-bold text-slate-900">
              {assignments.filter((a) => a.status === "Published").length}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Drafts / Others
            </p>
            <p className="text-2xl font-bold text-slate-900">
              {assignments.filter((a) => a.status !== "Published").length}
            </p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assignments by title or instructions..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#CC1747]/30 focus:border-[#CC1747]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {["all", "published", "draft"].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-colors cursor-pointer",
                statusFilter === tab
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              )}
            >
              {tab}
            </button>
          ))}

          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl shrink-0 ml-1">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={cn(
                "p-1.5 rounded-lg transition-colors cursor-pointer",
                viewMode === "list"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              )}
              title="Column-Row Table View"
            >
              <List size={16} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-1.5 rounded-lg transition-colors cursor-pointer",
                viewMode === "grid"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              )}
              title="Grid Card View"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content (Table / Grid or Empty State) */}
      {filteredAssignments.length > 0 ? (
        viewMode === "list" ? (
          <AssignmentTable
            assignments={filteredAssignments}
            onEdit={(a) => setEditingAssignment(a)}
            onDelete={(a) => setDeletingAssignment(a)}
            onViewSubmissions={(a) =>
              navigate(`/instructor/submissions?taskId=${a._id || a.id}`)
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAssignments.map((assignment) => {
              const assignmentId = assignment._id || assignment.id;
              return (
                <AssignmentCard
                  key={assignmentId}
                  title={assignment.title}
                  cohort={`${courseTitle} - ${cohortTitle}`}
                  dueDate={
                    assignment.due_date
                      ? new Date(assignment.due_date).toLocaleDateString()
                      : "No date"
                  }
                  submissionStats={{
                    submitted: assignment.submissions_count || 0,
                    total: 0,
                  }}
                  onClick={() =>
                    navigate(`/instructor/submissions?taskId=${assignmentId}`)
                  }
                  onEdit={() => setEditingAssignment(assignment)}
                  onDelete={() => setDeletingAssignment(assignment)}
                />
              );
            })}
          </div>
        )
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200 p-8">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-red-50 text-[#CC1747] flex items-center justify-center mb-3">
            <FileText size={28} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Assignments Found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? "No assignments matched your search filter. Try clearing or changing your search terms."
              : "Create an assignment task for students in this cohort to submit their work."}
          </p>
          {!searchQuery && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#CC1747] text-white text-sm font-semibold hover:bg-[#B0133D] transition shadow-md shadow-[#CC1747]/20"
            >
              <Plus size={16} />
              Create First Assignment
            </button>
          )}
        </div>
      )}

      {/* Create Assignment Modal */}
      {isCreateModalOpen && (
        <AssignmentModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          cohortId={cohortId}
          courseId={cohort?.course_id?._id || cohort?.course_id?.id || cohort?.course_id}
        />
      )}

      {/* Edit Assignment Modal */}
      {editingAssignment && (
        <AssignmentModal
          isOpen={Boolean(editingAssignment)}
          onClose={() => setEditingAssignment(null)}
          cohortId={cohortId}
          courseId={cohort?.course_id?._id || cohort?.course_id?.id || cohort?.course_id}
          initialData={editingAssignment}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingAssignment)}
        onClose={() => setDeletingAssignment(null)}
        onConfirm={handleDeleteConfirm}
        itemName={deletingAssignment?.title}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default AssignmentManagement;
