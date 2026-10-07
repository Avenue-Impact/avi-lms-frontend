import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PathwaysNavbar } from "@/Components/navbar/PathwaysNavbar";
import AVIFooter from "@/Components/AVIFooter";
import { DEFAULT_PATHWAYS, normalizeApiCourse } from "@/data/pathwaysData";
import { useFetchAllCourses } from "@/hooks/students/use-fetch-all-courses";
import { Search, Bookmark, ArrowRight, ChevronDown, Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import SEOHead from "@/Components/SEOHead";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

export const CoursesPage = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const isAuthenticated = Boolean(token);

  // Filters and search state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeType, setActiveType] = useState("all"); // "all" | "live" | "on-demand"
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("soonest"); // "soonest" | "title" | "modules"
  const [savedCourses, setSavedCourses] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("avi_saved_pathways") || "[]");
    } catch {
      return [];
    }
  });

  // Fetch from API
  const { data: apiData, isLoading } = useFetchAllCourses({
    courseType: activeType === "all" ? "" : activeType === "live" ? "live" : "on-demand",
    page: 1,
    perPage: 12,
  });

  // Merge API courses with default pathways
  const allPathways = useMemo(() => {
    const rawCourses = Array.isArray(apiData?.data?.data?.courses)
      ? apiData.data.data.courses
      : Array.isArray(apiData?.data?.courses)
      ? apiData.data.courses
      : Array.isArray(apiData?.data?.data)
      ? apiData.data.data
      : [];

    if (!Array.isArray(rawCourses) || rawCourses.length === 0) {
      return DEFAULT_PATHWAYS;
    }

    const normalizedApi = rawCourses.map(normalizeApiCourse).filter(Boolean);

    // Filter out defaults that already exist in API to prevent duplicates
    const remainingDefaults = DEFAULT_PATHWAYS.filter(
      (dp) =>
        !normalizedApi.some(
          (ap) =>
            ap.slug === dp.slug ||
            ap.title.toLowerCase() === dp.title.toLowerCase()
        )
    );

    return [...normalizedApi, ...remainingDefaults];
  }, [apiData]);

  // Unique categories for the dropdown
  const categories = useMemo(() => {
    const set = new Set();
    allPathways.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["all", ...Array.from(set)];
  }, [allPathways]);

  // Filter & sort
  const filteredPathways = useMemo(() => {
    return allPathways
      .filter((item) => {
        // Type filter
        if (activeType === "live" && item.type !== "live") return false;
        if (activeType === "on-demand" && item.type !== "on-demand") return false;

        // Category filter
        if (selectedCategory !== "all" && item.category !== selectedCategory) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(query);
          const matchDesc = item.description?.toLowerCase().includes(query);
          const matchSkills = item.skills?.some((s) => s.toLowerCase().includes(query));
          if (!matchTitle && !matchDesc && !matchSkills) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === "modules") {
          return (b.modulesCount || 0) - (a.modulesCount || 0);
        }
        // default "soonest": live cohorts first
        if (a.type === "live" && b.type !== "live") return -1;
        if (a.type !== "live" && b.type === "live") return 1;
        return 0;
      });
  }, [allPathways, activeType, selectedCategory, searchQuery, sortBy]);

  // Bookmark toggle
  const toggleBookmark = (id, title) => {
    setSavedCourses((prev) => {
      let next;
      if (prev.includes(id)) {
        next = prev.filter((item) => item !== id);
        toast(`Removed "${title}" from saved pathways`);
      } else {
        next = [...prev, id];
        toast.success(`Saved "${title}" to your wishlist`);
      }
      try {
        localStorage.setItem("avi_saved_pathways", JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const handleActionClick = (pathway) => {
    const courseTarget = pathway.rawApiCourse?._id || pathway.slug || pathway.id;
    if (pathway.type === "live") {
      navigate(`/courses/${courseTarget}`);
    } else {
      navigate(`/courses/${courseTarget}`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFD] font-inter text-[#101928]">
      <SEOHead
        title="Pathways & Start Dates | Avenue Impact"
        description="Find your pathway, see when you can start. Hands-on learning leading to real roles, mentoring, and interview preparation."
      />

      <PathwaysNavbar />

      <main className="flex-1">
        {/* Top Hero Section */}
        <section className="border-b border-[#EAECF0] bg-white py-10 lg:py-14">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
              {/* Left Column: Heading & Subtitle */}
              <div>
                <div className="mb-3.5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#E11D48] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E11D48]">
                    Pathways & Start Dates
                  </span>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-[#101928] sm:text-4xl lg:text-5xl">
                  Find your pathway, see when you can start.
                </h1>
                <p className="mt-4 max-w-2xl text-base text-[#475467] sm:text-lg">
                  Every pathway below leads to real roles, mentoring and interview
                  preparation — not just a certificate.
                </p>
              </div>

              {/* Right Column: Assessment Callout Card */}
              <div className="rounded-2xl border border-[#EAECF0] bg-[#F9FAFB] p-6 shadow-xs transition-all hover:border-[#D0D5DD]">
                <h3 className="text-base font-bold text-[#101928]">
                  Not sure which pathway?
                </h3>
                <p className="mt-2 text-sm text-[#475467] leading-relaxed">
                  Take the 5-minute career assessment and we'll recommend one based
                  on how you actually like to work.
                </p>
                <Link
                  to="/career-assessment"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#CC1747] px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#b0133d]"
                >
                  <span>Take assessment</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Search & Filter Controls */}
            <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Search Input */}
              <div className="relative w-full lg:max-w-md">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                  size={18}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search pathways — e.g. Business Analysis"
                  className="w-full rounded-xl border border-[#D0D5DD] bg-white py-2.5 pl-10 pr-4 text-sm text-[#101928] placeholder-[#98A2B3] shadow-2xs transition-all focus:border-[#CC1747] focus:outline-none focus:ring-2 focus:ring-[#CC1747]/15"
                />
              </div>

              {/* Filter Tabs & Category Dropdown */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {/* All pathways */}
                <button
                  type="button"
                  onClick={() => setActiveType("all")}
                  className={cn(
                    "rounded-lg px-3.5 py-2 text-xs font-semibold transition-all",
                    activeType === "all"
                      ? "bg-[#101928] text-white shadow-xs"
                      : "border border-[#D0D5DD] bg-white text-[#344054] hover:bg-gray-50"
                  )}
                >
                  All pathways
                </button>

                {/* Live cohorts */}
                <button
                  type="button"
                  onClick={() => setActiveType("live")}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all",
                    activeType === "live"
                      ? "bg-[#101928] text-white shadow-xs"
                      : "border border-[#D0D5DD] bg-white text-[#344054] hover:bg-gray-50"
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E11D48]" />
                  <span>Live cohorts</span>
                </button>

                {/* On-demand */}
                <button
                  type="button"
                  onClick={() => setActiveType("on-demand")}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all",
                    activeType === "on-demand"
                      ? "bg-[#101928] text-white shadow-xs"
                      : "border border-[#D0D5DD] bg-white text-[#344054] hover:bg-gray-50"
                  )}
                >
                  <Clock size={12} className={activeType === "on-demand" ? "text-white" : "text-[#667185]"} />
                  <span>On-demand</span>
                </button>

                {/* Category Dropdown */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none rounded-lg border border-[#D0D5DD] bg-white py-2 pl-3.5 pr-8 text-xs font-semibold text-[#344054] shadow-2xs hover:bg-gray-50 focus:border-[#CC1747] focus:outline-none"
                  >
                    <option value="all">All categories</option>
                    {categories
                      .filter((c) => c !== "all")
                      .map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#667185]"
                    size={14}
                  />
                </div>
              </div>
            </div>

            {/* Results Meta & Sorting Row */}
            <div className="mt-8 flex flex-col justify-between gap-3 border-t border-[#F2F4F7] pt-4 text-xs text-[#667185] sm:flex-row sm:items-center">
              <div>
                <span className="font-bold text-[#101928]">{filteredPathways.length}</span>{" "}
                pathways — showing next available start date for each
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[#98A2B3]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-semibold text-[#344054] focus:outline-none cursor-pointer"
                >
                  <option value="soonest">Sorted by soonest start date</option>
                  <option value="title">Alphabetical (A - Z)</option>
                  <option value="modules">Most Modules</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Pathways Grid Section */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-[86rem] px-4 sm:px-6 lg:px-8">
            {isLoading && allPathways.length === 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((idx) => (
                  <div
                    key={idx}
                    className="h-80 animate-pulse rounded-2xl border border-[#EAECF0] bg-white p-6 shadow-2xs"
                  />
                ))}
              </div>
            ) : filteredPathways.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#D0D5DD] bg-white p-12 text-center">
                <p className="text-base font-semibold text-[#101928]">No pathways found</p>
                <p className="mt-1 text-xs text-[#667185]">
                  Try adjusting your search criteria or removing filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveType("all");
                    setSelectedCategory("all");
                  }}
                  className="mt-4 rounded-lg bg-[#CC1747] px-4 py-2 text-xs font-semibold text-white"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPathways.map((pathway) => {
                  const isSaved = savedCourses.includes(pathway.id);
                  const pathwayTitleStr = pathway.title || pathway.pathwayTitle || "";
                  const courseRoute = `/courses/${pathway.slug || pathway.id}?title=${encodeURIComponent(pathwayTitleStr)}`;

                  return (
                    <div
                      key={pathway.id}
                      className="group flex flex-col justify-between rounded-2xl border border-[#EAECF0] bg-white p-6 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D0D5DD] hover:shadow-md"
                    >
                      <div>
                        {/* Card Header: Badge + Bookmark */}
                        <div className="flex items-center justify-between">
                          {pathway.type === "live" ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF1F3] px-2.5 py-1 text-[11px] font-bold text-[#E11D48]">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#E11D48]" />
                              LIVE COHORT
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F0F9FF] px-2.5 py-1 text-[11px] font-bold text-[#026AA2]">
                              <Clock size={11} className="text-[#026AA2]" />
                              ON-DEMAND
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() => toggleBookmark(pathway.id, pathway.title)}
                            className={cn(
                              "rounded-lg p-1.5 transition-colors",
                              isSaved
                                ? "text-[#E11D48] hover:bg-rose-50"
                                : "text-[#98A2B3] hover:bg-gray-50 hover:text-[#344054]"
                            )}
                            aria-label="Save pathway"
                          >
                            <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
                          </button>
                        </div>

                        {/* Title & Description */}
                        <h2 className="mt-4 text-lg font-bold text-[#101928] group-hover:text-[#CC1747] transition-colors">
                          <Link to={courseRoute} state={{ title: pathwayTitleStr }}>
                            {pathway.title}
                          </Link>
                        </h2>
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#667185]">
                          {pathway.description}
                        </p>

                        {/* Tag Pills */}
                        <div className="mt-5 flex flex-wrap items-center gap-1.5">
                          <span className="rounded-md border border-[#F2F4F7] bg-[#F9FAFB] px-2.5 py-1 text-[11px] font-medium text-[#475467]">
                            {pathway.modulesCount} modules
                          </span>
                          <span className="rounded-md border border-[#F2F4F7] bg-[#F9FAFB] px-2.5 py-1 text-[11px] font-medium text-[#475467]">
                            {pathway.duration}
                          </span>
                          <span className="rounded-md border border-[#F2F4F7] bg-[#F9FAFB] px-2.5 py-1 text-[11px] font-medium text-[#475467]">
                            {pathway.level}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Footer Section: Schedule & Action Buttons */}
                      <div className="mt-6 border-t border-[#F2F4F7] pt-4">
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[#98A2B3]">Starts </span>
                            <span className="font-bold text-[#101928]">
                              {pathway.startsDate.replace(/^Starts\s+/i, "")}
                            </span>
                          </div>
                          <div>
                            {pathway.type === "live" ? (
                              <span className="font-bold text-[#E11D48]">
                                {pathway.seatsLeft ? `${pathway.seatsLeft} seats left` : "Filling fast"}
                              </span>
                            ) : (
                              <span className="font-medium text-[#98A2B3]">Unlimited</span>
                            )}
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-4 grid grid-cols-2 gap-2.5">
                          <button
                            type="button"
                            onClick={() => handleActionClick(pathway)}
                            className="flex items-center justify-center rounded-lg bg-[#0F172A] py-2.5 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-[#1E293B]"
                          >
                            {pathway.type === "live" ? "Reserve your seat" : "Start now"}
                          </button>
                          <Link
                            to={courseRoute}
                            state={{ title: pathwayTitleStr }}
                            className="flex items-center justify-center rounded-lg border border-[#D0D5DD] bg-white py-2.5 text-xs font-semibold text-[#344054] shadow-2xs transition-colors hover:bg-gray-50 hover:text-[#101928]"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="pb-16 lg:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-[#0B1528] px-6 py-12 text-center text-white shadow-xl sm:px-12 sm:py-16">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                Still weighing your options?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300 sm:text-base">
                Take the career assessment — it takes 5 minutes and gives you a
                specific recommendation, not just a list.
              </p>
              <div className="mt-6 flex justify-center">
                <Link
                  to="/career-assessment"
                  className="rounded-xl bg-[#E11D48] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#E11D48]/30 transition-all hover:bg-[#be123c] hover:shadow-[#E11D48]/50"
                >
                  Take Career Assessment
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AVIFooter />
    </div>
  );
};

export default CoursesPage;
