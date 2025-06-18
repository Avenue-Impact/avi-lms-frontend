import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const checkmarkAnimation = keyframes`
  0% {
    stroke-dashoffset: 50;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const AnimatedCheckmark = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto;
  
  .circle {
    stroke: #10B981;
    stroke-width: 3;
    stroke-linecap: round;
    fill: none;
  }
  
  .check {
    stroke: #10B981;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-dasharray: 50;
    stroke-dashoffset: 50;
    animation: ${checkmarkAnimation} 0.6s ease-in-out 0.3s forwards;
    fill: none;
  }
`;

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-32 w-32 mb-4">
            <AnimatedCheckmark>
              <svg viewBox="0 0 52 52">
                <circle className="circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="check" d="M14.1 27.2l7.1 7.2 16.7-16.8" fill="none"/>
              </svg>
            </AnimatedCheckmark>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Thank You!
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            We've received your submission.
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-6">
                Thank you for reaching out to Avenue Impact. We've received your information and our team will review it shortly.
              </p>
              <p className="text-gray-600 mb-8">
                One of our team members will be in touch with you within 24-48 hours to discuss the next steps.
              </p>
              
              {/* <div className="mt-8 border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-500">
                  In the meantime, you can explore our{' '}
                  <Link to="/courses" className="font-medium text-blue-600 hover:text-blue-500">
                    courses
                  </Link>{' '}
                  or check out our{' '}
                  <Link to="/blog" className="font-medium text-blue-600 hover:text-blue-500">
                    blog
                  </Link>.
                </p>
              </div> */}
            </div>

            <div className="mt-6">
              <Link
                to="/"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#CC1747] hover:bg-[#CC1747]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};