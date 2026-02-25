import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 text-center shadow-lg">
        <div>
          <FontAwesomeIcon icon={faTimesCircle} className="mx-auto h-20 w-20 text-red-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Payment Unsuccessful</h2>
          <p className="mt-4 text-gray-600">
            Your payment was aborted or declined. No charges have been made to your account. 
            If you experienced an issue, you can try again or select a different payment method.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <button
            onClick={() => navigate(-1)} // Takes them back to the previous page (the course enrollment)
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#CC1747] px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-[#B3123F] focus:outline-none focus:ring-2 focus:ring-[#CC1747] focus:ring-offset-2"
          >
            Try Again
          </button>
          <Link
            to="/dashboard"
            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#CC1747] focus:ring-offset-2"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
