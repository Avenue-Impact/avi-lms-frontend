import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    // Invalidate caches to refresh dashboard states
    queryClient.invalidateQueries(["enrollments"]);
    queryClient.invalidateQueries(["installments"]);

    // Simulate loading/verification
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [sessionId, queryClient]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#CC1747]"></div>
          <p className="mt-4 text-lg text-[#595959]">Verifying payment status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8 font-sans">
      <div className="flex w-full max-w-[400px] flex-col items-center text-center">
        {/* Radiating Icon Container */}
        <div className="relative mb-6 flex h-40 w-40 items-center justify-center" aria-hidden="true">
          <div className="absolute h-full w-full rounded-full border border-dashed border-[#CC1747]/30"></div>
          <div className="absolute h-[75%] w-[75%] rounded-full border border-dashed border-[#CC1747]/30"></div>
          <div className="absolute h-[55%] w-[55%] rounded-full bg-[#CC1747]/10"></div>
          <div className="z-10 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#CC1747] text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>

        {/* Typography */}
        <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">Payment Successful</h1>
        <p className="mb-8 text-sm text-[#595959] sm:text-base">
          You've unlocked the course
        </p>

        {/* Actions */}
        <div className="mb-8 flex w-full flex-col gap-4">
          <Link
            to="/dashboard"
            className="flex min-h-[48px] w-full items-center justify-center rounded-md bg-[#CC1747] px-4 py-3 text-base font-bold text-white transition-colors hover:bg-[#A0124A] focus:outline-none focus:ring-2 focus:ring-[#CC1747] focus:ring-offset-2"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/dashboard"
            className="flex min-h-[48px] w-full items-center justify-center rounded-md border border-[#CC1747] bg-transparent px-4 py-3 text-base font-bold text-gray-900 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 hover:border-[#CC1747]/50"
          >
            View Payment Schedule
          </Link>
        </div>

        {/* Footer Info */}
        {/* <div className="text-center">
          <p className="mb-1 text-base text-gray-900">
            Next Payment: <span className="font-semibold text-[#CC1747]">February 19</span>
          </p>
          <p className="text-sm text-[#595959]">You'll receive reminders</p>
        </div> */}
      </div>
    </div>
  );
};

export default PaymentSuccess;
