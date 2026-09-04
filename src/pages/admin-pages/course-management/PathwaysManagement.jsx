import React, { useState } from "react";
import {
  useFetchAdminPathways,
  useCreatePathway,
  useDeletePathway,
  useTogglePathwayStatus,
} from "@/hooks/pathways/use-pathways";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/Components/ui/dialog";
import { CommonButton } from "@/Components/ui/button";
import { ClipLoader, BeatLoader } from "react-spinners";
import {
  Plus,
  Trash2,
  LineChart,
  Briefcase,
  BarChart3,
  ShieldCheck,
  Cloud,
  Zap,
  Bot,
  BookOpen,
  Layers,
  Sparkles,
  Search,
  CheckCircle2,
  FolderKanban,
  X,
} from "lucide-react";

const ICON_MAP = {
  LineChart,
  Briefcase,
  BarChart3,
  ShieldCheck,
  Cloud,
  Zap,
  Bot,
  BookOpen,
  Layers,
  FolderKanban,
};

const AVAILABLE_ICONS = [
  { name: "LineChart", label: "Analytics / Growth", Icon: LineChart },
  { name: "Briefcase", label: "Business / Management", Icon: Briefcase },
  { name: "BarChart3", label: "Data / Metrics", Icon: BarChart3 },
  { name: "ShieldCheck", label: "Security / Defense", Icon: ShieldCheck },
  { name: "Cloud", label: "Cloud / Infra", Icon: Cloud },
  { name: "Zap", label: "Agile / Fast Delivery", Icon: Zap },
  { name: "Bot", label: "AI / Machine Learning", Icon: Bot },
  { name: "BookOpen", label: "General Learning", Icon: BookOpen },
  { name: "Layers", label: "Architecture / Systems", Icon: Layers },
];

