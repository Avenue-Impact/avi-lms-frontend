import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "../pages/pages.module.css"; // Ensure this imports the correct CSS file with the styles
import joinTeam from "../assets/images/join_team.png";
import { Link } from "react-router-dom";
import PreviewButton from "./PreviewButton";
// import previewVideoCourse from "../Components/previewVideoCourse";

const CourseCard = ({
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
          <p className="text-xs md:text-base">{rating}</p>
          <div className="flex items-center text-xs md:text-base lg:text-lg">
            {renderStars()}
          </div>
          <p className="text-xs md:text-base">{numRatings}</p>
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
