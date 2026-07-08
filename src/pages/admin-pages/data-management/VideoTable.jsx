import React, { useState } from "react";
import Table from "@/Components/Table";
import { CommonButton } from "@/Components/ui/button";
import { Trash2, Filter } from "lucide-react";

export default function VideoTable({
  videos,
  onEdit,
  onDelete,
  onView,
  onOpenFilterModal,
  hasActiveFilters,
  onClearFilters,
  onBulkDelete,
  isBulkDeleting,
}) {
  const [selectedIds, setSelectedIds] = useState([]);

  if (!videos || videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500 gap-2">
        <p>No videos found.</p>
        {hasActiveFilters && (
          <CommonButton
            className="hover:bg-primary-color-700 bg-primary-color-600 text-white text-xs px-3 py-1.5"
            onClick={onClearFilters}
          >
            Clear Filters
          </CommonButton>
        )}
      </div>
    );
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = videos.map((video) => video.id || video._id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleBulkDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete the ${selectedIds.length} selected videos?`,
      )
    ) {
      onBulkDelete(selectedIds, {
        onSuccess: () => setSelectedIds([]),
      });
    }
  };

  const allSelected = videos.length > 0 && selectedIds.length === videos.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < videos.length;

  return (
    <div className="overflow-x-auto relative">
      {selectedIds.length > 0 && (
        <div className="sticky top-0 z-10 flex items-center justify-between bg-primary-color-100 px-4 py-3 border-b border-primary-color-300 rounded-t-md mb-2">
          <span className="text-sm font-medium text-primary-color-600">
            {selectedIds.length} video{selectedIds.length > 1 ? "s" : ""} selected
          </span>
          <div className="flex gap-2">
            <CommonButton
              className="text-sm h-8 bg-red-600 text-white hover:bg-red-700 border-none flex items-center gap-1.5 px-3 py-1"
              onClick={handleBulkDelete}
              disabled={isBulkDeleting}
            >
              <Trash2 className="w-4 h-4 text-white" />
              {isBulkDeleting ? "Deleting..." : "Delete Selected"}
            </CommonButton>
          </div>
        </div>
      )}

      <Table cols={"0.3fr 0.5fr 2fr 1.8fr 1fr 1fr 1fr 1fr 1.5fr"}>
        <Table.Header className={"*:text-sm *:font-medium pl-4"}>
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-primary-color-600 focus:ring-primary-color-600 cursor-pointer"
              checked={allSelected}
              ref={(input) => {
                if (input) input.indeterminate = someSelected;
              }}
              onChange={handleSelectAll}
            />
          </div>
          <h4>S/N</h4>
          <h4>Title</h4>
          <h4>Course</h4>
          <h4>Size (MB)</h4>
          <h4>Extension</h4>
          <h4>Issue Date</h4>
          <h4>Provider</h4>
          <div className="relative flex items-center justify-between gap-1.5">
            <span>Action</span>
            <button
              type="button"
              onClick={onOpenFilterModal}
              className={`p-1.5 rounded-md transition-all ${hasActiveFilters ? "text-white bg-[#CC1747] font-bold shadow-sm" : "text-gray-500"}`}
              title="Filter by Course Tags"
            >
              <Filter size={14} />
            </button>
          </div>
        </Table.Header>
        <div className="divide-y pl-4">
          {videos.map((video, i) => {
            const videoIdVal = video.id || video._id;
            return (
              <Table.Row key={videoIdVal} className="items-center py-2">
                <div className="flex items-center justify-start">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-primary-color-600 focus:ring-primary-color-600 cursor-pointer"
                    checked={selectedIds.includes(videoIdVal)}
                    onChange={() => handleSelectOne(videoIdVal)}
                  />
                </div>
                <p>{i + 1}</p>
                <p
                  className="truncate pr-2 text-sm font-medium capitalize text-[#101928]"
                  title={video.title}
                >
                  {video.title}
                </p>
                <div className="flex flex-wrap gap-1 px-2">
                  {video.tags && video.tags.length > 0 ? (
                    video.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[12px] bg-primary-color-50 text-primary-color-600 px-2 py-0.5 rounded-md truncate max-w-[120px]"
                        title={tag}
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">None</span>
                  )}
                </div>
                <p className="text-sm text-[#344054]">{video.size || "N/A"}</p>
                <p className="text-sm uppercase text-[#344054]">
                  {video.extension || "N/A"}
                </p>
                <p className="text-sm text-[#344054]">
                  {video.created_at
                    ? new Date(video.created_at).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-sm text-[#344054]">{video.provider || "N/A"}</p>
                <div className="flex items-center gap-2">
                  <CommonButton
                    className="hover:bg-primary-color-700 h-auto bg-primary-color-600 px-3 py-1 text-xs text-white"
                    onClick={() => onView(video)}
                  >
                    View
                  </CommonButton>
                  <CommonButton
                    className="hover:bg-primary-color-700 h-auto bg-primary-color-600 px-3 py-1 text-xs text-white"
                    onClick={() => onEdit(video)}
                  >
                    Edit
                  </CommonButton>
                  <button
                    className="rounded-md p-2 text-[#CC1747] transition-colors hover:bg-[#CC1747]/10"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this video?",
                        )
                      ) {
                        onDelete(videoIdVal);
                      }
                    }}
                    title="Delete Video"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </Table.Row>
            );
          })}
        </div>
      </Table>
    </div>
  );
}
