import { Link } from "react-router-dom";
import Logo from "@/assets/logo/logo.svg";
import { ChevronLeft, Gift, Users, Star } from "lucide-react";
import { useSafeBack } from "@/hooks/use-safe-back";

/**
 * ReferralAuthLayout — specially designed for users referred by partners.
 * Left panel: custom graphics and messaging.
 * Right panel: form content.
 */
const ReferralAuthLayout = ({
  children,
  title,
  subtitle,
  isPage = true,
  alignTop = false,
  leftHeadline = "Get Paid Every Time You Refer",
  leftSubtext = "Join our referral partner program and earn commission for every successful enrollment. No experience needed, just share and earn",
}) => {
  const goBack = useSafeBack();

  return (
    <div className={`${isPage ? "min-h-screen" : "py-8"} bg-[#f4f6fb]`}>
      {/* Top header bar */}
      {isPage && (
        <header className="relative z-20 flex items-center border-b border-gray-100 bg-white px-4 py-4 shadow-sm md:px-10">
          <button
            onClick={goBack}
            className="mr-4 text-gray-500 transition-colors hover:text-gray-800"
            aria-label="Go back"
          >
            <ChevronLeft size={22} />
          </button>
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Avenue Impact Logo" className="h-8 md:h-10" />
          </Link>
        </header>
      )}

      {/* Page body */}
      <main
        className={`flex w-full justify-center p-4 md:p-8 ${
          isPage
            ? alignTop
              ? "min-h-[calc(100vh-68px)] items-start pt-8 md:pt-12"
              : "min-h-[calc(100vh-68px)] items-center"
            : "items-center"
        }`}
      >
        <div className="relative flex w-full max-w-[1100px] flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl md:flex-row">
          {/* ── Left panel (Graphics/Branding) ── */}
          <div className="relative hidden w-full flex-col justify-between overflow-hidden bg-[#121c33] p-10 md:flex md:w-[45%] lg:w-[50%]">
            
            {/* Background Grid Pattern */}
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
                backgroundPosition: "center top"
              }}
            />
            
            {/* Top Graphics */}
            <div className="relative mt-8 flex w-full flex-1 items-center justify-center">
              <div className="relative w-full max-w-[400px]">
                {/* Arrow Graphic */}
                {/* Coins Graphic */}
                <img 
                  src="/images/auth_layout/Clip path group.png" 
                  alt="Gold coins graphic" 
                  className="absolute -top-36 -left-24 w-full object-contain drop-shadow-2xl"
                />
                <img 
                  src="/images/auth_layout/Group-1.png" 
                  alt="Upward arrow graphic" 
                  className="relative z-10 w-[95%] max-w-none object-contain opacity-90 drop-shadow-xl"
                />
              </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 flex flex-col pt-12 pb-4">
              <h2 className="mb-4 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white xl:text-[46px]">
                Get Paid Every Time <br />You Refer
              </h2>
              <p className="max-w-[420px] text-[15px] font-medium leading-[1.6] text-white/90 xl:text-[17px]">
                Join our referral partner program and earn commission for every successful enrollment. No experience needed, just share and earn
              </p>
            </div>
          </div>

          {/* ── Right panel (Form area) ── */}
          <div
            className={`flex flex-1 flex-col justify-center bg-white px-6 py-10 sm:px-10 lg:px-14 ${
              alignTop ? "md:justify-start md:pt-12" : ""
            }`}
          >
            {/* Mobile Header (Shows only on small screens) */}
            <div className="mb-8 md:hidden">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#FFF5F8] px-3 py-1">
                <Gift className="h-3 w-3 text-[#CC1747]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#CC1747]">
                  Partner Referral
                </span>
              </div>
              <h2 className="text-2xl font-extrabold leading-tight text-[#1a2340]">
                {leftHeadline}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {leftSubtext}
              </p>
              <hr className="mt-6 border-gray-100" />
            </div>

            {/* Form header */}
            {(title || subtitle) && (
              <div className="mb-8 text-left">
                {title && (
                  <h1 className="mb-2 text-2xl font-bold tracking-tight text-[#1a1a1a] md:text-[28px]">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-sm text-gray-500">{subtitle}</p>
                )}
              </div>
            )}

            {/* Form children */}
            <div className="auth-form-container w-full">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReferralAuthLayout;
