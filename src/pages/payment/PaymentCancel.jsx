import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8 font-sans">
      <div className="flex w-full max-w-[400px] flex-col items-center text-center">
        {/* Radiating Icon Container */}
        <div className="relative mb-6 flex h-40 w-40 items-center justify-center" aria-hidden="true">
          <div className="absolute h-full w-full rounded-full border border-dashed border-[#CC1747]/30"></div>
          <div className="absolute h-[75%] w-[75%] rounded-full border border-dashed border-[#CC1747]/30"></div>
          <div className="absolute h-[55%] w-[55%] rounded-full bg-[#CC1747]/10"></div>
          <div className="z-10 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#CC1747] text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>

        {/* Typography */}
        <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">Payment Unsuccessful</h1>
        <p className="mb-8 px-4 text-sm text-[#595959] sm:text-base">
          Your payment wasn't processed. Please try again to continue your course.
        </p>

        {/* Actions */}
        <div className="flex w-full flex-col gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex min-h-[48px] w-full items-center justify-center rounded-md bg-[#CC1747] px-4 py-3 text-base font-bold text-white transition-colors hover:bg-[#A0124A] focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:ring-offset-2"
          >
            Retry Payment
          </button>
          <Link
            to="/dashboard"
            className="flex min-h-[48px] w-full items-center justify-center rounded-md border border-[#CC1747] bg-transparent px-4 py-3 text-base font-bold text-gray-900 transition-colors hover:bg-gray-50 hover:border-[#CC1747]/50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Go back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
