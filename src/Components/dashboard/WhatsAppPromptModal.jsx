import { useState } from "react";
import PropTypes from "prop-types";
import WhatsAppPhoneInput from "@/Components/common/WhatsAppPhoneInput";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

const FEATURE_PILLS = ["Live session links", "Class reminders", "Announcements"];

export default function WhatsAppPromptModal({ isOpen, onClose, user }) {
  const queryClient = useQueryClient();
  const [phoneState, setPhoneState] = useState({
    fullNumber: "",
    isValid: false,
    error: null,
  });
  const [consented, setConsented] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const existingPhone = user?.phone || user?.phoneNumber || null;

  const updateWhatsApp = async (payload) => {
    setSubmitting(true);
    try {
      const token = Cookies.get("token") || Cookies.get("userToken") || "";
      const baseUrl =
        import.meta.env.VITE_STUDENT_BASE_URL ||
        (import.meta.env.VITE_AUTH_URL ? import.meta.env.VITE_AUTH_URL.replace("/auth", "") : "http://localhost:3500/api/v1");
      const res = await fetch(`${baseUrl}/users/me/whatsapp`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to update WhatsApp preferences");
      }

      queryClient.invalidateQueries(["userProfile"]);
      queryClient.invalidateQueries(["profile"]);
      toast.success(
        payload.whatsapp_number && payload.whatsapp_number !== "NONE"
          ? "WhatsApp number saved successfully!"
          : "Preferences updated"
      );
      onClose();
    } catch (err) {
      toast.error("Could not save WhatsApp preference. Please try again.");
      void err;
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (!phoneState.isValid || !phoneState.fullNumber) {
      toast.error(phoneState.error || "Please enter a valid WhatsApp number");
      return;
    }
    updateWhatsApp({
      whatsapp_number: phoneState.fullNumber,
      whatsapp_dismissed: false,
    });
  };

  const handleUseCurrentPhone = () => {
    if (!existingPhone) return;
    updateWhatsApp({ useCurrentPhone: true });
  };

  const handleMarkNull = () => {
    updateWhatsApp({ whatsapp_number: "NONE", whatsapp_dismissed: true });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-[480px] rounded-2xl bg-white p-7 shadow-2xl border border-[#E4E7EC]">
        {/* WhatsApp icon badge */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center">
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="#25D366"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-[20px] font-bold text-[#101828] text-center mb-1">
          Add your WhatsApp number
        </h2>
        <p className="text-[13px] text-[#667185] text-center mb-4">
          So we can send you class reminders and course updates.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
          {FEATURE_PILLS.map((pill) => (
            <span
              key={pill}
              className="px-3 py-1 rounded-full border border-[#E4E7EC] text-[12px] text-[#344054] font-medium bg-[#F9FAFB]"
            >
              {pill}
            </span>
          ))}
        </div>

        {/* Phone input */}
        <div className="mb-4">
          <WhatsAppPhoneInput
            value={phoneState.fullNumber}
            onChange={setPhoneState}
            label="WhatsApp number *"
            required
            helperText="Enter your number without the leading 0, e.g. 801 234 5678"
          />
        </div>

        {/* Use existing phone shortcut */}
        {existingPhone && (
          <button
            type="button"
            disabled={submitting}
            onClick={handleUseCurrentPhone}
            className="w-full text-left text-[12px] text-[#667185] mb-4 px-1 hover:text-[#25D366] transition-colors"
          >
            Use my registered number:{" "}
            <span className="font-mono font-semibold text-[#25D366]">{existingPhone}</span>
          </button>
        )}

        {/* Consent checkbox */}
        <label className="flex items-start gap-2.5 cursor-pointer mb-6">
          <input
            type="checkbox"
            checked={consented}
            onChange={(e) => setConsented(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-[#D0D5DD] text-[#CC1747] focus:ring-[#CC1747] accent-[#CC1747] flex-shrink-0"
          />
          <span className="text-[12px] text-[#667185] leading-relaxed">
            I agree to receive WhatsApp messages from Avenue Impact. You can change this number anytime in your profile.
          </span>
        </label>

        {/* Submit */}
        <button
          type="button"
          disabled={submitting || !consented}
          onClick={handleSubmit}
          className="w-full bg-[#CC1747] text-white py-3 rounded-xl font-semibold text-[15px] hover:bg-[#b0133d] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Saving..." : "Submit"}
        </button>

        {/* Footer options */}
        <div className="mt-5 pt-4 border-t border-[#F2F4F7] flex items-center justify-between text-[12px]">
          <button
            type="button"
            disabled={submitting}
            onClick={handleMarkNull}
            className="text-[#98A2B3] hover:text-[#667185] transition-colors"
          >
            I don&apos;t use WhatsApp
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-[#667185] hover:text-[#101828] font-medium"
          >
            Remind me later
          </button>
        </div>
      </div>
    </div>
  );
}

WhatsAppPromptModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
};
