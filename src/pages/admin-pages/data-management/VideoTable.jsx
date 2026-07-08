import React, { useState } from "react";
import Table from "@/Components/Table";
import { CommonButton } from "@/Components/ui/button";
import { Trash2, Filter, Check } from "lucide-react";

export default function VideoTable({ videos, onEdit, onDelete, onView, onOpenFilterModal, hasActiveFilters, onClearFilters }) {
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

  return (
    <Table cols={"0.5fr 2fr 1.8fr 1fr 1fr 1fr 1fr 1.5fr"}>
      <Table.Header className={"*:text-sm *:font-medium"}>
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
            className={`p-1.5 rounded-md hover:bg-gray-100 transition-all ${hasActiveFilters ? 'text-white bg-[#CC1747] hover:bg-[#a6133a] font-bold shadow-sm' : 'text-gray-500'}`}
            title="Filter by Course Tags"
          >
            <Filter size={14} />
          </button>
        </div>
      </Table.Header>
      <div className="divide-y">
        {videos.map((video, i) => (
          <Table.Row key={video.id || video._id}>
            <p>{i + 1}</p>
            <p
              className="truncate pr-2 text-sm font-medium capitalize text-[#101928]"
              title={video.title}
            >
              {video.title}
            </p>
            <div className="flex flex-wrap gap-1 px-2">
               {video.tags && video.tags.length > 0 ? (
                 video.tags.map(tag => (
                   <span key={tag} className="text-[12px] bg-primary-color-50 text-primary-color-600 px-2 py-0.5 rounded-md truncate max-w-[120px]" title={tag}>
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
                Edit Video
              </CommonButton>
              <button
                className="rounded-md p-2 text-[#CC1747] transition-colors hover:bg-[#CC1747]/10"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this video?",
                    )
                  ) {
                    onDelete(video.id || video._id);
                  }
                }}
                title="Delete Video"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </Table.Row>
        ))}
      </div>
    </Table>
  );
}
