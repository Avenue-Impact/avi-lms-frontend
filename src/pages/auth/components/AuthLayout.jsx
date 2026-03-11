import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/logo/logo.svg";
import AuthLayoutImage from "@/assets/images/auth_layout_img.jpg";
import { ChevronLeft } from "lucide-react";

const AuthLayout = ({
  children,
  title,
  subtitle,
  imageSrc,
  isPage = true,
  alignTop = false,
}) => {
  const navigate = useNavigate();

  return (
    <div className={`${isPage ? "min-h-screen" : "py-8"} bg-white`}>
      {/* 1. Header: Matches the clean white top bar with Logo */}
      {isPage && (
        <header className="flex items-center px-4 py-4 md:px-10">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 text-gray-600 transition-colors hover:text-gray-900"
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Avenue Impact Logo" className="h-8 md:h-10" />
          </Link>
        </header>
      )}

      <main
        className={`flex ${
          isPage
            ? alignTop
              ? "min-h-[calc(100vh-80px)] items-start pt-6 md:pt-10 lg:pt-16"
              : "min-h-[calc(100vh-80px)] items-center pt-0"
            : "items-center pt-0"
        } w-full justify-center p-4 md:p-10`}
      >
        <div
          className={`flex w-full max-w-[1480px] flex-col items-center justify-center lg:flex-row ${alignTop ? "lg:items-start" : "lg:items-center"} lg:gap-16`}
        >
          {isPage && (
            <div className="w-full lg:w-1/2">
              <div className="overflow-hidden rounded-3xl shadow-sm">
                {" "}
                <img
                  className="h-[550px] w-full object-cover md:h-[500px] lg:h-auto lg:max-h-[87vh]"
                  src={imageSrc || AuthLayoutImage}
                  alt="Professional setting"
                />
              </div>
            </div>
          )}

          {/* Right Side - Form Content */}
          <div
            className={`flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2 lg:items-start lg:px-12 lg:py-0 ${isPage ? "" : "mx-auto !w-full max-w-4xl"} `}
          >
            <div className="w-full max-w-[460px]">
              <div className="mb-8 space-y-2 text-center">
                {title && (
                  <h1 className="text-2xl tracking-tight text-[#1a1a1a] md:text-3xl">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="md:text-extralight text-sm text-gray-500">
                    {subtitle}
                  </p>
                )}
              </div>

              <div className="auth-form-container">{children}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
