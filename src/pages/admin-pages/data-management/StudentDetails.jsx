import { useState } from "react";
import BorderCard from "@/Components/BorderCard";
import Table from "@/Components/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { CommonButton } from "@/Components/ui/button";
import { useFetchStudentEnrollmentStats } from "@/hooks/data-management/use-fetch-student-enrollment-stats";
import { useDeleteStudent } from "@/hooks/data-management/use-delete-student";
import { ClipLoader } from "react-spinners";
import { 
  Compass, 
  Award, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Sparkles,
  Layers,
  HelpCircle
} from "lucide-react";

function formatDateString(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date)) return "Invalid Date";

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${month} ${day}, ${year} ${hours}:${minutes}${amPm}`;
}

const StudentDetails = ({ studentId, onBack }) => {
  const [activeTab, setActiveTab] = useState("enrollments");
  const [showAnswers, setShowAnswers] = useState(false);
  const { data, isLoading, error } = useFetchStudentEnrollmentStats(studentId);
  const { mutate: deleteStudent, isPending: isDeleting } = useDeleteStudent();

  if (isLoading) return <div className="flex h-40 items-center justify-center"><ClipLoader color="#667185" /></div>;
  if (error) return <p className="text-red-500 text-center mt-10">Error loading student details</p>;

  const student = data?.data?.data?.student_details;
  const enrollments = data?.data?.data?.enrollments || [];
  const assessment = student?.career_assessment;
  const hasAssessment = Boolean(assessment && assessment.completed);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this student? This action cannot be undone.")) {
      deleteStudent(studentId, {
        onSuccess: () => {
          onBack();
        }
      });
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-medium text-[#667185] hover:text-[#101928] transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back to All Students
          </button>
        </div>
        <CommonButton
          className="flex items-center gap-2 bg-gray-500"
          onClick={onBack}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </CommonButton>
      </div>

      <BorderCard className="mt-8 grid grid-cols-1 lg:grid-cols-[1.2fr_3fr] gap-8 rounded-xl border-2 border-[#F0F2F5] px-6 py-8">
        {/* Left column: Student Profile Info */}
        <div className="border-b lg:border-b-0 lg:border-r border-[#F0F2F5] pb-6 lg:pb-0 lg:pr-6">
          <Avatar className="h-[110px] w-[110px] rounded-full border-2 border-[#EAECF0]">
            <AvatarImage src={student?.avatar} alt="Student Avatar" />
            <AvatarFallback className="text-[40px] bg-primary-color-50 text-primary-color-700 font-semibold">
              {(student?.first_name || student?.firstname)?.charAt(0)?.toUpperCase()}
              {(student?.last_name || student?.lastname)?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <h3 className="my-2 text-xl font-bold capitalize text-[#101928]">
            {student?.first_name || student?.firstname} {student?.last_name || student?.lastname}
          </h3>
          
          <div className="space-y-1.5 text-sm text-[#667185]">
            <p className="font-mono text-xs text-[#344054] bg-[#F2F4F7] px-2 py-1 rounded w-fit">{student?.email}</p>
            <p>Joined: <span className="text-[#344054] font-medium">{formatDateString(student?.createdAt || student?.created_at)}</span></p>
            {hasAssessment && (
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF3] px-3 py-1 text-xs font-semibold text-[#027A48]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Assessment Completed
                </span>
              </div>
            )}
          </div>

          <CommonButton
            className="flex items-center gap-2 mt-8 text-sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? <ClipLoader size={18} color="#fff" /> : <><FontAwesomeIcon icon={faTrash} /> Delete Student</>}
          </CommonButton>
        </div>

        {/* Right column: Tabs & Content */}
        <div>
          {/* Navigation Tabs */}
          <div className="flex border-b border-[#EAECF0] gap-4 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab("enrollments")}
              className={`pb-3 text-sm font-semibold transition-all relative ${
                activeTab === "enrollments"
                  ? "text-[#CC1747] border-b-2 border-[#CC1747]"
                  : "text-[#667185] hover:text-[#344054]"
              }`}
            >
              Course Enrollments ({enrollments.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("assessment")}
              className={`pb-3 text-sm font-semibold transition-all flex items-center gap-1.5 relative ${
                activeTab === "assessment"
                  ? "text-[#CC1747] border-b-2 border-[#CC1747]"
                  : "text-[#667185] hover:text-[#344054]"
              }`}
            >
              <Compass className="w-4 h-4" />
              Career Assessment & Matches
              {hasAssessment && (
                <span className="ml-1 w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              )}
            </button>
          </div>

          {/* TAB 1: Course Enrollments */}
          {activeTab === "enrollments" && (
            <div>
              {enrollments.length > 0 ? (
                <Table cols={"0.5fr 2fr 1.3fr 1fr 1.2fr"}>
                  <Table.Header className={"*:text-sm *:font-medium *:capitalize"}>
                    <h4>S/N</h4>
                    <h4>Course Title</h4>
                    <h4>Course Type</h4>
                    <h4>Date Enrolled</h4>
                    <h4>Course Duration</h4>
                  </Table.Header>
                  <div className="divide-y">
                    {enrollments.map((details, i) => (
                      <Table.Row key={i} className={"*:px-1 *:text-sm"}>
                        <p className="text-[#344054]">{i + 1}</p>
                        <p className="text-[#344054] font-medium">{details.course?.title || "N/A"}</p>
                        <p>
                          <span className="w-min text-nowrap rounded-[12px] bg-[#FFECE5] px-3 py-[2px] text-xs font-medium capitalize text-[#AD3307]">
                            {details.course_type}
                          </span>
                        </p>
                        <p className="text-[#344054]">{formatDateString(details.created_at)}</p>
                        <p className="text-[#344054]">{details.course_duration || "N/A"}</p>
                      </Table.Row>
                    ))}
                  </div>
                </Table>
              ) : (
                <div className="flex h-full items-center justify-center p-10 bg-gray-50 rounded-xl min-h-[200px]">
                  <p className="text-gray-500 font-medium italic text-center">This student has no enrollments yet.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Career Assessment & Matches (For Career Coaches) */}
          {activeTab === "assessment" && (
            <div>
              {!hasAssessment ? (
                <div className="flex flex-col items-center justify-center p-12 bg-[#F9FAFB] rounded-xl border border-dashed border-[#EAECF0] text-center">
                  <div className="w-12 h-12 rounded-full bg-[#F2F4F7] flex items-center justify-center mb-3">
                    <Compass className="w-6 h-6 text-[#667185]" />
                  </div>
                  <h4 className="text-base font-semibold text-[#344054]">No Career Assessment Completed Yet</h4>
                  <p className="text-sm text-[#667185] max-w-md mt-1">
                    This student hasn&apos;t taken the career pathway assessment or results haven&apos;t been submitted yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Top Match Spotlight */}
                  <div className="rounded-xl border border-[#D0F2E5] bg-gradient-to-br from-[#F0FDF4] to-[#F7FEF9] p-5 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2F5ED] pb-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-xs font-bold text-[#15803D]">
                          <Award className="w-3.5 h-3.5" /> Top Match Recommendation
                        </span>
                        {assessment.is_tied && (
                          <span className="rounded-full bg-[#FEF0C7] px-2.5 py-0.5 text-xs font-semibold text-[#B54708]">
                            Tied Score
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#667185]">
                        Completed: {formatDateString(assessment.completed_at)}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xl font-bold text-[#0F172A]">
                          {assessment.top_match?.pathway_title || assessment.pathway_title}
                        </h4>
                        <p className="mt-1 text-sm text-[#475467] leading-relaxed max-w-2xl">
                          {assessment.top_match?.summary || assessment.summary}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-center sm:text-right">
                        <div className="inline-flex flex-col items-center justify-center bg-white border border-[#86EFAC] rounded-xl px-4 py-2 shadow-sm">
                          <span className="text-2xl font-black text-[#15803D]">
                            {assessment.top_match?.match_score || assessment.match_score}%
                          </span>
                          <span className="text-[11px] font-medium text-[#64748B]">Fit Score</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Runner Up if available */}
                  {assessment.runner_up && (
                    <div className="rounded-xl border border-[#EAECF0] bg-white p-4 shadow-sm">
                      <div className="flex items-center justify-between gap-2 border-b border-[#F2F4F7] pb-2 mb-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#F2F4F7] px-2.5 py-0.5 text-xs font-semibold text-[#475467]">
                          Runner-Up Pathway
                        </span>
                        <span className="text-sm font-bold text-[#475467]">
                          {assessment.runner_up.match_score}% Match
                        </span>
                      </div>
                      <h5 className="text-base font-semibold text-[#1E293B]">
                        {assessment.runner_up.pathway_title}
                      </h5>
                      {assessment.runner_up.summary && (
                        <p className="mt-1 text-xs text-[#64748B] leading-relaxed">
                          {assessment.runner_up.summary}
                        </p>
                      )}
                    </div>
                  )}

                  {/* All Ranked Matches Breakdown */}
                  {Array.isArray(assessment.matches) && assessment.matches.length > 0 && (
                    <div className="rounded-xl border border-[#EAECF0] bg-white p-5 shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <Layers className="w-4 h-4 text-[#CC1747]" />
                        <h5 className="text-sm font-bold uppercase tracking-wider text-[#344054]">
                          Ranked Matches Breakdown ({assessment.matches.length} Pathways)
                        </h5>
                      </div>

                      <div className="divide-y divide-[#F2F4F7]">
                        {assessment.matches.map((item, idx) => (
                          <div key={item.pathway_key || idx} className="py-3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                idx === 0 
                                  ? "bg-[#DCFCE7] text-[#15803D]" 
                                  : idx === 1 
                                  ? "bg-[#FEF0C7] text-[#B54708]" 
                                  : "bg-[#F2F4F7] text-[#667185]"
                              }`}>
                                #{item.rank || idx + 1}
                              </span>
                              <div>
                                <p className="text-sm font-semibold text-[#101928]">
                                  {item.pathway_title}
                                </p>
                                {item.summary && (
                                  <p className="text-xs text-[#667185] line-clamp-1 max-w-xl">
                                    {item.summary}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A]">
                                {item.match_score}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommended Courses for Coach Review */}
                  {Array.isArray(assessment.recommended_courses) && assessment.recommended_courses.length > 0 && (
                    <div className="rounded-xl border border-[#EAECF0] bg-white p-5 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <BookOpen className="w-4 h-4 text-[#CC1747]" />
                        <h5 className="text-sm font-bold uppercase tracking-wider text-[#344054]">
                          Recommended Pathway Courses ({assessment.recommended_courses.length})
                        </h5>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {assessment.recommended_courses.map((course, idx) => (
                          <div key={course._id || course.id || idx} className="p-3 rounded-lg border border-[#EAECF0] bg-[#F9FAFB]">
                            {course.cover_image && (
                              <img 
                                src={course.cover_image} 
                                alt={course.title} 
                                className="w-full h-24 object-cover rounded-md mb-2"
                              />
                            )}
                            <p className="text-xs font-semibold text-[#101928] line-clamp-2">
                              {course.title}
                            </p>
                            {course.slug && (
                              <p className="text-[10px] text-[#667185] font-mono mt-1 truncate">
                                /{course.slug}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Questionnaire Responses (Answers given by student) */}
                  {assessment.answers && Object.keys(assessment.answers).length > 0 && (
                    <div className="rounded-xl border border-[#EAECF0] bg-white shadow-sm overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setShowAnswers(!showAnswers)}
                        className="w-full flex items-center justify-between p-4 bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors text-left"
                      >
                        <div className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-[#667185]" />
                          <span className="text-sm font-bold text-[#344054]">
                            Student Questionnaire Responses ({Object.keys(assessment.answers).length} questions answered)
                          </span>
                        </div>
                        {showAnswers ? (
                          <ChevronUp className="w-4 h-4 text-[#667185]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#667185]" />
                        )}
                      </button>

                      {showAnswers && (
                        <div className="p-4 divide-y divide-[#F2F4F7]">
                          {Object.entries(assessment.answers).map(([key, value], idx) => (
                            <div key={key} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 text-xs">
                              <span className="font-semibold text-[#475467] capitalize">
                                Question {key.replace(/[^0-9]/g, "") || idx + 1} ({key}):
                              </span>
                              <span className="font-mono bg-[#F2F4F7] text-[#1E293B] px-2.5 py-1 rounded w-fit sm:text-right">
                                {typeof value === "object" ? JSON.stringify(value) : String(value)}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </BorderCard>
    </div>
  );
};

export default StudentDetails;
