import React, { useRef, useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeMute,
  FaVolumeUp,
  FaExpand,
} from "react-icons/fa";

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

const VideoPlayer = ({ videoUrl, coverImage, className }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Timer for fading out controls
  useEffect(() => {
    let timeout;
    const resetControlsTimeout = () => {
      setShowControls(true);
      clearTimeout(timeout);
      if (isPlaying) {
        timeout = setTimeout(() => setShowControls(false), 2500);
      }
    };

    resetControlsTimeout();
    return () => clearTimeout(timeout);
  }, [isPlaying, progress]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
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
        setProgress((current / durationVal) * 100);
      }
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
      className={`group relative w-full overflow-hidden bg-black shadow-lg lg:rounded-3xl ${className || ""}`}
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => {
        if (isPlaying) setShowControls(false);
      }}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={coverImage}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={handleTimeUpdate}
        onContextMenu={(e) => e.preventDefault()}
        controlsList="nodownload"
        className="max-h-[699px] w-full object-contain"
        style={{ minHeight: "300px" }}
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
          <span className="text-xs text-white">{formatTime(currentTime)}</span>
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
              {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
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
    </div>
  );
};

export default VideoPlayer;
