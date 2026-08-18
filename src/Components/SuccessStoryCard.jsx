import React from "react";
import { Play, Pause, Volume2, VolumeX, Briefcase } from "lucide-react";

const SuccessStoryCard = ({
  story,
  isPlaying,
  isMuted,
  currentTime = 0,
  handlePlayPause,
  handleSeek,
  toggleMute,
  formatTime,
}) => {
  const hasAudio = Boolean(story.audioUrl);

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative group overflow-hidden">
      <div>
        {/* Header: Avatar, Name & Category Badge */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <img
              src={story.avatar}
              alt={story.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#CC1747]/10"
            />
            <div>
              <h4 className="font-bold text-[#23314A] text-base leading-tight">
                {story.name}
              </h4>
              <p className="text-xs text-[#667185]">{story.role}</p>
            </div>
          </div>

          {/* Play/Pause Button - rendered only if audio is available */}
          {hasAudio && (
            <button
              onClick={() => handlePlayPause(story.id, story.duration)}
              className="w-10 h-10 rounded-full bg-[#CC1747] text-white flex items-center justify-center hover:bg-[#a10f36] hover:scale-105 active:scale-95 transition-all shadow-md shadow-[#CC1747]/10"
            >
              {isPlaying ? (
                <Pause size={16} fill="currentColor" />
              ) : (
                <Play size={16} fill="currentColor" className="ml-0.5" />
              )}
            </button>
          )}
        </div>

        {/* Category Tag */}
        <div className="mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FFEBF0] text-[#CC1747]">
            {story.category}
          </span>
        </div>

        {/* Testimonial Quote */}
        <div className="relative mb-6 text-[#667185] text-sm leading-relaxed font-light italic">
          <span className="text-[#CC1747] font-bold text-2xl absolute -left-2 -top-2">
            “
          </span>
          <p className="pl-4 pr-2">{story.quote}</p>
          <span className="text-[#CC1747] font-bold text-2xl absolute right-2 bottom-0">
            ”
          </span>
        </div>
      </div>

      <div>
        {/* Custom Progress Bar / Audio Player - rendered only if audio is available */}
        {hasAudio && (
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3.5 mb-6">
            <span className="text-xs font-semibold text-[#23314A] min-w-[32px]">
              {formatTime(currentTime)}
            </span>

            {/* Custom Range Input with Brand Tinting */}
            <input
              type="range"
              min="0"
              max={story.duration}
              value={currentTime}
              onChange={(e) => handleSeek(story.id, e)}
              style={{ accentColor: "#CC1747" }}
              className="flex-1 h-1.5 rounded-lg bg-gray-200 cursor-pointer outline-none w-full"
            />

            <span className="text-xs font-light text-[#667185]">
              {formatTime(story.duration)}
            </span>

            <button
              onClick={() => toggleMute(story.id)}
              className="text-[#667185] hover:text-[#23314A] transition-colors"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        )}

        {/* Horizontal Divider */}
        <div className="h-[1px] w-full bg-gray-100 mb-5" />

        {/* Career Stats Footer */}
        <div className="grid grid-cols-2 gap-4">
          {story.stats &&
            story.stats.map((stat, i) => {
              const Icon = stat.icon || Briefcase;
              return (
                <div key={i} className="flex gap-2">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#667185]">
                    <Icon size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-[#98A2B3] font-light leading-none">
                      {stat.label}
                    </p>
                    <p
                      className={`text-xs font-semibold truncate ${
                        stat.highlight ? "text-[#CC1747]" : "text-[#23314A]"
                      }`}
                    >
                      {stat.value}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SuccessStoryCard;
