import PropTypes from "prop-types";

const BroadcastSuccessModal = ({
  cohortName = "May Cohort 2024",
  recipients = 120,
  onDone,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-[420px] shadow-2xl p-8 flex flex-col items-center text-center">
        {/* Soft green circle with checkmark */}
        <div className="w-12 h-12 rounded-full bg-[#EBFDF3] flex items-center justify-center mb-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 13L9 17L19 7"
              stroke="#12B76A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2 className="text-[18px] font-bold text-[#101828] mb-2">
          Broadcast on its way
        </h2>
        <p className="text-[13px] text-[#667185] mb-6 leading-relaxed max-w-[320px]">
          Your message is being sent to {recipients} members of {cohortName}. Delivery updates will appear in your broadcast history.
        </p>

        <button
          onClick={onDone}
          className="w-full bg-[#CC1747] text-white py-3.5 rounded-xl font-semibold text-[14px] hover:bg-[#b0133d] transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};

BroadcastSuccessModal.propTypes = {
  cohortName: PropTypes.string,
  recipients: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  audience: PropTypes.string,
  onDone: PropTypes.func.isRequired,
};

export default BroadcastSuccessModal;
