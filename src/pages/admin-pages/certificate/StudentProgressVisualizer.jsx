import { useParams, useNavigate } from "react-router-dom";
import { useFetchStudentProgress } from "@/hooks/certificate/use-fetch-student-progress";
import { useMarkEnrollmentCompleted } from "@/hooks/certificate/use-mark-enrollment-completed";
import { Skeleton } from "@/Components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

// Duration parser helper
const parseDurationToSeconds = (durationStr) => {
  if (!durationStr) return 0;
  const clean = durationStr.replace(/\s*min/gi, "").trim();
  if (clean.includes("h") || clean.includes("m")) {
    let hrs = 0, mins = 0, secs = 0;
    const hMatch = clean.match(/(\d+)h/i);
    const mMatch = clean.match(/(\d+)m/i);
    const sMatch = clean.match(/(\d+)s/i);
    if (hMatch) hrs = parseInt(hMatch[1], 10);
    if (mMatch) mins = parseInt(mMatch[1], 10);
    if (sMatch) secs = parseInt(sMatch[1], 10);
    return hrs * 3600 + mins * 60 + secs;
  }
  
  const parts = clean.split(":").map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 1 && !isNaN(parts[0])) {
    return parts[0];
  }
  return 0;
};

// Seconds formatter helper
const formatSecondsToHoursMinutes = (totalSeconds) => {
  if (totalSeconds <= 0) return "0m";
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  if (hrs > 0) {
    return `${hrs}h ${mins}m`;
  }
  return `${mins}m`;
};

