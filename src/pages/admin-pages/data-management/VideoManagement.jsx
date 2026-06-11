import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllVideos,
  createVideo,
  updateVideo,
  deleteVideo,
} from "@/services/api";
import { CommonButton } from "@/Components/ui/button";
import { IoSearch } from "react-icons/io5";
import toast from "react-hot-toast";
import _ from "lodash";

import VideoTable from "./VideoTable";
import VideoForm from "./VideoForm";
import VideoPlayer from "@/Components/VideoPlayer";
import GlobalPagination from "@/Components/ui/GlobalPagination";
import joinTeamImage from "@/assets/images/join_team.png";

export default function VideoManagement() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [viewingVideo, setViewingVideo] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-all-videos", { page, limit: perPage, search: searchQuery }],
    queryFn: () => getAllVideos(page, perPage, searchQuery),
  });

  const createMutation = useMutation({
    mutationFn: createVideo,
    onSuccess: () => {
      queryClient.invalidateQueries(["get-all-videos"]);
      toast.success("Video created successfully");
      setIsModalOpen(false);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to create video");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateVideo,
    onSuccess: () => {
      queryClient.invalidateQueries(["get-all-videos"]);
      toast.success("Video updated successfully");
      setIsModalOpen(false);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to update video");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => {
      queryClient.invalidateQueries(["get-all-videos"]);
      toast.success("Video deleted successfully");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to delete video");
    },
  });

  const handleSearch = useCallback(
    _.debounce((query) => {
      setSearchQuery(query);
    }, 500),
    [],
  );

  const videos = data?.data?.data?.videos || data?.data?.data || [];

  const handleCreateNew = () => {
    setEditingVideo(null);
    setIsModalOpen(true);
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setIsModalOpen(true);
  };

  const handleView = (video) => {
    setViewingVideo(video);
    setIsVideoModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const onSubmitForm = (formData) => {
    if (editingVideo) {
      updateMutation.mutate({
        id: editingVideo.id || editingVideo._id,
        data: {
          videoTitle: formData.videoTitle,
          issue_date: formData.issue_date,
          tags: formData.tags,
        },
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div>
      <header className="mt-7 flex flex-wrap items-center justify-between gap-4 px-4 py-5">
        <p className="text-xl text-[#475367]">All Videos ({videos.length})</p>
        <div className="flex w-full max-w-[528px] items-center gap-x-4 rounded-md border border-[#D0D5DD] px-4 py-2">
          <label htmlFor="search">
            <IoSearch className="text-xl text-[#667185]" />
          </label>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search here..."
            className="w-full bg-transparent outline-none placeholder:text-[#667185]"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <CommonButton
          className="hover:bg-primary-color-700 bg-primary-color-600 text-white"
          onClick={handleCreateNew}
        >
          New Video
        </CommonButton>
      </header>

      <div className="mt-10 px-4">
        {isLoading ? (
          <p className="text-center">Loading videos...</p>
        ) : error ? (
          <p className="text-center text-[#CC1747]">Error loading videos.</p>
        ) : (
          <VideoTable
            videos={videos}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        {!isLoading && !error && data?.data?.pagination && (
          <GlobalPagination
            pagination={data.data.pagination}
            onPageChange={setPage}
            onLimitChange={(limit) => {
              setPerPage(limit);
              setPage(1);
            }}
          />
        )}
      </div>

      {isModalOpen && (
        <VideoForm
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          isEdit={!!editingVideo}
          initialData={editingVideo}
          onSubmit={onSubmitForm}
          isPending={createMutation.isPending || updateMutation.isPending}
        />
      )}

      {isVideoModalOpen && viewingVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-[90vw] lg:min-w-[1020px] max-w-[1200px] bg-black rounded-lg overflow-hidden">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-[110] text-gray-300 hover:text-white bg-black/50 p-2 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <VideoPlayer
              videoUrl={viewingVideo.videoUrl || viewingVideo.url || viewingVideo.video_url || viewingVideo.video}
              coverImage={joinTeamImage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
