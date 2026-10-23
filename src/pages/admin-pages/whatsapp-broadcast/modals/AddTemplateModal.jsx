import { useState } from "react";
import PropTypes from "prop-types";
import { axiosAdmin } from "@/services/api";
import toast from "react-hot-toast";

const CATEGORIES = ["Utility", "Marketing"];

const UTILITY_VARIABLE_SUGGESTIONS = [
  { label: "Course Name", token: "{{course_name}}" },
  { label: "Date", token: "{{date}}" },
  { label: "Time", token: "{{time}}" },
  { label: "Link", token: "{{link}}" },
  { label: "Cohort", token: "{{cohort}}" },
];

const MARKETING_DEFAULT_TEMPLATE = `Hello {{1}},
You are invited to join {{company_name}} for {{event_name}} on {{date}} at {{time}}.
Please use this link to access the session: {{session_link}}
We look forward to seeing you!`;

const MARKETING_VARIABLE_SUGGESTIONS = [
  { label: "Company", token: "{{company_name}}" },
  { label: "Event Name", token: "{{event_name}}" },
  { label: "Date", token: "{{date}}" },
  { label: "Time", token: "{{time}}" },
  { label: "Session Link", token: "{{session_link}}" },
];

const AddTemplateModal = ({ onClose, onCreated }) => {
  const [form, setForm] = useState({
    name: "",
    category: "Utility",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCategoryChange = (newCat) => {
    if (newCat === "Marketing") {
      setForm((prev) => ({
        ...prev,
        category: newCat,
        message: prev.message && prev.category === "Marketing" ? prev.message : MARKETING_DEFAULT_TEMPLATE,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        category: newCat,
        message: prev.message === MARKETING_DEFAULT_TEMPLATE ? "" : prev.message,
      }));
    }
  };

  const insertVariable = (token) => {
    setForm((prev) => ({
      ...prev,
      message: (prev.message ? prev.message + " " : "") + token,
    }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.message.trim()) return;
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await axiosAdmin.post("/whatsapp/templates", {
        name: form.name.trim(),
        category: form.category,
        message: form.message.trim(),
      });

      toast.success("Message template saved!");
      if (onCreated && res.data?.data) {
        onCreated(res.data.data);
      } else {
        onClose();
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Failed to save message template";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const currentSuggestions =
    form.category === "Marketing"
      ? MARKETING_VARIABLE_SUGGESTIONS
      : UTILITY_VARIABLE_SUGGESTIONS;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-[540px] shadow-2xl p-7 max-h-[90vh] overflow-y-auto">
        <h2 className="text-[20px] font-bold text-[#23314A] mb-1">
          Add message template
        </h2>
        <p className="text-[13px] text-[#667185] mb-5">
          {form.category === "Marketing"
            ? "Marketing template defaults to Avenue Impact Invitation. Customize the details around it."
            : "Utility template: write your message and it fits into the verified WhatsApp broadcast template."}
        </p>

        {errorMsg && (
          <div className="mb-4 text-[12px] text-[#D92D20] bg-[#FEF3F2] border border-[#FECDCA] rounded-lg px-3.5 py-2.5">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Template Name */}
        <div className="mb-4">
          <label className="block text-[13px] font-medium text-[#344054] mb-1.5">
            Template name
          </label>
          <input
            type="text"
            placeholder={
              form.category === "Marketing"
                ? "e.g. Masterclass Event Invitation"
                : "e.g. Live Session Reminder"
            }
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              if (errorMsg) setErrorMsg("");
            }}
            className="w-full border border-[#D0D5DD] rounded-lg px-4 py-3 text-[14px] text-[#23314A] focus:outline-none focus:ring-2 focus:ring-[#CC1747]/30 focus:border-[#CC1747]"
          />
        </div>

        {/* Category: Utility vs Marketing */}
        <div className="mb-4">
          <label className="block text-[13px] font-medium text-[#344054] mb-1.5">
            Category
          </label>
          <div className="relative">
            <select
              value={form.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full appearance-none border border-[#D0D5DD] rounded-lg px-4 py-3 pr-10 text-[14px] text-[#23314A] focus:outline-none focus:ring-2 focus:ring-[#CC1747]/30 focus:border-[#CC1747] bg-white cursor-pointer"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3.5 top-4 pointer-events-none"
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
            >
              <path
                d="M1 1L6 6L11 1"
                stroke="#667185"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-[13px] font-medium text-[#344054]">
              Message
            </label>
            <span className="text-[11px] text-[#667185]">
              Use &#123;&#123;tokens&#125;&#125; for dynamic variables
            </span>
          </div>
          <textarea
            placeholder={
              form.category === "Marketing"
                ? MARKETING_DEFAULT_TEMPLATE
                : "Type your message with {{tokens}}..."
            }
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={5}
            className="w-full border border-[#D0D5DD] rounded-lg px-4 py-3 text-[14px] text-[#23314A] focus:outline-none focus:ring-2 focus:ring-[#CC1747]/30 focus:border-[#CC1747] resize-none leading-relaxed"
          />
        </div>

        {/* Quick Insert Variable Chips */}
        <div className="mb-5">
          <p className="text-[11px] text-[#667185] mb-1.5 font-medium">
            Insert dynamic variable:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {currentSuggestions.map((sug) => (
              <button
                key={sug.token}
                type="button"
                onClick={() => insertVariable(sug.token)}
                className="px-2.5 py-1 text-[11px] font-medium bg-[#F2F4F7] text-[#344054] rounded-md hover:bg-[#E4E7EC] transition-colors border border-[#D0D5DD]"
              >
                + {sug.label} <code className="text-[#CC1747] ml-0.5">{sug.token}</code>
              </button>
            ))}
          </div>
        </div>

        {/* WhatsApp Preview Bubble */}
        {form.message.trim() && (
          <div className="mb-6">
            <p className="text-[11px] font-semibold text-[#667185] uppercase tracking-wider mb-1.5">
              WhatsApp Recipient Preview ({form.category}):
            </p>
            <div className="bg-[#EFEAE2] p-3 rounded-xl border border-[#D1D7DB] text-[12px] text-[#111B21]">
              <div className="bg-white rounded-lg p-3 shadow-sm leading-relaxed whitespace-pre-wrap">
                {form.category === "Marketing" ? (
                  form.message
                ) : (
                  <>
                    <span className="text-[#667185]">Hello &#123;&#123;Student Name&#125;&#125;,</span>
                    {"\n\n"}
                    {form.message}
                    {"\n\n"}
                    <span className="text-[#667185]">
                      Best regards,
                      {"\n"}
                      Avenue Impact Team
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleSubmit}
            disabled={loading || !form.name.trim() || !form.message.trim()}
            className="w-full bg-[#CC1747] text-white py-3.5 rounded-xl font-semibold text-[15px] hover:bg-[#b0133d] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Saving template..." : "Submit"}
          </button>
          <button
            onClick={onClose}
            type="button"
            className="w-full border border-[#D0D5DD] text-[#344054] py-3 rounded-xl font-medium text-[14px] hover:bg-[#F9FAFB] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

AddTemplateModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCreated: PropTypes.func,
};

export default AddTemplateModal;
