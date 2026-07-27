import { Link } from "react-router-dom";
import { StarRating } from "./star-rating";

const DashboardDiscover = ({
  imgSrc,
  altText,
  title,
  courseProgress,
  rating,
  review,
  courseId,
  cohortId,
}) => {
  const progressVal = typeof courseProgress === "number"
    ? courseProgress
    : parseInt(courseProgress, 10) || 0;

  return (
    <div className="overflow-hidden rounded-t-lg bg-[rgb(252,252,252)]">
      <Link to={`/dashboard/${courseId}/share-documents?title=${title}`}>
        <div className="rounded-lg bg-[rgb(252,252,252)] shadow-md hover:shadow-lg transition-shadow duration-200">
          <div className="h-[90px] w-full overflow-hidden rounded-t-lg md:h-[120px] lg:h-[190px] xl:h-[206px]">
            <img
              className="h-full w-full object-cover"
              src={imgSrc}
              alt={altText}
            />
          </div>

          <div className="rounded-b-lg px-3 py-3 text-[14px] text-[#667185]">
            <p className="truncate text-xs md:text-sm lg:text-base font-semibold text-slate-800">{title}</p>

            {rating ? (
              <div className="flex items-center gap-[10px] mt-1.5">
                <span className="text-sm text-[#667185]">{rating}</span>
                <StarRating rating={rating} />
                <span>{review}</span>
              </div>
            ) : (
              <p className="text-sm italic text-gray-400 mt-1.5">No reviews yet...</p>
            )}

            {/* Progress Bar */}
            <div className="mt-3.5">
              <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium">
                <span>Progress</span>
                <span>{progressVal}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1 overflow-hidden border border-gray-50">
                <div
                  className="bg-gradient-to-r from-[#CC1747] to-[#F53366] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressVal}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="my-[2px] hidden h-[1px] w-full bg-gray-100 lg:block" />

          <div className="flex items-center justify-between px-3 pb-3 pt-1">
            <p className="text-[11px] font-medium text-gray-400">
              {progressVal === 0 ? "Not started" : progressVal === 100 ? "Completed" : "In progress"}
            </p>
            <p className="text-[11px] text-[#F53366] font-semibold underline hover:text-[#CC1747] transition-colors">
              {progressVal === 0 ? "Get started" : "Continue"}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DashboardDiscover;