const StudentProgressVisualizer = () => {
  const { enrollmentId } = useParams();
  const navigate = useNavigate();
  
  const { data, isLoading } = useFetchStudentProgress(enrollmentId);
  const { mutate: markCompleted, isPending: isMarking } = useMarkEnrollmentCompleted();

  const handleMarkCompleted = () => {
    if (window.confirm("Are you sure you want to mark this student as completed? This will set progress to 100% and override status checks.")) {
      markCompleted(enrollmentId);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  const enrollment = data?.enrollment || {};
  const student = enrollment.student || {};
  const studentName = student.name || `${student.first_name || ""} ${student.last_name || ""}`.trim() || "Student";
  const course = enrollment.course || {};
  const courseID = course._id || course.id || "";
  const sections = data?.sections || [];

  const isCompleted = enrollment.status === "completed" || enrollment.admin_marked_completed;

  // 1. Calculate progress stats dynamically
  let totalVideos = 0;
  let completedCount = 0;
  let inProgressCount = 0;

  sections.forEach((section) => {
    const lessons = section.lessons || [];
    totalVideos += lessons.length;
    lessons.forEach((lesson) => {
      if (lesson.is_completed) {
        completedCount++;
      } else if (lesson.progress_percentage > 0) {
        inProgressCount++;
      }
    });
  });

  const isOnDemand = enrollment.access_type?.toLowerCase() === "on demand" || enrollment.access_type === "onDemand";

  // Trust the backend's master enrollment.progress rather than recalculating,
  // to avoid diverging numbers when sections have unequal lesson counts or non-video items.
  const overallProgress = Math.round(enrollment.progress || 0);

  // SVG Radial Circle configuration
  const radius = 64;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallProgress / 100) * circumference;

  // Format dates
  const formatDate = (dateString) => {
    if (!dateString) return "---";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatActivityDate = (dateString) => {
    if (!dateString) return "---";
    const date = new Date(dateString);
    const day = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${day} - ${time}`;
  };

  return (
    <div className="p-6 mx-auto space-y-6 bg-[#FCFCFD] min-h-screen">
      {/* Header & Back Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-600 hover:text-gray-900 shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Student Progress</h1>
        </div>

        <div>
          {!isCompleted && (
            <button
              onClick={handleMarkCompleted}
              disabled={isMarking}
              className="px-5 py-2.5 bg-[#CC1747] hover:bg-[#b8143f] text-white rounded-lg text-sm font-semibold transition-colors duration-200 shadow-sm"
            >
              {isMarking ? "Updating..." : "Mark Completed"}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Student Details & Radial Progress */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-150 p-6 shadow-2xs space-y-6">
          {/* User Profile summary */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 font-bold text-xl uppercase">
              {studentName.split(" ").map((n) => n[0]).join("").substring(0, 2)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{studentName}</h2>
              <p className="text-sm text-gray-500">{student.email || ""}</p>
            </div>
          </div>

          {/* Radial progress ring */}
          <div className="relative flex items-center justify-center w-48 h-48 mx-auto my-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r={radius}
                stroke="#F2F4F7"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              <circle
                cx="96"
                cy="96"
                r={radius}
                stroke="#00A854"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-lg font-extrabold text-gray-900">{overallProgress}%</span>
              <span className="text-sm text-gray-400 font-bold mt-1 uppercase tracking-wider text-center max-w-[100px]">
                {overallProgress === 100 ? "Course Completed" : "Overall Progress"}
              </span>
            </div>
          </div>

          {/* Stats boxes 2x2 grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50 shadow-3xs">
              <p className="text-2xl font-bold text-gray-900">{completedCount}/{totalVideos}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">Videos watched</p>
            </div>
            <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50 shadow-3xs">
              <p className="text-2xl font-bold text-gray-900">N/A</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">Watch time (Unavailable)</p>
            </div>
            <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50 shadow-3xs">
              <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">Fully completed</p>
            </div>
            <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50 shadow-3xs">
              <p className="text-2xl font-bold text-gray-900">{inProgressCount}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">In progress</p>
            </div>
          </div>

          {/* Detail list rows */}
          <div className="border-t border-gray-100 pt-4 space-y-3.5 text-sm text-gray-600">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Course</span>
              <span className="font-semibold text-gray-800 text-right max-w-[200px] truncate">{course.title || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Course type</span>
              <span className="font-semibold text-gray-800 capitalize">{isOnDemand ? "On-demand" : enrollment.access_type || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Enrolled on</span>
              <span className="font-semibold text-gray-800">{formatDate(enrollment.created_at)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Last activity</span>
              <span className="font-semibold text-gray-800">{formatActivityDate(enrollment.updated_at)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Certificate</span>
              <span className={`font-semibold ${isCompleted ? "text-emerald-600" : "text-amber-600"}`}>
                {isCompleted ? "Eligible" : "Not yet eligible"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Modules & Lessons */}
        <div className="lg:col-span-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Video-by-video progress</h3>
            <p className="text-sm text-gray-500 mt-0.5">Every lesson in the course, with individual watch status</p>
          </div>

          <div className="space-y-4">
            {sections.map((section, sIdx) => {
              const lessons = section.lessons || [];
              const completedLessons = lessons.filter((l) => l.is_completed).length;
              const rate = lessons.length > 0 ? Math.round((completedLessons / lessons.length) * 100) : 0;

              return (
                <div key={sIdx} className="bg-white rounded-xl border border-gray-150 shadow-3xs overflow-hidden">
                  {/* Module section header */}
                  <div className="bg-gray-50/75 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">Module {section.sectionNumber || sIdx + 1}</span>
                      <h4 className="font-bold text-gray-800 text-sm md:text-base">{section.title}</h4>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-bold text-gray-500">{completedLessons}/{lessons.length}</span>
                      <div className="w-20 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#00A854] h-full rounded-full transition-all duration-300"
                          style={{ width: `${rate}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Lessons list inside Module */}
                  <div className="divide-y divide-gray-100">
                    {lessons.length === 0 ? (
                      <p className="text-sm text-gray-400 p-6 text-center">No lessons added to this module.</p>
                    ) : (
                      lessons.map((lesson, lIdx) => {
                        const status = lesson.is_completed 
                          ? "completed" 
                          : lesson.progress_percentage > 0 
                          ? "progress" 
                          : "notstarted";

                        return (
                          <div key={lesson.id || lIdx} className="p-4 md:p-5 flex items-center justify-between gap-4 hover:bg-gray-50/20 transition-colors">
                            <div className="flex items-center gap-4">
                              {/* Left icon wrapper */}
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                                status === "completed" 
                                  ? "bg-[#E6F4EA]" 
                                  : status === "progress" 
                                  ? "bg-[#FFF4E5]" 
                                  : "bg-[#F2F4F7]"
                              }`}>
                                <div className={`w-3.5 h-3.5 rounded-full ${
                                  status === "completed" 
                                    ? "bg-[#137333]" 
                                    : status === "progress" 
                                    ? "bg-[#AD3307]" 
                                    : "bg-gray-400"
                                }`} />
                              </div>

                              <div className="space-y-1">
                                <p className="font-semibold text-gray-900 text-sm md:text-base">{lesson.title}</p>
                                
                                {status === "progress" ? (
                                  <div className="flex flex-col gap-1">
                                    <p className="text-xs font-semibold text-orange-700">
                                      {lesson.duration} - {Math.round(lesson.progress_percentage || 0)}% watched
                                    </p>
                                    <div className="w-32 bg-gray-150 h-1 rounded-full overflow-hidden">
                                      <div
                                        className="bg-[#AD3307] h-full"
                                        style={{ width: `${lesson.progress_percentage}%` }}
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  <p className="text-xs text-gray-400 font-semibold">
                                    {lesson.duration} - {status === "completed" ? `Watched ${formatDate(lesson.last_watched)}` : "Not started"}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Status badge */}
                            <div className="shrink-0">
                              {status === "completed" && (
                                <span className="inline-block px-3 py-1 bg-[#E6F4EA] text-[#137333] border border-[#C2E7C9] rounded-full text-xs font-semibold">
                                  Completed
                                </span>
                              )}
                              {status === "progress" && (
                                <span className="inline-block px-3 py-1 bg-[#FEF7E0] text-[#B06000] border border-[#FDE293] rounded-full text-xs font-semibold">
                                  In progress
                                </span>
                              )}
                              {status === "notstarted" && (
                                <span className="inline-block px-3 py-1 bg-[#F1F3F4] text-[#5F6368] border border-[#DADCE0] rounded-full text-xs font-semibold">
                                  Not started
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgressVisualizer;
