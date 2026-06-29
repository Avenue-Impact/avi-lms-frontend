import React from 'react';
import { DarkLogo } from '@/Components/Logo';
import { User, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const JoinCommunityModal = ({ open, onClose }) => {
  if (!open) return null;

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
        <div className="flex w-full flex-col justify-center p-8 md:w-1/2 lg:p-12">
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

          <Link to="/signup">
            <button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#CC1747] px-4 py-3.5 text-sm font-medium text-white transition-colors hover:bg-rose-700 shadow-sm">
              <User className="h-5 w-5" />
              Create Free Account
            </button>
          </Link>

          <div className="my-6 flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-gray-200"></div>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">or</span>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          <div className="flex items-center justify-center border border-gray-300 rounded-md py-3.5 hover:bg-gray-50 transition-colors">
            <span className="text-sm text-gray-600">Already a Member?</span>
            <Link to="/login" className="ml-2 flex items-center text-sm font-semibold text-[#CC1747] hover:text-rose-700">
              Sign In <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
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
