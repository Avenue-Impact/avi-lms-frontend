import React, { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PathwaysNavbar } from "@/Components/navbar/PathwaysNavbar";
import AVIFooter from "@/Components/AVIFooter";
import { getPathwayData, DEFAULT_PATHWAYS } from "@/data/pathwaysData";
import { usePreviewCourses } from "@/hooks/students/use-fetch-all-courses";
import { useEnrolledCourses } from "@/hooks/students/use-enrolled-courses";
import {
  Star,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  Briefcase,
  TrendingUp,
  Layers,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SEOHead from "@/Components/SEOHead";
import Cookies from "js-cookie";

export const CoursePreviewPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const isAuthenticated = Boolean(token);

  // Fetch live API course details
  const { previewCourse, isLoading } = usePreviewCourses(courseId);
  const apiCourse = previewCourse?.data?.data?.course || null;

  // Resolve pathway data (dynamic from API or matched from catalog)
  const pathway = useMemo(() => {
    return getPathwayData(courseId, apiCourse);
  }, [courseId, apiCourse]);

  // Enrollment guard
  const { isEnrolled } = useEnrolledCourses();
  const alreadyEnrolled = isAuthenticated && isEnrolled(courseId);

  // State for interactive UI elements
  const [selectedAudience, setSelectedAudience] = useState(0);
  const [selectedPace, setSelectedPace] = useState(1);
  const [openModules, setOpenModules] = useState({});
  const [openFaqs, setOpenFaqs] = useState({ 0: true });

  const toggleModule = (idx) => {
    setOpenModules((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleFaq = (idx) => {
    setOpenFaqs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Target route for "Reserve your seat" / Enroll
  const rawId = apiCourse?._id || courseId || pathway.id;
  const enrollPath = !isAuthenticated
    ? `/signup?id=${rawId}&title=${encodeURIComponent(pathway.title)}&_r=${encodeURIComponent(`/preview-video-course/${rawId}/enroll?title=${encodeURIComponent(pathway.title)}`)}`
    : `/preview-video-course/${rawId}/enroll?title=${encodeURIComponent(pathway.title)}`;

  const handleEnrollClick = () => {
    if (alreadyEnrolled) {
      navigate(`/dashboard`);
    } else {
      navigate(enrollPath);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFD] font-inter text-[#101928]">
      <SEOHead
        title={`${pathway.pathwayTitle} | Avenue Impact`}
        description={pathway.headline}
      />

      <PathwaysNavbar />

      <main className="flex-1 pb-16 lg:pb-24">
        {/* Breadcrumb Bar */}
        <div className="border-b border-[#F2F4F7] bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-[#667185]">
              <Link to="/" className="hover:text-[#101928] transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link to="/courses" className="hover:text-[#101928] transition-colors">
                Pathways
              </Link>
              <span>/</span>
              <span className="font-semibold text-[#101928] truncate max-w-xs sm:max-w-md">
                {pathway.title}
              </span>
            </nav>
          </div>
        </div>

        {/* Main Content Layout with Sticky Cohort Sidebar */}
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_390px] lg:gap-14">
            
            {/* Left Column: Course Header, Stats & Deep-Dive Sections */}
            <div className="space-y-12">
              
              {/* Top Hero Heading */}
              <div>
                {/* Cohort Badge */}
                <div className="mb-3.5 inline-flex items-center gap-1.5 rounded-full bg-[#FFF1F3] px-3 py-1 text-xs font-bold text-[#E11D48]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E11D48] animate-pulse" />
                  {pathway.badge}
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight text-[#101928] sm:text-4xl lg:text-[42px] leading-tight">
                  {pathway.pathwayTitle}
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#475467] sm:text-base">
                  {pathway.headline}
                </p>

                {/* 4 Stat Cards Row */}
                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                  <div className="rounded-xl border border-[#EAECF0] bg-white p-4 shadow-2xs">
                    <p className="text-2xl font-extrabold text-[#101928] tracking-tight">
                      {pathway.stats.openRoles}
                    </p>
                    <p className="mt-1 text-xs font-medium text-[#667185]">
                      Open roles tracked
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#EAECF0] bg-white p-4 shadow-2xs">
                    <p className="text-2xl font-extrabold text-[#101928] tracking-tight">
                      {pathway.stats.medianSalary}
                    </p>
                    <p className="mt-1 text-xs font-medium text-[#667185]">
                      Median UK salary
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#EAECF0] bg-white p-4 shadow-2xs">
                    <p className="text-2xl font-extrabold text-[#101928] tracking-tight">
                      {pathway.stats.quarterDemand}
                    </p>
                    <p className="mt-1 text-xs font-medium text-[#667185]">
                      Demand this quarter
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#EAECF0] bg-white p-4 shadow-2xs">
                    <p className="text-2xl font-extrabold text-[#101928] tracking-tight">
                      {pathway.stats.coreModules}
                    </p>
                    <p className="mt-1 text-xs font-medium text-[#667185]">
                      Core modules
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 1: What you'll learn */}
              <section className="pt-2">
                <h2 className="text-xl font-bold text-[#101928] sm:text-2xl">
                  What you'll learn
                </h2>
                <p className="mt-2 text-sm text-[#475467]">
                  {pathway.modulesCount} core modules, building from the fundamentals
                  of the role through to the specific tools employers expect you to
                  already have.
                </p>

                <div className="mt-6 space-y-3">
                  {pathway.modules.map((mod, idx) => {
                    const isExpanded = openModules[idx];
                    return (
                      <div
                        key={idx}
                        className="rounded-xl border border-[#EAECF0] bg-white transition-all hover:border-[#D0D5DD] shadow-2xs"
                      >
                        <button
                          type="button"
                          onClick={() => toggleModule(idx)}
                          className="flex w-full items-start justify-between gap-4 p-4 text-left sm:p-5"
                        >
                          <div className="flex items-start gap-3.5">
                            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#F2F4F7] text-xs font-bold text-[#344054]">
                              {mod.number || idx + 1}
                            </span>
                            <div>
                              <h3 className="text-sm font-bold text-[#101928] sm:text-base">
                                {mod.title}
                              </h3>
                              <p className="mt-1 text-xs leading-relaxed text-[#667185] sm:text-sm">
                                {mod.description}
                              </p>
                            </div>
                          </div>

                          <div className="mt-1 text-[#98A2B3]">
                            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="border-t border-[#F2F4F7] bg-[#F9FAFB] px-5 py-4 text-xs leading-relaxed text-[#475467] rounded-b-xl">
                            <p className="font-semibold text-[#101928] mb-1">
                              Key Outcomes & Industry Application:
                            </p>
                            <ul className="list-disc pl-4 space-y-1">
                              <li>Hands-on practical deliverables evaluated against enterprise standards.</li>
                              <li>Scenario-based assignments prepared for technical interviews.</li>
                              <li>Direct feedback from industry practitioners and mentors.</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Section 2: Skills you'll build */}
              <section className="pt-2">
                <h2 className="text-xl font-bold text-[#101928] sm:text-2xl">
                  Skills you'll build
                </h2>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {pathway.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg border border-[#EAECF0] bg-white px-3.5 py-2 text-xs font-semibold text-[#344054] shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Section 3: Who this is for */}
              <section className="pt-2">
                <h2 className="text-xl font-bold text-[#101928] sm:text-2xl">
                  Who this is for
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {pathway.whoIsThisFor.map((audience, idx) => {
                    const isSelected = selectedAudience === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedAudience(idx)}
                        className={cn(
                          "cursor-pointer rounded-xl p-4 transition-all border text-left shadow-2xs",
                          isSelected
                            ? "border-[#CC1747] bg-[#FFF1F3]/60 shadow-xs"
                            : "border-[#EAECF0] bg-white hover:border-[#D0D5DD] hover:bg-gray-50"
                        )}
                      >
                        <h3 className={cn("text-xs font-bold", isSelected ? "text-[#CC1747]" : "text-[#101928]")}>
                          {audience.title}
                        </h3>
                        <p className="mt-1 text-[11px] leading-relaxed text-[#667185]">
                          {audience.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Section 4: Choose your pace */}
              <section className="pt-2">
                <h2 className="text-xl font-bold text-[#101928] sm:text-2xl">
                  Choose your pace
                </h2>
                <p className="mt-2 text-sm text-[#475467]">
                  Same ~100 hours of learning either way — pick the schedule that
                  actually fits your week.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {pathway.paceOptions.map((pace, idx) => {
                    const isSelected = selectedPace === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedPace(idx)}
                        className={cn(
                          "cursor-pointer rounded-2xl p-5 border transition-all text-left shadow-2xs relative",
                          isSelected
                            ? "border-[#CC1747] bg-[#FFF1F3]/40 shadow-xs"
                            : "border-[#EAECF0] bg-white hover:border-[#D0D5DD]"
                        )}
                      >
                        {/* Pace Badge */}
                        <span
                          className={cn(
                            "inline-block text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-2",
                            pace.badgeType === "highlight"
                              ? "bg-[#FFE4E8] text-[#E11D48]"
                              : "bg-[#F2F4F7] text-[#475467]"
                          )}
                        >
                          {pace.badge}
                        </span>

                        <h3 className="text-base font-bold text-[#101928]">
                          {pace.title}
                        </h3>

                        <div className="mt-4 space-y-2 text-xs">
                          <div className="flex items-center justify-between border-b border-[#F2F4F7] pb-1.5">
                            <span className="text-[#667185]">Schedule</span>
                            <span className="font-semibold text-[#101928]">{pace.schedule}</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-[#F2F4F7] pb-1.5">
                            <span className="text-[#667185]">Weekly commitment</span>
                            <span className="font-semibold text-[#101928]">{pace.weeklyCommitment}</span>
                          </div>
                          <div className="flex items-center justify-between pt-0.5">
                            <span className="text-[#667185]">Total hours</span>
                            <span className="font-semibold text-[#101928]">{pace.totalHours}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Section 5: Your mentors */}
              <section className="pt-2">
                <h2 className="text-xl font-bold text-[#101928] sm:text-2xl">
                  Your mentors
                </h2>
                <p className="mt-2 text-sm text-[#475467]">
                  Every {pathway.title} cohort is paired with mentors currently working
                  as practitioners — and practitioners, not instructors reading a script.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
                  {pathway.mentors.map((mentor) => (
                    <div
                      key={mentor.id}
                      className="flex flex-col justify-between rounded-2xl border border-[#EAECF0] bg-white p-4 shadow-2xs transition-all hover:border-[#D0D5DD] hover:shadow-md"
                    >
                      <div>
                        {/* Mentor Photo with Availability Badge */}
                        <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-gray-100">
                          <img
                            src={mentor.image}
                            alt={mentor.name}
                            className="h-full w-full object-cover object-top"
                          />
                          {mentor.isAvailable && (
                            <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold text-[#027A48] shadow-2xs backdrop-blur-xs">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#12B76A]" />
                              Available
                            </span>
                          )}
                        </div>

                        {/* Name & Credentials */}
                        <h3 className="mt-3.5 text-sm font-bold text-[#101928]">
                          {mentor.name}
                        </h3>
                        <p className="mt-1 text-[11px] font-medium text-[#475467]">
                          {mentor.services}
                        </p>
                        <p className="mt-0.5 text-[11px] text-[#667185]">
                          {mentor.roles}
                        </p>
                        <p className="mt-1 text-[10px] text-[#98A2B3]">
                          {mentor.sessionsCount}
                        </p>
                      </div>

                      {/* Book a session Button */}
                      <button
                        type="button"
                        onClick={handleEnrollClick}
                        className="mt-4 flex w-full items-center justify-center rounded-lg bg-[#CC1747] py-2 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-[#b0133d]"
                      >
                        Book a session
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 6: Success stories */}
              <section className="pt-2">
                <h2 className="text-xl font-bold text-[#101928] sm:text-2xl">
                  Success stories
                </h2>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {pathway.successStories.map((story) => (
                    <div
                      key={story.id}
                      className="flex flex-col justify-between rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-2xs"
                    >
                      <div>
                        {/* 5 Stars */}
                        <div className="flex items-center gap-0.5 text-[#E11D48]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill="currentColor" />
                          ))}
                        </div>

                        <p className="mt-3 text-xs leading-relaxed text-[#344054] italic">
                          "{story.quote}"
                        </p>
                      </div>

                      <div className="mt-4 flex items-center gap-2.5 border-t border-[#F2F4F7] pt-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-[#344054]">
                          {story.author.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#101928]">
                            {story.author}
                          </p>
                          <p className="text-[10px] text-[#667185]">
                            {story.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 7: Frequently asked questions */}
              <section className="pt-2">
                <h2 className="text-xl font-bold text-[#101928] sm:text-2xl">
                  Frequently asked questions
                </h2>

                <div className="mt-5 space-y-3">
                  {pathway.faqs.map((faq, idx) => {
                    const isOpen = openFaqs[idx];
                    return (
                      <div
                        key={idx}
                        className="rounded-xl border border-[#EAECF0] bg-white shadow-2xs"
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(idx)}
                          className="flex w-full items-center justify-between gap-4 p-4 text-left sm:p-5"
                        >
                          <span className="text-sm font-bold text-[#101928]">
                            {faq.question}
                          </span>
                          <span className="text-[#98A2B3]">
                            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="border-t border-[#F2F4F7] px-5 py-4 text-xs leading-relaxed text-[#475467]">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Right Column: Floating/Sticky Cohort Details Card */}
            <aside className="sticky top-24 self-start">
              <div className="rounded-2xl border border-[#EAECF0] bg-white p-6 shadow-sm">
                <div className="space-y-4 text-xs">
                  {/* Next cohort */}
                  <div className="flex items-center justify-between border-b border-[#F2F4F7] pb-3">
                    <span className="text-[#667185]">Next cohort</span>
                    <span className="font-bold text-[#101928]">
                      {pathway.cohortName && pathway.cohortStartDate
                        ? `${pathway.cohortName} (${pathway.cohortStartDate})`
                        : pathway.startsDate}
                    </span>
                  </div>

                  {/* Seats left */}
                  <div className="flex items-center justify-between border-b border-[#F2F4F7] pb-3">
                    <span className="text-[#667185]">Seats left</span>
                    <span className="font-bold text-[#E11D48]">
                      {pathway.seatsLeft ? `${pathway.seatsLeft} seats left` : "Unlimited"}
                    </span>
                  </div>

                  {/* Format / Schedule */}
                  <div className="flex items-center justify-between border-b border-[#F2F4F7] pb-3">
                    <span className="text-[#667185]">Format</span>
                    <span className="font-semibold text-[#101928]">
                      {pathway.type === "live"
                        ? pathway.cohortClassDays
                          ? `${pathway.cohortClassDays}${pathway.cohortTime ? ` • ${pathway.cohortTime}` : ""}`
                          : "Weekend or evening"
                        : "On-demand self-paced"}
                    </span>
                  </div>

                  {/* Level */}
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-[#667185]">Level</span>
                    <span className="font-semibold text-[#101928]">{pathway.level}</span>
                  </div>
                </div>

                {/* Primary CTA Button */}
                <button
                  type="button"
                  onClick={handleEnrollClick}
                  className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#CC1747] py-3.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#b0133d]"
                >
                  {alreadyEnrolled ? "Go to Course Workspace" : "Reserve your seat"}
                </button>

                {/* Assessment Link */}
                <div className="mt-4 text-center">
                  <Link
                    to="/career-assessment"
                    className="text-xs font-medium text-[#475467] hover:text-[#CC1747] transition-colors"
                  >
                    Not sure yet? Take the assessment
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <section className="mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-[#0B1528] px-6 py-12 text-center text-white shadow-xl sm:px-12 sm:py-16">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                Your {pathway.title} journey starts here.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300 sm:text-base">
                {pathway.seatsLeft ? `${pathway.seatsLeft} seats left in the next cohort — starts ${pathway.startsDate}.` : "Self-paced on-demand with lifetime access."}
              </p>
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={handleEnrollClick}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#E11D48] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#E11D48]/30 transition-all hover:bg-[#be123c] hover:shadow-[#E11D48]/50"
                >
                  <span>Reserve your seat</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AVIFooter />
    </div>
  );
};

export default CoursePreviewPage;
