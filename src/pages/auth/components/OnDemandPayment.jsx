import React, { useState } from "react";
import DashButton from "../ButtonDash";
import { useParams } from "react-router-dom";
import { usePreviewCourses } from "@/hooks/students/use-fetch-all-courses";
import { useAddPayment } from "@/hooks/students/use-add-payment";

const OnDemandPayment = () => {
  let { courseId } = useParams();
  const { previewCourse, isLoading } = usePreviewCourses(courseId);
  // No need to pass courseId into the hook – it's provided when calling `payment`
  const { payment, paymentPending } = useAddPayment();

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleOnDemandPayment = () => {
    if (!selectedOption) {
      alert("Please select a subscription plan.");
      return;
    }

    payment({
      data: {
        access_type: "on demand",
        subscription_limit: selectedOption,
      },
      courseId,
      // pass the full course object so we can optimistically add it to the dashboard
      course: previewCourse?.data?.data?.course,
    });
  };

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
              key={index.id}
              className="flex items-center space-x-2 rounded border border-gray-300 px-4 py-3"
            >
              <input
                type="radio"
                name="subscription"
                value={item.duration}
                checked={selectedOption === `${item.duration}`}
                onChange={handleOptionChange}
                className="form-radio text-primary-color-600"
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

      {/* Payment on demand */}

      <div className="mt-6 w-full">
        <DashButton
          type="button"
          className="w-full text-white"
          onClick={handleOnDemandPayment}
          disabled={paymentPending}
        >
          {paymentPending ? "Processing..." : "Make Payment"}
          {/* Make Payment */}
        </DashButton>
      </div>
    </div>
  );
};

export default OnDemandPayment;
