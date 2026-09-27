import { cn } from "@/lib/utils";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Headphones, CheckCircle2, AlertCircle, Loader2, Send, ArrowLeft } from "lucide-react";
import { submitHelplineTicket } from "@/services/api";
import { useProfile } from "@/hooks/students/use-fetch-student-profile";
import toast from "react-hot-toast";

const CATEGORIES = [
  "General Support",
  "Course Content",
  "Assignment / Task",
  "Live Session / Zoom",
  "Account & Login",
  "Billing & Payment",
];

const PRIORITIES = [
  { value: "low", label: "Low", color: "bg-slate-100 text-slate-700 border-slate-200" },
  { value: "medium", label: "Medium", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { value: "high", label: "High", color: "bg-red-50 text-red-700 border-red-200" },
];

export function QuestionsDrawer({ isOpen = false, onClose }) {
  const { data: profileData } = useProfile();
  const student = profileData?.data?.data;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General Support");
  const [priority, setPriority] = useState("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [errors, setErrors] = useState({});

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setCategory("General Support");
    setPriority("medium");
    setSubmittedTicket(null);
    setErrors({});
  };

  const handleClose = () => {
    onClose?.();
    if (submittedTicket) {
      setTimeout(handleReset, 300);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Message title is required";
    } else if (title.trim().length < 4) {
      newErrors.title = "Title must be at least 4 characters";
    }

    if (!description.trim()) {
      newErrors.description = "Problem description is required";
    } else if (description.trim().length < 10) {
      newErrors.description = "Please describe the problem in more detail (at least 10 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const studentName = student
        ? `${student.firstname || student.first_name || ""} ${student.lastname || student.last_name || ""}`.trim() || student.username
        : "Student";
      const studentEmail = student?.email;
      const studentPhone = student?.phone || student?.phone_number || student?.phoneNumber || "";
      const studentUsername = student?.username || student?.user_name || "";

      const payload = {
        title: title.trim(),
        description: description.trim(),
        category,
        priority,
        userName: studentName,
        userEmail: studentEmail,
        userPhone: studentPhone,
        username: studentUsername,
      };

      const res = await submitHelplineTicket(payload);
      const createdTicket = res?.data?.data;

      setSubmittedTicket(createdTicket || { title, createdAt: new Date() });
      toast.success("Help Desk Hotline received your message!");
    } catch (err) {
      const errMsg = err?.response?.data?.message || err?.message || "Failed to submit help desk ticket. Please try again.";
      setErrors({ form: errMsg });
      toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Overlay - visible when open */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={handleClose}
      />

      {/* Drawer Container */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 flex h-screen w-[340px] flex-col border-r border-gray-200 bg-white shadow-2xl transition-transform duration-300 ease-in-out sm:w-[420px] md:w-[460px]",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-color-600 text-white shadow-xs">
              <Headphones className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#101928]">Help Desk Hotline</h2>
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  Online
                </span>
              </div>
              <p className="text-xs text-gray-500">Fast assistance & problem resolution</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close hotline drawer"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {submittedTicket ? (
            /* Success confirmation view */
            <div className="flex h-full flex-col items-center justify-center py-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#101928]">Message Dispatched!</h3>
              <p className="mt-2 max-w-xs text-xs text-gray-600 leading-relaxed">
                Your problem report has been submitted to the <span className="font-semibold text-primary-color-600">Helpline Management</span> team. A support representative will review it and follow up with you.
              </p>

              <div className="mt-6 w-full rounded-xl border border-gray-200 bg-gray-50/70 p-4 text-left">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Ticket Subject
                </p>
                <p className="mt-0.5 text-xs font-semibold text-[#101928]">{submittedTicket.title}</p>
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-gray-500">
                  <span>Status: <span className="font-semibold text-emerald-600 capitalize">Open</span></span>
                  <span>Category: <span className="font-medium text-[#101928]">{category}</span></span>
                </div>
              </div>

              <div className="mt-8 flex w-full flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-color-600 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-primary-color-700"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Send Another Message</span>
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full rounded-xl border border-gray-200 py-2.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Close Help Desk
                </button>
              </div>
            </div>
          ) : (
            /* Problem Submission Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="rounded-xl border-l-4 border-l-primary-color-600 border border-gray-100 bg-gray-50/90 p-3.5 text-xs text-[#101928] leading-relaxed">
                <p className="font-semibold text-[#101928]">How can we help you today?</p>
                <p className="mt-0.5 text-[11px] text-gray-600">
                  Enter a title and describe what you are experiencing. Our team tracks every inquiry in Helpline Management.
                </p>
              </div>

              {errors.form && (
                <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errors.form}</span>
                </div>
              )}

              {/* Message Title */}
              <div>
                <label className="block text-xs font-semibold text-[#344054]">
                  Message Title <span className="text-primary-color-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cannot access assignment module 3"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
                  }}
                  className={cn(
                    "mt-1.5 w-full rounded-xl border px-3.5 py-2.5 text-xs text-[#101928] placeholder-gray-400 transition-all focus:outline-none",
                    errors.title
                      ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-primary-color-600 focus:ring-1 focus:ring-primary-color-600"
                  )}
                />
                {errors.title && (
                  <p className="mt-1 text-[11px] text-red-500">{errors.title}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-[#344054]">
                  Issue Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs text-[#101928] focus:border-primary-color-600 focus:outline-none focus:ring-1 focus:ring-primary-color-600"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                  Priority
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {PRIORITIES.map((p) => {
                    const isSelected = priority === p.value;
                    return (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => setPriority(p.value)}
                        className={cn(
                          "rounded-lg border py-1.5 text-center text-xs font-medium transition-all",
                          isSelected
                            ? "border-primary-color-600 bg-primary-color-600 text-white shadow-xs font-semibold"
                            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Problem Description */}
              <div>
                <label className="block text-xs font-semibold text-[#344054]">
                  Problem Description <span className="text-primary-color-600">*</span>
                </label>
                <textarea
                  rows={6}
                  placeholder="Please describe the issue or question in detail. What happened, what did you expect, or what do you need assistance with?"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description) setErrors((prev) => ({ ...prev, description: null }));
                  }}
                  className={cn(
                    "mt-1.5 w-full rounded-xl border p-3.5 text-xs text-[#101928] placeholder-gray-400 transition-all focus:outline-none resize-none leading-relaxed",
                    errors.description
                      ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-200 focus:border-primary-color-600 focus:ring-1 focus:ring-primary-color-600"
                  )}
                />
                {errors.description && (
                  <p className="mt-1 text-[11px] text-red-500">{errors.description}</p>
                )}
              </div>

              {/* Student identity footer */}
              {student && (
                <div className="rounded-lg bg-gray-50 px-3 py-2 text-[11px] text-gray-500">
                  Submitting as: <span className="font-semibold text-gray-800">{student.firstname || student.first_name || ""} {student.lastname || student.last_name || ""}</span> ({student.email})
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-color-600 py-2.5 text-xs font-semibold text-white shadow-md shadow-primary-color-600/20 transition-all hover:bg-primary-color-700 active:scale-[0.99] disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending to Hotline...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>Send to Help Desk</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default QuestionsDrawer;
