import { StarRating } from "@/Components/star-rating";
import CommonButton from "@/Components/ui/button";
import { Link } from "react-router-dom";

const RecordedSessionCourseCard = ({
  imgSrc,
  altText,
  title,
  courseProgress,
  rating,
  review,
  courseId,
  progress = 0,
  is_access_revoked,
  last_watched_video_id,
}) => {
  const getCourseLink = () => {
    let base = `/dashboard/${courseId}/recorded?title=${title}`;
    if (last_watched_video_id) {
      base += `&videoId=${last_watched_video_id}`;
    }
    return base;
  };

  const CardContent = (
    <div
      className={`relative rounded-lg bg-[rgb(252,252,252)] shadow-md ${is_access_revoked ? "opacity-70" : ""}`}
    >
      {is_access_revoked && (
        <div className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded bg-white/90 px-2 py-1 text-xs font-bold text-red-600 shadow-sm">
          🔒 Access paused due to unpaid installment.
        </div>
      )}
      <div className="h-[90px] w-full overflow-hidden rounded-t-lg md:h-[120px] lg:h-[190px] xl:h-[206px]">
        <img
          className="h-full w-full object-cover"
          src={imgSrc}
          alt={altText}
        />
      </div>

      <div className="rounded-b-lg px-[7px] py-[6px] text-[14px] text-[#667185] md:py-2 lg:py-[14px] lg:text-[16px]">
        <p className="truncate text-xs md:text-sm lg:text-base">{title}</p>

        {rating ? (
          <div className="flex items-center gap-[10px]">
            <span className="text-sm text-[#667185]">{rating}</span>
            <StarRating rating={rating} />
            <span>{review}</span>
          </div>
        ) : (
          <p className="text-sm italic text-gray-400">No reviews yet...</p>
        )}
      </div>

      <div className="my-[5px] hidden h-[1px] w-full bg-[#F53366] lg:block" />

      <div className="flex flex-col gap-2 px-[7px] pb-2">
        <div className="flex items-center justify-between text-[10px] text-[#667185]">
          <p>{courseProgress}</p>
          <p>{progress > 0 ? `${Math.round(progress)}%` : "0%"}</p>
        </div>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-[#F53366] transition-all duration-300"
            style={{ width: `${Math.max(0, Math.min(100, progress || 0))}%` }}
          />
        </div>

        <CommonButton className="flex w-full flex-col gap-2 pt-1">
          {is_access_revoked ? (
            <>
              <Link
                to={`/preview-course/${courseId}`}
                className="w-full rounded-md bg-[#CC1747] py-2 text-center text-sm font-medium text-white transition-colors hover:bg-[#B3123F]"
              >
                Pay Now
              </Link>
              <p className="cursor-not-allowed text-center text-[10px] text-gray-400">
                {progress > 0 ? "Resume" : "Get started"}
              </p>
            </>
          ) : (
            <p className="text-right text-[14px] text-white">
              {progress > 0 ? "Resume" : "Get started"}
            </p>
          )}
        </CommonButton>
      </div>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-t-lg bg-[rgb(252,252,252)]">
      {is_access_revoked ? (
        CardContent
      ) : (
        <Link to={getCourseLink()}>{CardContent}</Link>
      )}
    </div>
  );
};

export default RecordedSessionCourseCard;
