import React, { useState } from "react";
import {
  X,
  Calendar,
  Clock,
  Video,
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
  BookOpen,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useZoomAccountSchedule } from "@/hooks/zoom-management/use-zoom-accounts";
import { toast } from "react-hot-toast";

const ZoomAccountScheduleModal = ({ accountId, onClose }) => {
  const { data, isLoading, isError, error } = useZoomAccountSchedule(accountId);
  const [copiedId, setCopiedId] = useState(null);
  const [activeTab, setActiveTab] = useState("meetings"); // "meetings" | "cohorts"

  const scheduleData = data?.data?.data;
  const account = scheduleData?.account;
  const cohorts = scheduleData?.cohorts || [];
  const meetings = scheduleData?.meetings || [];
  const conflicts = scheduleData?.conflicts || [];
  const hasConflicts = scheduleData?.has_conflicts || false;

  const handleCopyLink = (url, id) => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success("Meeting link copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Video className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {account?.name || "Zoom Account Schedule"}
              </h2>
              <p className="text-xs text-gray-500">
                Account ID: <span className="font-mono">{account?.account_id || accountId}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {hasConflicts && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 border border-red-200">
                <AlertTriangle className="h-3.5 w-3.5" />
                Schedule Conflict Detected
              </span>
            )}
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex h-64 flex-col items-center justify-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-sm font-medium text-gray-500">Fetching Zoom account schedule...</p>
            </div>
          ) : isError ? (
            <div className="flex h-64 flex-col items-center justify-center gap-3 text-center">
              <AlertCircle className="h-10 w-10 text-red-500" />
              <p className="text-base font-semibold text-gray-800">
                {error?.response?.data?.message || "Failed to load schedule"}
              </p>
              <button
                onClick={onClose}
                className="mt-2 rounded-lg bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Conflict Alert Banner */}
              {hasConflicts && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50/80 p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-red-900">
                        {conflicts.length} Overlapping Meeting Conflict(s)
                      </h4>
                      <p className="mt-1 text-xs text-red-700">
                        The following meetings assigned to this Zoom account overlap in time (start_time &lt; endTime and end_time &gt; startTime). Reassign one of the cohorts to prevent live stream disruptions.
                      </p>
                      <div className="mt-3 space-y-2">
                        {conflicts.map((c, idx) => (
                          <div
                            key={idx}
                            className="rounded-lg bg-white/80 p-2.5 text-xs text-red-900 border border-red-200/60 flex items-center justify-between"
                          >
                            <div>
                              <span className="font-semibold">{c.meeting1.session_title}</span> ({c.meeting1.course_title} - {c.meeting1.cohort_name})
                              <span className="mx-2 text-red-400 font-bold">VS</span>
                              <span className="font-semibold">{c.meeting2.session_title}</span> ({c.meeting2.course_title} - {c.meeting2.cohort_name})
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Summary Stats */}
              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">Assigned Cohorts</span>
                    <BookOpen className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="mt-2 text-2xl font-bold text-gray-900">{cohorts.length}</p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">Scheduled Meetings</span>
                    <Video className="h-4 w-4 text-indigo-600" />
                  </div>
                  <p className="mt-2 text-2xl font-bold text-gray-900">{meetings.length}</p>
                </div>

                <div className={`rounded-xl border p-4 ${hasConflicts ? "border-red-200 bg-red-50/40" : "border-emerald-100 bg-emerald-50/40"}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">Schedule Status</span>
                    {hasConflicts ? (
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    ) : (
                      <Check className="h-4 w-4 text-emerald-600" />
                    )}
                  </div>
                  <p className={`mt-2 text-base font-bold ${hasConflicts ? "text-red-600" : "text-emerald-700"}`}>
                    {hasConflicts ? "Conflict Detected" : "No Conflicts"}
                  </p>
                </div>
              </div>

              {/* Tabs */}
              <div className="mb-4 flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("meetings")}
                  className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition ${
                    activeTab === "meetings"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Video className="h-4 w-4" />
                  Upcoming Live Meetings ({meetings.length})
                </button>
                <button
                  onClick={() => setActiveTab("cohorts")}
                  className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition ${
                    activeTab === "cohorts"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  Assigned Cohorts ({cohorts.length})
                </button>
              </div>

              {/* Tab Content: Meetings */}
              {activeTab === "meetings" && (
                <div>
                  {meetings.length === 0 ? (
                    <div className="flex h-40 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-6 text-center">
                      <Video className="mb-2 h-8 w-8 text-gray-300" />
                      <p className="text-sm font-medium text-gray-600">No generated meetings for this Zoom account yet</p>
                      <p className="text-xs text-gray-400 mt-1">Meetings will be listed here once generated by instructors/admins.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {meetings.map((m) => (
                        <div
                          key={m.id}
                          className={`rounded-xl border p-4 transition ${
                            m.has_conflict
                              ? "border-red-300 bg-red-50/30 shadow-sm"
                              : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
                          }`}
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-900 text-sm">{m.session_title}</h3>
                                {m.has_conflict && (
                                  <span className="rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700">
                                    CONFLICT
                                  </span>
                                )}
                                <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                                  {m.session_status}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {m.course_title} &bull; <span className="font-medium text-gray-700">{m.cohort_name}</span>
                              </p>
                              
                              <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-600">
                                <div className="flex items-center gap-1.5">
                                  <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                  <span>{new Date(m.start_time).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Clock className="h-3.5 w-3.5 text-gray-400" />
                                  <span>
                                    {new Date(m.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    {" - "}
                                    {new Date(m.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Meeting Links */}
                            <div className="flex items-center gap-2 pt-2 sm:pt-0">
                              {m.join_url && (
                                <>
                                  <button
                                    onClick={() => handleCopyLink(m.join_url, m.id)}
                                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
                                  >
                                    {copiedId === m.id ? (
                                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                                    ) : (
                                      <Copy className="h-3.5 w-3.5 text-gray-500" />
                                    )}
                                    Copy Link
                                  </button>
                                  <a
                                    href={m.join_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition"
                                  >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                    Join
                                  </a>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab Content: Cohorts */}
              {activeTab === "cohorts" && (
                <div>
                  {cohorts.length === 0 ? (
                    <div className="flex h-40 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-6 text-center">
                      <BookOpen className="mb-2 h-8 w-8 text-gray-300" />
                      <p className="text-sm font-medium text-gray-600">No cohorts currently assigned to this Zoom account</p>
                      <p className="text-xs text-gray-400 mt-1">Assign this Zoom account to a cohort in the Cohorts management page.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {cohorts.map((c) => (
                        <div
                          key={c.id}
                          className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900 text-sm">{c.course_title}</h3>
                              <p className="text-xs text-blue-600 font-medium">{c.cohort_name}</p>
                            </div>
                            {c.course_code && (
                              <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-mono text-gray-600">
                                {c.course_code}
                              </span>
                            )}
                          </div>

                          <div className="mt-3 space-y-1.5 rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Class Days</span>
                              <span className="font-medium text-gray-800">{c.class_days}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Class Time</span>
                              <span className="font-medium text-gray-800">{c.time} ({c.timezone})</span>
                            </div>
                            {c.start_date && (
                              <div className="flex justify-between">
                                <span className="text-gray-400">Start Date</span>
                                <span className="font-medium text-gray-800">
                                  {new Date(c.start_date).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end border-t border-gray-100 bg-gray-50/50 px-6 py-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-200 bg-white px-5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZoomAccountScheduleModal;
