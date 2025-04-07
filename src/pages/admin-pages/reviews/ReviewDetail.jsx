import { StarRating } from "@/Components/star-rating";
import { useDeleteReview } from "@/hooks/review/use-delete-review";
import { useFetchReviews } from "@/hooks/review/use-fetch-reviews";
import { formatDate } from "@/lib/utils";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ReviewDetail = () => {
  const [loadingDeleteId, setLoadingDeteleId] = useState(null);

  const { id } = useParams();
  const { data, isLoading, error } = useFetchReviews(id);
  // console.log("This is the courseId", data);

  const { delReview, isPending } = useDeleteReview();

  const deleteReview = (reviewId) => {
    setLoadingDeteleId(reviewId);
    delReview({
      courseId: id,
      reviewId: reviewId,
    }),
      {
        onSettled: () => setLoadingDeteleId(null), // Reset after API call
      };
  };

  return (
    <div className="min-h-screen py-10">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        <p>{error?.response?.data?.message ?? "Something went wrong"}</p>
      ) : (
        <div className="w-full max-w-3xl space-y-6">
          {data?.data?.length < 1 ? (
            <p className="text-sm italic text-gray-400">No reviews yet...</p>
          ) : (
            data?.data?.map((review) => (
              <div
                key={review.id}
                className="rounded-lg bg-white p-4 shadow-md md:flex-row"
              >
                <div className="flex flex-row items-center justify-between">
                  {/* User Profile */}
                  <div className="flex flex-row gap-3">
                    <div className="flex-shrink-0">
                      <img
                        src={
                          review?.user_id?.avatar ||
                          "https://i.pravatar.cc/150?img=3"
                        }
                        alt="User Avatar"
                        className="h-12 w-12 rounded-full"
                      />
                    </div>

                    {/* Review Content */}
                    <div className="flex-1">
                      <h3 className="font-bold capitalize text-[#101928]">
                        {review.user_id?.firstname} {review.user_id?.lastname}
                      </h3>
                      <p className="text-[14px] text-[#475367]">
                        {review.user_id?.email}
                      </p>
                    </div>
                  </div>

                  <button
                    className={`self-start rounded-md px-4 py-2 font-[16px] text-white ${
                      loadingDeleteId === review.id
                        ? "bg-[#f87195]"
                        : "bg-[#CC1747] hover:bg-[#f87195]"
                    }`}
                    onClick={() => deleteReview(review.id)}
                    disabled={loadingDeleteId}
                  >
                    {loadingDeleteId === review.id
                      ? "Deleting"
                      : "Delete Review"}
                  </button>
                </div>

                <div>
                  {/* Rating and Date */}
                  <div className="mt-1 flex items-center gap-2 text-yellow-500">
                    <span>
                      {review.rating ? (
                        <div className="text-yellow-500gap-[10px] flex items-center">
                          <StarRating
                            className="text-yellow-500"
                            rating={review.rating}
                          />
                        </div>
                      ) : (
                        <p className="text-sm italic text-gray-400">
                          No reviews available...
                        </p>
                      )}
                    </span>{" "}
                    <span className="text-[12px] text-[#667185]">
                      {review.created_at
                        ? formatDate(review.created_at)
                        : "Date unavailable"}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="mt-2 text-justify text-[14px] text-[#667185]">
                    {review.content || (
                      <p className="text-sm italic text-gray-400">No comment</p>
                    )}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewDetail;
