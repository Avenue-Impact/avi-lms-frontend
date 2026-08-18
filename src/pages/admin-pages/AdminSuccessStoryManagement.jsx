import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
  Play,
  Pause,
  SlidersHorizontal,
  CheckSquare,
  Square,
  AlertTriangle,
  Sparkles,
  User,
  GraduationCap,
  Briefcase,
  Building2,
  X,
  Volume2,
  Share2,
  Copy,
  Check
} from "lucide-react";
import {
  useGetAdminSuccessStories,
  useAdminStoryActions
} from "@/hooks/success-stories/use-success-stories";

const AdminSuccessStoryManagement = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // Share Modal State
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Selected story IDs for bulk actions
  const [selectedIds, setSelectedIds] = useState([]);

  // Detail Modal State
  const [selectedStory, setSelectedStory] = useState(null);

  // Audio player state in detail modal
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = React.useRef(null);

  // Bulk Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    action: null, // "approve" | "unapprove" | "enable_dashboard" | "disable_dashboard" | "delete"
    title: "",
    description: "",
  });

  const { data, isLoading } = useGetAdminSuccessStories({
    search: searchTerm,
    status: statusFilter,
    page,
    limit: 20,
  });

  const stories = data?.stories || [];
  const totalPages = data?.totalPages || 1;

  const {
    toggleApproval,
    toggleDashboardDisplay,
    bulkAction,
    deleteStory,
    isBulkActing,
    isDeleting
  } = useAdminStoryActions();

  // Multi-select helpers
  const allIds = stories.map((s) => s._id);
  const isAllSelected = allIds.length > 0 && allIds.every((id) => selectedIds.includes(id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(allIds);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Open confirmation modal for bulk actions
  const triggerBulkConfirmation = (action) => {
    if (selectedIds.length === 0) return;

    let title = "";
    let description = "";

    switch (action) {
      case "approve":
        title = "Bulk Approve Stories";
        description = `Are you sure you want to approve ${selectedIds.length} selected stories? They will become visible on the public success stories page.`;
        break;
      case "unapprove":
        title = "Bulk Unapprove / Hide Stories";
        description = `Are you sure you want to hide ${selectedIds.length} selected stories from the public page?`;
        break;
      case "enable_dashboard":
        title = "Enable Dashboard Display";
        description = `Are you sure you want to enable ${selectedIds.length} selected stories for the user dashboard display?`;
        break;
      case "disable_dashboard":
        title = "Disable Dashboard Display";
        description = `Are you sure you want to remove ${selectedIds.length} selected stories from the user dashboard display?`;
        break;
      case "delete":
        title = "Bulk Delete Stories";
        description = `Are you sure you want to permanently delete ${selectedIds.length} selected stories? This action cannot be undone.`;
        break;
      default:
        return;
    }

    setConfirmModal({
      isOpen: true,
      action,
      title,
      description,
    });
  };

  // Execute confirmed bulk action
  const executeBulkAction = async () => {
    if (!confirmModal.action || selectedIds.length === 0) return;
    try {
      await bulkAction({ ids: selectedIds, action: confirmModal.action });
      setSelectedIds([]);
      setConfirmModal({ isOpen: false, action: null, title: "", description: "" });
    } catch (err) {
      console.error("Bulk action failed:", err);
    }
  };

  const handleSingleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this story?")) {
      await deleteStory(id);
      if (selectedStory?._id === id) {
        setSelectedStory(null);
      }
    }
  };

  const toggleAudio = (url) => {
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
      audioRef.current.onended = () => setIsPlayingAudio(false);
    }

    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play();
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-poppins p-6 md:p-10">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-lg md:text-2xl font-semibold text-[#101828]">
            Success Stories Management
          </h1>
          <p className="text-sm text-[#667185] mt-1">
            Review, approve, and showcase student testimonials and career switch stories.
          </p>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Status Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {[
            { id: "all", label: "All Stories" },
            { id: "pending", label: "Pending Approval" },
            { id: "approved", label: "Approved" },
            { id: "dashboard", label: "Dashboard Display" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setStatusFilter(tab.id);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === tab.id
                  ? "bg-[#CC1747] text-white shadow-md shadow-[#CC1747]/20"
                  : "bg-gray-50 text-[#667185] hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Select All */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search stories..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#CC1747]"
            />
          </div>

          <button
            onClick={handleSelectAll}
            className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-[#344054] hover:bg-gray-50 whitespace-nowrap"
          >
            {isAllSelected ? <CheckSquare size={16} className="text-[#CC1747]" /> : <Square size={16} />}
            Select All
          </button>

          {/* Share Story Form Button & Popover Modal */}
          <div className="relative">
            <button
              onClick={() => setShowShareModal(!showShareModal)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#CC1747] hover:bg-[#a10f36] text-white rounded-xl text-xs font-semibold whitespace-nowrap transition-all shadow-sm shadow-[#CC1747]/20"
            >
              <Share2 size={15} />
            </button>

            {showShareModal && (
              <div className="absolute right-0 mt-2.5 w-80 sm:w-96 bg-white border border-gray-100 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#FFEBF0] text-[#CC1747] flex items-center justify-center">
                      <Share2 size={14} />
                    </div>
                    <h4 className="text-xs font-bold text-[#0B1930] uppercase tracking-wider">
                      Share Story Submission Form
                    </h4>
                  </div>
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="text-gray-400 hover:text-gray-600 rounded-lg p-1 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>

                <p className="text-xs text-[#667185] mb-3.5 leading-relaxed font-normal">
                  Share this submission link with students and alumni so they can submit their success stories directly.
                </p>

                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-1.5">
                  <input
                    type="text"
                    readOnly
                    value={`${window.location.origin}/share-success-story`}
                    className="w-full text-xs bg-transparent px-2 text-[#23314A] outline-none select-all font-mono truncate"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/share-success-story`);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      copied
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-[#0B1930] text-white hover:bg-[#142647]"
                    }`}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? "Copied!" : "Copy Link"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FLOATING MULTI-SELECT ACTION BAR */}
      {selectedIds.length > 0 && (
        <div className="bg-[#0B1930] text-white rounded-2xl p-4 mb-6 shadow-xl flex flex-wrap items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <span className="bg-[#CC1747] text-xs font-bold px-3 py-1 rounded-full">
              {selectedIds.length} Selected
            </span>
            <span className="text-xs text-gray-300">Choose a bulk operation:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => triggerBulkConfirmation("approve")}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Bulk Approve
            </button>
            <button
              onClick={() => triggerBulkConfirmation("unapprove")}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Bulk Hide
            </button>
            <button
              onClick={() => triggerBulkConfirmation("enable_dashboard")}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Enable Dashboard
            </button>
            <button
              onClick={() => triggerBulkConfirmation("disable_dashboard")}
              className="px-3 py-1.5 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Disable Dashboard
            </button>
            <button
              onClick={() => triggerBulkConfirmation("delete")}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <Trash2 size={12} />
              Delete
            </button>
          </div>
        </div>
      )}

      {/* STORY CARDS GRID */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-white rounded-2xl p-6 h-64 animate-pulse border border-gray-100" />
          ))}
        </div>
      ) : stories.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <p className="text-gray-400 text-sm">No success stories found matching your filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => {
            const isSelected = selectedIds.includes(story._id);

            return (
              <div
                key={story._id}
                className={`bg-white rounded-2xl border transition-all duration-200 hover:shadow-lg relative overflow-hidden flex flex-col justify-between ${
                  isSelected ? "border-[#CC1747] ring-2 ring-[#CC1747]/20" : "border-gray-100"
                }`}
              >
                <div className="p-6">
                  
                  {/* Card Header: Checkbox & Status Badges */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <button
                      onClick={() => handleToggleSelect(story._id)}
                      className="text-gray-400 hover:text-[#CC1747]"
                    >
                      {isSelected ? (
                        <CheckSquare size={20} className="text-[#CC1747]" />
                      ) : (
                        <Square size={20} />
                      )}
                    </button>

                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {story.is_approved ? (
                        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                          <CheckCircle2 size={12} /> Approved
                        </span>
                      ) : (
                        <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
                          Pending
                        </span>
                      )}

                      {story.dashboard_display && (
                        <span className="bg-[#FFEBF0] text-[#CC1747] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#CC1747]/20">
                          <Sparkles size={12} /> Dashboard
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Student Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={story.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"}
                      alt={story.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                    />
                    <div>
                      <h3 className="text-base font-bold text-[#101828]">{story.name}</h3>
                      <p className="text-xs text-[#CC1747] font-semibold">{story.jobTitle}</p>
                      {story.course && (
                        <p className="text-[11px] text-gray-500 mt-0.5">{story.course}</p>
                      )}
                    </div>
                  </div>

                  {/* Story Excerpt */}
                  <p className="text-xs text-gray-600 line-clamp-3 mb-4 leading-relaxed bg-gray-50 p-3 rounded-xl">
                    "{story.story}"
                  </p>
                </div>

                {/* Card Actions Footer */}
                <div className="border-t border-gray-100 p-4 bg-gray-50/50 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedStory(story)}
                    className="text-xs font-bold text-[#0B1930] hover:text-[#CC1747] flex items-center gap-1"
                  >
                    <Eye size={14} /> View Details
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleApproval({ id: story._id, is_approved: !story.is_approved })}
                      className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                        story.is_approved
                        ? "border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100"
                        : "border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                      }`}
                    >
                      {story.is_approved ? "Unapprove" : "Approve"}
                    </button>

                    <button
                      onClick={() => handleSingleDelete(story._id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                      title="Delete Story"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* STORY DETAIL MODAL */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 relative animate-in zoom-in-95">
            
            <button
              onClick={() => {
                if (isPlayingAudio && audioRef.current) {
                  audioRef.current.pause();
                  setIsPlayingAudio(false);
                }
                setSelectedStory(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:bg-gray-100"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={selectedStory.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"}
                alt={selectedStory.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#CC1747]"
              />
              <div>
                <h2 className="text-xl font-bold text-[#101828]">{selectedStory.name}</h2>
                <p className="text-sm font-semibold text-[#CC1747]">{selectedStory.jobTitle}</p>
                {selectedStory.industry && (
                  <p className="text-xs text-gray-500">{selectedStory.industry} Industry</p>
                )}
              </div>
            </div>

            {/* Quick Meta */}
            <div className="grid grid-cols-2 gap-3 mb-6 bg-gray-50 p-4 rounded-2xl">
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold block">Course</span>
                <span className="text-xs font-bold text-[#101828]">{selectedStory.course || "N/A"}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold block">Submitted On</span>
                <span className="text-xs font-bold text-[#101828]">
                  {new Date(selectedStory.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Full Story Text */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Testimonial / Story</h4>
              <div className="bg-gray-50 p-4 rounded-2xl text-sm text-[#344054] leading-relaxed whitespace-pre-wrap">
                {selectedStory.story}
              </div>
            </div>

            {/* Audio Recording Player */}
            {selectedStory.audioUrl && (
              <div className="mb-6 bg-red-50/50 border border-red-100 p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleAudio(selectedStory.audioUrl)}
                    className="w-10 h-10 rounded-full bg-[#CC1747] text-white flex items-center justify-center shadow-md hover:bg-[#a10f36]"
                  >
                    {isPlayingAudio ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                  </button>
                  <div>
                    <h5 className="text-xs font-bold text-[#101828] flex items-center gap-1">
                      <Volume2 size={14} className="text-[#CC1747]" /> Voice Story Recording
                    </h5>
                    <span className="text-[10px] text-gray-500">Audio clip submitted by student</span>
                  </div>
                </div>
              </div>
            )}

            {/* Toggle Switches & Actions */}
            <div className="border-t border-gray-100 pt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                
                {/* Approve Toggle */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedStory.is_approved}
                    onChange={(e) => {
                      const updated = { ...selectedStory, is_approved: e.target.checked };
                      if (!e.target.checked) updated.dashboard_display = false;
                      setSelectedStory(updated);
                      toggleApproval({ id: selectedStory._id, is_approved: e.target.checked });
                    }}
                    className="w-4 h-4 accent-[#CC1747] rounded cursor-pointer"
                  />
                  <span className="text-xs font-bold text-[#101828]">Approve Story</span>
                </label>

                {/* Dashboard Toggle */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedStory.dashboard_display}
                    onChange={(e) => {
                      const updated = { ...selectedStory, dashboard_display: e.target.checked };
                      if (e.target.checked) updated.is_approved = true;
                      setSelectedStory(updated);
                      toggleDashboardDisplay({ id: selectedStory._id, dashboard_display: e.target.checked });
                    }}
                    className="w-4 h-4 accent-[#CC1747] rounded cursor-pointer"
                  />
                  <span className="text-xs font-bold text-[#101828]">Dashboard Display</span>
                </label>
              </div>

              <button
                onClick={() => handleSingleDelete(selectedStory._id)}
                className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Trash2 size={14} /> Delete Story
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CONFIRMATION POPUP MODAL FOR BULK ACTIONS */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center shadow-2xl animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-red-50 text-[#CC1747] flex items-center justify-center mx-auto mb-4 border border-red-100">
              <AlertTriangle size={28} />
            </div>

            <h3 className="text-lg font-bold text-[#101828] mb-2">{confirmModal.title}</h3>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              {confirmModal.description}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setConfirmModal({ isOpen: false, action: null, title: "", description: "" })}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={executeBulkAction}
                disabled={isBulkActing}
                className="flex-1 py-3 rounded-xl bg-[#CC1747] hover:bg-[#a10f36] text-white text-xs font-bold shadow-md disabled:opacity-50"
              >
                {isBulkActing ? "Processing..." : "Confirm Action"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminSuccessStoryManagement;
