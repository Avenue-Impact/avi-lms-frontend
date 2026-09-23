import React, { useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  Search,
  FolderOpen,
  FileText,
  Video,
  Image,
  Link as LinkIcon,
  Filter,
  Layers,
  LayoutGrid,
  List,
} from "lucide-react";
import MaterialCard from "@/Components/materials/MaterialCard";
import MaterialTable from "@/Components/materials/MaterialTable";
import MaterialDetailModal from "@/Components/materials/MaterialDetailModal";
import {
  useFetchStudentMaterials,
  useRecordMaterialView,
  useRecordMaterialDownload,
} from "@/hooks/materials/use-materials";

export default function CourseMaterialsPage() {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const cohortId = searchParams.get("cohort_id") || searchParams.get("cohortId");
  const courseTitle = searchParams.get("title") || "Course";

  const [activeType, setActiveType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [viewMode, setViewMode] = useState("list");

  const { data: materials = [], isLoading, error } = useFetchStudentMaterials(courseId, {
    cohort_id: cohortId || undefined,
    cohortId: cohortId || undefined,
  });

  const { mutate: recordView } = useRecordMaterialView(courseId);
  const { mutate: recordDownload } = useRecordMaterialDownload(courseId);

  // Filter materials based on search and type pill
  const filteredMaterials = useMemo(() => {
    return materials.filter((m) => {
      const matchType = activeType === "all" || m.type === activeType;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        (m.title && m.title.toLowerCase().includes(q)) ||
        (m.instructions && m.instructions.toLowerCase().includes(q)) ||
        (m.file_name && m.file_name.toLowerCase().includes(q));

      return matchType && matchQuery;
    });
  }, [materials, activeType, searchQuery]);

  const handleSelectMaterial = (material) => {
    setSelectedMaterial(material);
    if (material.is_unseen) {
      recordView(material._id);
    }
  };

  const handleDownloadMaterial = (material) => {
    recordDownload(material._id);

    if (material.file_url) {
      const a = document.createElement("a");
      a.href = material.file_url;
      a.download = material.file_name || material.title || "material";
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const typeCounts = useMemo(() => {
    const counts = { all: materials.length, document: 0, video: 0, image: 0, link: 0 };
    materials.forEach((m) => {
      if (counts[m.type] !== undefined) counts[m.type]++;
    });
    return counts;
  }, [materials]);

  return (
    <div className="w-full pb-16">
      {/* Header Section */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[#CC1747] tracking-wider uppercase">
            RESOURCES & DOCUMENTS
          </span>
          <h1 className="font-space font-bold text-2xl sm:text-3xl text-[#0A1430] mt-1">
            Course Materials
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review and download templates, guides, presentations, and resources provided by your instructors.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-[#CC1747] focus:outline-none focus:ring-1 focus:ring-[#CC1747] shadow-xs"
          />
        </div>
      </div>

      {/* Filter Tabs & View Switcher */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "all", label: "All Formats", icon: Layers },
            { id: "document", label: "Documents", icon: FileText },
            { id: "video", label: "Videos", icon: Video },
            { id: "image", label: "Images", icon: Image },
            { id: "link", label: "Links", icon: LinkIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            const count = typeCounts[tab.id] || 0;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveType(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeType === tab.id
                    ? "bg-[#CC1747] text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    activeType === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl shrink-0">
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === "list"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
            title="List Column-Row View"
          >
            <List size={16} />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === "grid"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
            title="Grid Card View"
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>

      {/* Materials Grid or Empty State */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-slate-100 animate-pulse border border-slate-200/60"
            />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700 text-sm">
          Failed to load course materials. Please try refreshing.
        </div>
      ) : filteredMaterials.length > 0 ? (
        viewMode === "list" ? (
          <MaterialTable
            materials={filteredMaterials}
            onSelect={handleSelectMaterial}
            onDownload={handleDownloadMaterial}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredMaterials.map((material) => (
              <MaterialCard
                key={material._id}
                material={material}
                onSelect={handleSelectMaterial}
                onDownload={handleDownloadMaterial}
              />
            ))}
          </div>
        )
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center max-w-md mx-auto my-12 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-red-50 text-[#CC1747] flex items-center justify-center mx-auto mb-4">
            <FolderOpen size={32} />
          </div>
          <h3 className="font-space font-bold text-lg text-slate-800">
            No Materials Found
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
            {searchQuery
              ? `No materials match your search "${searchQuery}". Try a different keyword.`
              : "No course materials have been shared for this section yet. Check back soon!"}
          </p>
        </div>
      )}

      {/* Detailed Material Modal */}
      <MaterialDetailModal
        isOpen={Boolean(selectedMaterial)}
        material={selectedMaterial}
        onClose={() => setSelectedMaterial(null)}
        onDownload={handleDownloadMaterial}
      />
    </div>
  );
}