export default function PathwaysManagement() {
  const { data, isLoading, isError } = useFetchAdminPathways();
  const { createPathway, isCreating } = useCreatePathway();
  const { deletePathway, isDeleting } = useDeletePathway();
  const { togglePathway } = useTogglePathwayStatus();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "BookOpen",
    keywords: "",
  });

  const pathways = data?.data?.data?.pathways || [];

  const filteredPathways = pathways.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.keywords &&
        p.keywords.some((k) =>
          k.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  const totalCourses = pathways.reduce(
    (acc, cur) => acc + (cur.course_count || 0),
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectIcon = (iconName) => {
    setFormData((prev) => ({ ...prev, icon: iconName }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      return;
    }

    createPathway(
      {
        title: formData.title.trim(),
        description: formData.description.trim(),
        icon: formData.icon,
        keywords: formData.keywords,
      },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          setFormData({
            title: "",
            description: "",
            icon: "BookOpen",
            keywords: "",
          });
        },
      }
    );
  };

  const handleDelete = (id) => {
    deletePathway(id, {
      onSuccess: () => {
        setDeleteModalId(null);
      },
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#1D2939]">
              Career Pathways
            </h1>
            <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-[#CC1747]">
              {pathways.length} Total
            </span>
          </div>
          <p className="mt-1 text-sm text-[#667185]">
            Define career pathways to organize courses and drive dynamic assessment course matching.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#CC1747] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#B0133D] focus:outline-none focus:ring-2 focus:ring-[#CC1747] focus:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Pathway</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Total Pathways</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-[#CC1747]">
              <Layers className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-gray-900">{pathways.length}</p>
          <p className="mt-1 text-xs text-gray-500">Available across platform</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Mapped Courses</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-gray-900">{totalCourses}</p>
          <p className="mt-1 text-xs text-gray-500">Courses linked to pathways</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Assessment Dynamic Matching</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-gray-900">Active</p>
          <p className="mt-1 text-xs text-gray-500">Auto-routes assessment takers</p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search pathways by title, keyword, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#CC1747] focus:outline-none focus:ring-1 focus:ring-[#CC1747]"
          />
        </div>
      </div>

      {/* Pathways Grid / List */}
      <div className="mt-6">
        {isLoading ? (
          <div className="flex h-64 w-full items-center justify-center">
            <ClipLoader color="#CC1747" size={36} />
          </div>
        ) : isError ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">
            Failed to load pathways. Please try refreshing.
          </div>
        ) : filteredPathways.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-gray-200 p-12 text-center">
            <Layers className="mx-auto h-10 w-10 text-gray-400" />
            <h3 className="mt-3 text-base font-semibold text-gray-900">
              No pathways found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery
                ? "No pathways match your search term."
                : "Get started by creating your first career pathway."}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#CC1747] px-4 py-2 text-sm font-medium text-white hover:bg-[#B0133D]"
              >
                <Plus className="h-4 w-4" />
                Add Pathway
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPathways.map((pathway) => {
              const IconComponent = ICON_MAP[pathway.icon] || BookOpen;
              return (
                <div
                  key={pathway._id || pathway.id}
                  className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-xs transition hover:border-gray-300 hover:shadow-md"
                >
                  <div>
                    {/* Top Row */}
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#CC1747]">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            pathway.is_active
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {pathway.is_active ? "Active" : "Inactive"}
                        </span>
                        <button
                          onClick={() => setDeleteModalId(pathway._id || pathway.id)}
                          className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600 transition"
                          title="Delete pathway"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">
                      {pathway.title}
                    </h3>
                    <p className="mt-0.5 text-xs font-mono text-gray-400">
                      slug: {pathway.slug}
                    </p>
                    <p className="mt-2.5 text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {pathway.description}
                    </p>

                    {/* Keywords */}
                    {pathway.keywords && pathway.keywords.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {pathway.keywords.map((kw, i) => (
                          <span
                            key={i}
                            className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 font-medium"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-xs font-medium text-gray-500">
                      <strong className="text-gray-900 font-semibold">
                        {pathway.course_count || 0}
                      </strong>{" "}
                      Course{pathway.course_count === 1 ? "" : "s"} attached
                    </span>

                    <button
                      onClick={() => togglePathway(pathway._id || pathway.id)}
                      className="text-xs font-medium text-[#CC1747] hover:underline"
                    >
                      {pathway.is_active ? "Disable" : "Enable"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Pathway Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[580px] p-0 overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-2xl">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <DialogTitle className="text-lg font-bold text-gray-900">
                Add Career Pathway
              </DialogTitle>
              <DialogDescription className="text-xs text-gray-500 mt-0.5">
                Create a new pathway category to group courses and connect with career assessment questions.
              </DialogDescription>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Pathway Title <span className="text-[#CC1747]">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. AI & Machine Learning"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#CC1747] focus:outline-none focus:ring-1 focus:ring-[#CC1747]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Description <span className="text-[#CC1747]">*</span>
              </label>
              <textarea
                name="description"
                required
                rows={3}
                placeholder="Describe what learners in this pathway do and the skills they acquire..."
                value={formData.description}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 p-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#CC1747] focus:outline-none focus:ring-1 focus:ring-[#CC1747] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Keywords / Tags
              </label>
              <input
                type="text"
                name="keywords"
                placeholder="Comma separated: AI, LLM, Python, Prompt Engineering"
                value={formData.keywords}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#CC1747] focus:outline-none focus:ring-1 focus:ring-[#CC1747]"
              />
              <p className="mt-1 text-[11px] text-gray-400">
                Helps search index and recommendation engines match related queries.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Select Pathway Icon
              </label>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 max-h-36 overflow-y-auto p-1 border border-gray-200 rounded-lg">
                {AVAILABLE_ICONS.map(({ name, label, Icon }) => {
                  const isSelected = formData.icon === name;
                  return (
                    <button
                      type="button"
                      key={name}
                      onClick={() => handleSelectIcon(name)}
                      className={`flex items-center gap-2 p-2 rounded-lg text-left text-xs transition border ${
                        isSelected
                          ? "border-[#CC1747] bg-red-50 text-[#CC1747] font-semibold"
                          : "border-transparent bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating || !formData.title.trim() || !formData.description.trim()}
                className="inline-flex items-center justify-center rounded-lg bg-[#CC1747] px-5 py-2 text-sm font-medium text-white hover:bg-[#B0133D] disabled:opacity-50 transition"
              >
                {isCreating ? (
                  <BeatLoader size={8} color="#ffffff" />
                ) : (
                  "Create Pathway"
                )}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={Boolean(deleteModalId)}
        onOpenChange={(open) => !open && setDeleteModalId(null)}
      >
        <DialogContent className="sm:max-w-[420px] p-6 bg-white rounded-2xl">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 mb-4">
              <Trash2 className="h-6 w-6" />
            </div>
            <DialogTitle className="text-lg font-bold text-gray-900">
              Delete Pathway?
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete this pathway? Any courses currently under this pathway will remain intact, but will no longer be mapped to it.
            </DialogDescription>

            <div className="mt-6 flex w-full gap-3">
              <button
                type="button"
                onClick={() => setDeleteModalId(null)}
                className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => handleDelete(deleteModalId)}
                className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
