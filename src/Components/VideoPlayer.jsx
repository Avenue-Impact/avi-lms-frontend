import React, { useRef, useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeMute,
  FaVolumeUp,
  FaExpand,
} from "react-icons/fa";
import { useAddVideoProgress } from "@/hooks/students/use-add-video-progress";

const formatTime = (timeInSeconds) => {
  if (isNaN(timeInSeconds)) return "00:00";
  const m = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(timeInSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

const VideoPlayer = ({
  videoUrl,
  coverImage,
  className,
  courseId,
  videoId,
  cohortId,
  initialProgress = { current_time: 0, progress_percentage: 0, is_completed: false },
}) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const playbackRates = [0.5, 1, 1.25, 1.5, 2];

  const { mutate: updateProgress } = useAddVideoProgress();

  const timeoutRef = useRef(null);
  const throttleRef = useRef({ lastPing: 0 });

  const syncProgress = (force = false, isCompleted = false) => {
    if (courseId && videoId && videoRef.current) {
      const current = videoRef.current.currentTime;
      const durationVal = videoRef.current.duration;
      
      if (durationVal > 0) {
        let progressPerc = (current / durationVal) * 100;
        if (isCompleted) {
          progressPerc = 100;
        }
        
        const currentTimeMs = Date.now();
        if (force || currentTimeMs - throttleRef.current.lastPing > 10000) {
          updateProgress({
            courseId,
            video_id: videoId,
            current_time: isCompleted ? 0 : current,
            progress_percentage: progressPerc,
            is_completed: progressPerc >= 95 || isCompleted,
            cohort_id: cohortId,
          });
          throttleRef.current.lastPing = currentTimeMs;
        }
      }
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        syncProgress(true);
      }
    };
    
    const handleBeforeUnload = () => {
      syncProgress(true);
    };

    const handleOffline = () => {
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };

    const handleOnline = () => {
      syncProgress(true);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [courseId, videoId]);

  useEffect(() => {
    if (initialProgress?.current_time && videoRef.current && !hasStarted) {
      videoRef.current.currentTime = initialProgress.current_time;
      if (initialProgress.progress_percentage) {
        setProgress(initialProgress.progress_percentage);
      }
    }
  }, [initialProgress, hasStarted]);

  const resetControlsTimeout = () => {
    setShowControls(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (isPlaying) {
      timeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  // Timer for fading out controls based on play state changes
  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isPlaying]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
        if (!hasStarted) setHasStarted(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        syncProgress(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const durationVal = videoRef.current.duration;
      setCurrentTime(current);
      setDuration(durationVal);
      if (durationVal > 0) {
        let progressPerc = (current / durationVal) * 100;
        setProgress(progressPerc);

        if (isPlaying) {
          syncProgress(false);
        }
      }
    }
  };

  const handlePause = () => {
    if (videoRef.current && courseId && videoId) {
      const current = videoRef.current.currentTime;
      const durationVal = videoRef.current.duration;
      const progressPerc = durationVal > 0 ? (current / durationVal) * 100 : 0;
      updateProgress({
        courseId,
        video_id: videoId,
        current_time: current,
        progress_percentage: progressPerc,
        is_completed: progressPerc >= 95,
        timestamp: current,
        cohort_id: cohortId,
      });
    }
  };

  const handleProgressChange = (e) => {
    if (videoRef.current) {
      const newTime = (e.target.value / 100) * duration;
      videoRef.current.currentTime = newTime;
      setProgress(e.target.value);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const cyclePlaybackRate = (e) => {
    e.stopPropagation();
    const currentIndex = playbackRates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % playbackRates.length;
    const nextRate = playbackRates[nextIndex];
    setPlaybackRate(nextRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate;
    }
  };

  const toggleFullScreen = (e) => {
    e.stopPropagation();
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current
          .requestFullscreen()
          .catch((err) => console.error(err));
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`group relative aspect-video w-full overflow-hidden bg-black shadow-lg lg:rounded-3xl ${className || ""}`}
      onMouseMove={resetControlsTimeout}
      onMouseLeave={() => {
        if (isPlaying) setShowControls(false);
      }}
      onClick={togglePlay}
      onContextMenu={(e) => e.preventDefault()}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={coverImage}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          setIsPlaying(false);
          syncProgress(true, true);
        }}
        onLoadedMetadata={handleTimeUpdate}
        onPause={handlePause}
        onContextMenu={(e) => e.preventDefault()}
        controlsList="nodownload"
        className="h-full w-full object-contain"
      />

      {/* Center Big Play Button (shows only when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 transition-opacity">
          <button
            onClick={togglePlay}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[#CC1747] shadow-xl transition-all hover:scale-105 hover:bg-[#CC1747] hover:text-white focus:outline-none"
            aria-label="Play video"
          >
            <FaPlay className="ml-1 text-2xl" />
          </button>
        </div>
      )}

      {/* Bottom Custom Controls Bar */}
      {hasStarted && (
        <div
          className={`absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 transition-opacity duration-300 ${
            showControls || !isPlaying
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Seek Bar */}
          <div className="mb-2 flex w-full items-center gap-2">
            <span className="text-xs text-white">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress || 0}
              onChange={handleProgressChange}
              className="h-1 flex-1 cursor-pointer appearance-none rounded-lg bg-gray-500/50 accent-[#CC1747]"
            />
            <span className="text-xs text-white">{formatTime(duration)}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Play/Pause (Left Side) */}
              <button
                onClick={togglePlay}
                className="text-white transition-colors hover:text-[#CC1747] focus:outline-none"
              >
                {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
              </button>

              {/* Volume */}
              <button
                onClick={toggleMute}
                className="text-white transition-colors hover:text-[#CC1747] focus:outline-none"
              >
                {isMuted ? (
                  <FaVolumeMute size={20} />
                ) : (
                  <FaVolumeUp size={20} />
                )}
              </button>

              {/* Playback Speed */}
              <button
                onClick={cyclePlaybackRate}
                className="text-white text-sm font-semibold transition-colors hover:text-[#CC1747] focus:outline-none w-8"
              >
                {playbackRate}x
              </button>
            </div>

            {/* Fullscreen */}
            <button
              onClick={toggleFullScreen}
              className="text-white transition-colors hover:text-[#CC1747] focus:outline-none"
            >
              <FaExpand size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
