import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminNav from "@/Components/admindashboard/AdminNav";
import BroadcastConfirmModal from "./modals/BroadcastConfirmModal";
import BroadcastSuccessModal from "./modals/BroadcastSuccessModal";
import { useFetchAllAdminCourses } from "@/hooks/course-management/use-fetch-all-courses";
import { useGetAllCohorts } from "@/hooks/course-management/use-fetch-all-cohorts";
import { useFetchAllLiveStudents } from "@/hooks/course-management/live-session/use-fetch-all-live-student";
import { axiosAdmin } from "@/services/api";
import toast from "react-hot-toast";

const MAX_CHARS = 1024;

const NewBroadcastPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Mode: "template" or "custom"
  const [mode, setMode] = useState("custom");
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [templateVariableValues, setTemplateVariableValues] = useState({});

  // Originating route context (e.g. from LiveSessionStudentManagement)
  const initialCourseId = location.state?.courseId || "";
  const initialCohortId = location.state?.cohortId || "";
  const initialCohortName = location.state?.cohortName || "";
  const returnUrl = location.state?.returnUrl || "";

  // Selected course and cohort
  const [selectedCourseId, setSelectedCourseId] = useState(initialCourseId);
  const [selectedCohortId, setSelectedCohortId] = useState(initialCohortId);
  const [selectedCohortName, setSelectedCohortName] = useState(initialCohortName);

  // Fetch all courses in platform for course dropdown
  const { data: coursesResponse, isLoading: isLoadingCourses } = useFetchAllAdminCourses(1, 50, true);
  const courseList = useMemo(() => {
    return coursesResponse?.data?.data?.courses || coursesResponse?.data?.courses || [];
  }, [coursesResponse]);

  // Fetch cohorts for the currently selected course
  const { data: cohortsResponse, isLoading: isLoadingCohorts } = useGetAllCohorts(selectedCourseId);
  const courseCohorts = useMemo(() => {
    return cohortsResponse?.data?.data || cohortsResponse?.data || [];
  }, [cohortsResponse]);

  // Auto-select first cohort if user selected a course without picking a cohort
  useEffect(() => {
    if (selectedCourseId && !selectedCohortId && courseCohorts.length > 0) {
      const first = courseCohorts[0];
      setSelectedCohortId(first._id || first.id);
      setSelectedCohortName(first.cohort || first.name || "Cohort");
    }
  }, [selectedCourseId, selectedCohortId, courseCohorts]);

  // Update cohort name when selectedCohortId changes
  useEffect(() => {
    if (selectedCohortId && courseCohorts.length > 0) {
      const matched = courseCohorts.find((c) => (c._id || c.id) === selectedCohortId);
      if (matched) {
        setSelectedCohortName(matched.cohort || matched.name || "Selected Cohort");
      }
    }
  }, [selectedCohortId, courseCohorts]);

  // Fetch real students enrolled in selected course + cohort
  const { data: liveStudentsResponse, isLoading: isLoadingStudents } = useFetchAllLiveStudents(
    selectedCourseId,
    selectedCohortId,
    { enabled: Boolean(selectedCourseId && selectedCohortId) }
  );

  const enrolledStudents = useMemo(() => {
    if (liveStudentsResponse?.data?.data) {
      return liveStudentsResponse.data.data;
    }
    return [];
  }, [liveStudentsResponse]);

  const studentsWithWA = useMemo(() => {
    return enrolledStudents.filter(
      (u) => u.whatsapp_number && u.whatsapp_number !== "NONE" && u.whatsapp_number !== "null"
    );
  }, [enrolledStudents]);

  const studentsWithoutWA = enrolledStudents.length - studentsWithWA.length;

  const currentCohortDisplayName =
    selectedCohortName ||
    (selectedCohortId ? `Cohort ${selectedCohortId.slice(-4)}` : "Select a Cohort");

  const [message, setMessage] = useState(
    "Hi everyone, a reminder that our live session starts tomorrow at 6PM. Please join using your dashboard link."
  );
  const [saveToList, setSaveToList] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  // Fetch templates for "Select template" mode
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const res = await axiosAdmin.get("/whatsapp/templates");
        if (res.data?.data) {
          setTemplates(res.data.data);
        }
      } catch (err) {
        void err;
        try {
          const saved = JSON.parse(localStorage.getItem("avi_custom_whatsapp_templates") || "[]");
          setTemplates(saved);
        } catch {
          setTemplates([]);
        }
      }
    };
    loadTemplates();

    if (location.state?.selectedTemplate) {
      const tpl = location.state.selectedTemplate;
      setMode("template");
      setSelectedTemplateId(tpl._id || tpl.id);
    }
  }, [location.state]);

  const activeTemplate = useMemo(() => {
    return templates.find((t) => (t._id || t.id) === selectedTemplateId) || null;
  }, [templates, selectedTemplateId]);

  // Extract variables dynamically from active template message
  const activeTemplateVariables = useMemo(() => {
    if (!activeTemplate?.message) return [];
    if (activeTemplate.variables && activeTemplate.variables.length > 0) {
      return activeTemplate.variables;
    }
    const matches = activeTemplate.message.match(/\{\{?([a-zA-Z0-9_]+)\}?\}/g) || [];
    return Array.from(new Set(matches.map((m) => m.replace(/[{}]/g, ""))));
  }, [activeTemplate]);

  // Auto-populate template variables when audience (course/cohort) or template changes
  useEffect(() => {
    if (!activeTemplateVariables || activeTemplateVariables.length === 0) return;

    const courseObj = courseList.find(
      (c) => String(c._id || c.id) === String(selectedCourseId)
    );
    const cohortObj = courseCohorts.find(
      (c) => String(c._id || c.id) === String(selectedCohortId)
    );

    const courseTitle = courseObj?.title || courseObj?.name || "";
    const cohortTitle = cohortObj?.cohort || cohortObj?.name || selectedCohortName || "";

    // Determine formatted date & time from cohort details
    let sessionDate = "";
    if (cohortObj?.start_date) {
      const d = new Date(cohortObj.start_date);
      if (!isNaN(d.getTime())) {
        sessionDate = d.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      }
    }

    const sessionTime =
      cohortObj?.live_session?.time ||
      cohortObj?.time ||
      "7:00 PM UK time";

    const sessionLink =
      cohortObj?.live_session?.lecture_link ||
      "https://lms.avenueimpact.com";

    const defaultValuesMap = {
      course_name: courseTitle,
      coursename: courseTitle,
      course: courseTitle,
      event_name: courseTitle,
      cohort: cohortTitle,
      cohort_name: cohortTitle,
      cohortname: cohortTitle,
      date: sessionDate,
      time: sessionTime,
      date_time: sessionDate && sessionTime ? `${sessionDate} at ${sessionTime}` : (sessionDate || sessionTime),
      datetime: sessionDate && sessionTime ? `${sessionDate} at ${sessionTime}` : (sessionDate || sessionTime),
      link: sessionLink,
      session_link: sessionLink,
      company_name: "Avenue Impact",
      company: "Avenue Impact",
    };

    setTemplateVariableValues((prev) => {
      const updated = { ...prev };
      activeTemplateVariables.forEach((v) => {
        const normalized = v.toLowerCase().replace(/[\s-]/g, "_");
        // Auto-fill if not manually set or empty
        if (!updated[v] || updated[v].trim() === "") {
          if (defaultValuesMap[normalized] !== undefined && defaultValuesMap[normalized] !== "") {
            updated[v] = defaultValuesMap[normalized];
          }
        }
      });
      return updated;
    });
  }, [
    activeTemplateVariables,
    selectedCourseId,
    selectedCohortId,
    selectedCohortName,
    courseList,
    courseCohorts,
  ]);

  // Compute final message text when in template mode
  const resolvedTemplateMessage = useMemo(() => {
    if (!activeTemplate) return "";
    let msg = activeTemplate.message || "";
    Object.entries(templateVariableValues).forEach(([k, val]) => {
      msg = msg.replace(new RegExp(`\\{\\{?${k}\\}?\\}`, "g"), val || `{{${k}}}`);
    });
    return msg;
  }, [activeTemplate, templateVariableValues]);

  const finalMessage = mode === "template" ? resolvedTemplateMessage : message;

  const willReceiveCount = studentsWithWA.length;
  const noNumberCount = studentsWithoutWA;

  const canSend =
    Boolean(selectedCohortId) &&
    studentsWithWA.length > 0 &&
    finalMessage.trim().length > 0 &&
    !finalMessage.includes("{{");

  const handleSend = async () => {
    setSending(true);
    try {
      const recipients = studentsWithWA.map((s) => ({
        phone: s.whatsapp_number,
        name: s.first_name || s.name || "Student",
      }));

      const templateVarArray =
        activeTemplate?.category === "Marketing"
          ? [
              templateVariableValues["company_name"] || "Avenue Impact",
              templateVariableValues["event_name"] || "our next session",
              templateVariableValues["date"] || "soon",
              templateVariableValues["time"] || "7:00 PM UK time",
              templateVariableValues["session_link"] || "https://lms.avenueimpact.com",
            ]
          : undefined;

      await axiosAdmin.post("/whatsapp/broadcast", {
        message: finalMessage.trim(),
        recipients,
        phoneNumbers: recipients.map((r) => r.phone),
        cohortIds: [selectedCohortId],
        category: activeTemplate?.category || "Utility",
        templateVariables: templateVarArray,
        saveToList,
      });

      if (saveToList && mode === "custom") {
        try {
          await axiosAdmin.post("/whatsapp/templates", {
            name: `Broadcast ${new Date().toLocaleDateString()}`,
            message: finalMessage.trim(),
          });
        } catch {
          // ignore
        }
      }

      setShowConfirm(false);
      setShowSuccess(true);
    } catch (err) {
      void err;
      toast.error(err?.response?.data?.message || "Failed to send broadcast. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleBack = () => {
    if (returnUrl) {
      navigate(returnUrl);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Header Navigation Layout matching Image 31 */}
      <AdminNav>
        <ul className="flex items-center gap-6 text-sm font-medium">
          <li className="relative py-4 text-[#CC1747] cursor-pointer after:absolute after:-bottom-[1px] after:left-0 after:h-[2px] after:w-full after:bg-[#CC1747]">
            Course Management
          </li>
          <li
            onClick={() => navigate("/admin/course/management/create-course")}
            className="text-[#667185] hover:text-[#23314A] cursor-pointer py-4"
          >
            Course Creation
          </li>
        </ul>
      </AdminNav>

      <div className="py-6 px-1 max-w-[1040px]">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-[13px] text-[#344054] hover:text-[#101828] transition-colors py-1"
          >
            <span className="w-6 h-6 rounded border border-[#E4E7EC] flex items-center justify-center text-xs">
              ←
            </span>
            <span>Go back</span>
          </button>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-[26px] font-bold text-[#101828]">New broadcast</h1>
          <p className="text-[13px] text-[#667185] mt-0.5">
            Sending to: <span className="font-semibold text-[#101828]">{currentCohortDisplayName}</span>
          </p>
        </div>

        {/* 1. Audience Section */}
        <section className="mb-8 border border-[#E4E7EC] rounded-2xl p-6 shadow-xs bg-white">
          <h2 className="text-[15px] font-bold text-[#101828] mb-1">1. Audience</h2>
          <p className="text-[13px] text-[#667185] mb-5">
            Select the course and cohort whose enrolled members will receive this broadcast.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {/* Course Selector */}
            <div>
              <label className="block text-[13px] font-medium text-[#344054] mb-1.5">
                Course
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => {
                  setSelectedCourseId(e.target.value);
                  setSelectedCohortId("");
                  setSelectedCohortName("");
                }}
                disabled={Boolean(initialCourseId)}
                className="w-full border border-[#D0D5DD] rounded-xl px-4 py-2.5 text-[14px] text-[#101828] bg-white focus:outline-none focus:ring-1 focus:ring-[#CC1747] disabled:bg-[#F9FAFB] disabled:text-[#667185]"
              >
                <option value="">
                  {isLoadingCourses ? "Loading courses..." : "-- Select Course --"}
                </option>
                {courseList.map((c) => (
                  <option key={c._id || c.id} value={c._id || c.id}>
                    {c.title || c.name || "Untitled Course"}
                  </option>
                ))}
              </select>
            </div>

            {/* Cohort Selector */}
            <div>
              <label className="block text-[13px] font-medium text-[#344054] mb-1.5">
                Cohort
              </label>
              <select
                value={selectedCohortId}
                onChange={(e) => {
                  const id = e.target.value;
                  setSelectedCohortId(id);
                  const matched = courseCohorts.find((c) => (c._id || c.id) === id);
                  setSelectedCohortName(matched?.cohort || matched?.name || "");
                }}
                disabled={Boolean(initialCohortId) || !selectedCourseId || isLoadingCohorts}
                className="w-full border border-[#D0D5DD] rounded-xl px-4 py-2.5 text-[14px] text-[#101828] bg-white focus:outline-none focus:ring-1 focus:ring-[#CC1747] disabled:bg-[#F9FAFB] disabled:text-[#667185]"
              >
                <option value="">
                  {!selectedCourseId
                    ? "Select course first"
                    : isLoadingCohorts
                    ? "Loading cohorts..."
                    : courseCohorts.length === 0
                    ? "No cohorts found for this course"
                    : "-- Select Cohort --"}
                </option>
                {courseCohorts.map((coh) => (
                  <option key={coh._id || coh.id} value={coh._id || coh.id}>
                    {coh.cohort || coh.name || "Cohort"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Selected Audience Card */}
          <div className="space-y-3">
            {selectedCohortId ? (
              <div className="flex items-center justify-between border border-[#E4E7EC] bg-white rounded-xl px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded flex items-center justify-center bg-[#CC1747] text-white">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#101828]">
                      {currentCohortDisplayName}
                    </p>
                    <p className="text-[12px] text-[#667185]">
                      {isLoadingStudents ? (
                        "Loading enrolled students..."
                      ) : (
                        `${enrolledStudents.length} members · ${studentsWithWA.length} have WhatsApp (${studentsWithoutWA} missing)`
                      )}
                    </p>
                  </div>
                </div>
                <span className="text-[12px] font-medium text-[#12B76A] bg-[#ECFDF3] px-2.5 py-1 rounded-full">
                  Audience Active
                </span>
              </div>
            ) : (
              <div className="text-center py-6 px-4 bg-[#F9FAFB] border border-dashed border-[#D0D5DD] rounded-xl text-[#667185] text-[13px]">
                Please select a course and cohort above to view recipient details.
              </div>
            )}
          </div>
        </section>

        {/* 2. Message Section */}
        <section className="mb-8 border border-[#E4E7EC] rounded-2xl p-6 shadow-xs bg-white">
          <h2 className="text-[15px] font-bold text-[#101828] mb-1">2. Message</h2>
          <p className="text-[13px] text-[#667185] mb-5">
            Use an approved template or write a new message.
          </p>

          {/* Toggle pill buttons */}
          <div className="inline-flex rounded-lg border border-[#E4E7EC] p-1 bg-[#F9FAFB] mb-5">
            <button
              type="button"
              onClick={() => setMode("template")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                mode === "template"
                  ? "bg-white text-[#101828] shadow-xs"
                  : "text-[#667185] hover:text-[#101828]"
              }`}
            >
              Select template
            </button>
            <button
              type="button"
              onClick={() => setMode("custom")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                mode === "custom"
                  ? "bg-white text-[#101828] shadow-xs"
                  : "text-[#667185] hover:text-[#101828]"
              }`}
            >
              Write new message
            </button>
          </div>

          {mode === "template" ? (
            <div className="mb-5">
              <label className="block text-[13px] font-medium text-[#344054] mb-1.5">
                Choose template
              </label>
              <select
                value={selectedTemplateId}
                onChange={(e) => {
                  const id = e.target.value;
                  setSelectedTemplateId(id);
                  setTemplateVariableValues({});
                }}
                className="w-full border border-[#D0D5DD] rounded-xl px-4 py-3 text-[14px] text-[#101828] bg-white focus:outline-none focus:ring-1 focus:ring-[#CC1747]"
              >
                <option value="">-- Choose an admin message template --</option>
                {templates.map((tpl) => (
                  <option key={tpl._id || tpl.id} value={tpl._id || tpl.id}>
                    {tpl.name} ({tpl.category})
                  </option>
                ))}
              </select>

              {activeTemplate && activeTemplateVariables.length > 0 && (
                <div className="mt-4 bg-[#F9FAFB] border border-[#E4E7EC] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[12px] font-semibold text-[#101828]">
                      Dynamic Template Variables:
                    </p>
                    <span className="text-[11px] text-[#667185]">
                      All variables must be filled to send
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeTemplateVariables.map((v) => (
                      <div key={v}>
                        <label className="block text-[11px] font-medium text-[#667185] mb-1 capitalize">
                          {v.replace(/_/g, " ")}:
                        </label>
                        <input
                          type="text"
                          placeholder={`Enter value for {{${v}}}`}
                          value={templateVariableValues[v] || ""}
                          onChange={(e) =>
                            setTemplateVariableValues((prev) => ({
                              ...prev,
                              [v]: e.target.value,
                            }))
                          }
                          className="w-full border border-[#D0D5DD] rounded-lg px-3 py-2 text-[13px] bg-white focus:outline-none focus:border-[#CC1747]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-[13px] font-medium text-[#344054] mb-1.5">
                Message
              </label>
              <div className="border border-[#D0D5DD] rounded-xl overflow-hidden focus-within:border-[#CC1747] transition-all mb-2">
                <textarea
                  rows={4}
                  maxLength={MAX_CHARS}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi everyone, a reminder that our live session starts tomorrow at 6PM. Please join using your dashboard link."
                  className="w-full p-3.5 text-[14px] text-[#101828] placeholder-[#98A2B3] focus:outline-none resize-none leading-relaxed"
                />
              </div>
              <p className="text-[11px] text-[#667185] mb-5">
                {message.length} / {MAX_CHARS} characters
              </p>
            </div>
          )}

          {/* Attachment (optional) */}
          {/* <div className="mb-5">
            <label className="block text-[13px] font-medium text-[#344054] mb-1.5">
              Attachment (optional)
            </label>
            <div className="flex items-center justify-between border border-[#D0D5DD] rounded-xl px-4 py-3 bg-white">
              <span className="text-[13px] text-[#667185] flex items-center gap-2">
                📎 {attachment ? attachment.name : "Attach a document (PDF, DOCX)"}
              </span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg border border-[#D0D5DD] text-[#344054] hover:bg-[#F9FAFB] transition-colors"
              >
                Browse
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc"
                className="hidden"
                onChange={(e) => setAttachment(e.target.files?.[0] || null)}
              />
            </div> 
          </div> */}

          {/* Save to message list checkbox */}
          <div className="border border-[#E4E7EC] rounded-xl px-4 py-3 mb-5 flex items-center gap-3">
            <div
              onClick={() => setSaveToList(!saveToList)}
              className={`w-4 h-4 rounded flex items-center justify-center cursor-pointer transition-colors ${
                saveToList ? "bg-[#CC1747] text-white" : "border border-[#D0D5DD] bg-white"
              }`}
            >
              {saveToList && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#101828]">
                Save to message list
              </p>
              <p className="text-[11px] text-[#667185]">
                Make this reusable for future broadcasts
              </p>
            </div>
          </div>


        </section>

        {/* Preview Section */}
        <section className="mb-8 border border-[#E4E7EC] rounded-2xl p-6 shadow-xs bg-white">
          <h2 className="text-[15px] font-bold text-[#101828] mb-1">Preview</h2>
          <p className="text-[13px] text-[#667185] mb-5">
            How members will see it
          </p>

          <div className="bg-[#EFEAE2] p-6 rounded-2xl border border-[#E4E7EC]">
            <div className="bg-white rounded-xl p-4 shadow-xs text-[13px] text-[#111B21] leading-relaxed max-w-full">
              <p className="whitespace-pre-wrap">{finalMessage}</p>
              <div className="flex justify-end mt-2 text-[10px] text-[#667781]">
                <span>6:00 PM</span>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom summary bar */}
        <div className="border border-[#E4E7EC] rounded-2xl bg-white shadow-xs mb-6 divide-y divide-[#E4E7EC] text-[13px]">
          <div className="flex items-center justify-between px-6 py-3.5">
            <span className="text-[#667185]">Audience</span>
            <span className="font-semibold text-[#101828]">{currentCohortDisplayName}</span>
          </div>
          <div className="flex items-center justify-between px-6 py-3.5">
            <span className="text-[#667185]">Will receive</span>
            <span className="font-semibold text-[#101828]">{willReceiveCount} members</span>
          </div>
          <div className="flex items-center justify-between px-6 py-3.5">
            <span className="text-[#667185]">No WhatsApp number</span>
            <span className="font-semibold text-[#CC1747]">
              {noNumberCount} members · <span onClick={handleBack} className="underline cursor-pointer">Manage</span>
            </span>
          </div>
        </div>

        {/* Review & send button */}
        <button
          disabled={!canSend || sending}
          onClick={() => setShowConfirm(true)}
          className={`w-full py-3.5 rounded-xl font-semibold text-[14px] text-white transition-all ${
            canSend && !sending
              ? "bg-[#CC1747] hover:bg-[#b0133d] shadow-sm"
              : "bg-[#D0D5DD] cursor-not-allowed"
          }`}
        >
          {sending ? "Sending..." : "Review & send"}
        </button>

        {/* Confirmation Modal */}
        {showConfirm && (
          <BroadcastConfirmModal
            message={finalMessage}
            audience={currentCohortDisplayName}
            recipients={willReceiveCount}
            sending={sending}
            onSend={handleSend}
            onClose={() => setShowConfirm(false)}
          />
        )}

        {/* Success Modal */}
        {showSuccess && (
          <BroadcastSuccessModal
            cohortName={currentCohortDisplayName}
            recipients={willReceiveCount}
            onDone={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default NewBroadcastPage;
