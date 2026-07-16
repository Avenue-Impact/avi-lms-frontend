import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetchStudentProgress } from "@/hooks/certificate/use-fetch-student-progress";
import { useMarkEnrollmentCompleted } from "@/hooks/certificate/use-mark-enrollment-completed";
import { Skeleton } from "@/Components/ui/skeleton";
import { ChevronDown, ChevronUp, CheckCircle2, Circle, Clock, FileVideo, User, ArrowLeft } from "lucide-react";

const StudentProgressVisualizer = () => {
  const { enrollmentId } = useParams();
  const [openSections, setOpenSections] = useState({});

  const { data, isLoading } = useFetchStudentProgress(enrollmentId);
  const { mutate: markCompleted, isPending: isMarking } = useMarkEnrollmentCompleted();

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleMarkCompleted = () => {
    if (window.confirm("Are you sure you want to mark this student as completed? This will set progress to 100% and override status checks.")) {
      markCompleted(enrollmentId);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  const enrollment = data?.enrollment || {};
  const student = enrollment.student || {};
  const course = enrollment.course || {};
  const sections = data?.sections || [];

  const isCompleted = enrollment.status === "completed" || enrollment.admin_marked_completed;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Back navigation */}
      <Link
        to="/admin/certificate"
        className="inline-flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Certificate Panel
      </Link>

      {/* Student Hero Info Card */}
      <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-[#1a2340] text-white p-6 md:p-8 shadow-lg">
        {/* Decorative background element */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
              {student.avatar ? (
                <img src={student.avatar} alt={student.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-8 h-8 text-white/60" />
              )}
            </div>
            <div>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-2xs font-semibold uppercase tracking-wider ${
                enrollment.access_type === "live class" ? "bg-blue-500/20 text-blue-300" : "bg-purple-500/20 text-purple-300"
              }`}>
                {enrollment.access_type === "live class" ? "Live Cohort" : "Self-Paced (On-Demand)"}
              </span>
              <h2 className="text-xl md:text-2xl font-bold mt-1">{student.name || "Student"}</h2>
              <p className="text-sm text-gray-300">{student.email || ""}</p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <div className="text-xs text-gray-300">Overall Progress</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#CC1747]">
                {Math.round(enrollment.progress || 0)}%
              </span>
            </div>
            <div className="w-36 bg-white/20 h-1.5 rounded-full overflow-hidden mt-1">
              <div 
                className="bg-[#CC1747] h-full rounded-full transition-all duration-500" 
                style={{ width: `${enrollment.progress || 0}%` }}
              />
            </div>
          </div>
        </div>

        <hr className="my-6 border-white/10 relative z-10" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <p className="text-xs text-gray-400">Course Enrolled</p>
            <p className="text-base font-semibold text-white">{course.title || "N/A"}</p>
          </div>

          <div>
            {isCompleted ? (
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-lg text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Completed
              </span>
            ) : (
              <button
                onClick={handleMarkCompleted}
                disabled={isMarking}
                className="px-5 py-2.5 bg-[#CC1747] hover:bg-[#b8143f] text-white rounded-lg text-sm font-semibold transition-colors duration-200"
              >
                {isMarking ? "Updating..." : "Mark Completed"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sections progress visual lists */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900">Course Syllabus & Progress Checklist</h3>
        <p className="text-sm text-gray-500 -mt-2">Review completed and outstanding lessons per course section.</p>
        
        <div className="space-y-3">
          {sections.map((section, index) => {
            const isOpen = !!openSections[index];
            return (
              <div 
                key={index} 
                className="bg-white rounded-xl border border-gray-150 shadow-sm overflow-hidden transition-all duration-200"
              >
                {/* Section Header Accordion Trigger */}
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 font-bold text-gray-700 text-sm">
                      S{section.sectionNumber}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-base">{section.title}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{section.lessons?.length || 0} recording sessions</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right shrink-0">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        section.completionRate === 100 
                          ? "bg-emerald-50 text-emerald-700" 
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {section.completionRate}% Done
                      </span>
                    </div>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </div>
                </button>

                {/* Section Details Accordion Body */}
                {isOpen && (
                  <div className="border-t border-gray-100 bg-gray-50/30 p-5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    {section.overview && (
                      <p className="text-xs text-gray-500 italic pb-2">{section.overview}</p>
                    )}
                    
                    {section.lessons?.length === 0 ? (
                      <p className="text-xs text-gray-400 text-center py-2">No videos added in this section.</p>
                    ) : (
                      <div className="space-y-2">
                        {section.lessons.map((lesson) => (
                          <div 
                            key={lesson.id} 
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-white rounded-lg border border-gray-100 gap-3 shadow-2xs"
                          >
                            <div className="flex items-center gap-3">
                              <span className="shrink-0">
                                {lesson.is_completed ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                ) : (
                                  <Circle className="w-5 h-5 text-gray-300 shrink-0" />
                                )}
                              </span>
                              <div className="flex items-center gap-2">
                                <FileVideo className="w-4 h-4 text-gray-400 shrink-0" />
                                <span className="text-sm font-semibold text-gray-800">{lesson.title}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500 sm:justify-end pl-8 sm:pl-0">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" /> {lesson.duration}
                              </span>
                              <span>
                                Progress: <span className={lesson.is_completed ? "text-emerald-600 font-bold" : "text-amber-600"}>
                                  {Math.round(lesson.progress_percentage || 0)}%
                                </span>
                              </span>
                              {lesson.last_watched && (
                                <span className="text-2xs text-gray-400 font-normal">
                                  Last watched: {new Date(lesson.last_watched).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentProgressVisualizer;
