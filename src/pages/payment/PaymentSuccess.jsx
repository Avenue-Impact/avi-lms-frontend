import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  // You can add an API call here to verify the session if needed in the future
  useEffect(() => {
    // Simulate loading/verification
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#CC1747]"></div>
          <p className="mt-4 text-lg text-gray-600">Verifying payment status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 text-center shadow-lg">
        <div>
          <FontAwesomeIcon icon={faCheckCircle} className="mx-auto h-20 w-20 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Payment Successful!</h2>
          <p className="mt-4 text-gray-600">
            Thank you for enrolling. Your money was received and your transaction has been completed successfully. 
            You now have full access to your course materials.
          </p>
          {sessionId && (
            <p className="mt-2 text-sm text-gray-500">
              Transaction ID: <span className="font-mono">{sessionId.slice(-10)}</span>
            </p>
          )}
        </div>
        <div className="mt-8 space-y-4">
          <Link
            to="/dashboard"
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#CC1747] px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-[#B3123F] focus:outline-none focus:ring-2 focus:ring-[#CC1747] focus:ring-offset-2"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/courses"
            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#CC1747] focus:ring-offset-2"
          >
            Explore More Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
