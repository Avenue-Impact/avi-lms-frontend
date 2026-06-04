import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";

// Slide data matched to images in public/images/hero_slides
const slides = [
  {
    badge: "Trusted by Government & Enterprise Organisations",
    headline: "Digital Transformation\nfor Governments &\nEnterprises",
    description:
      "We deliver end-to-end digital transformation programmes helping governments and enterprises modernise operations, improve service delivery and achieve sustainable digital impact.",
    primaryCta: "Explore Our Solutions",
    primaryPath: "/digital-transformation",
    secondaryCta: "Learn More",
    secondaryPath: "/about",
    bg: "/images/hero_slides/949c66affbee9d68a65e7bb9867c2d24fc674670.jpg",
  },
  {
    badge: "Workforce Transformation Platform",
    headline: "Build, Train and Deploy\nHigh-Performance\nDigital Talent",
    description:
      "We design and deliver bespoke talent programmes — from business analysis to cloud computing — equipping your teams with the skills to drive transformation.",
    primaryCta: "View Our Training",
    primaryPath: "/digital-learning-hub",
    secondaryCta: "Learn More",
    secondaryPath: "/about",
    bg: "/images/hero_slides/3b30bfd0b967ba2adf58f62ed66d07fd7aeefdb9.jpg",
  },
  {
    badge: "Delivery & Talent Solutions",
    headline: "Expert Resources for\nProject Delivery and\nImplementation",
    description:
      "Access a pool of certified project managers, business analysts and delivery leads ready to support your most complex transformation initiatives from day one.",
    primaryCta: "Discover Our Talent",
    primaryPath: "/about",
    secondaryCta: "Learn More",
    secondaryPath: "/digital-transformation",
    bg: "/images/hero_slides/142fa83a58b6083bebc6a397f5f6a827d2cc44c0.jpg",
  },
  {
    badge: "Customer Operations & Managed Services",
    headline: "Global Customer\nSupport and Managed\nServices",
    description:
      "We deliver scalable, high-quality customer operations and managed service solutions — helping your organisation reduce costs while maintaining exceptional service standards.",
    primaryCta: "Get In Touch",
    primaryPath: "/contact",
    secondaryCta: "Learn More",
    secondaryPath: "/about",
    bg: "/images/hero_slides/de997b2d61b9bfae2bb8644382486e7a2d3d3415.jpg",
  },
];

export function HeroSection() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);
  const total = slides.length;

  const goTo = useCallback(
    (index) => {
      if (isTransitioning || index === current) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setIsTransitioning(false);
      }, 500);
    },
    [isTransitioning, current],
  );

  const next = useCallback(
    () => goTo((current + 1) % total),
    [current, goTo, total],
  );

  const prev = useCallback(
    () => goTo((current - 1 + total) % total),
    [current, goTo, total],
  );

  // Auto-advance every 6 seconds
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, [total]);

  const slide = slides[current];

  return (
    <section
      className="relative flex min-h-[79vh] w-full flex-col justify-end overflow-hidden bg-[#0d0d0d]"
      aria-label="Hero slider"
    >
      {/* ── Background images (crossfade) ── */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        >
          <img
            src={s.bg}
            alt=""
            className="h-full w-full object-cover object-center"
            loading={i === 0 ? "eager" : "lazy"}
          />
          {/* Very dark overlay — matches the deep dark look in the design */}
          {/* Gradient overlay — darker so text is readable */}
          <div className="via-[#0d0d0d]/85 absolute inset-0 bg-gradient-to-r from-[#0d0d0d] to-[#0d0d0d]/40" />
        </div>
      ))}

      {/* ── Slide content — left-aligned ── */}
      <div
        className={`relative z-10 w-full pb-20 pt-32 transition-all duration-500 ease-in-out sm:pb-24 sm:pt-40 ${
          isTransitioning
            ? "translate-y-4 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="max-w-[600px]">
            {/* Badge — left-border accent style */}
            <div className="mb-6 inline-flex items-center border-l-[3px] border-[#C41E3A] pl-3">
              <span className="text-sm font-medium tracking-wide text-white">
                {slide.badge}
              </span>
            </div>

            {/* Headline */}
            <h1 className="mb-5 whitespace-pre-line text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-[52px]">
              {slide.headline}
            </h1>

            {/* Description */}
            <p className="mb-10 max-w-[520px] text-sm leading-relaxed text-gray-300 md:text-base">
              {slide.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Primary — solid red with arrow */}
              <button
                onClick={() => navigate(slide.primaryPath)}
                className="inline-flex items-center gap-2.5 rounded-sm bg-[#C41E3A] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#a8103a]"
              >
                {slide.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </button>
              {/* Secondary — white border with arrow */}
              <button
                onClick={() => navigate(slide.secondaryPath)}
                className="inline-flex items-center gap-2.5 rounded-sm border border-white/60 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                {slide.secondaryCta}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Left nav arrow ── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-colors duration-200 hover:bg-white/25 md:left-8"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>

      {/* ── Right nav arrow ── */}
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#C41E3A] transition-colors duration-200 hover:bg-[#a8103a] md:right-8"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* ── Pagination dots — bottom left (aligned with content) ── */}
      <div
        className="absolute bottom-7 left-6 z-20 flex items-center gap-2.5 md:left-12 lg:left-20"
        role="tablist"
        aria-label="Slide navigation"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "h-2.5 w-7 bg-[#C41E3A]"
                : "bg-white/35 hover:bg-white/65 h-2.5 w-2.5"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
