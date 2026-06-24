import React, { useState, useEffect } from "react";
import DashButton from "../ButtonDash";
import { useParams } from "react-router-dom";
// import { usePreviewCourses } from "@/hooks/students/use-fetch-all-courses";
import { useAddPayment } from "@/hooks/students/use-add-payment";

import BankTransferModal from "../../../Components/BankTransferModal";
import PaymentMethodModal from "../../../Components/PaymentMethodModal";
import PaymentPlanModal from "../../../Components/PaymentPlanModal";
import InstallmentModal from "../../../Components/InstallmentModal";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";


const OnDemandPayment = ({ courseData }) => {
  let { courseId } = useParams();
  const previewCourse = courseData;
  // const { previewCourse, isLoading } = usePreviewCourses(courseId);
  const { payment, paymentPending } = useAddPayment(courseId);

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedGateway, setSelectedGateway] = useState("");
  
  // Modal States
  const [showMethodModal, setShowMethodModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showPaymentPlanModal, setShowPaymentPlanModal] = useState(false);
  const [showInstallmentModal, setShowInstallmentModal] = useState(false);
  
  const [selectedPlan, setSelectedPlan] = useState('full');
  const [installmentData, setInstallmentData] = useState(null);
  const [bankTransferData, setBankTransferData] = useState(null);

  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [amountToPay, setAmountToPay] = useState(0);

  const userLocation = previewCourse?.data?.data?.userLocation;
  const gateways = userLocation?.GATEWAYS?.map(g => ({ id: g, label: g.replace('_', ' ') })) || [{ id: 'stripe', label: 'Stripe' }];
  const currency = userLocation?.currency || 'GBP';
  const currencySymbol = previewCourse?.data?.data?.course?.pre_recorded_price?.[0]?.original_price?.currency_symbol || '£';
  
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleStartPayment = () => {
    if (!selectedOption) {
      toast.error("Please select a subscription plan.");
      return;
    }
    if (Math.round(amountToPay) <= 0) {
      // Enrol directly without payment method modal
      payment({
        data: {
          access_type: ["on demand"],
          subscription_limit: selectedOption,
          gateway: "free",
          payment_plan: "full",
          ...(appliedPromo && { promocode: appliedPromo.promo.code })
        },
        courseId,
      }, {
          onSuccess: (data) => {
              if (data?.data?.url) {
                  window.location.href = data.data.url;
              }
          }
      });
      return;
    }
    setShowPaymentPlanModal(true);
  };

  const handleInstallmentProceed = (data) => {
    setInstallmentData(data);
    setShowInstallmentModal(false);
    setShowMethodModal(true);
  };

  const handleApplyPromo = async () => {
    if (!promoInput) {
        toast.error("Please enter a promo code");
        return;
    }
    if (!selectedOption) {
        toast.error("Please select a subscription plan first");
        return;
    }

    setIsApplyingPromo(true);
    try {
        const baseUrl = import.meta.env.VITE_AUTH_URL.replace("/auth", "");
        const res = await axios.post(`${baseUrl}/courses/apply-promo`, {
            code: promoInput,
            courseId,
            duration: selectedOption,
            type: "on_demand"
        }, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` }
        });
        
        if (res.data?.status === "success") {
            setAppliedPromo(res.data.data);
            toast.success("Promo code applied successfully!");
        }
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to apply promo code");
        setAppliedPromo(null);
    } finally {
        setIsApplyingPromo(false);
    }
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
        gateway: gatewayToUse,
        payment_plan: selectedPlan === 'installment' ? 'installment' : 'full',
        ...(selectedPlan === 'installment' && installmentData ? {
            installment_duration: installmentData.duration,
            auto_deduct: installmentData.autoDeduct,
            first_payment_date: installmentData.startDate
        } : {}),
        ...(appliedPromo && { promocode: appliedPromo.promo.code })
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
  useEffect(() => {
    const selectedPlan = previewCourse?.data?.data?.pricing?.on_demand?.find((p) => p.duration === selectedOption);
    let calculatedAmount = 0;
    
    if (selectedPlan) {
      calculatedAmount = selectedPlan.discounted_price?.amount 
                    ?? selectedPlan.amount 
                    ?? selectedPlan.original_price?.amount 
                    ?? 0;
    }
    
    if (appliedPromo && appliedPromo.final_price !== undefined) {
      calculatedAmount = appliedPromo.final_price;
    }
    
    setAmountToPay(calculatedAmount);
  }, [selectedOption, previewCourse, appliedPromo]);

  let maxInstallments = 5;
  let isWeekly = false;

  if (selectedOption === "One Month Access") {
    maxInstallments = 4;
    isWeekly = true;
  } else if (selectedOption === "3 Months Access") {
    maxInstallments = 3;
  }

  const installmentPrice = amountToPay ? Math.round(amountToPay / maxInstallments) : 0;

  if (!previewCourse?.data?.data?.pricing?.on_demand?.length) {
    return (
      <div className="py-8 text-center bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500 font-medium">This course does not offer on-demand access at the moment.</p>
      </div>
    );
  }

  return (
    <div className="">
      <h3 className="text-[20px] font-[400] text-gray-800 lg:text-[24px]">
        On Demand Course (Pre Recorded Session)
      </h3>

      {/* Radio Button */}
      <div className="space-y-1 py-6">
        {previewCourse?.data?.data.pricing.on_demand.map(
          (item, index) => {
            const originalAmount = item.original_price?.amount ?? item.amount ?? 0;
            const discountedAmount = item.discounted_price?.amount ?? item.amount ?? 0;
            const hasDiscount = discountedAmount < originalAmount;
            const currencySym = item.original_price?.currency_symbol || item.currency_symbol || '£';

            return (
            <label
              key={index}
              className={`flex cursor-pointer items-center space-x-2 rounded border px-4 py-3 transition ${
                 selectedOption === item.duration ? 'border-[#CC1747] ring-1 ring-[#CC1747]' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="subscription"
                value={item.duration}
                checked={String(selectedOption) === String(item.duration)}
                onChange={handleOptionChange}
                className="form-radio h-4 w-4 text-[#CC1747] focus:ring-[#CC1747]"
              />
              <span className="flex flex-col">
                <span className="font-medium">{item.duration}</span>
                <span className="flex items-center gap-2">
                    <span className="font-bold text-[#CC1747]">
                        {currencySym}{discountedAmount}
                    </span>
                    {hasDiscount && (
                        <span className="text-sm text-gray-500 line-through">
                            {currencySym}{originalAmount}
                        </span>
                    )}
                </span>
              </span>
            </label>
          )},
        )}
      </div>

      <div className="space-y-2">
        <p className="font-semibold">Enter a promo code</p>
        <div className="flex">
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 focus:outline-none disabled:bg-gray-100"
            placeholder="Promo code"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            disabled={isApplyingPromo || !selectedOption}
          />
          <DashButton 
             type="button"
             className="rounded-none outline-none focus:outline-none rounded-r-sm px-4 py-2 text-white bg-black hover:bg-black/90"
             onClick={handleApplyPromo}
             disabled={isApplyingPromo || !promoInput || !selectedOption}
          >
            {isApplyingPromo ? "..." : (appliedPromo ? "Applied" : "Apply")}
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
          {paymentPending ? "Processing..." : (Math.round(amountToPay) <= 0 ? "Complete Enrollment" : "Make Payment")}
        </DashButton>
      </div>

       {/* Modals */}
       <PaymentPlanModal 
          isOpen={showPaymentPlanModal}
          onClose={() => setShowPaymentPlanModal(false)}
          onSelectPlan={(plan) => {
              setSelectedPlan(plan);
              setShowPaymentPlanModal(false);
              if (plan === 'installment') {
                  setShowInstallmentModal(true);
              } else {
                  setShowMethodModal(true);
              }
          }}
          currencySymbol={currencySymbol}
          price={amountToPay}
          installmentPrice={installmentPrice}
          maxInstallments={maxInstallments}
          isWeekly={isWeekly}
      />

      <InstallmentModal
          isOpen={showInstallmentModal}
          onClose={() => setShowInstallmentModal(false)}
          onProceed={handleInstallmentProceed}
          currencySymbol={currencySymbol}
          price={amountToPay}
          maxInstallments={maxInstallments}
          isWeekly={isWeekly}
      />

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
