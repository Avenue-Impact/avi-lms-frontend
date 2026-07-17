import React, { useState } from "react";
import { useFetchCertificateRequests } from "@/hooks/certificate/use-fetch-certificate-requests";
import { useProcessCertificateRequest } from "@/hooks/certificate/use-process-certificate-request";
import { Link } from "react-router-dom";
import { Skeleton } from "@/Components/ui/skeleton";
import { AlertCircle, Check, X, Search, FileText, ChevronLeft, ChevronRight, Eye } from "lucide-react";

const CertificateRequests = () => {
  const [statusFilter, setStatusFilter] = useState("pending");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Prompt dialog states
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const { data, isLoading } = useFetchCertificateRequests({
    status: statusFilter === "all" ? "" : statusFilter,
    page: currentPage,
    perPage: 10,
  });

  const { mutate: processRequest, isPending: isProcessing } = useProcessCertificateRequest();

  const handleApprove = (id) => {
    if (window.confirm("Are you sure you want to approve this certificate request?")) {
      processRequest({ id, action: "approve" });
    }
  };

  const handleOpenRejectModal = (id) => {
    setSelectedRequestId(id);
    setRejectionReason("");
    setIsRejectModalOpen(true);
  };

  const handleRejectSubmit = (e) => {
    e.preventDefault();
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }
    processRequest({
      id: selectedRequestId,
      action: "reject",
      rejectionReason: rejectionReason.trim(),
    });
    setIsRejectModalOpen(false);
  };

  const requests = data?.requests || [];
  const pagination = data?.pagination || { total: 0, page: 1, perPage: 10, lastPage: 1 };

  // Local filter for search queries
  const filteredRequests = requests.filter((req) => {
    const studentName = req.student_id?.name || `${req.student_id?.firstname} ${req.student_id?.lastname}`.trim() || "";
    const studentEmail = req.student_id?.email || "";
    const courseTitle = req.course_id?.title || "";
    const query = searchQuery.toLowerCase();
    return (
      studentName.toLowerCase().includes(query) ||
      studentEmail.toLowerCase().includes(query) ||
      courseTitle.toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-6 mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Certificate Download Requests</h1>
          <p className="text-sm text-gray-500 mt-1">Review student certificate requests, audit course completions, and approve downloads.</p>
        </div>
      </div>

      {/* Controls: Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        {/* Status Pills */}
        <div className="flex flex-wrap gap-2">
          {["pending", "approved", "rejected", "downloaded", "all"].map((status) => (
            <button
              key={status}
              onClick={() => {
                setStatusFilter(status);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                statusFilter === status
                  ? "bg-[#CC1747] text-white shadow-sm"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-150"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search students or courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 outline-none text-sm focus:border-[#CC1747] transition-all"
          />
        </div>
      </div>

      {/* Requests Grid / Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <FileText className="w-12 h-12 text-gray-300 mb-2" />
            <h3 className="text-base font-semibold text-gray-800">No requests found</h3>
            <p className="text-xs text-gray-400 mt-1">There are no matching certificate download requests in this queue.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4">Access Type</th>
                  <th className="px-6 py-4">Cohort / Duration</th>
                  <th className="px-6 py-4">Enrollment Date</th>
                  <th className="px-6 py-4">Date Requested</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {filteredRequests.map((req) => {
                  const student = req.student_id || {};
                  const course = req.course_id || {};
                  const enrollment = req.enrollment_id || {};
                  const isLive = enrollment.access_type === "live class";

                  // Extract cohort/duration
                  const cohortText = isLive 
                    ? enrollment.live_class_cohort || "Live Session"
                    : enrollment.subscription_limit || (enrollment.access_duration_months ? `${enrollment.access_duration_months} Months` : "On-Demand");

                  const enrollmentDate = enrollment.created_at 
                    ? new Date(enrollment.created_at).toLocaleDateString()
                    : "N/A";

                  return (
                    <tr key={req._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{student.name || "N/A"}</p>
                          <p className="text-xs text-gray-500">{student.email || "N/A"}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-[200px] truncate">
                        <p className="font-medium text-gray-800">{course.title || "N/A"}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                          isLive ? "text-blue-700 bg-blue-50" : "text-purple-700 bg-purple-50"
                        }`}>
                          {isLive ? "Live" : "On-Demand"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-600">
                        {cohortText}
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">
                        {enrollmentDate}
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">
                        {new Date(req.requested_date).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                          req.status === "pending"
                            ? "text-amber-700 bg-amber-50"
                            : req.status === "approved"
                            ? "text-emerald-700 bg-emerald-50"
                            : req.status === "rejected"
                            ? "text-rose-700 bg-rose-50"
                            : "text-gray-700 bg-gray-50"
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* View Progress Button - ONLY for On-Demand */}
                          {!isLive && enrollment._id && (
                            <Link
                              to={`/admin/certificate/requests/progress/${enrollment._id}`}
                              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 hover:text-blue-600 transition-colors flex items-center gap-1 text-xs font-medium text-gray-600"
                              title="View video logs progress"
                            >
                              <Eye className="w-4 h-4" /> View Progress
                            </Link>
                          )}
                          
                          {req.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleApprove(req._id)}
                                disabled={isProcessing}
                                className="p-1.5 bg-emerald-55 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg border border-emerald-100 transition-colors"
                                title="Approve Request"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleOpenRejectModal(req._id)}
                                disabled={isProcessing}
                                className="p-1.5 bg-rose-55 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg border border-rose-100 transition-colors"
                                title="Reject Request"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination footer */}
        {!isLoading && pagination.lastPage > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
            <span className="text-xs text-gray-500">
              Showing page {pagination.page} of {pagination.lastPage}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(pagination.lastPage, p + 1))}
                disabled={currentPage === pagination.lastPage}
                className="p-1.5 rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-xl border border-gray-100 p-6 shadow-xl space-y-4 animate-in slide-in-from-bottom-4">
            <div className="flex items-center gap-2 text-rose-600">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold">Reject Certificate Request</h3>
            </div>
            <form onSubmit={handleRejectSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                  Rejection Reason
                </label>
                <textarea
                  required
                  placeholder="Provide details about why the student cannot download the certificate..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-200 outline-none text-sm focus:border-rose-500 min-h-[100px] resize-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsRejectModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 border border-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-rose-600 hover:bg-rose-700"
                >
                  Confirm Reject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateRequests;
