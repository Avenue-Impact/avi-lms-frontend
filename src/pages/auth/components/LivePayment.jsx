import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import DashButton from "../ButtonDash";
import { PreviewVideoSelect } from "./DashSelect";
import { useParams } from "react-router-dom";
import { usePreviewCourses } from "@/hooks/students/use-fetch-all-courses";
import { useAddPayment } from "@/hooks/students/use-add-payment";
import { useAddToWishlist } from "@/hooks/students/use-add-to-wishlist";
import { useRemoveFromWishlist } from "@/hooks/students/use-remove-from-wishlist";

const LivePayment = () => {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  let { courseId } = useParams();
  const { previewCourse, isLoading } = usePreviewCourses(courseId);
  const { payment, paymentPending } = useAddPayment(courseId);

  const handleEnroll = async () => {
    if (!selectedCourseId) {
      alert("Please select a cohort.");
      return;
    }

    payment({
      data: {
        access_type: "live class",
        live_class_cohort: selectedCourseId,
      },
      courseId,
    });
  };

  const [addedToWishList, setAddedToWishList] = useState(false);
  const { mutate, isPending } = useAddToWishlist();
  const { removeFromList, isRemoving } = useRemoveFromWishlist();
  const handleAddToWishlist = () => {
    mutate(
      { courseId },
      {
        onSuccess: () => {
          setAddedToWishList(true);
        },
      },
    );
  };

  const handleRemoveFromWishlist = () => {
    removeFromList(
      { courseId },
      {
        onSuccess: () => {
          setAddedToWishList(false);
        },
      },
    );
  };

  const original_price =
    previewCourse?.data?.data.course.live_class_price.original_price.amount;
  const discounted_price =
    previewCourse?.data?.data.course.live_class_price.discounted_price.amount;

  const finalAmount =
    original_price - (original_price * discounted_price) / 100;

  return (
    
      <div className="">
        <h3 className="text-[20px] font-[400] text-gray-800 lg:text-[24px]">
          Live session + Mentoring (May Cohorts - 3.5 Months Programme)
        </h3>

        <div className="py-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-[25px] font-[600] text-gray-800">
              {/* Price £2,200 */}
              {
                previewCourse?.data?.data.course.live_class_price.original_price
                  .currency_symbol
              }

              {original_price}
            </h3>
            <p className="text-[20px] font-[400] line-through">
              {/* £39,900 */}
              {
                previewCourse?.data?.data.course.live_class_price
                  .discounted_price.currency_symbol
              }

              {discounted_price}
            </p>
            <p className="font-[bold] text-[13.42px] text-gray-500">
              {finalAmount}% off
            </p>
          </div>

          <p className="mt-2 text-gray-600">
            Every{" "}
            {previewCourse?.data?.data.course.live_class_price.duration.replace(
              /\b\w/g,
              (char) => char.toUpperCase(),
            )}{" "}
            {previewCourse?.data?.data.course.live_class_price.time}
            {/* 7PM */}
          </p>
        </div>

        <div className="">
          <p className="font-[600] text-gray-600">Select Cohort</p>
          <PreviewVideoSelect
            selectedCourseId={selectedCourseId}
            setSelectedCourseId={setSelectedCourseId}
            // cohort={previewCourse}
          />
        </div>

        <div className="mt-6 space-y-2">
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

        {/* Payment Page on Live Session*/}
        <div className="grid w-full grid-cols-12 gap-3 py-4">
          <div className="col-span-10 mt-4 rounded bg-[#CC1747] text-center text-white transition duration-300 hover:bg-[#B3123F]">
            <DashButton
              type="button"
              className="bg-transparent text-white hover:bg-transparent"
              onClick={handleEnroll}
              disabled={paymentPending}
            >
              {paymentPending ? "Processing..." : "Make Payment"}
            </DashButton>
          </div>

          <div className="col-span-2 pt-4">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border-[1px]"
              style={{ borderColor: "#CC1747" }}
              type="button"
              onClick={
                addedToWishList ? handleRemoveFromWishlist : handleAddToWishlist
              }
              disabled={isPending || isRemoving}
            >
              {addedToWishList ? (
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-[#CC1747]"
                  style={{ borderColor: "#CC1747" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-[#00002]"
                  style={{ borderColor: "#CC1747" }}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    
  );
};

export default LivePayment;
