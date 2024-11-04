import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "../pages/pages.module.css"; // Ensure this imports the correct CSS file with the styles
import joinTeam from "../assets/images/join_team.png";
import { Link } from "react-router-dom";
import PreviewButton from "./PreviewButton";
import { StarRating } from "./star-rating";
// import previewVideoCourse from "../Components/previewVideoCourse";

const CourseCard = ({
  altText,
  title,
  rating,
  review,
  path = "/preview-course",
}) => {
  return (
    <div className="bg-[rgb(252,252,252)]">
      <div className="w-full overflow-hidden rounded-t-lg">
        <img className="object-cover" src={joinTeam} alt={altText} />
      </div>
      <div className="flex flex-col justify-between rounded-b-lg px-[7px] py-[6px] md:px-3 md:py-2 lg:px-4 lg:py-[14px] lg:text-[16px]">
        <div>
          <p className="w-full max-w-[299px] text-left text-sm font-light text-[#667185] lg:text-base">
            {title}
          </p>

          <div className="mb-2 mt-[6px] flex w-full items-center justify-between text-xs md:text-base lg:mb-5 lg:mt-[14px] lg:text-lg">
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
        </div>
        <div className="justify-self-end">
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
