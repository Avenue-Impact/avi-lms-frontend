
import React from 'react';

const PaymentMethodModal = ({ isOpen, onClose, methods, selectedMethod, onSelectMethod, onProceed, amount, currency, currencySymbol }) => {
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

                <h2 className="mb-6 text-lg font-semibold text-gray-800">Select Payment Method</h2>

                <div className="space-y-3 mb-6">
                    {methods.map((method) => (
                        <div 
                            key={method.id}
                            onClick={() => onSelectMethod(method.id)}
                            className={`flex cursor-pointer items-center rounded-lg border p-4 transition ${
                                selectedMethod === method.id 
                                ? 'border-[#CC1747] ring-1 ring-[#CC1747]' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            {/* Render Logo or Text based on method */}
                            {method.id === 'stripe' && (
                                <span className="text-2xl font-bold text-[#635BFF] tracking-tight">stripe</span>
                            )}
                            {method.id === 'paystack' && (
                                <div className="flex items-center gap-1">
                                    <svg className="h-5 w-auto" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="200" height="200" rx="40" fill="#00C3F7"/>
                                        <path d="M100 0L100 200" stroke="white" strokeWidth="40"/>
                                        <path d="M0 100L200 100" stroke="white" strokeWidth="40"/>
                                    </svg>
                                     <span className="text-xl font-bold text-[#0BA4DB]">paystack</span>
                                </div>
                            )}
                             {method.id === 'bank_transfer' && (
                                <span className="font-medium text-gray-700">Bank Transfer</span>
                            )}
                        </div>
                    ))}
                </div>

                <div className="rounded-lg bg-gray-50 p-6 text-center border border-gray-100">
                    <p className="mb-2 text-sm text-gray-600">You have to pay</p>
                    <p className="text-3xl font-bold text-[#CC1747] mb-4">
                        {currencySymbol}{amount?.toLocaleString()} ({currency})
                    </p>
                    <div className="flex items-start justify-center gap-2 text-xs text-gray-400">
                         <div className="mt-0.5 h-3 w-3 rounded-full bg-gray-400 flex items-center justify-center text-[8px] text-white">✓</div>
                         <p className="w-3/4 text-center">We will take care of all your payment. You can relax while we process your payment</p>
                    </div>
                </div>

                {/* Note: The 'Make Payment' action is triggered by selecting the method in this flow? 
                    Actually, usually you select and then click 'Pay'. 
                    But the design in Image 2 doesn't show a 'Proceed' button INSIDE the modal.
                    It just shows the summary.
                    However, we probably need a way to confirm. 
                    Wait, if I select a method, maybe it AUTO proceeds?
                    Or maybe there is a button I missed?
                    Image 2 cuts off at the summary box.
                    I'll add a proceed button for usability if it's not present, or maybe clicking the method tile is the selection.
                    But to be safe, I'll add a 'Proceed' button.
                */}
                 <button 
                    onClick={onProceed}
                    disabled={!selectedMethod}
                    className={`mt-4 w-full rounded py-3 text-sm font-semibold text-white transition ${
                        selectedMethod ? 'bg-[#CC1747] hover:bg-[#B3123F]' : 'bg-gray-300 cursor-not-allowed'
                    }`}
                >
                    Proceed via {selectedMethod ? methods.find(m => m.id === selectedMethod)?.label : '...'}
                </button>
            </div>
        </div>
    );
};

export default PaymentMethodModal;
