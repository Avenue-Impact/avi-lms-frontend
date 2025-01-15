import { Link, useParams } from "react-router-dom";
import { StarRating } from "./star-rating";

const DashboardDiscover = ({
  imgSrc,
  altText,
  title,
  courseProgress,
  rating,
  review,
  courseId,
}) => {
  return (
    <div className="overflow-hidden rounded-t-lg bg-[rgb(252,252,252)]">
      <div className="rounded-lg bg-[rgb(252,252,252)] shadow-md">
        <div className="h-[90px] w-full overflow-hidden rounded-t-lg md:h-[120px] lg:h-[190px] xl:h-[206px]">
          <img
            className="h-full w-full object-cover"
            src={imgSrc}
            alt={altText}
          />
        </div>

        <div className="rounded-b-lg px-[7px] py-[6px] text-[14px] text-[#667185] md:py-2 lg:py-[14px] lg:text-[16px]">
          <p className="truncate">{title}</p>

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
          <Link to={`/dashboard/${courseId}/share-documents?title=${title}`}>
            <p className="text-[10px] text-[#F53366] underline">Get started</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardDiscover;
