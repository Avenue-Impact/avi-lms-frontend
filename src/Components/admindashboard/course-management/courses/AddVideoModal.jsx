import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { CommonButton } from "@/Components/ui/button";
import { useAddVideosToRecordedSession } from "@/hooks/course-management/use-add-videos-recorded-session";
import { useGetAllVideos } from "@/hooks/course-management/use-get-all-videos";
import { Search, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import ClipLoader from "react-spinners/ClipLoader";

export function AddVideoModal({ children, sectionId, courseId, cohortId }) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideos, setSelectedVideos] = useState([]);

  const { mutate: addVideos, isAdding } = useAddVideosToRecordedSession(
    courseId,
    cohortId,
  );
  const { data: videosData, isLoading } = useGetAllVideos();

  const allVideos = videosData?.data?.data || [];

  const filteredVideos = useMemo(() => {
    if (!searchQuery) return allVideos;
    const lowerQuery = searchQuery.toLowerCase();
    return allVideos.filter((v) => v.title?.toLowerCase().includes(lowerQuery));
  }, [allVideos, searchQuery]);

  const toggleVideoSelection = (videoId) => {
    setSelectedVideos((prev) =>
      prev.includes(videoId)
        ? prev.filter((id) => id !== videoId)
        : [...prev, videoId],
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedVideos.length === 0) return;

    addVideos(
      { data: { videoIds: selectedVideos }, courseId, cohortId, sectionId },
      {
        onSuccess: () => {
          setOpen(false);
          setSelectedVideos([]);
          setSearchQuery("");
        },
      },
    );
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
    if (!newOpen) {
      setSelectedVideos([]);
      setSearchQuery("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[90%] sm:max-w-[1020px]">
        <DialogHeader>
          <DialogTitle>Add Videos to Section</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search videos..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex h-[300px] flex-col gap-2 overflow-y-auto rounded-md border p-2">
            {isLoading ? (
              <div className="flex h-full items-center justify-center">
                <ClipLoader color="#cc1747" size={30} />
              </div>
            ) : filteredVideos.length === 0 ? (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No videos found.
              </div>
            ) : (
              filteredVideos.map((video) => {
                const isSelected = selectedVideos.includes(video.id);
                return (
                  <div
                    key={video.id}
                    onClick={() => toggleVideoSelection(video.id)}
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded-md border p-3 transition-colors",
                      isSelected
                        ? "border-[#cc1747] bg-[#cc1747]/5"
                        : "hover:bg-slate-50",
                    )}
                  >
                    <div className="flex flex-col gap-1 truncate pr-4">
                      <span
                        className="truncate text-sm font-medium"
                        title={video.title}
                      >
                        {video.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {video.size || "Unknown max size"}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#cc1747] text-white">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {selectedVideos.length} video
              {selectedVideos.length !== 1 ? "s" : ""} selected
            </span>
            <DialogFooter>
              <CommonButton
                type="submit"
                className="bg-[#cc1747] text-white hover:bg-[#a6133a]"
                disabled={isAdding || selectedVideos.length === 0}
              >
                Add{" "}
                {selectedVideos.length > 0 ? `(${selectedVideos.length})` : ""}{" "}
                Videos
              </CommonButton>
              <CommonButton
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </CommonButton>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
