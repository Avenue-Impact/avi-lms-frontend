import { StarRating } from "@/Components/star-rating";
import { useFetchDeletedReviews } from "@/hooks/review/use-fetch-deleted-reviews";
import { useRestoreReview } from "@/hooks/review/use-update-restore-review";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import { useParams } from "react-router-dom";

const RestoredDeletedReview = () => {
  const [loadingReviewId, setLoadingReviewId] = useState(null);

  const { id } = useParams();
  const { data, isLoading, error } = useFetchDeletedReviews(id);
  const { restoreReview, isPending } = useRestoreReview();
  // console.log("This is the data for restore review", data);

  const restoredReview = (reviewId) => {
    setLoadingReviewId(reviewId);
    restoreReview({
      courseId: id,
      reviewId: reviewId,
    }),
      {
        onSettled: () => setLoadingReviewId(null),
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
            <p className="text-sm italic text-gray-400">
              No deleted reviews yet...
            </p>
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
                      loadingReviewId === review.id
                        ? "bg-[#f87195]"
                        : "bg-[#CC1747] hover:bg-[#f87195]"
                    }`}
                    onClick={() => restoredReview(review.id)}
                    disabled={isPending}
                  >
                    {isPending && loadingReviewId === review.id
                      ? "Restoring"
                      : "Restore Review"}
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
                    {/* ⭐⭐⭐⭐⭐{" "} */}
                    <span className="text-[12px] text-[#667185]">
                      {review.created_at
                        ? formatDate(review.created_at)
                        : "No date"}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="mt-2 text-justify text-[14px] text-[#667185]">
                    {review.content || "No comment"}
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

export default RestoredDeletedReview;
