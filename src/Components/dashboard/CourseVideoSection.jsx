import { useViewCourseSections } from "@/hooks/students/use-course-secion-view";
import { Loader2, FileText, Download } from "lucide-react";
import {
  MediaControlBar,
  MediaController,
  MediaFullscreenButton,
  MediaMuteButton,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import Assignment from "../../pages/dashboard/Assignment";
import CourseNavigation from "@/Components/dashboard/CourseNavigation";
import { useAddVideoProgress } from "@/hooks/students/use-add-video-progress";
import { useFetchVideoProgress } from "@/hooks/students/use-fetch-video-progress";
import { useRef, useEffect } from "react";

function CourseVideoSection({ data }) {
  const { sectionDetails, videoUrl, videoId } = useViewCourseSections();
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState("assignment");

  return (
    <section className="relative flex h-auto flex-col">
      <div className="mb-3 text-center md:text-left">
        <p className="mb-2 text-lg text-gray-500">
          Section {sectionDetails.section} {sectionDetails.topic}
        </p>
        <h1 className="text-2xl font-bold leading-tight text-[#111827] md:text-3xl lg:text-4xl">
          {sectionDetails.videoTitle ||
            "21 Jul 2025 Introduction to Business Analysis (Taster Session Recording Plus Success Stories)"}
        </h1>
      </div>
      <div className="mb-8 w-full max-w-[1020px] overflow-hidden rounded-[10px]">
        <PreviewVideo
          key={videoId}
          videoId={videoId}
          courseId={courseId}
          videoUrl={videoUrl}
          section={sectionDetails.section}
          cohortId={data?.data?.data?.cohort_id}
        />
      </div>
      {/* <CourseNavigation /> */}
    </section>
  );
}

const PreviewVideo = ({ videoId, videoUrl, courseId, cohortId }) => {
  const [waiting, setWaiting] = useState(false);
  const { data: progressData } = useFetchVideoProgress(courseId, videoId);
  const { mutate: addProgress } = useAddVideoProgress();
  const lastSavedTime = useRef(0);
  const playerRef = useRef(null);
  const hasSeeked = useRef(false);

  // Sync on mount - seek to last watched position
  useEffect(() => {
    if (progressData?.data?.current_time && playerRef.current && !hasSeeked.current) {
      playerRef.current.seekTo(progressData.data.current_time, "seconds");
      lastSavedTime.current = progressData.data.current_time;
      hasSeeked.current = true;
    }
  }, [progressData, videoId]);

  // Fail-safe sync on tab close / visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && playerRef.current) {
        handlePause();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [videoId, courseId]);

  const handleProgress = (progress) => {
    if (!videoId || !courseId) return;

    const currentTime = progress.playedSeconds;
    // Debounce updates so we only blast the backend every 10 seconds sequentially 
    // or if the user scrubs heavily backwards
    if (Math.abs(currentTime - lastSavedTime.current) > 10) {
      lastSavedTime.current = currentTime;
      addProgress({
        courseId,
        video_id: videoId,
        current_time: currentTime,
        progress_percentage: Math.floor(progress.played * 100),
        is_completed: progress.played > 0.95,
        timestamp: currentTime,
        cohort_id: cohortId,
      });
    }
  };

  const handlePause = () => {
    if (!videoId || !courseId || !playerRef.current) return;
    const currentTime = playerRef.current.getCurrentTime();
    const duration = playerRef.current.getDuration();
    const played = duration > 0 ? currentTime / duration : 0;

    lastSavedTime.current = currentTime;
    addProgress({
      courseId,
      video_id: videoId,
      current_time: currentTime,
      progress_percentage: Math.floor(played * 100),
      is_completed: played > 0.95,
      timestamp: currentTime,
      cohort_id: cohortId,
    });
  };

  const handleEnded = () => {
    if (!videoId || !courseId) return;
    addProgress({
      courseId,
      video_id: videoId,
      current_time: 0,
      progress_percentage: 100,
      is_completed: true,
      timestamp: 0,
      cohort_id: cohortId,
    });
  };

  return (
    <div className="relative">
      {waiting && (
        <div className="absolute left-0 top-0 z-40 flex h-full w-full items-center justify-center">
          <span>
            <Loader2 className="animate-spin text-primary-color-600" />
          </span>
        </div>
      )}
      <MediaController
        style={{
          width: "100%",
          aspectRatio: "16/9",
        }}
      >
        <ReactPlayer
          ref={playerRef}
          slot="media"
          src={videoUrl}
          controls={false}
          onSeeking={() => {
            setWaiting(true);
          }}
          onWaiting={() => {
            setWaiting(true);
          }}
          onSeeked={() => {
            setWaiting(false);
          }}
          onPlaying={() => {
            setWaiting(false);
          }}
          onPause={handlePause}
          onProgress={handleProgress}
          onEnded={handleEnded}
          style={{
            width: "100%",
            height: "100%",
            "--controls": "none",
          }}
        ></ReactPlayer>
        <MediaControlBar className="z-50">
          <MediaPlayButton />
          <MediaSeekBackwardButton seekOffset={10} />
          <MediaSeekForwardButton seekOffset={10} />
          <MediaTimeRange />
          <MediaTimeDisplay showDuration />
          <MediaMuteButton />
          <MediaVolumeRange />
          <MediaPlaybackRateButton />
          <MediaFullscreenButton />
        </MediaControlBar>
      </MediaController>
    </div>
  );
};

export default CourseVideoSection;
