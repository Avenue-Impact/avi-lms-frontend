import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import DashButton from "../ButtonDash";
import { PreviewVideoSelect } from "./DashSelect";
import { useParams, useNavigate } from "react-router-dom";
// import { usePreviewCourses } from "@/hooks/students/use-fetch-all-courses";
import { useAddPayment } from "@/hooks/students/use-add-payment";
import { useAddToWishlist } from "@/hooks/students/use-add-to-wishlist";
import { useRemoveFromWishlist } from "@/hooks/students/use-remove-from-wishlist";
import BankTransferModal from "../../../Components/BankTransferModal";
import PaymentPlanModal from "../../../Components/PaymentPlanModal";
import PaymentMethodModal from "../../../Components/PaymentMethodModal";
import InstallmentModal from "../../../Components/InstallmentModal";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";



const LivePayment = ({ courseData }) => {
  const navigate = useNavigate();
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showInstallmentModal, setShowInstallmentModal] = useState(false);
  const [showMethodModal, setShowMethodModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);

  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedPlan, setSelectedPlan] = useState('full'); // 'full' or 'installment'
  const [installmentData, setInstallmentData] = useState(null);
  const [selectedGateway, setSelectedGateway] = useState("");
  const [bankTransferData, setBankTransferData] = useState(null);

  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  let { courseId } = useParams();
  const previewCourse = courseData;
  // const { previewCourse, isLoading } = usePreviewCourses(courseId);
  const { payment, paymentPending } = useAddPayment(courseId);

  const userLocation = previewCourse?.data?.data?.userLocation;
  const gateways = userLocation?.GATEWAYS?.map(g => ({ id: g, label: g.replace('_', ' ') })) || [{ id: 'stripe', label: 'Stripe' }];
  const currency = userLocation?.currency || 'GBP';
  const selectedCohort = previewCourse?.data?.data?.pricing?.live?.find(c => c.id === selectedCourseId) || previewCourse?.data?.data?.course?.cohorts?.find(c => c.id === selectedCourseId);
  const currencySymbol = selectedCohort?.currency_symbol || previewCourse?.data?.data?.course?.live_class_price?.original_price?.currency_symbol || '£';

  const original_price = selectedCohort?.original_price?.amount || 0;
  let discounted_price = selectedCohort?.discounted_price?.amount || 0;

  // Override price if promo applied
  if (appliedPromo && appliedPromo.final_price !== undefined) {
    discounted_price = appliedPromo.final_price;
  }

  const percentageOff = original_price ? ((original_price - discounted_price) * 100) / original_price : 0;

  // Calculate mock installment price for display if not available from backend
  const installmentPrice = Math.round(discounted_price / 5);


  const handleStartPayment = () => {
    if (!selectedCourseId) {
      toast.error("Please select a cohort.");
      return;
    }

    if (Math.round(discounted_price) <= 0) {
      // Enrol directly without payment method modal
      payment({
        data: {
          access_type: ["live class"],
          live_class_cohort: selectedCohort?.cohort,
          gateway: "free",
          payment_plan: "full",
          ...(appliedPromo && { promocode: appliedPromo.promo.code })
        },
        courseId,
      }, {
        onSuccess: () => {
          toast.success("Enrolled successfully!");
          navigate("/dashboard");
        }
      });
      return;
    }

    setShowPlanModal(true);
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowPlanModal(false);
    if (plan === 'installment') {
      setShowInstallmentModal(true);
    } else {
      setShowMethodModal(true);
    }
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
    if (!selectedCourseId) {
      toast.error("Please select a cohort first");
      return;
    }

    setIsApplyingPromo(true);
    try {
      const baseUrl = import.meta.env.VITE_AUTH_URL.replace("/auth", "");
      const res = await axios.post(`${baseUrl}/courses/apply-promo`, {
        code: promoInput,
        courseId,
        cohortId: selectedCourseId,
        type: "live"
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

    // Use the selected gateway
    const gatewayToUse = selectedGateway;

    payment({
      data: {
        access_type: ["live class"],
        live_class_cohort: selectedCohort?.cohort,
        gateway: gatewayToUse,
        payment_plan: selectedPlan,
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
        if (Math.round(discounted_price) <= 0 || data?.data?.isFree) {
          toast.success("Enrolled successfully!");
          navigate("/dashboard");
        }else if (data?.data?.url) {
          window.location.href = data.data.url;
        } else if (data?.data?.bankDetails) {
          setBankTransferData(data.data);
          setShowBankModal(true);
        }
      }
    });
  };


  const [addedToWishList, setAddedToWishList] = useState(false);
  const { mutate, isPending } = useAddToWishlist();
  const { removeFromList, isRemoving } = useRemoveFromWishlist();
  const handleAddToWishlist = () => {
    mutate(
      { courseId },
      { onSuccess: () => setAddedToWishList(true) }
    );
  };

  const handleRemoveFromWishlist = () => {
    removeFromList(
      { courseId },
      { onSuccess: () => setAddedToWishList(false) }
    );
  };

  if (!previewCourse?.data?.data?.pricing?.live?.length) {
    return (
      <div className="py-8 text-center bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500 font-medium">This course does not offer live session access at the moment.</p>
      </div>
    );
  }

  return (
    <div className="">
      <h3 className="text-[20px] font-[400] text-gray-800 lg:text-[24px]">
        Live session + Mentoring
      </h3>

      <div className="py-4">
        {!selectedCourseId ? (
          <p className="text-gray-600 font-medium italic">Please select a cohort below to view pricing.</p>
        ) : (
          <>
            <div className="flex items-center space-x-4">
              <h3 className="text-[25px] font-[600] text-gray-800">
                {currencySymbol}{Math.round(discounted_price)}
              </h3>
              {discounted_price < original_price && (
                <>
                  <p className="text-[20px] font-[400] line-through text-gray-500">
                    {currencySymbol}{Math.round(original_price)}
                  </p>
                  <p className="font-[bold] text-[13.42px] text-green-600 bg-green-100 px-2 py-1 rounded">
                    {percentageOff.toFixed(0)}% off
                  </p>
                </>
              )}
            </div>

            <p className="mt-2 text-gray-600">
              {selectedCohort?.class_days ? selectedCohort?.class_days : ""}
              {selectedCohort?.time ? selectedCohort?.time : ""}
            </p>
          </>
        )}
      </div>

      <div className="">
        <p className="font-semibold text-gray-600">Select Cohort</p>
        <PreviewVideoSelect
          selectedCourseId={selectedCourseId}
          setSelectedCourseId={setSelectedCourseId}
        />
      </div>

      <div className="mt-6 space-y-2">
        <p className="font-semibold">Enter a promo code</p>
        <div className="flex">
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 focus:outline-none disabled:bg-gray-100"
            placeholder="Promo code"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            disabled={isApplyingPromo || !selectedCourseId}
          />
          <DashButton
            type="button"
            className="rounded-none outline-none focus:outline-none rounded-r-sm px-4 py-2 text-white bg-black hover:bg-black/90"
            onClick={handleApplyPromo}
            disabled={isApplyingPromo || !promoInput || !selectedCourseId}
          >
            {isApplyingPromo ? "..." : (appliedPromo ? "Applied" : "Apply")}
          </DashButton>
        </div>
      </div>

      {/* Payment Button - Triggers Modal Flow */}
      <div className="grid w-full grid-cols-12 gap-3 py-4">
        <div className="col-span-10 mt-4 rounded bg-[#CC1747] text-center text-white transition duration-300 hover:bg-[#B3123F]">
          <DashButton
            type="button"
            className="bg-transparent text-white hover:bg-transparent"
            onClick={handleStartPayment}
            disabled={paymentPending}
          >
            {paymentPending ? "Processing..." : (Math.round(discounted_price) <= 0 ? "Complete Enrollment" : "Make Payment")}
          </DashButton>
        </div>

        <div className="col-span-2 pt-4">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border-[1px]"
            style={{ borderColor: "#CC1747" }}
            type="button"
            onClick={addedToWishList ? handleRemoveFromWishlist : handleAddToWishlist}
            disabled={isPending || isRemoving}
          >
            <FontAwesomeIcon
              icon={faHeart}
              className={addedToWishList ? "text-[#CC1747]" : "text-[#00002]"}
              style={{ borderColor: "#CC1747" }}
            />
          </button>
        </div>
      </div>

      {/* Modals */}
      <PaymentPlanModal
        isOpen={showPlanModal}
        onClose={() => setShowPlanModal(false)}
        onSelectPlan={handleSelectPlan}
        currencySymbol={currencySymbol}
        price={Math.round(discounted_price)}
        installmentPrice={installmentPrice}
      />

      <InstallmentModal
        isOpen={showInstallmentModal}
        onClose={() => setShowInstallmentModal(false)}
        onProceed={handleInstallmentProceed}
        currencySymbol={currencySymbol}
        price={Math.round(discounted_price)}
      />

      <PaymentMethodModal
        isOpen={showMethodModal}
        onClose={() => setShowMethodModal(false)}
        methods={gateways}
        selectedMethod={selectedGateway}
        onSelectMethod={setSelectedGateway}
        onProceed={handleProceedPayment}
        amount={Math.round(discounted_price)} // Use calculated price based on plan if implemented
        currency={currency}
        currencySymbol={currencySymbol}
      />

      {showBankModal && bankTransferData && (
        <BankTransferModal
          isOpen={showBankModal}
          onClose={() => setShowBankModal(false)}
          onBack={() => { setShowBankModal(false); setShowMethodModal(true); }}
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

export default LivePayment;
