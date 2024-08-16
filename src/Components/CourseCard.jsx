import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../pages/pages.module.css"; // Ensure this imports the correct CSS file with the styles
import PreviewButton, { EnrollPreviewButton } from "./PreviewButton";
import joinTeam from "../assets/images/join_team.png";
import { Link } from "react-router-dom";
// import previewVideoCourse from "../Components/previewVideoCourse";

export const renderStars = () => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <FontAwesomeIcon key={i} icon={faStar} className="text-[#ffffff]" />,
    );
  }
  return stars;
};

export const CourseCardPreview = ({ imgSrc, previewButtonText }) => {
  return (
    <div className={`${styles.previewCourses1} `}>
      <div className={`${styles.courseImg} `}>
        <img className="rounded-lg" src={imgSrc} alt="Course" />
      </div>
      <div className="pt-4 text-center">
        <Link to="/signup">
          <EnrollPreviewButton className="bg-[#b84646]">
            {previewButtonText}
          </EnrollPreviewButton>
        </Link>
      </div>
    </div>
  );
};

// Dashboard Discover
export const DashboardDiscover = ({
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
        <FontAwesomeIcon key={i} icon={faStar} className="text-[#F53366]" />,
      );
    }
    return stars;
  };

  const leaavingRateStar = () => {
    return <FontAwesomeIcon icon={faStar} className="text-[#F53366]" />;
  };

  return (
    <div className="bg-[rgb(252,252,252)]">
      <div className="w-full rounded-t-lg">
        <img className="object-cover" src={imgSrc} alt={altText} />
      </div>

      <div
        className={`rounded-b-lg text-[#667185] md:px-3 md:py-2 lg:py-[4px]`}
      >
        <p className="text-[12px] font-[500]">{title}</p>

        <div
          className={`${styles.courseNumber} mb-2 mt-[6px] flex items-center justify-start gap-2 lg:mb-2 lg:mt-[10px]`}
        >
          <p className="text-[12px]">{rating}</p>
          <div className="flex text-sm md:text-base lg:text-sm">
            {renderStars()}
          </div>
          <p className="text-[12px]">{numRatings}</p>
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

const CourseCard = ({
  imgSrc,
  altText,
  title,
  rating,
  numRatings,
  previewButtonText,
  path = "/preview-course",
}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} className="text-[#F53366]" />,
      );
    }
    return stars;
  };

  return (
    <div className="bg-[rgb(252,252,252)]">
      <div className="h-[90px] w-full overflow-hidden rounded-t-lg md:h-[120px] lg:h-[190px] xl:h-[206px]">
        <img className="object-cover" src={joinTeam} alt={altText} />
      </div>

      <div
        className={`rounded-b-lg px-[7px] py-[6px] text-[14px] text-[#667185] md:px-3 md:py-2 lg:px-4 lg:py-[14px] lg:text-[16px]`}
      >
        <p className="">{title}</p>
        <div
          className={`${styles.courseNumber} mb-2 mt-[6px] flex items-center justify-start gap-2 lg:mb-5 lg:mt-[14px]`}
        >
          <p className="">{rating}</p>
          <div className="flex items-center text-sm md:text-base lg:text-lg">
            {renderStars()}
          </div>
          <p className="">{numRatings}</p>
        </div>

        <Link to={path}>
          <PreviewButton className="w-full bg-[#CC1747] py-3 text-[12px] lg:text-[14px]">
            {previewButtonText}
          </PreviewButton>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
