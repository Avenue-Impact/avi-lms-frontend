import React, { useState, useMemo } from "react";
import {
  FolderOpen,
  Plus,
  Download,
  Eye,
  Search,
  Trash2,
  LayoutGrid,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";
import MaterialCard from "@/Components/materials/MaterialCard";
import MaterialTable from "@/Components/materials/MaterialTable";
import MaterialDetailModal from "@/Components/materials/MaterialDetailModal";
import UploadMaterialModal from "@/Components/materials/UploadMaterialModal";
import {
  useFetchAdminMaterials,
  useCreateAdminMaterial,
  useDeleteAdminMaterial,
} from "@/hooks/materials/use-materials";
import { useFetchCourseInfo } from "@/hooks/course-management/use-fetch-course-information";
import { useGetAllCohorts } from "@/hooks/course-management/use-fetch-all-cohorts";

export default function AdminCourseMaterialsSection({
  courseId,
  cohortId,
  cohortName = "Current Cohort",
}) {
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCourseType, setFilterCourseType] = useState("all");
  const [viewMode, setViewMode] = useState("list");

  // Fetch course info to extract specific on-demand durations
  const { data: courseInfoData } = useFetchCourseInfo(courseId);
  const courseDetails =
    courseInfoData?.data?.data?.course ||
    courseInfoData?.data?.data ||
    courseInfoData?.data?.course;

  const preRecordedPrices =
    courseDetails?.pre_recorded_price ||
    courseDetails?.pricing?.on_demand ||
    [];

  const courseDurations = useMemo(() => {
    if (!Array.isArray(preRecordedPrices)) return [];
    return preRecordedPrices.map((p) => p.duration).filter(Boolean);
  }, [preRecordedPrices]);

  // Fetch cohorts for live assignments
  const { data: cohortsData } = useGetAllCohorts(courseId);
  const availableCohorts = useMemo(() => {
    return cohortsData?.data?.cohorts || cohortsData?.data?.data || [];
  }, [cohortsData]);

  // Query params for admin materials
  const fetchParams = useMemo(() => {
    const params = {};
    if (cohortId) params.cohort_id = cohortId;
    return params;
  }, [cohortId]);

  const { data: materials = [], isLoading } = useFetchAdminMaterials(
    courseId,
    fetchParams
  );
  const { mutateAsync: createMaterial, isPending: isUploading } =
    useCreateAdminMaterial(courseId);
  const { mutateAsync: deleteMaterial } = useDeleteAdminMaterial(courseId);

  const handleUploadSubmit = async (formData) => {
    return await createMaterial(formData);
  };

  const handleDelete = async (materialId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this material? Students will no longer be able to access or download it."
      )
    ) {
      await deleteMaterial(materialId);
    }
  };

  const filteredMaterials = useMemo(() => {
    return materials.filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.file_name?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === "all" || item.type === filterType;
      const matchesCourseType =
        filterCourseType === "all" || item.course_type === filterCourseType;
      return matchesSearch && matchesType && matchesCourseType;
    });
  }, [materials, searchQuery, filterType, filterCourseType]);

  const totalViews = useMemo(
    () => materials.reduce((sum, m) => sum + (m.views || 0), 0),
    [materials]
  );
  const totalDownloads = useMemo(
    () => materials.reduce((sum, m) => sum + (m.downloads || 0), 0),
    [materials]
  );

  return (
    <div className="mt-8 space-y-6">
      {/* Top Banner & Action */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Course Learning Materials
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Upload, scope and manage documents, templates, recorded guides, and links for Live and On-Demand students.
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
          <div className="p-3 bg-red-50 text-[#CC1747] rounded-xl">
            <FolderOpen size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Materials
            </p>
            <p className="text-2xl font-bold text-gray-900">{materials.length}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Eye size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Student Views
            </p>
            <p className="text-2xl font-bold text-gray-900">{totalViews}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Download size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Student Downloads
            </p>
            <p className="text-2xl font-bold text-gray-900">{totalDownloads}</p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or file name..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-color-600/30 focus:border-primary-color-600"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Format Chips */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            {["all", "document", "video", "image", "link"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterType(tab)}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-medium capitalize transition-colors",
                  filterType === tab
                    ? "bg-white text-gray-900 shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <select
            value={filterCourseType}
            onChange={(e) => setFilterCourseType(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white text-xs font-medium text-gray-700 focus:outline-none focus:border-primary-color-600"
          >
            <option value="all">All Delivery Modes</option>
            <option value="live">Live Class Only</option>
            <option value="on demand">On-Demand Only</option>
          </select>

          {/* View Mode Switcher (List vs Grid) */}
          <div className="flex items-center bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={cn(
                "p-1.5 rounded-lg transition-colors",
                viewMode === "list"
                  ? "bg-white text-gray-900 shadow-xs"
                  : "text-gray-500 hover:text-gray-900"
              )}
              title="List Column-Row View"
            >
              <List size={16} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-1.5 rounded-lg transition-colors",
                viewMode === "grid"
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

      {/* Materials Display or Empty state */}
      {isLoading ? (
        <div className="py-20 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary-color-600"></div>
        </div>
      ) : filteredMaterials.length > 0 ? (
        viewMode === "list" ? (
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
          <h3 className="text-base font-semibold text-gray-900">
            No course materials found
          </h3>
          <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
            Upload study templates, documentation, or links for students taking this course.
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

      {/* Upload Modal */}
      <UploadMaterialModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSubmit={handleUploadSubmit}
        isSubmitting={isUploading}
        isAdmin={true}
        courseId={courseId}
        cohortId={cohortId}
        cohortName={cohortName}
        availableCohorts={availableCohorts}
        courseDurations={courseDurations}
      />

      {/* Detail Modal */}
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
}
