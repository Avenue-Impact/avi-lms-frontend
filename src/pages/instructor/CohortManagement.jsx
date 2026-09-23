import React, { useState, useMemo, useEffect } from "react";
import { useFetchCohortStudents } from "@/hooks/instructor/use-fetch-cohort-students";
import { useFetchInstructorCohorts } from "@/hooks/instructor/use-fetch-instructor-cohorts";
import {
  useFetchAssignmentTasks,
  useDeleteAssignmentTask,
} from "@/hooks/instructor/use-assignment-management";
import AssignmentCard from "@/Components/instructor/AssignmentCard";
import AssignmentTable from "@/Components/instructor/AssignmentTable";
import AssignmentModal from "@/Components/instructor/AssignmentModal";
import DeleteConfirmModal from "@/Components/instructor/DeleteConfirmModal";
import { useNavigate, useParams } from "react-router-dom";
import { transferStudent } from "@/hooks/students/use-enrolled-courses";
import {
  Users,
  FileText,
  Video,
  ChevronLeft,
  Clock,
  Bookmark,
  Search,
  ChevronRight,
  ListFilter,
  ArrowLeftRight,
  X,
  FolderOpen,
  Plus,
  Download,
  Eye,
  LayoutGrid,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";
import MaterialCard from "@/Components/materials/MaterialCard";
import MaterialTable from "@/Components/materials/MaterialTable";
import MaterialDetailModal from "@/Components/materials/MaterialDetailModal";
import UploadMaterialModal from "@/Components/materials/UploadMaterialModal";
import {
  useFetchCohortMaterials,
  useCreateCohortMaterial,
  useDeleteInstructorMaterial,
} from "@/hooks/materials/use-materials";

const getCohortStatus = (cohort) => {
  if (cohort.status) return cohort.status;
  const now = new Date();
  const start = new Date(cohort.start_date || cohort.created_at || Date.now());
  const end = cohort.end_date ? new Date(cohort.end_date) : null;

  if (end && now > end) return "Completed";
  if (now < start) return "Upcoming";
  return "In Progress";
};

const CohortManagement = () => {
  const { cohortId: routeCohortId } = useParams();
  const navigate = useNavigate();
  const [selectedCohortId, setSelectedCohortId] = useState(routeCohortId || null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: cohortsData, isLoading: isLoadingCohorts } =
    useFetchInstructorCohorts();
  const cohorts = cohortsData?.data?.cohorts || [];

  useEffect(() => {
    if (routeCohortId) {
      setSelectedCohortId(routeCohortId);
    }
  }, [routeCohortId]);

  const selectedCohort = useMemo(() => {
    return cohorts.find((c) => (c.id || c._id) === selectedCohortId);
  }, [cohorts, selectedCohortId]);

  if (isLoadingCohorts) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary-color-600"></div>
      </div>
    );
  }

  if (selectedCohortId && selectedCohort) {
    return (
      <CohortDetailPage
        cohort={selectedCohort}
        onBack={() => {
          setSelectedCohortId(null);
          navigate("/instructor/cohorts");
        }}
      />
    );
  }

  return (
    <CohortsListPage
      cohorts={cohorts}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onManage={(id) => {
        setSelectedCohortId(id);
        navigate(`/instructor/cohorts/${id}`);
      }}
    />
  );
};

