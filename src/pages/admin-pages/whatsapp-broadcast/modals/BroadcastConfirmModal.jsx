import PropTypes from "prop-types";

const BroadcastConfirmModal = ({
  message,
  audience,
  recipients,
  onSend,
  sending,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-[440px] shadow-2xl p-7">
        <h2 className="text-[20px] font-bold text-[#101828] mb-1">
          Send this broadcast?
        </h2>
        <p className="text-[13px] text-[#667185] mb-5">
          Please review before sending. This can&apos;t be undone.
        </p>

        {/* WhatsApp preview card container */}
        <div className="bg-[#EFEAE2] rounded-xl p-4 mb-5 border border-[#E4E7EC]">
          <div className="bg-white rounded-lg p-3.5 shadow-sm text-[13px] text-[#111B21] leading-relaxed">
            <p className="whitespace-pre-wrap line-clamp-4">{message}</p>
            <div className="flex justify-end mt-2 text-[10px] text-[#667781]">
              <span>6:00 PM</span>
            </div>
          </div>
        </div>

        {/* Summary Details */}
        <div className="space-y-3 mb-6 text-[13px]">
          <div className="flex justify-between items-center">
            <span className="text-[#667185]">Audience</span>
            <span className="font-semibold text-[#101828]">{audience}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#667185]">Recipients</span>
            <span className="font-semibold text-[#101828]">
              {recipients} members
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#667185]">Delivery</span>
            <span className="font-semibold text-[#101828]">Send now</span>
          </div>
        </div>

        {/* Action Buttons */}
        <button
          onClick={onSend}
          disabled={sending}
          className="w-full bg-[#CC1747] text-white py-3.5 rounded-xl font-semibold text-[14px] hover:bg-[#b0133d] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mb-2.5"
        >
          {sending ? "Sending..." : "Send broadcast"}
        </button>
        <button
          onClick={onClose}
          disabled={sending}
          className="w-full border border-[#D0D5DD] text-[#344054] py-3 rounded-xl font-medium text-[14px] hover:bg-[#F9FAFB] transition-colors"
        >
          Go back and edit
        </button>
      </div>
    </div>
  );
};

BroadcastConfirmModal.propTypes = {
  message: PropTypes.string.isRequired,
  audience: PropTypes.string.isRequired,
  recipients: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSend: PropTypes.func.isRequired,
  sending: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default BroadcastConfirmModal;
