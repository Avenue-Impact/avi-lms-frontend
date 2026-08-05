import React, { useState, useEffect, useRef } from "react";
import SEOHead from "@/Components/SEOHead";
import { Link } from "react-router-dom";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Briefcase,
  TrendingUp,
  MapPin,
  RotateCw,
  Star,
  ArrowRight,
  Award,
  Users,
  Trophy,
  Headphones,
  Check
} from "lucide-react";
import successHeroImg from "@/assets/images/success_stories_hero.png";
import arrowImg from "@/assets/imgs/arrow.png";

// Mock Student Success Stories Data
const storiesData = [
  {
    id: 1,
    name: "Tunde Oladipo",
    role: "Data Analyst",
    category: "Career Change",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    quote: "I came from a totally non-tech background. The mentorship, projects, and hands-on training gave me the confidence and skills I needed. Today, I'm working as a Data Analyst in a top fintech company!",
    duration: 165, // 2:45 in seconds
    stats: [
      { label: "New working at", value: "FinBank Technology", icon: Briefcase },
      { label: "Increased earning by", value: "120%", icon: TrendingUp, highlight: true }
    ]
  },
  {
    id: 2,
    name: "Peace Ucho",
    role: "Project Manager",
    category: "Job Promotion",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    quote: "The PMP training and real-world projects helped me stand out at work. I got promoted to Project Manager and now lead a team of 8 people. Avenue Impact made it possible.",
    duration: 165, // 2:45
    stats: [
      { label: "Promoted to", value: "Project Manager", icon: Briefcase },
      { label: "Salary increase", value: "85%", icon: TrendingUp, highlight: true }
    ]
  },
  {
    id: 3,
    name: "Emeka Daniels",
    role: "Cloud Engineer",
    category: "New Job",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    quote: "Switching to cloud engineering felt impossible until I joined Avenue Impact. The practical labs, support, and community pushed me through. I now work remotely for a US-based tech company!",
    duration: 165, // 2:45
    stats: [
      { label: "New working at", value: "CloudNova (USA)", icon: Briefcase },
      { label: "Working", value: "Remotely", icon: MapPin }
    ]
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    role: "Business Analyst",
    category: "Global Opportunities",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    quote: "I wanted to relocate to the UK, and the Business Analysis cohort gave me the exact skills and globally recognized certification I needed. I secured a sponsorship visa role within 3 months!",
    duration: 180, // 3:00
    stats: [
      { label: "Relocated to", value: "London, UK", icon: MapPin },
      { label: "Visa status", value: "Sponsorship Secured", icon: Award }
    ]
  },
  {
    id: 5,
    name: "Fatima Yusuf",
    role: "Data Consultant",
    category: "Freelance Success",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=200&auto=format&fit=crop",
    quote: "Avenue Impact taught me not just how to analyze data, but how to consult for clients. I transitioned to freelance consulting and now work with international brands globally.",
    duration: 150, // 2:30
    stats: [
      { label: "Consulting at", value: "Global Brands", icon: Briefcase },
      { label: "Earning growth", value: "+150%", icon: TrendingUp, highlight: true }
    ]
  },
  {
    id: 6,
    name: "David Adebayo",
    role: "DevOps Engineer",
    category: "Career Change",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    quote: "The transition from mechanical engineering to DevOps was intense, but the hands-on project labs and one-on-one mentorship bridged the gap. Highly recommend!",
    duration: 170, // 2:50
    stats: [
      { label: "New working at", value: "TechCore Solutions", icon: Briefcase },
      { label: "Salary increase", value: "90%", icon: TrendingUp, highlight: true }
    ]
  }
];

const categories = [
  "All Stories",
  "Career Change",
  "Job Promotion",
  "New Job",
  "Freelance Success",
  "Global Opportunities"
];