// --- PAGE 0: COHORTS LIST PAGE ---
const CohortsListPage = ({
  cohorts,
  onManage,
  searchQuery,
  setSearchQuery,
}) => {
  const [activeTab, setActiveTab] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const filteredCohorts = useMemo(() => {
    let result = [...cohorts];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.course_id?.title?.toLowerCase().includes(query) ||
          c.cohort?.toLowerCase().includes(query),
      );
    }

    // Status filter
    if (activeTab !== "All") {
      result = result.filter((c) => {
        const status = getCohortStatus(c);
        return status === activeTab;
      });
    }

    // Sort
    if (sortBy === "Newest") {
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortBy === "Oldest") {
      result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } else if (sortBy === "A–Z") {
      result.sort((a, b) =>
        (a.course_id?.title || "").localeCompare(b.course_id?.title || ""),
      );
    }

    return result;
  }, [cohorts, searchQuery, activeTab, sortBy]);

  const tabCounts = useMemo(() => {
    const counts = {
      All: cohorts.length,
      "In Progress": 0,
      Upcoming: 0,
      Completed: 0,
    };
    cohorts.forEach((c) => {
      const status = getCohortStatus(c);
      if (counts[status] !== undefined) counts[status]++;
    });
    return counts;
  }, [cohorts]);

  return (
    <div className="mx-auto w-full">
      {/* Top Bar with functional search */}
      <div className="mb-8 flex items-center">
        <div className="relative w-full max-w-lg">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search cohorts"
            className="w-full rounded-full border border-[#E5E5E5] bg-white py-3 pl-12 pr-4 text-sm focus:border-primary-color-600 focus:outline-none focus:ring-1 focus:ring-primary-color-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[32px] font-bold text-[#1A1A2E]">Manage Cohorts</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-[#E5E5E5] bg-white px-4 py-2 text-sm font-medium text-[#1A1A2E]">
            <ListFilter size={16} />
            <span>Sort by:</span>
            <select
              className="cursor-pointer bg-transparent focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="A–Z">A–Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="mb-8 flex gap-8 border-b border-[#E5E5E5]">
        {["All", "In Progress", "Upcoming", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "relative flex items-center gap-2 px-2 pb-4 text-[15px] font-medium transition-colors",
              activeTab === tab
                ? "font-bold text-[#1A1A2E]"
                : "text-[#888] hover:text-[#1A1A2E]",
            )}
          >
            <span>{tab}</span>
            <span className="px-2.1 rounded-full bg-gray-100 py-0.5 text-[11px] font-bold text-gray-500">
              {tabCounts[tab]}
            </span>
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 h-[3px] w-full rounded-t-sm bg-primary-color-600" />
            )}
          </button>
        ))}
      </div>

      {/* Cohort Cards Grid */}
      {filteredCohorts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCohorts.map((c) => (
            <CohortCard
              key={c.id || c._id}
              cohort={c}
              onManage={() => onManage(c.id || c._id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#E5E5E5] bg-white py-20">
          <div className="mb-2 font-medium text-gray-400">No cohorts found</div>
          <p className="text-sm text-gray-500">
            {activeTab === "All"
              ? "You haven't been assigned to any cohorts yet."
              : `You have no ${activeTab.toLowerCase()} cohorts yet.`}
          </p>
        </div>
      )}
    </div>
  );
};

const CohortCard = ({ cohort, onManage }) => {
  const status = getCohortStatus(cohort);

  return (
    <div className="group flex flex-col rounded-xl border border-[#E5E5E5] bg-white p-5 transition-all hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <span className="text-[12px] font-medium text-[#888]">
            {cohort.cohort || "Cohort"}
          </span>
          <h3 className="line-clamp-2 text-lg font-bold leading-tight text-[#1A1A2E] transition-colors group-hover:text-primary-color-600">
            {cohort.course_id?.title || "Course Name"}
          </h3>
        </div>
      </div>

      <div className="mb-6 flex border-y border-[#F5F5F5] py-4">
        <div className="flex flex-1 flex-col items-center border-r border-[#F5F5F5]">
          <Users size={16} className="mb-2 text-[#C8102E]" />
          <span className="text-[10px] font-medium uppercase text-[#888]">
            Students
          </span>
          <span className="text-sm font-bold text-[#1A1A2E]">
            {cohort.studentCount || 0}
          </span>
        </div>
        <div className="flex flex-1 flex-col items-center border-r border-[#F5F5F5]">
          <FileText size={16} className="mb-2 text-[#C8102E]" />
          <span className="text-[10px] font-medium uppercase text-[#888]">
            Assigns
          </span>
          <span className="text-sm font-bold text-[#1A1A2E]">0</span>
        </div>
        <div className="flex flex-1 flex-col items-center">
          <Video size={16} className="mb-2 text-[#C8102E]" />
          <span className="text-[10px] font-medium uppercase text-[#888]">
            Session
          </span>
          <span className="w-full truncate text-center text-sm font-bold text-[#1A1A2E]">
            {cohort.class_days?.split(",")[0] || "—"}
          </span>
        </div>
      </div>

      <div className="mb-5 text-sm text-[#888]">
        Started{" "}
        {new Date(cohort.created_at || Date.now()).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </div>

      <button
        onClick={onManage}
        className="mt-auto rounded-lg bg-[#C8102E] py-3 text-sm font-bold text-white transition-colors hover:bg-red-700"
      >
        Manage Cohort
      </button>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    "In Progress": "border-[#2E7D32] text-[#2E7D32] bg-green-50/50",
    Upcoming: "border-[#1565C0] text-[#1565C0] bg-blue-50/50",
    Completed: "border-[#888] text-[#888] bg-gray-50/50",
  };
  return (
    <span
      className={cn(
        "rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
        styles[status] || styles.Completed,
      )}
    >
      {status}
    </span>
  );
};


// --- PAGE 1: COHORT DETAIL PAGE ---
const CohortDetailPage = ({ cohort, onBack }) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  const cohortId = cohort.id || cohort._id;
  const { data: studentsData, isLoading: isLoadingStudents } =
    useFetchCohortStudents(cohortId);
  const students = studentsData?.data?.students || [];

  const { data: assignmentsData, isLoading: isLoadingAssignments } =
    useFetchAssignmentTasks(cohortId);
  const assignments = assignmentsData?.data?.tasks || [];

  return (
    <div className="mx-auto w-full">
      {/* Breadcrumb */}
      <div className="mb-2 flex items-center gap-2 text-[13px]">
        <button
          onClick={onBack}
          className="text-[#888] transition-colors hover:text-primary-color-600"
        >
          Cohorts
        </button>
        <ChevronRight size={14} className="text-[#888]" />
        <span className="max-w-sm truncate font-medium text-[#1A1A2E]">
          {cohort.course_id?.title} – {cohort.cohort}
        </span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="mt-1 text-[32px] font-bold leading-tight text-[#1A1A2E]">
          Manage Cohorts
        </h1>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex gap-x-20 border-b border-[#E5E5E5]">
        {["Overview", "Students", "Assignments", "Materials"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSelectedStudent(null);
            }}
            className={cn(
              "relative px-8 pb-4 text-[15px] font-medium transition-colors",
              activeTab === tab
                ? "font-bold text-[#1A1A2E]"
                : "text-[#888] hover:text-[#1A1A2E]",
            )}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 h-[3px] w-full rounded-t-sm bg-primary-color-600" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === "Overview" && (
        <OverviewTab cohort={cohort} studentsCount={students.length} />
      )}
      {activeTab === "Students" && !selectedStudent && (
        <StudentsList students={students} onViewProfile={setSelectedStudent} />
      )}
      {activeTab === "Students" && selectedStudent && (
        <StudentProfile
          student={selectedStudent}
          cohort={cohort}
          onBack={() => setSelectedStudent(null)}
        />
      )}
      {activeTab === "Assignments" && (
        <CohortAssignmentsTab cohort={cohort} students={students} />
      )}
      {activeTab === "Materials" && (
        <CohortMaterialsTab cohort={cohort} />
      )}
    </div>
  );
};

// Cohort Assignments Tab Component
const CohortAssignmentsTab = ({ cohort, students = [] }) => {
  const navigate = useNavigate();

  const cohortId = useMemo(() => {
    const raw = cohort?.id || cohort?._id;
    if (!raw) return "";
    return typeof raw === "object" ? (raw._id || raw.id || "").toString() : raw.toString();
  }, [cohort]);

  const courseId = useMemo(() => {
    const raw = cohort?.course_id || cohort?.course;
    if (!raw) return "";
    if (typeof raw === "object") {
      return (raw._id || raw.id || "").toString();
    }
    return raw.toString();
  }, [cohort]);

  const cohortName = useMemo(() => {
    return cohort?.cohort || cohort?.name || "Current Cohort";
  }, [cohort]);

  const courseTitle = useMemo(() => {
    return cohort?.course_id?.title || "Course";
  }, [cohort]);

  const [assignmentsViewMode, setAssignmentsViewMode] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [deletingAssignment, setDeletingAssignment] = useState(null);

  const { data: assignmentsData, isLoading } = useFetchAssignmentTasks(cohortId);
  const { mutateAsync: deleteAssignment, isPending: isDeleting } =
    useDeleteAssignmentTask(cohortId);

  const assignments = assignmentsData?.data?.tasks || [];

  const filteredAssignments = useMemo(() => {
    return assignments.filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [assignments, searchQuery]);

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

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white p-6 rounded-2xl border border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Cohort Assignments</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Create, view, modify, and grade assignments for {cohortName}.
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary-color-600 text-white font-medium hover:bg-[#b0143d] transition-colors shadow-sm cursor-pointer"
        >
          <Plus size={18} />
          New Assignment
        </button>
      </div>

      {/* Search & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assignments by title..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-color-600/30 focus:border-primary-color-600"
          />
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-gray-100 p-1 rounded-xl shrink-0">
          <button
            type="button"
            onClick={() => setAssignmentsViewMode("list")}
            className={cn(
              "p-1.5 rounded-lg transition-colors cursor-pointer",
              assignmentsViewMode === "list"
                ? "bg-white text-gray-900 shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            )}
            title="List Column-Row View"
          >
            <List size={16} />
          </button>
          <button
            type="button"
            onClick={() => setAssignmentsViewMode("grid")}
            className={cn(
              "p-1.5 rounded-lg transition-colors cursor-pointer",
              assignmentsViewMode === "grid"
                ? "bg-white text-gray-900 shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            )}
            title="Grid Card View"
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      {isLoading ? (
        <div className="py-20 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary-color-600"></div>
        </div>
      ) : filteredAssignments.length > 0 ? (
        assignmentsViewMode === "list" ? (
          <AssignmentTable
            assignments={filteredAssignments}
            totalStudents={students.length}
            onEdit={(a) => setEditingAssignment(a)}
            onDelete={(a) => setDeletingAssignment(a)}
            onViewSubmissions={(a) =>
              navigate(`/instructor/submissions?taskId=${a._id || a.id}`)
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredAssignments.map((assignment) => {
              const assignmentId = assignment._id || assignment.id;
              return (
                <AssignmentCard
                  key={assignmentId}
                  title={assignment.title}
                  cohort={`${courseTitle} - ${cohortName}`}
                  dueDate={
                    assignment.due_date
                      ? new Date(assignment.due_date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                      : "No date"
                  }
                  submissionStats={{
                    submitted: assignment.submissions_count || 0,
                    total: students.length,
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
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 mb-3">
            <FileText size={28} />
          </div>
          <h3 className="text-base font-semibold text-gray-900">
            {searchQuery ? "No matching assignments" : "No assignments created yet"}
          </h3>
          <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? "Try adjusting your search keywords."
              : "Create an assignment task for students in this cohort to submit their work."}
          </p>
          {!searchQuery && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-color-600 text-white text-xs font-semibold hover:bg-[#b0143d] transition shadow-xs cursor-pointer"
            >
              <Plus size={15} />
              Create Assignment
            </button>
          )}
        </div>
      )}

      {/* Create Modal */}
      {isCreateModalOpen && (
        <AssignmentModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          cohortId={cohortId}
          courseId={courseId}
        />
      )}

      {/* Edit Modal */}
      {editingAssignment && (
        <AssignmentModal
          isOpen={Boolean(editingAssignment)}
          onClose={() => setEditingAssignment(null)}
          cohortId={cohortId}
          courseId={courseId}
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

// Cohort Materials Tab Component
const CohortMaterialsTab = ({ cohort }) => {
  const cohortId = useMemo(() => {
    const raw = cohort?.id || cohort?._id;
    if (!raw) return "";
    return typeof raw === "object" ? (raw._id || raw.id || "").toString() : raw.toString();
  }, [cohort]);

  const courseId = useMemo(() => {
    const raw = cohort?.course_id || cohort?.course;
    if (!raw) return "";
    if (typeof raw === "object") {
      return (raw._id || raw.id || "").toString();
    }
    return raw.toString();
  }, [cohort]);

  const cohortName = useMemo(() => {
    return cohort?.cohort || cohort?.name || "Current Cohort";
  }, [cohort]);

  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [materialsViewMode, setMaterialsViewMode] = useState("list");

  const { data: materials = [], isLoading } = useFetchCohortMaterials(cohortId);
  const { mutateAsync: createMaterial, isPending: isUploading } = useCreateCohortMaterial(cohortId);
  const { mutateAsync: deleteMaterial } = useDeleteInstructorMaterial(cohortId);

  const handleUploadSubmit = async (formData) => {
    return await createMaterial(formData);
  };

  const handleDelete = async (materialId) => {
    if (window.confirm("Are you sure you want to delete this material? Students will no longer have access to it.")) {
      await deleteMaterial(materialId);
    }
  };

  const filteredMaterials = useMemo(() => {
    return materials.filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.file_name?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === "all" || item.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [materials, searchQuery, filterType]);

  const totalViews = useMemo(
    () => materials.reduce((sum, m) => sum + (m.views || 0), 0),
    [materials]
  );
  const totalDownloads = useMemo(
    () => materials.reduce((sum, m) => sum + (m.downloads || 0), 0),
    [materials]
  );

  return (
    <div className="space-y-6">
      {/* Top Banner / Stats */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white p-6 rounded-2xl border border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Cohort Learning Materials</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Upload and manage documents, templates, videos, and study guides for students in this cohort.
          </p>
        </div>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary-color-600 text-white font-medium hover:bg-[#b0143d] transition-colors shadow-sm"
        >
          <Plus size={18} />
          Upload Material
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
          <div className="p-3 bg-red-50 text-[#CC1747] rounded-xl">
            <FolderOpen size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Materials</p>
            <p className="text-2xl font-bold text-gray-900">{materials.length}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Eye size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Views</p>
            <p className="text-2xl font-bold text-gray-900">{totalViews}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Download size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Downloads</p>
            <p className="text-2xl font-bold text-gray-900">{totalDownloads}</p>
          </div>
        </div>
      </div>

      {/* Search & Format Filter */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search materials by title or filename..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-color-600/30 focus:border-primary-color-600"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {["all", "document", "video", "image", "link"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterType(tab)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-colors",
                filterType === tab
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              )}
            >
              {tab}
            </button>
          ))}

          {/* View Mode Switcher */}
          <div className="flex items-center bg-gray-100 p-1 rounded-xl shrink-0">
            <button
              type="button"
              onClick={() => setMaterialsViewMode("list")}
              className={cn(
                "p-1.5 rounded-lg transition-colors",
                materialsViewMode === "list"
                  ? "bg-white text-gray-900 shadow-xs"
                  : "text-gray-500 hover:text-gray-900"
              )}
              title="List Column-Row View"
            >
              <List size={16} />
            </button>
            <button
              type="button"
              onClick={() => setMaterialsViewMode("grid")}
              className={cn(
                "p-1.5 rounded-lg transition-colors",
                materialsViewMode === "grid"
                  ? "bg-white text-gray-900 shadow-xs"
                  : "text-gray-500 hover:text-gray-900"
              )}
              title="Grid Card View"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Materials Display / Empty State */}
      {isLoading ? (
        <div className="py-20 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary-color-600"></div>
        </div>
      ) : filteredMaterials.length > 0 ? (
        materialsViewMode === "list" ? (
          <MaterialTable
            materials={filteredMaterials}
            onView={(m) => setSelectedMaterial(m)}
            onDownload={(m) => {
              if (m.file_url) window.open(m.file_url, "_blank");
            }}
            onDelete={(m) => handleDelete(m._id)}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMaterials.map((material) => (
              <MaterialCard
                key={material._id}
                material={material}
                onView={(m) => setSelectedMaterial(m)}
                onDownload={(m) => {
                  if (m.file_url) window.open(m.file_url, "_blank");
                }}
                onDelete={(m) => handleDelete(m._id)}
                showActions={true}
              />
            ))}
          </div>
        )
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 mb-3">
            <FolderOpen size={28} />
          </div>
          <h3 className="text-base font-semibold text-gray-900">No materials uploaded</h3>
          <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
            Share learning files, documents, assignments templates, or links with your students.
          </p>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm rounded-xl bg-primary-color-600 text-white font-medium hover:bg-[#b0143d] transition-colors"
          >
            <Plus size={16} />
            Upload First Material
          </button>
        </div>
      )}

      {/* Upload Material Modal */}
      <UploadMaterialModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSubmit={handleUploadSubmit}
        isLoading={isUploading}
        isSubmitting={isUploading}
        isAdmin={false}
        cohortId={cohortId}
        cohortName={cohortName}
        courseId={courseId}
        initialData={{
          course_id: courseId,
          cohort_id: cohortId,
          cohort_name: cohortName,
        }}
      />

      {/* Material Detail Modal */}
      <MaterialDetailModal
        material={selectedMaterial}
        isOpen={!!selectedMaterial}
        onClose={() => setSelectedMaterial(null)}
        onDownload={(m) => {
          if (m.file_url) window.open(m.file_url, "_blank");
        }}
      />
    </div>
  );
};

// Sub-components for Details
const OverviewTab = ({ cohort, studentsCount }) => {
  return (
    <div>
      <div className="mb-8 rounded-[16px] border border-[#E5E5E5] bg-white p-6 lg:p-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <div className="mb-1 text-sm font-medium text-[#888]">
              {cohort?.cohort || "Cohort"}
            </div>
            <h2 className="mb-2 text-2xl font-bold text-[#1A1A2E]">
              {cohort?.course_id?.title || "Course Title"}
            </h2>
            <div className="text-sm text-[#888]">
              Started{" "}
              {new Date(cohort?.created_at || Date.now()).toLocaleDateString()}
            </div>
          </div>
          <div className="inline-flex items-center rounded-full border border-[#2E7D32] bg-transparent px-4 py-1.5 text-sm font-semibold text-[#2E7D32]">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#2E7D32]"></span>
            In Progress
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatBoxSimple
            icon={<Users size={20} />}
            label="Students"
            value={studentsCount}
          />
          <StatBoxSimple
            icon={<FileText size={20} />}
            label="Assignments"
            value="15"
          />
          <StatBoxSimple
            icon={<FileText size={20} />}
            label="Submissions"
            value="10"
          />
          <StatBoxSimple
            icon={<Video size={20} />}
            label="Next Live Session"
            value={
              cohort?.live_session?.time
                ? `${cohort?.class_days} · ${cohort?.time}`
                : "Not Scheduled"
            }
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-bold text-[#1A1A2E]">
          Recent Activities
        </h3>
        <div className="overflow-hidden rounded-[16px] border border-[#E5E5E5] bg-white">
          <ActivityRow
            text={
              <>
                <span className="font-bold">Lanre Koleola</span> submitted Three
                Scopes of Business Analytics
              </>
            }
            time="10 minutes ago"
          />
          <ActivityRow
            text={
              <>
                <span className="font-bold">Sarah Jenkins</span> joined the live
                session
              </>
            }
            time="1 hour ago"
          />
          <ActivityRow
            text={
              <>
                <span className="font-bold">Adekunle Bayo</span> completed
                Module 1 Assessment
              </>
            }
            time="2 hours ago"
          />
        </div>
      </div>
    </div>
  );
};

const StatBoxSimple = ({ icon, label, value }) => (
  <div className="flex flex-col rounded-[12px] border border-[#E5E5E5] bg-white p-4 md:p-5">
    <div className="mb-3 flex items-center gap-2 text-[#C8102E]">
      {icon}
      <span className="text-[11px] font-bold uppercase tracking-wider text-[#888]">
        {label}
      </span>
    </div>
    <div className="break-words text-xl font-black text-[#1A1A2E]">{value}</div>
  </div>
);

const ActivityRow = ({ text, time }) => (
  <div className="flex items-center justify-between border-b border-[#F5F5F5] p-5 transition-colors last:border-b-0 hover:bg-[#F9F9F9]">
    <div className="text-[15px] text-[#1A1A2E]">{text}</div>
    <div className="text-xs text-[#888]">{time}</div>
  </div>
);

const StudentsList = ({ students, onViewProfile }) => {
  return (
    <div className="overflow-hidden rounded-[16px] border border-[#E5E5E5] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="bg-[#F5F5F5] text-[12px] font-bold uppercase tracking-wider text-[#1A1A2E]">
            <tr>
              <th className="px-6 py-4">S/N</th>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Progress</th>
              <th className="px-6 py-4">Last Active</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F5F5] text-[15px] text-[#1A1A2E]">
            {students.length > 0 ? (
              students.map((s, idx) => (
                <tr
                  key={s._id}
                  className="transition-colors hover:bg-[#F9F9F9]"
                >
                  <td className="px-6 py-4 text-[#888]">
                    {(idx + 1).toString().padStart(2, "0")}
                  </td>
                  <td className="px-6 py-4 font-bold">
                    {s.firstname} {s.lastname}
                  </td>
                  <td className="px-6 py-4 text-[#888]">{s.email}</td>
                  <td className="px-6 py-4 font-bold">{s.progress || "0%"}</td>
                  <td className="px-6 py-4 text-[#888]">
                    {s.last_active || "Today"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onViewProfile(s)}
                      className="rounded-full bg-[#C8102E] px-5 py-2 text-xs font-bold text-white transition-all hover:bg-red-700 active:scale-95"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-12 text-center italic text-[#888]"
                >
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StudentProfile = ({ student, cohort, onBack }) => {
  return (
    <div>
      <button
        onClick={onBack}
        className="mb-6 flex w-fit items-center gap-2 text-sm font-bold text-[#888] transition-colors hover:text-primary-color-600"
      >
        <ChevronLeft size={16} /> Back to Students
      </button>
      <div className="mb-8 rounded-[16px] border border-[#E5E5E5] bg-white p-6 lg:p-8">
        <div className="mb-8 flex flex-col items-center gap-6 border-b border-[#F5F5F5] pb-8 md:flex-row">
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-[#FFF0F0] text-3xl font-black text-[#C8102E]">
            {student?.firstname?.[0]}
            {student?.lastname?.[0]}
          </div>
          <div>
            <h2 className="mb-1 text-3xl font-black text-[#1A1A2E]">
              {student.firstname} {student.lastname}
            </h2>
            <p className="mb-3 text-lg font-medium text-[#888]">
              {student.email}
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#888]">
              <li>
                <span className="font-bold text-[#1A1A2E]">Cohort:</span>{" "}
                {cohort?.course_id?.title} – {cohort?.cohort}
              </li>
              <li>
                <span className="font-bold text-[#1A1A2E]">Joined:</span> March
                10, 2026
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatBoxSimple
            icon={<Bookmark size={20} />}
            label="Course Progress"
            value={student?.progress || "65%"}
          />
          <StatBoxSimple
            icon={<FileText size={20} />}
            label="Assignments Completed"
            value="4/6"
          />
          <StatBoxSimple
            icon={<FileText size={20} />}
            label="Submissions"
            value="05"
          />
          <StatBoxSimple
            icon={<Clock size={20} />}
            label="Last Active"
            value={student?.last_active || "Today"}
          />
        </div>
      </div>

      {/* TRANSFER STUDENT ACTION */}
      <TransferStudentModal student={student} cohort={cohort} />

      <div>
        <h3 className="mb-4 text-xl font-black text-[#1A1A2E]">
          Assignment Submissions
        </h3>
        <div className="overflow-hidden rounded-[16px] border border-[#E5E5E5] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead className="bg-[#F5F5F5] text-[12px] font-bold uppercase tracking-wider text-[#1A1A2E]">
                <tr>
                  <th className="px-6 py-4">S/N</th>
                  <th className="px-6 py-4">Assignment</th>
                  <th className="px-6 py-4">Submitted</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F5F5] text-[15px] text-[#1A1A2E]">
                <tr className="hover:bg-[#F9F9F9]">
                  <td className="px-6 py-4 text-[#888]">01</td>
                  <td className="px-6 py-4 font-bold">
                    Three Scopes of Business Analytics
                  </td>
                  <td className="px-6 py-4 text-sm text-[#888]">
                    March 12, 10:30AM
                  </td>
                  <td className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-green-600">
                    Reviewed
                  </td>
                </tr>
                <tr className="hover:bg-[#F9F9F9]">
                  <td className="px-6 py-4 text-[#888]">02</td>
                  <td className="px-6 py-4 font-bold">
                    Module 2 Practical Test
                  </td>
                  <td className="px-6 py-4 text-sm text-[#888]">
                    March 15, 02:15PM
                  </td>
                  <td className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#888]">
                    Pending
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CohortManagement;

// ─────────────────────────────────────────────────────────────
// TRANSFER STUDENT MODAL
// Admin-only UI for moving a student from one cohort to another.
// POSTs to /admin/cohort-transfers which bypasses the course lock.
// ─────────────────────────────────────────────────────────────
const TransferStudentModal = ({ student, cohort }) => {
  const [open, setOpen] = useState(false);
  const [selectedCohortId, setSelectedCohortId] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message }

  // Fetch all cohorts of the same course to build the dropdown
  const { data: allCohortsData } = useFetchInstructorCohorts();
  const allCohorts = allCohortsData?.data?.cohorts || [];
  const courseId = cohort?.course_id?._id || cohort?.course_id;
  const otherCohorts = allCohorts.filter(
    (c) =>
      (c.course_id?._id || c.course_id) === courseId &&
      (c.id || c._id) !== (cohort.id || cohort._id),
  );

  const handleTransfer = async () => {
    if (!selectedCohortId) return;
    setLoading(true);
    setFeedback(null);
    try {
      const res = await transferStudent({
        userId: student._id || student.id,
        newCohortId: selectedCohortId,
        reason,
      });
      setFeedback({
        type: "success",
        message: res.data?.data?.warning
          ? `✓ Transfer complete. Note: ${res.data.data.warning}`
          : "✓ Student successfully transferred.",
      });
      setTimeout(() => setOpen(false), 2000);
    } catch (err) {
      setFeedback({
        type: "error",
        message:
          err?.response?.data?.message || "Transfer failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="mb-6 flex items-center gap-2 rounded-lg border border-[#E5E5E5] bg-white px-4 py-2 text-sm font-bold text-[#1A1A2E] transition-colors hover:border-[#C8102E] hover:text-[#C8102E]"
      >
        <ArrowLeftRight size={15} />
        Transfer to Another Cohort
      </button>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            {/* Header */}
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-black text-[#1A1A2E]">
                  Transfer Student
                </h3>
                <p className="mt-1 text-sm text-[#888]">
                  Moving{" "}
                  <span className="font-bold text-[#1A1A2E]">
                    {student.firstname} {student.lastname}
                  </span>{" "}
                  from{" "}
                  <span className="font-bold text-[#C8102E]">
                    {cohort.cohort}
                  </span>
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-[#888] hover:text-[#1A1A2E]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cohort Dropdown */}
            <label className="mb-4 block">
              <span className="mb-1 block text-sm font-bold text-[#1A1A2E]">
                Transfer to *
              </span>
              <select
                value={selectedCohortId}
                onChange={(e) => setSelectedCohortId(e.target.value)}
                className="w-full rounded-lg border border-[#E5E5E5] bg-[#F9F9F9] px-4 py-2.5 text-sm text-[#1A1A2E] focus:border-[#C8102E] focus:outline-none"
              >
                <option value="">-- Select a cohort --</option>
                {otherCohorts.map((c) => (
                  <option key={c.id || c._id} value={c.id || c._id}>
                    {c.cohort}
                  </option>
                ))}
              </select>
              {otherCohorts.length === 0 && (
                <p className="mt-1 text-xs text-[#888]">
                  No other cohorts available for this course.
                </p>
              )}
            </label>

            {/* Reason Field */}
            <label className="mb-5 block">
              <span className="mb-1 block text-sm font-bold text-[#1A1A2E]">
                Reason (optional)
              </span>
              <textarea
                rows={2}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Student requested reschedule"
                className="w-full rounded-lg border border-[#E5E5E5] bg-[#F9F9F9] px-4 py-2.5 text-sm text-[#1A1A2E] focus:border-[#C8102E] focus:outline-none"
              />
            </label>

            {/* Feedback */}
            {feedback && (
              <p
                className={`mb-4 rounded-lg px-4 py-2.5 text-sm font-medium ${feedback.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-[#C8102E]"
                  }`}
              >
                {feedback.message}
              </p>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-[#E5E5E5] px-5 py-2 text-sm font-bold text-[#888] hover:text-[#1A1A2E]"
              >
                Cancel
              </button>
              <button
                onClick={handleTransfer}
                disabled={!selectedCohortId || loading}
                className="rounded-lg bg-[#C8102E] px-5 py-2 text-sm font-bold text-white hover:bg-[#b5193d] disabled:opacity-50"
              >
                {loading ? "Transferring..." : "Confirm Transfer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
