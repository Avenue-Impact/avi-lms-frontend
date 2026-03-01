
import React from 'react';

const PaymentPlanModal = ({ isOpen, onClose, onSelectPlan, currencySymbol, price, installmentPrice }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-sans">
            <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
                 <button 
                    onClick={onClose} 
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                <h2 className="mb-6 text-xl font-semibold text-gray-800">Choose Payment Plan</h2>

                <div className="space-y-4">
                    {/* Pay In Full Card */}
                    <div className="rounded-lg border border-gray-200 p-6 text-center hover:border-gray-300">
                        <h3 className="mb-4 text-lg font-medium text-gray-700">Pay In Full</h3>
                        <div className="mb-2 text-4xl font-bold text-[#CC1747]">
                            {currencySymbol}{price?.toLocaleString()}
                        </div>
                        <p className="mb-4 text-sm text-gray-500">One-time Payment</p>
                        <hr className="my-4 border-gray-100" />
                        <p className="mb-6 text-sm text-gray-600">Full access immediately</p>
                        <button 
                            onClick={() => onSelectPlan('full')}
                            className="w-full rounded bg-[#CC1747] py-3 text-sm font-semibold text-white transition hover:bg-[#B3123F]"
                        >
                            Make Payment
                        </button>
                    </div>

                    {/* Pay In Installments Card */}
                    <div className="rounded-lg border border-gray-200 p-6 text-center hover:border-gray-300">
                         <h3 className="mb-4 text-lg font-medium text-gray-700">Pay In Installments</h3>
                         <div className="mb-2 flex items-baseline justify-center text-4xl font-bold text-[#CC1747]">
                            {currencySymbol}{installmentPrice?.toLocaleString()}
                            <span className="ml-1 text-base font-normal text-gray-500">/month</span>
                        </div>
                        <p className="mb-4 text-sm font-medium text-gray-700">x 5 months</p>
                        <hr className="my-4 border-gray-100" />
                        <p className="mb-4 text-sm text-gray-400">Spread Payments over 5 months</p>
                        
                        <div className="mb-6 flex items-start justify-center gap-2 text-xs text-gray-500">
                             <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#CC1747] text-[10px] text-white">!</span>
                             <span className="text-left w-4/5 text-gray-500">Missed payment will temporarily lock this course</span>
                        </div>

                        <button 
                             onClick={() => onSelectPlan('installment')}
                             className="w-full rounded bg-[#CC1747] py-3 text-sm font-semibold text-white transition hover:bg-[#B3123F]"
                        >
                            Make Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPlanModal;
