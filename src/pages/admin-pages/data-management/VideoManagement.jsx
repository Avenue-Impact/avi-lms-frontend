import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllVideos,
  createVideo,
  updateVideo,
  deleteVideo,
  bulkDeleteVideos,
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
import { useFetchAllAdminCourses } from "@/hooks/course-management/use-fetch-all-courses";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/Components/ui/dialog";

export default function VideoManagement() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(40);
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [viewingVideo, setViewingVideo] = useState(null);
  
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [tempSelectedCourses, setTempSelectedCourses] = useState([]);

  const { data: coursesData, isLoading: coursesLoading } = useFetchAllAdminCourses(1, 100);
  const allCourses = coursesData?.data?.data?.courses || [];

  const courseFilterStr = selectedCourses.join(",");

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-all-videos", { page, limit: perPage, search: searchQuery, course: courseFilterStr }],
    queryFn: () => getAllVideos(page, perPage, searchQuery, courseFilterStr),
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

  const bulkDeleteMutation = useMutation({
    mutationFn: bulkDeleteVideos,
    onSuccess: (res) => {
      queryClient.invalidateQueries(["get-all-videos"]);
      toast.success(res?.data?.message || "Videos deleted successfully");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to bulk delete videos");
    },
  });

  const handleSearch = useCallback(
    _.debounce((query) => {
      setSearchQuery(query);
      setPage(1);
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
          title: formData.title,
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
            onBulkDelete={bulkDeleteMutation.mutate}
            isBulkDeleting={bulkDeleteMutation.isPending}
            onOpenFilterModal={() => {
              setTempSelectedCourses(selectedCourses);
              setIsFilterModalOpen(true);
            }}
            hasActiveFilters={selectedCourses.length > 0}
            onClearFilters={() => {
              setSelectedCourses([]);
              setTempSelectedCourses([]);
              setPage(1);
            }}
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

      {isFilterModalOpen && (
        <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
          <DialogContent className="max-w-[700px] w-[90vw] p-6 bg-white rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Filter Videos by Course Tags
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Select one or multiple courses to filter the videos list. Unselected courses will be excluded. Videos with empty course tags will remain visible by default.
              </DialogDescription>
            </DialogHeader>

            <div className="my-6 max-h-[350px] overflow-y-auto border border-gray-200 rounded-md p-4 divide-y divide-gray-100 bg-gray-50/30">
              {coursesLoading ? (
                <p className="text-center py-8 text-sm text-gray-500">Loading courses...</p>
              ) : allCourses.length === 0 ? (
                <p className="text-center py-8 text-sm text-gray-500">No courses found.</p>
              ) : (
                allCourses.map((course) => {
                  const courseIdVal = course.id || course._id;
                  const isChecked = tempSelectedCourses.includes(courseIdVal);
                  return (
                    <label
                      key={courseIdVal}
                      className="flex items-center gap-3 py-3 cursor-pointer hover:bg-slate-50 px-2 rounded-md transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) {
                            setTempSelectedCourses(
                              tempSelectedCourses.filter((id) => id !== courseIdVal)
                            );
                          } else {
                            setTempSelectedCourses([...tempSelectedCourses, courseIdVal]);
                          }
                        }}
                        className="h-4.5 w-4.5 rounded border-gray-300 text-[#CC1747] focus:ring-[#CC1747] accent-[#CC1747] cursor-pointer"
                      />
                      <span className="text-sm font-medium text-gray-750 capitalize select-none">
                        {course.title}
                      </span>
                    </label>
                  );
                })
              )}
            </div>

            <div className="flex justify-between gap-3 mt-4">
              <CommonButton
                type="button"
                variant="outline"
                className="w-full text-gray-650 border-gray-350 hover:bg-gray-100"
                onClick={() => {
                  setTempSelectedCourses([]);
                }}
              >
                Clear Selections
              </CommonButton>
              <CommonButton
                type="button"
                className="w-full bg-[#CC1747] hover:bg-[#a6133a] text-white"
                onClick={() => {
                  setSelectedCourses(tempSelectedCourses);
                  setIsFilterModalOpen(false);
                  setPage(1);
                }}
              >
                Apply Filters ({tempSelectedCourses.length})
              </CommonButton>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
