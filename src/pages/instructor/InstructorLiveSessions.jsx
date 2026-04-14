import React, { useState } from "react";
import { useFetchUpcomingLiveSessions } from "@/hooks/instructor/use-fetch-upcoming-live-sessions";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { regenerateMeetingInstructor } from "@/services/api";
import { RotateCcw } from "lucide-react";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";


const DocumentsIllustration = () => (
  <div className="relative flex h-32 w-32 items-center justify-center">
    <div className="absolute inset-0 rounded-full bg-[#EDEFF2]" />
    <svg
      width="64"
      height="72"
      viewBox="0 0 64 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="relative z-10 translate-y-[-2px]"
    >
      {/* Back Document */}
      <rect
        x="18"
        y="6"
        width="38"
        height="50"
        rx="2"
        fill="white"
        stroke="#8FA3B1"
        strokeWidth="2"
      />
      <line
        x1="26"
        y1="18"
        x2="48"
        y2="18"
        stroke="#8FA3B1"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="26"
        y1="28"
        x2="48"
        y2="28"
        stroke="#8FA3B1"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="26"
        y1="38"
        x2="38"
        y2="38"
        stroke="#8FA3B1"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Front Document */}
      <rect
        x="6"
        y="16"
        width="38"
        height="50"
        rx="2"
        fill="white"
        stroke="#8FA3B1"
        strokeWidth="2"
      />
      <path
        d="M36 16V24H44"
        stroke="#8FA3B1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="14"
        y1="32"
        x2="36"
        y2="32"
        stroke="#8FA3B1"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="14"
        y1="42"
        x2="36"
        y2="42"
        stroke="#8FA3B1"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="14"
        y1="52"
        x2="26"
        y2="52"
        stroke="#8FA3B1"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

const InstructorLiveSessions = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: sessionData, isLoading } = useFetchUpcomingLiveSessions();
  const { searchTerm = "" } = useOutletContext();
  const sessions = sessionData?.data?.sessions || [];

  const filteredSessions = sessions.filter((session) => {
    const searchLower = searchTerm.toLowerCase();
    const formattedDate = session.startDate
      ? new Date(session.startDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "";

    return (
      session.courseTitle?.toLowerCase().includes(searchLower) ||
      formattedDate.toLowerCase().includes(searchLower) ||
      session.time?.toLowerCase().includes(searchLower)
    );
  });

  // 3. Navigation Helper
  const handleJoin = (courseId, title, cohort, cohortId) => {
    const params = new URLSearchParams({
      title: title || "",
      cohort: cohort,
      cohortId: cohortId || "",
      isInstructor: "true",
    });
    navigate(`/meeting/${courseId}?${params.toString()}`);
  };

  // 4. Generate new meeting link
  const [generatingId, setGeneratingId] = useState(null);
  const handleGenerateLink = async (courseId, cohortId) => {
    setGeneratingId(cohortId);
    try {
      await regenerateMeetingInstructor({ courseId, cohortId });
      toast.success("Meeting link regenerated successfully");
      queryClient.invalidateQueries(["get-single-cohort", courseId, cohortId]);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to regenerate meeting link",
      );
    } finally {
      setGeneratingId(null);
    }
  };

  const formatDateTime = (dateStr, time) => {
    if (!dateStr) return "TBA";
    const date = new Date(dateStr);
    const datePart = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${datePart} | ${time || "TBA"}`;
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#C8102E]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1A1A2E]">Live Sessions</h1>
        <p className="mt-1 text-sm text-[#888888]">
          All upcoming live sessions for your cohorts are listed below.
        </p>
      </div>

      {sessions.length === 0 ? (
        /* Empty State */
        <div className="mt-20 flex flex-col items-center justify-center">
          <DocumentsIllustration />
          <h2 className="mt-6 text-lg font-bold text-[#1A1A2E]">
            No upcoming sessions yet
          </h2>
          <p className="mt-2 max-w-[280px] text-center text-sm text-[#888888]">
            Your scheduled live sessions will appear here once it has been
            created
          </p>
        </div>
      ) : (
        /* Sessions Table */
        <div className="overflow-hidden rounded-lg border border-[#E5E5E5] bg-white shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#F5F5F5]">
                <th className="w-[60px] px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-[#444444]">
                  S/N
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#444444]">
                  Session
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#444444]">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#444444]">
                  Cohort
                </th>
                {/* <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#444444]">
                  Status
                </th> */}
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-[#444444]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {filteredSessions.length > 0 ? (
                filteredSessions.map((session, index) => (
                  <tr
                    key={session.cohortId}
                    className="transition-colors hover:bg-[#FAFAFA]"
                  >
                    <td className="px-6 py-5 text-center text-sm text-[#1A1A2E]">
                      {(index + 1).toString().padStart(2, "0")}
                    </td>
                    <td className="max-w-[300px] px-6 py-5 text-sm font-medium text-[#1A1A2E]">
                      <div className="truncate" title={session.courseTitle}>
                        {session.courseTitle}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-[#1A1A2E]">
                      {formatDateTime(session.startDate, session.time)}
                    </td>
                    <td className="px-6 py-5 text-sm text-[#1A1A2E]">
                      {session.cohort}
                    </td>
                    {/* <td className="px-6 py-5 text-sm text-[#1A1A2E]">
                      Scheduled
                    </td> */}
                    <td className="flex items-start justify-center gap-4 px-6 py-5 text-center">
                      <button
                        onClick={() => handleGenerateLink(session.courseId, session.cohortId)}
                        disabled={generatingId === session.cohortId}
                        className="hover:text-primary-color-800 flex items-center gap-2 text-sm font-medium text-primary-color-600 transition-colors disabled:opacity-50"
                        title="Generate new meeting link"
                      >
                        <RotateCcw
                          title="Generate new link"
                          className={`h-4 w-4 ${generatingId === session.cohortId ? "animate-spin" : ""}`}
                        />
                      </button>
                      <button
                        className="h-8 w-14 rounded-full bg-[#C8102E] text-xs font-bold text-white transition-opacity hover:opacity-90 active:scale-95"
                        onClick={() =>
                          handleJoin(
                            session.courseId,
                            session.courseTitle,
                            session.cohort,
                            session.cohortId,
                          )
                        }
                      >
                        Join
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-sm text-[#888888]"
                  >
                    No sessions match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InstructorLiveSessions;
