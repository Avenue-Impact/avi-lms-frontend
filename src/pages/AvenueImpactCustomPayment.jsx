import React from "react";
import { Link } from "react-router-dom";
import Container from "@/Components/Container";

const AvenueImpactCustomPayment = () => {
  return (
    <div className=" bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Container>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 sm:px-10 border border-gray-100 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D50241] to-[#D50241]/90"></div>
            
            <div className="text-center mb-8">
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                Custom Payment
              </h2>
            </div>

            <div className="space-y-6 text-center">
              <p className="text-gray-700 text-base leading-relaxed">
                Custom payment has been initiated, click on the button to make payment
              </p>
              <div className="pt-4">
                <a
                  href="https://buy.stripe.com/6oEdUhbo77U1ebe4gx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#D50241] hover:bg-[#D50241]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Make Payment
                </a>
              </div>
              
              <div className="mt-6 flex items-center justify-center text-sm">
                <span className="text-gray-400 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  Payments are securely processed by Stripe
                </span>
              </div>
            </div>
            
            <div className="mt-8 border-t border-gray-100 pt-6 text-center">
              <Link
                to="/"
                className="text-sm font-medium text-[#D50241] hover:text-[#D50241]/90 transition-colors"
              >
                &larr; Back to Home
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AvenueImpactCustomPayment;
