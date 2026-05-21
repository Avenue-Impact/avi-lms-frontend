import { Link } from "react-router-dom";
import Logo from "@/assets/logo/logo.svg";
import WhiteLogo from "@/assets/logo/logo_white.png";
import { ChevronLeft, BookOpen, Award, FileText, Users } from "lucide-react";
import { useSafeBack } from "@/hooks/use-safe-back";

const features = [
  {
    icon: BookOpen,
    title: "Industry-Relevant Training",
    desc: "Learn practical skills designed for today's job market.",
  },
  {
    icon: Award,
    title: "Certificate of Completion",
    desc: "Earn a verifiable certificate after completing your program.",
  },
  {
    icon: FileText,
    title: "CV & Interview Support",
    desc: "Get guidance to prepare for real career opportunities.",
  },
  {
    icon: Users,
    title: "Mentorship Access",
    desc: "Receive support from experienced professionals and mentors.",
  },
];

/**
 * AuthLayout — two-panel card design.
 * Left panel: crimson branding + feature grid.
 * Right panel: form content (title, subtitle, children).
 */
const AuthLayout = ({
  children,
  title,
  subtitle,
  isPage = true,
  alignTop = false,
  leftHeadline,
  leftSubtext,
}) => {
  const goBack = useSafeBack();

  return (
    <div className={`${isPage ? "min-h-screen" : "py-8"} bg-[#f4f6fb]`}>
      {/* Top header bar */}
      {isPage && (
        <header className="flex items-center border-b border-gray-100 bg-white px-4 py-4 md:px-10">
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
        {/* Outer card */}
        <div className="flex w-full max-w-[1024px] flex-col-reverse overflow-hidden rounded-2xl shadow-xl md:flex-row">
          {/* ── Left panel (crimson) ── */}
          <div className="relative flex flex-shrink-0 flex-col justify-between overflow-hidden bg-[#14345F] p-8 text-white md:w-[45%] md:p-10">
            {/* Background Grid & Gradient */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#c41e3a]/50 via-transparent to-[#3d000f]/90" />

            <div className="relative z-10">
              {/* Logo */}
              <div className="mb-10">
                <img
                  src={WhiteLogo}
                  alt="Avenue Impact"
                  className="h-8"
                  onError={(e) => {
                    // fallback if white_logo not found
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              {/* Headline */}
              <h2 className="mb-4 text-2xl font-extrabold leading-tight md:text-5xl">
                {leftHeadline || "Ready to Build\nIn-Demand Skills?"}
              </h2>

              {/* Sub-text */}
              <p className="mb-8 mt-2 text-base leading-relaxed text-white/80">
                {leftSubtext ||
                  "Join learners gaining practical knowledge, career support, and industry-ready experience through "}
                <strong className="text-white">Avenue Impact.</strong>
              </p>

              {/* Divider */}
              <hr className="mb-8 border-white/20" />

              {/* Feature 2×2 grid */}
              <div className="grid grid-cols-2 gap-14 pb-4 pt-8">
                {features.map(({ icon: Icon, title: ft, desc }) => (
                  <div key={ft} className="space-y-1">
                    <div className="mb-1 flex items-center gap-2">
                      <Icon className="h-4 w-4 flex-shrink-0 text-white/70" />
                      <p className="text-sm font-semibold leading-tight">
                        {ft}
                      </p>
                    </div>
                    <p className="text-white/65 text-xs leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right panel (white form area) ── */}
          <div
            className={`flex flex-1 flex-col justify-center bg-white px-8 py-10 md:px-10 ${
              alignTop ? "md:justify-start md:pt-10" : ""
            }`}
          >
            {/* Form header */}
            {(title || subtitle) && (
              <div className="mb-8 text-left">
                {title && (
                  <h1 className="mb-2 text-2xl font-medium tracking-tight text-[#1a1a1a] md:text-[32px]">
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

export default AuthLayout;
