import React, { useState } from "react";
import { Star, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useGetSuccessStories } from "@/hooks/success-stories/use-success-stories";

const fallbackStories = [
  {
    _id: "default-1",
    name: "Tolulope A.",
    jobTitle: "Business Analyst",
    story: "I got a Business Analyst role after joining Avenue Impact.",
    avatar: "",
  },
  {
    _id: "default-2",
    name: "Tunde Oladipo",
    jobTitle: "Data Analyst",
    story: "The mentorship, projects, and interview prep gave me the exact confidence I needed to land my dream tech job.",
    avatar: "",
  },
  {
    _id: "default-3",
    name: "Peace Ucho",
    jobTitle: "Project Manager",
    story: "Switching career paths was daunting, but Avenue Impact's hands-on roadmap made every step seamless.",
    avatar: "",
  },
];

const getInitials = (name) => {
  if (!name) return "AVI";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export const SuccessStoriesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch approved success stories from the API
  const { data: apiStories, isLoading } = useGetSuccessStories();

  const stories = (apiStories && apiStories.length > 0) ? apiStories : fallbackStories;
  const currentStory = stories[currentIndex % stories.length];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  return (
    <section className="w-full bg-[#EFF1F8] py-12 sm:py-16 lg:py-20 font-inter text-[#0A1430]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mx-auto">
          <span className="text-[#D7195A] font-space text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase block">
            SUCCESS STORIES
          </span>
          <h2 className="font-space font-bold text-[32px] sm:text-[40px] lg:text-[45px] leading-[38px] sm:leading-[45px] lg:leading-[50px] tracking-[-2px] text-[#0A1430] mt-3">
            Real transformations
          </h2>
        </div>

        {/* Testimonials Carousel Slider */}
        <div className="mt-12 sm:mt-14 mx-auto flex items-center justify-center gap-4 sm:gap-6 lg:gap-8">
          {/* Previous Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous story"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 active:scale-95 transition-all shadow-sm shrink-0"
          >
            <ArrowLeft size={18} />
          </button>

          {/* Testimonial Card */}
          <div className="bg-white rounded-[24px] sm:rounded-[32px] p-7 sm:p-10 lg:p-12 border border-slate-200/70 shadow-sm w-full max-w-4xl text-center flex flex-col items-center justify-center min-h-[240px] transition-all duration-300">
            {isLoading && !apiStories ? (
              <div className="flex items-center justify-center py-10 text-slate-400">
                <Loader2 className="animate-spin mr-2" size={20} />
                <span className="text-sm">Loading success stories...</span>
              </div>
            ) : (
              <>
                {/* 5 Pink Rating Stars */}
                <div className="flex items-center justify-center gap-1.5 text-[#D7195A] mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-[#D7195A] text-[#D7195A]"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-inter text-[14px] sm:text-[16px] lg:text-[17px] font-medium text-[#0A1430] leading-relaxed max-w-[80%]">
                  "{currentStory?.story || currentStory?.quote}"
                </p>

                {/* Author Info */}
                <div className="mt-6 flex items-center justify-center gap-3">
                  {currentStory?.avatar ? (
                    <img
                      src={currentStory.avatar}
                      alt={currentStory.name}
                      loading="lazy"
                      className="w-10 h-10 rounded-full object-cover border border-slate-100"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#E2E8F0] text-[#0A1430] font-space font-bold text-xs flex items-center justify-center">
                      {currentStory?.name ? currentStory.name.trim().charAt(0).toUpperCase() : "A"}
                    </div>
                  )}

                  <div className="text-left">
                    <h4 className="font-space font-bold text-[14px] text-[#0A1430] leading-tight">
                      {currentStory?.name}
                    </h4>
                    <p className="font-inter text-[12px] text-slate-500 mt-0.5">
                      {currentStory?.jobTitle || currentStory?.role || "Alumni"}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Next Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next story"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0A1430] text-white flex items-center justify-center hover:bg-[#16213f] active:scale-95 transition-all shadow-md shrink-0"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
