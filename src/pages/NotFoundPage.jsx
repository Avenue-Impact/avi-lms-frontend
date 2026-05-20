import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import Cookies from "js-cookie";

import { useSafeBack } from "@/hooks/use-safe-back";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const goBack = useSafeBack();

  // Smart routing based on role
  const getHomeLink = () => {
    if (Cookies.get("adminToken")) {
      return { path: "/admin/data-management", label: "Admin Dashboard" };
    } else if (Cookies.get("token")) {
      return { path: "/dashboard", label: "My Dashboard" };
    }
    return { path: "/", label: "Homepage" };
  };

  const home = getHomeLink();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F9FB] p-6 text-center">
      <div className="flex flex-col items-center max-w-lg">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-[#C8102E]">
          <AlertTriangle size={48} strokeWidth={1.5} />
        </div>
        
        <h1 className="mb-3 text-[40px] font-black leading-tight text-[#1A1A2E]">
          Page Not Found
        </h1>
        
        <p className="mb-10 text-lg text-[#666]">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist anymore.
        </p>

        <div className="flex flex-col gap-4 w-full sm:flex-row sm:justify-center">
          <button
            onClick={goBack}
            className="flex items-center justify-center gap-2 rounded-lg border border-[#E5E5E5] bg-white px-8 py-3.5 text-sm font-bold text-[#1A1A2E] shadow-sm transition-colors hover:border-[#C8102E] hover:text-[#C8102E]"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          
          <Link
            to={home.path}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#C8102E] px-8 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#b5193d] hover:shadow-md"
          >
            <Home size={18} />
            Go to {home.label}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
