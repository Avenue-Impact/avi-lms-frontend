import { useParams, useSearchParams, Link } from "react-router-dom";
import { CheckIcon, PlayIcon, Clock, Video, Grid2X2, Award } from "lucide-react";
import { useCourseProgress } from "@/hooks/students/use-course-progress";

// ---- Helpers: map API payload -> view model (layout stays identical) ----
const formatWatchTime = (seconds) => {
  const total = Number(seconds) || 0;
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m`;
  return `${total}s`;
};

const formatDate = (iso) => {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

// lesson.duration is file size in MB (per backend), not playback time
const formatSize = (mb) => {
  const n = Number(mb);
  if (Number.isNaN(n)) return null;
  return `${n} MB`;
};

const deriveLessonStatus = (lesson) => {
  if (lesson.is_completed) return "completed";
  if ((Number(lesson.progress_percentage) || 0) > 0) return "in-progress";
  return "not-started";
};

const lessonMeta = (lesson, status) => {
  if (status === "completed") {
    const d = formatDate(lesson.last_watched);
    return d ? `Completed ${d}` : "Completed";
  }
  if (status === "in-progress") {
    return `${Math.round(Number(lesson.progress_percentage) || 0)}% watched`;
  }
  return "Not started";
};

const mapProgressData = (payload, fallbackTitle) => {
  if (!payload) return null;
  const enrollment = payload.enrollment ?? {};
  const certificate = payload.certificate ?? {};
  const sections = Array.isArray(payload.sections) ? payload.sections : [];

  const allLessons = sections.flatMap((s) => (Array.isArray(s.lessons) ? s.lessons : []));
  const videosCompleted = allLessons.filter((l) => l.is_completed).length;
  const totalVideos = allLessons.length;
  const modulesCompleted = sections.filter((s) => Number(s.completionRate) === 100).length;

  const lastWatchedIso = allLessons
    .map((l) => l.last_watched)
    .filter(Boolean)
    .sort()
    .pop();

  const modules = sections.map((section) => {
    const lessons = Array.isArray(section.lessons) ? section.lessons : [];
    return {
      id: section.sectionNumber,
      title: section.title,
      completed: lessons.filter((l) => l.is_completed).length,
      total: lessons.length,
      lessons: lessons.map((lesson, idx) => {
        const status = deriveLessonStatus(lesson);
        return {
          code: `${section.sectionNumber}.${idx + 1}`,
          title: lesson.title,
          duration: formatSize(lesson.duration),
          meta: lessonMeta(lesson, status),
          status,
        };
      }),
    };
  });

  return {
    course: {
      title: enrollment.course?.title ?? fallbackTitle,
      type: enrollment.access_type === "on demand" ? "On-Demand Course" : "Live Class",
      videosCompleted,
      totalVideos,
      totalWatchTime: formatWatchTime(enrollment.totalWatchTimeSeconds),
      modulesCompleted,
      totalModules: sections.length,
      certificateProgress: Math.round(Number(certificate.progress) || 0),
      overallProgress: Math.round(Number(enrollment.progress) || 0),
      lastWatched: formatDate(lastWatchedIso),
    },
    modules,
  };
};

const CourseProgress = () => {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const courseTitle = searchParams.get("title") ?? "Course Title";

  const { data, isLoading, error } = useCourseProgress(courseId);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1000px] py-20 text-center text-[14px] text-desc">
        Loading course progress...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[1000px] py-20 text-center text-[14px] text-desc">
        {error?.response?.data?.message ?? "Unable to load course progress. Please try again."}
      </div>
    );
  }

  const viewModel = mapProgressData(data?.data?.data, courseTitle);

  if (!viewModel) {
    return (
      <div className="mx-auto max-w-[1000px] py-20 text-center text-[14px] text-desc">
        No progress data available for this course yet.
      </div>
    );
  }

  const { course, modules } = viewModel;

  return (
    <div className="mx-auto">

      {/* Hero Banner */}
      <section
        className="mb-6 flex flex-col items-start justify-between gap-6 rounded-2xl px-6 py-7 md:flex-row md:items-center md:px-8"
        style={{
          background: "radial-gradient(120% 140% at 85% 20%, #3a2540 0%, #2a1a2f 45%, #241528 100%)",
        }}
      >
        <div className="flex-1">
          <span className="mb-3 inline-block rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/90">
            {course.type}
          </span>
          <h1 className="mb-2 text-[26px] font-bold leading-tight text-white">{course.title}</h1>
          <p className="text-[13px] text-white/60">
            {course.videosCompleted} of {course.totalVideos} videos completed
            {course.lastWatched ? ` · Last watched ${course.lastWatched}` : ""}
          </p>
        </div>

        {/* Progress Ring */}
        <div className="relative shrink-0" style={{ width: "96px", height: "96px" }}>
          <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F53366" />
                <stop offset="100%" stopColor="#CC1747" />
              </linearGradient>
            </defs>
            <circle cx="48" cy="48" r="42" fill="none" stroke="rgba(255,255,255,.13)" strokeWidth="8" />
            <circle
              cx="48"
              cy="48"
              r="42"
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="263.9"
              strokeDashoffset={263.9 - (263.9 * course.overallProgress) / 100}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[20px] font-bold leading-none text-white">{course.overallProgress}%</span>
            <span className="mt-1 text-[9px] text-white/50">Course complete</span>
          </div>
        </div>

        <button className="shrink-0 rounded-lg bg-white px-5 py-3 text-[13px] font-semibold text-heading transition hover:bg-white/90">
          Continue Learning
        </button>
      </section>

      {/* Stat Cards */}
      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Video className="h-[18px] w-[18px]" />}
          iconBg="bg-green-50"
          iconColor="text-green-600"
          value={`${course.videosCompleted}/${course.totalVideos}`}
          label="Videos completed"
        />
        <StatCard
          icon={<Clock className="h-[18px] w-[18px]" />}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          value={course.totalWatchTime}
          label="Total watch time"
        />
        <StatCard
          icon={<Grid2X2 className="h-[18px] w-[18px]" />}
          iconBg="bg-indigo-50"
          iconColor="text-indigo-600"
          value={`${course.modulesCompleted} of ${course.totalModules}`}
          label="Modules completed"
        />
        <StatCard
          icon={<Award className="h-[18px] w-[18px]" />}
          iconBg="bg-primary-color-100"
          iconColor="text-primary-color-600"
          value={`${course.certificateProgress}%`}
          label="To your certificate"
        />
      </section>

      {/* Course Content */}
      <section>
        <div className="mb-4 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-[18px] font-semibold">Course Content</h2>
            <p className="text-[13px] text-desc">Track your progress lesson by lesson</p>
          </div>
          <div className="flex items-center gap-4 text-[12px] text-desc">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>Completed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-400"></span>In progress
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-gray-300"></span>Not started
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {modules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </section>
    </div>
  );
};

// ========== Sub-components ==========

const StatCard = ({ icon, iconBg, iconColor, value, label }) => (
  <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
    <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
      {icon}
    </div>
    <div className="mb-1 text-[22px] font-bold leading-none">{value}</div>
    <div className="text-[12px] text-desc">{label}</div>
  </div>
);

const ModuleCard = ({ module }) => {
  const progress = module.total > 0 ? Math.round((module.completed / module.total) * 100) : 0;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-50 px-5 py-3.5">
        <div className="text-[14px]">
          <span className="font-normal text-desc">Module {module.id}</span>
          <span className="ml-2 font-semibold">{module.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-desc">
            {module.completed}/{module.total}
          </span>
          <span className="inline-block h-1.5 w-16 overflow-hidden rounded-full bg-gray-100">
            <span className="block h-full bg-green-500" style={{ width: `${progress}%` }}></span>
          </span>
        </div>
      </div>
      <div className="divide-y divide-gray-50">
        {module.lessons.map((lesson, idx) => (
          <LessonRow key={idx} lesson={lesson} />
        ))}
      </div>
    </div>
  );
};

const LessonRow = ({ lesson }) => {
  const statusIcon = {
    completed: (
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-green-500">
        <CheckIcon className="h-3 w-3 stroke-[3] text-white" />
      </span>
    ),
    "in-progress": <span className="h-5 w-5 shrink-0 rounded-md border border-amber-300 bg-amber-100"></span>,
    "not-started": <span className="h-5 w-5 shrink-0 rounded-md border border-gray-200 bg-gray-100"></span>,
  };

  const actionButton = {
    completed: <span className="text-[12px] font-medium text-green-600">Completed</span>,
    "in-progress": (
      <button className="flex items-center gap-1.5 rounded-md bg-primary-color-600 px-3.5 py-1.5 text-[12px] font-medium text-white transition hover:bg-primary-color-500">
        <PlayIcon className="h-2.5 w-2.5 fill-white" />
        Resume
      </button>
    ),
    "not-started": (
      <button className="rounded-md border border-lms-border px-4 py-1.5 text-[12px] font-medium text-heading transition hover:border-gray-400">
        Watch
      </button>
    ),
  };

  return (
    <div
      className={`flex items-center gap-3 border-l-2 px-5 py-3 ${
        lesson.status === "in-progress" ? "border-amber-400 bg-amber-50/40" : "border-transparent"
      }`}
    >
      {statusIcon[lesson.status]}
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-medium">
          {lesson.code} — {lesson.title}
        </div>
        <div className="mt-0.5 text-[11px] text-desc">
          {lesson.duration ? `${lesson.duration} · ` : ""}{lesson.meta}
        </div>
      </div>
      {actionButton[lesson.status]}
    </div>
  );
};

export default CourseProgress;
