import { StarRating } from "@/Components/star-rating";
import CommonButton from "@/Components/ui/button";
import { Link } from "react-router-dom";
import fallbackCourseImage from "@/assets/images/join_team.png";

const LiveSessionCourseCard = ({
  imgSrc,
  altText,
  title,
  courseProgress,
  rating,
  review,
  courseId,
  cohortId,
  progress = 0,
  is_access_revoked,
  last_watched_video_id,
  enrollmentId,
  access_expires_at,
}) => {
  const getCourseLink = () => {
    let base = `/dashboard/${courseId}/live?title=${title}&cohortId=${cohortId}`;
    if (last_watched_video_id) {
      base += `&videoId=${last_watched_video_id}`;
    }
    return base;
  };

  const isExpired = access_expires_at && new Date() > new Date(access_expires_at);

  const CardContent = (
    <div
      className={`relative flex h-full flex-col rounded-lg bg-[rgb(252,252,252)] shadow-md ${is_access_revoked || isExpired ? "opacity-70" : ""}`}
    >
      {is_access_revoked && (
        <div className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded bg-white/90 px-2 py-1 text-xs font-bold text-red-600 shadow-sm">
           Access paused due to unpaid installment.
        </div>
      )}
      {!is_access_revoked && isExpired && (
        <div className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded bg-white/90 px-2 py-1 text-xs font-bold text-red-600 shadow-sm">
          Course access has expired.
        </div>
      )}
      <div className="h-[90px] w-full overflow-hidden rounded-t-lg md:h-[120px] lg:h-[190px] xl:h-[206px]">
        <img
          className="h-full w-full object-cover"
          src={imgSrc}
          alt={altText}
          onError={(e) => {
            e.target.src = fallbackCourseImage;
          }}
        />
      </div>

      <div className="rounded-b-lg px-[7px] py-[6px] text-[14px] text-[#667185] md:py-2 lg:py-[14px] lg:text-[16px]">
        <p className="truncate text-xs font-medium md:text-sm lg:text-base">
          {title}
        </p>

        {/* {rating ? (
          <div className="mt-1 flex items-center gap-[10px]">
            <span className="text-sm text-[#667185]">{rating}</span>
            <StarRating rating={rating} />
            <span className="text-xs text-gray-400">({review})</span>
          </div>
        ) : (
          <p className="text-sm italic text-gray-400">No reviews yet...</p>
        )} */}
      </div>

      <div className="my-[5px] hidden h-[1px] w-full bg-gray-100 lg:block" />

      <div className="mt-auto flex flex-col gap-2 px-[7px] pb-4">
        <div className="flex items-center justify-between text-[10px] text-[#667185]">
          <p>{courseProgress}</p>
          <p>{progress > 0 ? `${Math.round(progress)}%` : "0%"}</p>
        </div>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 mb-2">
          <div
            className="h-full rounded-full bg-[#F53366] transition-all duration-300"
            style={{ width: `${Math.max(0, Math.min(100, progress || 0))}%` }}
          />
        </div>

        <CommonButton className={`flex w-full flex-col gap-2 pt-1 ${isExpired && !is_access_revoked ? "cursor-not-allowed bg-gray-400 opacity-70" : ""}`}>
          {is_access_revoked ? (
            <>
              <Link
                to={`/dashboard/pay-installment/${enrollmentId}?courseId=${courseId}`}
                className="w-full rounded-md bg-[#CC1747] py-2 text-center text-sm font-medium text-white transition-colors hover:bg-[#B3123F]"
              >
                Pay Now
              </Link>
              <p className="cursor-not-allowed text-center text-[10px] text-gray-400">
                {progress > 0 ? "Resume" : "Get started"}
              </p>
            </>
          ) : isExpired ? (
            <p className="text-center text-[14px] font-medium text-white">
              Access Expired
            </p>
          ) : (
            <p className="text-right text-[14px] font-medium text-white">
              {progress > 0 ? "Resume" : "Get started"}
            </p>
          )}
        </CommonButton>
      </div>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-t-lg bg-[rgb(252,252,252)]">
      {is_access_revoked || isExpired ? (
        CardContent
      ) : (
        <Link to={getCourseLink()}>{CardContent}</Link>
      )}
    </div>
  );
};

export default LiveSessionCourseCard;
