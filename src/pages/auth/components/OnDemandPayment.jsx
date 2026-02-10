import React, { useState } from "react";
import DashButton from "../ButtonDash";
import { useParams } from "react-router-dom";
import { usePreviewCourses } from "@/hooks/students/use-fetch-all-courses";
import { useAddPayment } from "@/hooks/students/use-add-payment";

import BankTransferModal from "../../../Components/BankTransferModal";
import PaymentMethodModal from "../../../Components/PaymentMethodModal";
import toast from "react-hot-toast";


const OnDemandPayment = () => {
  let { courseId } = useParams();
  const { previewCourse, isLoading } = usePreviewCourses(courseId);
  const { payment, paymentPending } = useAddPayment(courseId);

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedGateway, setSelectedGateway] = useState("");
  
  // Modal States
  const [showMethodModal, setShowMethodModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankTransferData, setBankTransferData] = useState(null);

  const userLocation = previewCourse?.data?.data?.userLocation;
  const gateways = userLocation?.GATEWAYS?.map(g => ({ id: g, label: g.replace('_', ' ') })) || [{ id: 'stripe', label: 'Stripe' }];
  const currency = userLocation?.currency || 'GBP';
  const currencySymbol = previewCourse?.data?.data?.course?.pre_recorded_price?.[0]?.currency_symbol || '£';
  
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleStartPayment = () => {
    if (!selectedOption) {
      toast.error("Please select a subscription plan.");
      return;
    }
    setShowMethodModal(true);
  };

  const handleProceedPayment = () => {
    if (!selectedGateway) {
        toast.error("Please select a payment method.");
        return;
    }

    const gatewayToUse = selectedGateway;

    payment({
      data: {
        access_type: ["on demand"],
        subscription_limit: selectedOption,
        gateway: gatewayToUse
      },
      courseId,
    }, {
        onSuccess: (data) => {
            setShowMethodModal(false);
            if (data?.data?.url) {
                window.location.href = data.data.url;
            } else if (data?.data?.bankDetails) {
                setBankTransferData(data.data);
                setShowBankModal(true);
            }
        },
        onError: (error) => {
             // Toast handled by hook
        }
    });
  };
  
  // Find selected amount for display in modal
  const selectedPlan = previewCourse?.data?.data.course.pre_recorded_price.find(p => p.duration === selectedOption);
  const amountToPay = selectedPlan ? selectedPlan.amount : 0;

  return (
    <div className="">
      <h3 className="text-[20px] font-[400] text-gray-800 lg:text-[24px]">
        On Demand Course (Pre Recorded Session)
      </h3>

      {/* Radio Button */}
      <div className="space-y-1 py-6">
        {previewCourse?.data?.data.course.pre_recorded_price.map(
          (item, index) => (
            <label
              key={index}
              className={`flex cursor-pointer items-center space-x-2 rounded border px-4 py-3 transition ${
                 selectedOption === item.duration ? 'border-[#CC1747] ring-1 ring-[#CC1747]' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {console.log(item)}
              <input
                type="radio"
                name="subscription"
                value={item.duration}
                checked={String(selectedOption) === String(item.duration)}
                onChange={handleOptionChange}
                className="form-radio h-4 w-4 text-[#CC1747] focus:ring-[#CC1747]"
              />
              <span>
                {item.duration} - {item.currency_symbol}
                {item.amount}
              </span>
            </label>
          ),
        )}
      </div>

      <div className="space-y-2">
        <p className="font-semibold">Enter a promo code</p>
        <div className="flex">
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
            placeholder="Promo code"
          />
          <DashButton className="rounded-none rounded-r-sm px-4 py-2 text-white">
            Apply
          </DashButton>
        </div>
      </div>

      {/* Payment Action */}
      <div className="mt-6 w-full">
        <DashButton
          type="button"
          className="w-full text-white bg-[#CC1747] hover:bg-[#B3123F]"
          onClick={handleStartPayment}
          disabled={paymentPending}
        >
          {paymentPending ? "Processing..." : "Make Payment"}
        </DashButton>
      </div>

       {/* Modals */}
       <PaymentMethodModal 
          isOpen={showMethodModal}
          onClose={() => setShowMethodModal(false)}
          methods={gateways}
          selectedMethod={selectedGateway}
          onSelectMethod={setSelectedGateway}
          onProceed={handleProceedPayment}
          amount={amountToPay}
          currency={currency}
          currencySymbol={currencySymbol}
      />

      {showBankModal && bankTransferData && (
        <BankTransferModal
            isOpen={showBankModal}
            onClose={() => setShowBankModal(false)}
            onBack={() => {setShowBankModal(false); setShowMethodModal(true);}}
            transactionId={bankTransferData.transactionId}
            enrollmentId={bankTransferData.enrollmentId}
            bankDetails={bankTransferData.bankDetails}
            amount={bankTransferData.amount}
            currency={bankTransferData.currency}
        />
      )}
    </div>
  );
};

export default OnDemandPayment;