const SuccessStories = () => {
  const [activeCategory, setActiveCategory] = useState("All Stories");
  const [sortBy, setSortBy] = useState("Most Recent");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loadingMore, setLoadingMore] = useState(false);

  // Audio Mock State
  const [playingId, setPlayingId] = useState(null);
  const [currentTime, setCurrentTime] = useState({});
  const [mutedStates, setMutedStates] = useState({});
  const timerRefs = useRef({});

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      Object.values(timerRefs.current).forEach(clearInterval);
    };
  }, []);

  const handlePlayPause = (id, duration) => {
    if (playingId === id) {
      // Pause
      clearInterval(timerRefs.current[id]);
      setPlayingId(null);
    } else {
      // Pause previous
      if (playingId) {
        clearInterval(timerRefs.current[playingId]);
      }
      
      setPlayingId(id);
      
      // Initialize current time for this story if not set
      if (currentTime[id] === undefined) {
        setCurrentTime(prev => ({ ...prev, [id]: 0 }));
      }

      // Start mock timer
      timerRefs.current[id] = setInterval(() => {
        setCurrentTime(prev => {
          const curr = prev[id] || 0;
          if (curr >= duration) {
            clearInterval(timerRefs.current[id]);
            setPlayingId(null);
            return { ...prev, [id]: 0 };
          }
          return { ...prev, [id]: curr + 1 };
        });
      }, 1000);
    }
  };

  const handleSeek = (id, e) => {
    const value = parseInt(e.target.value);
    setCurrentTime(prev => ({ ...prev, [id]: value }));
  };

  const toggleMute = (id) => {
    setMutedStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const filteredStories = storiesData.filter(story => {
    if (activeCategory === "All Stories") return true;
    return story.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 3);
      setLoadingMore(false);
    }, 800);
  };

  return (
    <>
      <SEOHead
        title="Success Stories | Real Impact & Career Growth | Avenue Impact"
        description="Listen to inspiring journeys from our learners who upskilled, took action, and transformed their careers with Avenue Impact."
        canonical="https://avenueimpact.com/success-stories"
      />

      <div className="w-full bg-[#FAFBFC] overflow-x-hidden font-poppins">
        {/* HERO SECTION */}
        <section className="mx-auto w-[90%] max-w-[1440px] pt-12 pb-16 md:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#CC1747] uppercase block">
              Success Stories
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#23314A] leading-[1.15]">
              Real People. <br />
              <span className="text-[#CC1747]">Real Impact.</span> <br />
              Real Success.
            </h1>
            <p className="text-[#667185] text-base sm:text-lg max-w-xl font-light leading-relaxed">
              Listen to inspiring journeys from our learners who upskilled, took action, and transformed their careers with Avenue Impact.
            </p>
          </div>

          {/* Right Hero Visual Column with Testimonial Card */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end pr-8 lg:pr-12">
            <div className="relative w-[340px] sm:w-[380px] h-[480px] sm:h-[520px]">
              {/* Layer 1: Floating Grid Dot Patterns */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[radial-gradient(#E4E7EC_3px,transparent_3px)] [background-size:16px_16px] opacity-75 z-0" />
              
              {/* Layer 2: Light Grey Slanted Pill Backdrop */}
              <div className="absolute top-8 -right-8 w-[200px] sm:w-[220px] h-[340px] sm:h-[380px] bg-[#E4E7EC] rounded-[100px] transform -rotate-[12deg] skew-x-[-4deg] z-10 opacity-90" />
              
              {/* Layer 3: Solid Red Slanted Pill Backdrop */}
              <div className="absolute top-2 -left-4 w-[210px] sm:w-[230px] h-[360px] sm:h-[400px] bg-[#CC1747] rounded-[110px] transform -rotate-[12deg] skew-x-[-4deg] z-20" />
              
              {/* Layer 4: Premium Hero Portrait in Slanted Pill Frame */}
              <div className="absolute top-0 left-4 w-[220px] sm:w-[240px] h-[380px] sm:h-[420px] rounded-[120px] overflow-hidden border-8 border-white shadow-2xl transform -rotate-[12deg] skew-x-[-4deg] z-30 bg-[#FAFBFC]">
                <img
                  src={successHeroImg}
                  alt="Avenue Impact Success Story Leader holding a tablet"
                  className="absolute w-[150%] h-[140%] -top-[15%] -left-[25%] object-cover transform rotate-[12deg] skew-x-[4deg] origin-center scale-110 hover:scale-115 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Layer 5: Floating Mary A. Testimonial Card */}
              <div className="absolute bottom-16 -right-8 bg-white p-5 rounded-2xl shadow-2xl border border-gray-100 max-w-[260px] sm:max-w-[280px] transition-all duration-300 hover:-translate-y-1 z-40">
                <div className="flex items-start gap-3">
                  {/* Quote Icon circle */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#CC1747] flex items-center justify-center text-white text-base font-bold">
                    “
                  </div>
                  <div className="space-y-2">
                    {/* Golden Stars */}
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-[#23314A] leading-relaxed font-semibold">
                      Avenue Impact didn't just teach me skills, they changed my entire future.
                    </p>
                    <span className="text-[#CC1747] text-xs font-bold block">
                      — Mary A.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS DASHBOARD BAR */}
        <section className="mx-auto w-[90%] max-w-[1440px] mb-20">
          <div className="bg-[#0B1930] rounded-2xl md:rounded-[24px] p-8 md:py-10 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-y-12 lg:gap-y-0 text-white divide-y-2 divide-x-0 lg:divide-y-0 lg:divide-x divide-[#1E2E4A]">
            {/* Stat Item 1 */}
            <div className="flex items-center gap-4 lg:justify-center pt-6 lg:pt-0">
              <div className="w-12 h-12 rounded-full bg-[#CC1747]/10 border border-[#CC1747]/30 flex items-center justify-center text-[#CC1747]">
                <Users size={22} className="stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">1,250+</h3>
                <p className="text-xs sm:text-sm text-[#98A2B3] font-light">Success Stories</p>
              </div>
            </div>

            {/* Stat Item 2 */}
            <div className="flex items-center gap-4 lg:justify-center pt-6 lg:pt-0 lg:pl-6">
              <div className="w-12 h-12 rounded-full bg-[#CC1747]/10 border border-[#CC1747]/30 flex items-center justify-center text-[#CC1747]">
                <Headphones size={22} className="stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">15,000+</h3>
                <p className="text-xs sm:text-sm text-[#98A2B3] font-light">Learners Impacted</p>
              </div>
            </div>

            {/* Stat Item 3 */}
            <div className="flex items-center gap-4 lg:justify-center pt-6 lg:pt-0 lg:pl-6">
              <div className="w-12 h-12 rounded-full bg-[#CC1747]/10 border border-[#CC1747]/30 flex items-center justify-center text-[#CC1747]">
                <Briefcase size={22} className="stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">4,800+</h3>
                <p className="text-xs sm:text-sm text-[#98A2B3] font-light">Career Transitions</p>
              </div>
            </div>

            {/* Stat Item 4 */}
            <div className="flex items-center gap-4 lg:justify-center pt-6 lg:pt-0 lg:pl-6">
              <div className="w-12 h-12 rounded-full bg-[#CC1747]/10 border border-[#CC1747]/30 flex items-center justify-center text-[#CC1747]">
                <Trophy size={22} className="stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">95%</h3>
                <p className="text-xs sm:text-sm text-[#98A2B3] font-light">Success Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* BROWSE STORIES SECTION */}
        <section className="mx-auto w-[90%] max-w-[1440px] pb-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <h2 className="text-3xl font-bold text-[#23314A]">Browse Stories</h2>
            
            {/* Sorting Dropdown Filter */}
            <div className="relative self-start md:self-auto">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center justify-between gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-[#667185] hover:bg-gray-50 transition-colors text-sm"
              >
                <span>Sort by: <strong className="text-[#23314A] font-semibold">{sortBy}</strong></span>
                <svg className="w-4 h-4 text-[#667185]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showSortDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 animate-fadeIn">
                  {["Most Recent", "Featured Stories", "Highest Salary Growth"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSortBy(opt);
                        setShowSortDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-[#667185] hover:bg-gray-50 hover:text-[#23314A] flex justify-between items-center"
                    >
                      <span>{opt}</span>
                      {sortBy === opt && <Check size={14} className="text-[#CC1747]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex gap-3 overflow-x-auto pb-4 mb-12 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setVisibleCount(3);
                  }}
                  className={`flex-shrink-0 px-6 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "border-[#CC1747] bg-[#FFEBF0] text-[#CC1747] shadow-sm shadow-[#CC1747]/10"
                      : "border-gray-200 bg-white text-[#667185] hover:border-gray-300 hover:text-[#23314A]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.slice(0, visibleCount).map((story) => {
              const isPlaying = playingId === story.id;
              const isMuted = mutedStates[story.id] || false;
              const playProgress = ((currentTime[story.id] || 0) / story.duration) * 100;

              return (
                <div
                  key={story.id}
                  className="bg-white rounded-[24px] border border-gray-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative group overflow-hidden"
                >
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
                          <h4 className="font-bold text-[#23314A] text-base leading-tight">{story.name}</h4>
                          <p className="text-xs text-[#667185]">{story.role}</p>
                        </div>
                      </div>
                      
                      {/* Play/Pause Button */}
                      <button
                        onClick={() => handlePlayPause(story.id, story.duration)}
                        className="w-10 h-10 rounded-full bg-[#CC1747] text-white flex items-center justify-center hover:bg-[#a10f36] hover:scale-105 active:scale-95 transition-all shadow-md shadow-[#CC1747]/10"
                      >
                        {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                      </button>
                    </div>

                    {/* Category Tag */}
                    <div className="mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FFEBF0] text-[#CC1747]">
                        {story.category}
                      </span>
                    </div>

                    {/* Testimonial Quote */}
                    <div className="relative mb-6 text-[#667185] text-sm leading-relaxed font-light italic">
                      <span className="text-[#CC1747] font-bold text-2xl absolute -left-2 -top-2">“</span>
                      <p className="pl-4 pr-2">{story.quote}</p>
                      <span className="text-[#CC1747] font-bold text-2xl absolute right-2 bottom-0">”</span>
                    </div>
                  </div>

                  <div>
                    {/* Custom Progress Bar / Audio Player */}
                    <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3.5 mb-6">
                      <span className="text-xs font-semibold text-[#23314A] min-w-[32px]">
                        {formatTime(currentTime[story.id] || 0)}
                      </span>
                      
                      {/* Custom Range Input with Brand Tinting */}
                      <input
                        type="range"
                        min="0"
                        max={story.duration}
                        value={currentTime[story.id] || 0}
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

                    {/* Horizontal Divider */}
                    <div className="h-[1px] w-full bg-gray-100 mb-5" />

                    {/* Career Stats Footer */}
                    <div className="grid grid-cols-2 gap-4">
                      {story.stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                          <div key={i} className="flex gap-2">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#667185]">
                              <Icon size={14} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] uppercase tracking-wider text-[#98A2B3] font-light leading-none">{stat.label}</p>
                              <p className={`text-xs font-semibold truncate ${stat.highlight ? "text-[#CC1747]" : "text-[#23314A]"}`}>
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
            })}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredStories.length && (
            <div className="flex justify-center mt-16">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="flex items-center gap-2 px-8 py-3.5 border border-gray-200 rounded-full bg-white font-medium text-[#23314A] hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Load More Stories</span>
                <RotateCw size={16} className={`${loadingMore ? "animate-spin" : ""}`} />
              </button>
            </div>
          )}
        </section>

        {/* CALL TO ACTION (CTA) BANNER */}
        <section className="mx-auto w-[90%] max-w-[1440px] pb-24">
          <div className="bg-[#0B1930] rounded-[24px] md:rounded-[32px] overflow-hidden p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
            {/* Dynamic CSS Waveform Background Overlay */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1E2E4A_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none z-0" />
            
            {/* Left Side text content */}
            <div className="lg:col-span-7 space-y-6 z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Your success story <br className="hidden sm:inline" />
                could be next.
              </h2>
              <p className="text-[#98A2B3] text-base sm:text-lg max-w-xl font-light">
                Keep learning, keep growing, and keep transforming your future with Avenue Impact.
              </p>
              
              <Link to="/courses" className="inline-block">
                <button className="flex items-center gap-3 rounded-full bg-[#CC1747] hover:bg-[#a10f36] px-8 py-4 capitalize text-white font-semibold transition-all duration-300 transform hover:scale-[1.03] active:scale-95 shadow-lg shadow-[#CC1747]/20 group">
                  <span>Explore Learning Programs</span>
                  <div className="relative h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight size={14} className="stroke-[2.5] transition-transform group-hover:translate-x-0.5" />
                  </div>
                </button>
              </Link>
            </div>

            {/* Right Side: Interactive soundwave & Microphone */}
            <div className="lg:col-span-5 flex flex-col items-center text-center relative z-10">
              {/* Pulsing Double-Ring Microphone Icon */}
              <div className="relative flex items-center justify-center mb-6">
                <div className="absolute w-28 h-28 rounded-full border border-[#CC1747]/30 animate-ping duration-[2.5s]" />
                <div className="absolute w-24 h-24 rounded-full border border-[#CC1747]/40 animate-pulse" />
                <div className="w-20 h-20 rounded-full bg-[#1E2E4A]/80 border border-[#CC1747]/60 flex items-center justify-center text-white relative shadow-inner">
                  {/* Decorative sound waves */}
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Share Your Story</h3>
              <p className="text-xs sm:text-sm text-[#98A2B3] mb-4 font-light">
                Inspire others with your journey
              </p>
              
              <Link to="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#CC1747] hover:text-[#ff3b6f] hover:underline transition-all">
                <span>Submit Your Story</span>
                <ArrowRight size={14} className="mt-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SuccessStories;
