import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const DashboardDiscover = ({
  imgSrc,
  altText,
  title,
  rating,
  numRatings,
  courseProgress,
  leaveRating,
  continueLearning,
  getStarted,
}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className="text-[10px] text-[#F53366] md:text-lg"
        />,
      );
    }
    return stars;
  };

  const leaavingRateStar = () => {
    return <FontAwesomeIcon icon={faStar} className="text-[#F53366]" />;
  };

  return (
    <div className="overflow-hidden rounded-t-lg bg-[rgb(252,252,252)]">
      <div className="w-full overflow-hidden rounded-t-lg">
        <img className="object-cover" src={imgSrc} alt={altText} />
      </div>

      <div
        className={`rounded-b-lg text-[#667185] md:px-3 md:py-2 lg:py-[4px]`}
      >
        <p className="text-[12px] md:font-[500]">{title}</p>

        <div>
          <p className="text-[10px] md:text-[12px]">{rating}</p>
          <div className="flex text-sm md:text-base lg:text-sm">
            {renderStars()}
          </div>
          <p className="text-[10px] md:text-[12px]">{numRatings}</p>
        </div>

        <div className="my-[5px] hidden h-[1px] w-full bg-[#F53366] lg:block" />

        <div className="flex flex-1 justify-between">
          <p className="text-[10px]">{courseProgress}</p>
          <Link to="/dashboard/leaveRating">
            <p className="text-[10px]">
              {leaveRating && (
                <>
                  {leaavingRateStar()}
                  <span className="underline">{leaveRating}</span>
                </>
              )}
            </p>
          </Link>

          <Link to="/dashboard/share-documents">
            <p className="text-[10px] text-[#F53366] underline">
              {continueLearning}
            </p>
          </Link>

          <Link to="/dashboard/share-documents">
            <p className="text-[10px] text-[#F53366] underline">{getStarted}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardDiscover;
