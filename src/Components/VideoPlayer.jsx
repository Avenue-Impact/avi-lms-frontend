import React, { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";

const VideoPlayer = ({ videoUrl, coverImage, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`relative w-full overflow-hidden bg-black shadow-lg lg:rounded-3xl ${className || ""}`}
    >
      {!isPlaying && coverImage && (
        <img
          src={coverImage}
          alt="Video Thumbnail"
          className="absolute inset-0 z-10 h-full w-full object-cover"
        />
      )}
      {!isPlaying && !coverImage && (
        <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-gray-800">
          <span className="text-sm text-gray-400">No Preview Image</span>
        </div>
      )}
      {!isPlaying && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30">
          <button
            onClick={handlePlayClick}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[#CC1747] shadow-xl transition-all hover:scale-105 hover:bg-[#CC1747] hover:text-white focus:outline-none"
            aria-label="Play video"
          >
            <FaPlay className="ml-1 text-2xl" />
          </button>
        </div>
      )}
      <video
        ref={videoRef}
        src={videoUrl}
        poster={coverImage}
        controls={isPlaying}
        controlsList="nodownload"
        onContextMenu={handleContextMenu}
        onEnded={handleVideoEnded}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        className="max-h-[699px] w-full object-cover lg:rounded-3xl"
        style={{ minHeight: "300px" }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
