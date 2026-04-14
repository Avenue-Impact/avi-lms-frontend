import React from "react";
import { AlertCircle, LogIn, RefreshCcw, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const MeetingErrorState = ({ error, onRetry, backUrl }) => {
  const navigate = useNavigate();
  const statusCode = error?.response?.status;
  const message =
    error?.response?.data?.message || error?.message || "Something went wrong.";

  // Handle Unauthenticated
  if (statusCode === 401 || statusCode === 403) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F9FB] p-6 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-[#C8102E]">
          <AlertCircle size={32} />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-[#1A1A2E]">
          Please log in to continue
        </h2>
        <p className="mb-8 max-w-md text-[#888]">
          Your session may have expired or you don't have access to this meeting.
        </p>
        <button
          onClick={() => {
            const currentRoute = window.location.pathname;
            const loginUrl = currentRoute.includes("/admin")
              ? "/admin/login"
              : "/login";
            window.location.href = loginUrl;
          }}
          className="flex items-center gap-2 rounded-lg bg-[#C8102E] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#b5193d]"
        >
          <LogIn size={18} />
          Go to Login
        </button>
      </div>
    );
  }

  // General errors (404, 409, 500)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F9FB] p-6 text-center">
      <div className="mb-6 rounded-2xl bg-white p-8 px-10 shadow-sm sm:px-16 md:p-12">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-[#C8102E]">
          <AlertCircle size={32} />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-[#1A1A2E]">
          Unable to join session
        </h2>
        <p className="mb-8 max-w-sm text-sm text-[#666]">{message}</p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => {
              if (backUrl) {
                window.location.href = backUrl;
              } else {
                navigate(-1);
              }
            }}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#E5E5E5] px-6 py-2.5 font-semibold text-[#1A1A2E] transition-colors hover:border-[#C8102E] hover:text-[#C8102E] sm:w-auto"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#C8102E] px-6 py-2.5 font-semibold text-white transition-colors hover:bg-[#b5193d] sm:w-auto"
            >
              <RefreshCcw size={18} />
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingErrorState;
