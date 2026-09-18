import React from "react";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo/logo.svg";
import AuthVector from "@/assets/icons/auth-vector.png";
import { BookOpen, Users, Award, ChevronLeft } from "lucide-react";
import { useSafeBack } from "@/hooks/use-safe-back";

/**
 * AuthLayout — Modern 50/50 split authentication layout.
 * Left: Clean white panel with Avenue Impact logo and form content.
 * Right: Dark Navy panel (#0B1536 / #0F1D45) with the custom auth-vector.png graphic
 *        and contextual value propositions (Login pathway card vs. Signup feature badges).
 */
const AuthLayout = ({
  children,
  title,
  subtitle,
  variant = "login", // "login" | "signup"
  isPage = true,
  rightEyebrow,
  rightHeadline,
}) => {
  const goBack = useSafeBack();

  if (!isPage) {
    return (
      <div className="w-full max-w-[440px] mx-auto p-4 bg-white rounded-2xl">
        {(title || subtitle) && (
          <div className="mb-6">
            {title && (
              <h1 className="text-2xl font-bold text-[#101828] tracking-tight">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-sm text-[#667085] mt-1.5">{subtitle}</p>
            )}
          </div>
        )}
        <div className="w-full">{children}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white selection:bg-[#D7195A]/20">
      {/* ── Left Panel (White form area) ── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 min-h-screen bg-white">
        {/* Top Header with Logo & Back button */}
        <div className="w-full max-w-[420px] mx-auto lg:mx-0 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center">
            <img
              src={Logo}
              alt="Avenue Impact"
              className="h-8 sm:h-9 object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={goBack}
            className="lg:hidden text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Centered Form Body */}
        <div className="w-full max-w-[420px] mx-auto my-auto py-6">
          {(title || subtitle) && (
            <div className="mb-6">
              {title && (
                <h1 className="text-2xl sm:text-[28px] font-bold text-[#101828] tracking-tight">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-sm text-[#667085] mt-1.5">{subtitle}</p>
              )}
            </div>
          )}

          <div className="w-full">{children}</div>
        </div>

        {/* Bottom spacer for balance */}
        <div className="hidden lg:block h-6" />
      </div>

      {/* ── Right Panel (Dark Navy showcase) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-end p-12 xl:p-20 bg-[#0F1D45] text-white overflow-hidden select-none">
        {/* Curved dashed line vector */}
        <img
          src={AuthVector}
          alt=""
          className="absolute top-10 right-0 w-[85%] max-w-[560px] object-contain pointer-events-none opacity-90"
        />

        {/* Value Proposition Content */}
        <div className="relative z-10 max-w-lg mb-4">
          {variant === "signup" ? (
            <>
              <p className="text-xs font-bold tracking-widest text-[#D7195A] uppercase mb-3">
                {rightEyebrow || "FREE TO JOIN"}
              </p>
              <h2 className="text-3xl xl:text-[36px] font-bold leading-tight text-white mb-8">
                {rightHeadline || "Everything you need to go from idea to hired."}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-white/90" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Personalised pathways
                    </h4>
                    <p className="text-xs text-white/60 mt-0.5">
                      Structured learning for the career you choose.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-white/90" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Real mentors
                    </h4>
                    <p className="text-xs text-white/60 mt-0.5">
                      1:1 guidance from working professionals.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-white/90" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Interview-ready
                    </h4>
                    <p className="text-xs text-white/60 mt-0.5">
                      Mock interviews scored against real roles.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-xs font-bold tracking-widest text-[#D7195A] uppercase mb-3">
                {rightEyebrow || "12,000+ CAREERS TRANSFORMED"}
              </p>
              <h2 className="text-3xl xl:text-[36px] font-bold leading-tight text-white mb-8">
                {rightHeadline ||
                  "Learning, mentoring and real opportunities — all in one place."}
              </h2>

              {/* Glassmorphism Floating Card */}
              <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-5 max-w-md shadow-2xl">
                <p className="text-sm font-semibold text-white">
                  Business Analysis Pathway
                </p>
                <p className="text-xs text-white/70 mt-1">
                  David is on stage 4 of 7 — Mentiiv mentoring
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
