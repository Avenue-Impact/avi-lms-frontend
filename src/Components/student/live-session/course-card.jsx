import { StarRating } from "@/Components/star-rating";
import { Link } from "react-router-dom";

const LiveSessionCourseCard = ({
  imgSrc,
  altText,
  title,
  courseProgress,
  rating,
  review,
  courseId,
  cohortId,
}) => {
  return (
    <div className="overflow-hidden rounded-t-lg bg-[rgb(252,252,252)]">
      <Link
        to={`/dashboard/${courseId}/live?title=${title}&cohortId=${cohortId}`}
      >
        {/* <Link to={`/dashboard-s/course-details`}> */}
        <div className="rounded-lg bg-[rgb(252,252,252)] shadow-md">
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

          <div className="flex items-center justify-between px-[7px] pb-2">
            <p className="text-[10px]">{courseProgress}</p>
          </div>
          <button className="w-full rounded-md bg-[#E11D48] py-2 text-sm font-medium text-white transition-colors hover:bg-rose-700">
            Get Started
          </button>
        </div>
      </Link>
    </div>
  );
};

export default LiveSessionCourseCard;
