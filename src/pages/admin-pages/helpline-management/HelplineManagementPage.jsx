import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Headphones,
  AlertCircle,
  CheckCircle2,
  Clock,
  Trash2,
  Eye,
  X,
  Mail,
  RefreshCw,
  Filter,
  Check,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  ShieldAlert,
} from "lucide-react";
import {
  fetchHelplineTickets,
  updateHelplineTicketStatus,
  deleteHelplineTicket,
} from "@/services/api";
import toast from "react-hot-toast";

export default function HelplineManagementPage() {
  const [tickets, setTickets] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Selected ticket for Detail Modal
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Delete confirmation modal
  const [ticketToDelete, setTicketToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadTickets = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetchHelplineTickets({
        page,
        limit: 12,
        status: statusFilter,
        search,
      });
      const data = res?.data?.data;
      setTickets(data?.tickets || []);
      setTotal(data?.total || 0);
      setTotalPages(data?.totalPages || 1);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load helpline tickets");
    } finally {
      setIsLoading(false);
    }
  }, [page, statusFilter, search]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const handleStatusChange = async (ticketId, newStatus) => {
    setIsUpdatingStatus(true);
    try {
      await updateHelplineTicketStatus(ticketId, {
        status: newStatus,
        adminNotes: adminNotes.trim() ? adminNotes.trim() : undefined,
      });
      toast.success(`Ticket marked as ${newStatus}`);

      // Update in local state
      setTickets((prev) =>
        prev.map((t) => (t._id === ticketId ? { ...t, status: newStatus, adminNotes } : t))
      );
      if (selectedTicket && selectedTicket._id === ticketId) {
        setSelectedTicket((prev) => ({ ...prev, status: newStatus, adminNotes }));
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update ticket status");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedTicket) return;
    setIsUpdatingStatus(true);
    try {
      await updateHelplineTicketStatus(selectedTicket._id, {
        adminNotes: adminNotes.trim(),
      });
      toast.success("Admin notes saved");
      setTickets((prev) =>
        prev.map((t) => (t._id === selectedTicket._id ? { ...t, adminNotes: adminNotes.trim() } : t))
      );
      setSelectedTicket((prev) => ({ ...prev, adminNotes: adminNotes.trim() }));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save admin notes");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDeleteTicket = async () => {
    if (!ticketToDelete) return;
    setIsDeleting(true);
    try {
      await deleteHelplineTicket(ticketToDelete._id);
      toast.success("Helpline ticket deleted");
      setTicketToDelete(null);
      if (selectedTicket?._id === ticketToDelete._id) {
        setSelectedTicket(null);
      }
      loadTickets();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete ticket");
    } finally {
      setIsDeleting(false);
    }
  };

  const openDetailModal = (ticket) => {
    setSelectedTicket(ticket);
    setAdminNotes(ticket.adminNotes || "");
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "open":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-200">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            Open
          </span>
        );
      case "in-progress":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
            <Clock className="h-3 w-3" />
            In Progress
          </span>
        );
      case "resolved":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <CheckCircle2 className="h-3 w-3" />
            Resolved
          </span>
        );
      case "closed":
        return (
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            Closed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">
            {status}
          </span>
        );
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return (
          <span className="rounded-md bg-primary-color-600 px-2 py-0.5 text-[11px] font-semibold text-white">
            High
          </span>
        );
      case "medium":
        return (
          <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-800">
            Medium
          </span>
        );
      case "low":
        return (
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
            Low
          </span>
        );
      default:
        return <span className="text-xs text-gray-500">{priority || "Normal"}</span>;
    }
  };

  const openTicketsCount = tickets.filter((t) => t.status === "open").length;

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-color-600 text-white shadow-md">
              <Headphones className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-bold text-[#0B1930]">Helpline Management</h1>
                {openTicketsCount > 0 && (
                  <span className="rounded-full bg-[#CC1747] px-2.5 py-0.5 text-xs font-semibold text-white shadow-xs">
                    {openTicketsCount} Open
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Track, respond to, and resolve student Help Desk Hotline problem inquiries.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={loadTickets}
          disabled={isLoading}
          className="inline-flex items-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-medium text-gray-700 shadow-xs hover:bg-gray-50 active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 border-b border-gray-100 pb-3 lg:border-b-0 lg:pb-0">
            {[
              { id: "all", label: "All Tickets" },
              { id: "open", label: "Open" },
              { id: "in-progress", label: "In Progress" },
              { id: "resolved", label: "Resolved" },
              { id: "closed", label: "Closed" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setStatusFilter(tab.id);
                  setPage(1);
                }}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
                  statusFilter === tab.id
                    ? "bg-primary-color-600 text-white shadow-xs font-semibold"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search title, description, or student..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2 pl-9 pr-3 text-xs text-gray-900 placeholder-gray-400 focus:border-[#CC1747] focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-gray-200 bg-gray-50/75 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              <tr>
                <th className="py-3.5 pl-6 pr-3">Date</th>
                <th className="px-3 py-3.5">Student</th>
                <th className="px-3 py-3.5">Message Title</th>
                <th className="px-3 py-3.5">Category</th>
                <th className="px-3 py-3.5">Priority</th>
                <th className="px-3 py-3.5">Status</th>
                <th className="py-3.5 pl-3 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-gray-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="h-6 w-6 animate-spin text-[#CC1747]" />
                      <span>Loading helpline tickets...</span>
                    </div>
                  </td>
                </tr>
              ) : tickets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-xs text-gray-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Headphones className="h-8 w-8 text-gray-300" />
                      <p className="font-semibold text-gray-600">No Helpline Tickets Found</p>
                      <p className="text-[11px] text-gray-400">
                        {search ? "Try adjusting your search criteria" : "New student hotline inquiries will appear here"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                tickets.map((ticket) => {
                  const dateFormatted = new Date(ticket.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <tr
                      key={ticket._id}
                      className="hover:bg-gray-50/80 transition-colors cursor-pointer"
                      onClick={() => openDetailModal(ticket)}
                    >
                      <td className="whitespace-nowrap py-4 pl-6 pr-3 text-[11px] text-gray-500">
                        {dateFormatted}
                      </td>

                      <td className="whitespace-nowrap px-3 py-4">
                        <div className="font-semibold text-gray-900">{ticket.userName || "Student"}</div>
                        <div className="text-[11px] text-gray-400">{ticket.userEmail || "No email"}</div>
                      </td>

                      <td className="px-3 py-4 max-w-xs">
                        <div className="font-semibold text-[#0B1930] truncate">{ticket.title}</div>
                        <div className="text-[11px] text-gray-500 truncate line-clamp-1">{ticket.description}</div>
                      </td>

                      <td className="whitespace-nowrap px-3 py-4">
                        <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                          {ticket.category || "General"}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-3 py-4">
                        {getPriorityBadge(ticket.priority)}
                      </td>

                      <td className="whitespace-nowrap px-3 py-4">
                        {getStatusBadge(ticket.status)}
                      </td>

                      <td
                        className="whitespace-nowrap py-4 pl-3 pr-6 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => openDetailModal(ticket)}
                            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                            title="View Full Details"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setTicketToDelete(ticket)}
                            className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                            title="Delete Ticket"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {!isLoading && tickets.length > 0 && (
          <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-6 py-4 sm:flex-row text-xs text-gray-600">
            <div>
              Showing <span className="font-semibold text-gray-900">{tickets.length}</span> of{" "}
              <span className="font-semibold text-gray-900">{total}</span> tickets
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 hover:bg-gray-50 disabled:opacity-40"
              >
                <ChevronLeft size={14} />
                <span>Previous</span>
              </button>
              <span className="px-2 text-xs font-semibold text-gray-800">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 hover:bg-gray-50 disabled:opacity-40"
              >
                <span>Next</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* TICKET DETAIL & RESOLUTION MODAL */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 bg-[#0B1930] px-6 py-4 text-white rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-color-600 text-white shadow-xs">
                  <Headphones size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Help Desk Hotline Ticket</h3>
                  <p className="text-[11px] text-gray-300">
                    ID: {selectedTicket._id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Student Metadata Card */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 rounded-xl border border-gray-200 bg-gray-50/70 p-3.5 text-xs">
                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Student
                  </span>
                  <span className="font-semibold text-gray-900">{selectedTicket.userName || "Student"}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Username
                  </span>
                  <span className="font-medium text-gray-700">{selectedTicket.username || selectedTicket.userId?.user_name || "N/A"}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Phone
                  </span>
                  <span className="font-medium text-gray-700">{selectedTicket.userPhone || selectedTicket.userId?.phone || "N/A"}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Email
                  </span>
                  <a
                    href={`mailto:${selectedTicket.userEmail}?subject=Re: ${encodeURIComponent(selectedTicket.title)}`}
                    className="inline-flex items-center gap-1 font-medium text-[#CC1747] hover:underline truncate max-w-full"
                  >
                    <Mail size={12} className="shrink-0" />
                    <span className="truncate">{selectedTicket.userEmail || "N/A"}</span>
                  </a>
                </div>
                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Category
                  </span>
                  <span className="font-medium text-gray-800">{selectedTicket.category || "General"}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Priority
                  </span>
                  <span className="font-medium">{getPriorityBadge(selectedTicket.priority)}</span>
                </div>
              </div>

              {/* Message Title */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Message Title
                </span>
                <h4 className="mt-1 text-sm font-bold text-[#0B1930]">
                  {selectedTicket.title}
                </h4>
              </div>

              {/* Problem Description */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Problem Description
                </span>
                <div className="mt-1.5 rounded-xl border border-gray-200 bg-white p-4 text-xs text-gray-800 leading-relaxed whitespace-pre-wrap shadow-xs">
                  {selectedTicket.description}
                </div>
              </div>

              {/* Status Update Section */}
              <div className="border-t border-gray-100 pt-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                  Update Ticket Status
                </span>
                <div className="flex flex-wrap gap-2">
                  {["open", "in-progress", "resolved", "closed"].map((st) => (
                    <button
                      key={st}
                      type="button"
                      disabled={isUpdatingStatus}
                      onClick={() => handleStatusChange(selectedTicket._id, st)}
                      className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold capitalize transition-all ${
                        selectedTicket.status === st
                          ? "bg-[#CC1747] text-white shadow-sm ring-2 ring-[#CC1747]/30"
                          : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {selectedTicket.status === st && <Check size={13} />}
                      <span>{st.replace("-", " ")}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Admin Internal Notes */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Admin Internal Notes
                  </span>
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    disabled={isUpdatingStatus}
                    className="text-xs font-semibold text-[#CC1747] hover:underline"
                  >
                    Save Notes
                  </button>
                </div>
                <textarea
                  rows={3}
                  placeholder="Add notes for your team (e.g. called student on Zoom, resetting cohort enrollment...)"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 p-3 text-xs text-gray-800 focus:border-[#CC1747] focus:outline-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/70 px-6 py-3.5 rounded-b-2xl">
              <a
                href={`mailto:${selectedTicket.userEmail}?subject=Re: ${encodeURIComponent(selectedTicket.title)}`}
                className="inline-flex items-center gap-2 rounded-xl bg-primary-color-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-primary-color-700 transition-colors"
              >
                <Mail size={13} />
                <span>Reply to Student via Email</span>
              </a>
              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {ticketToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl text-center animate-in fade-in zoom-in-95">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <Trash2 size={20} />
            </div>
            <h3 className="mt-4 text-sm font-bold text-gray-900">Delete Helpline Ticket?</h3>
            <p className="mt-2 text-xs text-gray-500 leading-relaxed">
              Are you sure you want to permanently delete ticket: <span className="font-semibold text-gray-800">{ticketToDelete.title}</span>?
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteTicket}
                className="flex-1 rounded-xl bg-red-600 py-2.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
              <button
                type="button"
                onClick={() => setTicketToDelete(null)}
                className="flex-1 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
