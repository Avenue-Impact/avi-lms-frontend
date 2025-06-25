import { Link } from "react-router-dom";
import StripeLogo from "@/assets/images/StripeLogo.png";
import StripeLogo2 from "@/assets/images/stripeLogo2.webp";


const ReferralBonusModal = () => {
  return (
    <Link
      to="/dashboard/referral"
      className="fixed bottom-5 left-5 z-50 block w-16 h-16 group"
      title="Check your referral bonus"
    >
      <div className="relative w-full h-full flex items-center justify-center bg-white rounded-full shadow-lg transition-transform duration-300 ease-in-out transform group-hover:scale-110">
        <img
          src={StripeLogo2}
          alt="Referral Bonus"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    </Link>
  );
};

export default ReferralBonusModal; 