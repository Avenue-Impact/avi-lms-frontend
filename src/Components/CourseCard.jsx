import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "../pages/pages.module.css"; // Ensure this imports the correct CSS file with the styles
// import joinTeam from "../assets/images/join_team.png";
import { Link } from "react-router-dom";
import PreviewButton from "./PreviewButton";
import { StarRating } from "./star-rating";
// import previewVideoCourse from "../Components/previewVideoCourse";

const CourseCard = ({
  altText,
  title,
  rating,
  review,
  imgSrc,
  path = "/preview-course",
}) => {
  return (
    <div className="max-w-[300px] rounded-lg bg-[rgb(252,252,252)] shadow-md">
      <div className="h-[150px] w-full overflow-hidden rounded-t-lg lg:h-[200px]">
        <img
          className="h-full w-full object-cover text-[12px]"
          src={imgSrc}
          alt={altText}
        />
      </div>
      <div className="flex min-h-[150px] flex-col justify-between rounded-b-lg px-[7px] py-[6px] md:px-3 md:py-2 lg:min-h-[200px] lg:px-4 lg:py-[14px] lg:text-[16px]">
        {/* Title Section */}
        <div className="flex flex-col justify-center">
          <p className="w-full max-w-[299px] text-left text-sm font-light text-[#667185] lg:text-base">
            {title}
          </p>

          {/* Rating Section */}
          <div className="mb-2 mt-[6px] flex w-full items-center justify-between text-xs md:text-base lg:mb-5 lg:mt-[14px] lg:text-lg">
            {rating ? (
              <div className="flex items-center gap-[10px]">
                <span className="text-sm text-[#667185]">
                  {Math.floor(rating * 10) / 10}
                </span>
                <StarRating rating={rating} />
                <span className="text-sm text-[#667185]">
                  {review}
                </span>
              </div>
            ) : (
              <p className="text-sm italic text-gray-400">No reviews yet...</p>
            )}
          </div>
        </div>

        {/* Button Section */}
        <div className="mt-auto">
          <Link to={path}>
            <PreviewButton className="w-full bg-[#CC1747] py-3 text-[12px] lg:text-[14px]">
              Preview Course
            </PreviewButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
