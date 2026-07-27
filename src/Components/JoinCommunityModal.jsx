import React from 'react';
import { DarkLogo } from '@/Components/Logo';
import { User, X, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import GoogleAuthButton from '@/pages/auth/components/GoogleAuthButton';

const JoinCommunityModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_AUTH_URL;

  if (!open) return null;

  const handleGoogleCallback = async (credential) => {
    try {
      const base64Url = credential.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const payload = JSON.parse(jsonPayload);
      if (!payload || !payload.email) {
        toast.error("Failed to retrieve user details from Google");
        return;
      }

      const response = await axios.post(`${url}/google-check`, {
        email: payload.email,
      });

      if (response.data.exists) {
        const loginResponse = await axios.post(`${url}/google-login`, {
          credential,
        });

        if (loginResponse.data.status === "success") {
          const { token, user: loggedUser } = loginResponse.data.data;
          
          Cookies.set("token", token, {
            expires: 1,
            secure: true,
            sameSite: "strict",
            path: "/",
          });
          Cookies.set("userRole", loggedUser.role, {
            expires: 1,
            secure: true,
            sameSite: "strict",
            path: "/",
          });

          toast.success("Login successful");
          onClose();
          window.location.reload();
        }
      } else {
        toast.success("No account found. Redirecting to sign up...");
        onClose();
        navigate(`/signup`, {
          state: { googleToken: credential },
        });
      }
    } catch (err) {
      console.error("Google auth failed in modal:", err);
      toast.error(err.response?.data?.message || "Google authentication failed. Please try again.");
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:flex-row min-h-[500px] animate-in zoom-in-95 duration-200">
        
        {/* Mobile close button (visible only on small screens) */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md text-gray-500 hover:text-gray-800 md:hidden"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Left Section */}
        <div className="flex w-full flex-col justify-center p-8 md:w-1/2 lg:p-12 font-poppins">
          <div className="mb-8">
            <DarkLogo className="!h-12 !w-auto" />
          </div>

          <div className="mb-4 h-1.5 w-12 rounded bg-[#CC1747]"></div>
          
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl leading-tight">
            Join the Avenue Impact <br className="hidden md:block" /> Community
          </h2>
          
          <p className="mb-8 text-base text-gray-500 leading-relaxed">
            Access expert-led courses, live mentoring, career pathways and opportunities designed to help you grow and transform.
          </p>

          <Link to="/signup" onClick={onClose}>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#CC1747] px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-rose-700 shadow-sm">
              <User className="h-5 w-5" />
              Create Free Account
            </button>
          </Link>

          <div className="my-6 flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-gray-200"></div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">or</span>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          <div className="w-full">
            <GoogleAuthButton onCallback={handleGoogleCallback} text="continue_with" />
          </div>

          <p className="mt-6 text-center text-sm font-medium text-gray-800 flex items-center justify-center gap-1.5">
            Already a member?
            <Link to="/login" onClick={onClose} className="font-bold text-[#CC1747] hover:underline flex items-center gap-0.5">
              Sign In <ArrowRight className="h-4 w-4" />
            </Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="relative hidden w-full bg-[#FAFAFA] md:block md:w-1/2 overflow-hidden flex items-center justify-center p-8">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Decorative dots top left */}
          <div className="absolute left-8 top-12 grid grid-cols-4 gap-2 opacity-20">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="h-1.5 w-1.5 rounded-full bg-gray-800"></div>
            ))}
          </div>

          {/* Main Image */}
          <img 
            src="/images/auth_layout/Frame_1984078383.png" 
            alt="Avenue Impact Students" 
            className="relative z-0 h-auto w-full object-contain max-h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default JoinCommunityModal;
