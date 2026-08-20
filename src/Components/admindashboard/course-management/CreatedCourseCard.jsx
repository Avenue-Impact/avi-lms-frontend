import { Link } from "react-router-dom";
import joinTeam from "../../../assets/images/join_team.png";
import RenderStars from "@/Components/RenderStars";
import { StarRating } from "@/Components/star-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone } from "@fortawesome/free-solid-svg-icons";

const CreatedCourseCard = ({
  imgSrc = joinTeam,
  altText,
  title,
  date = "18/09/2024",
  rating,
  review,
  onClone,
}) => {
  return (
    <div className="relative rounded-lg bg-[rgb(252,252,252)] shadow-md group">
      {onClone && (
        <button
          className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#CC1747] opacity-0 shadow hover:bg-white hover:text-red-700 focus:opacity-100 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClone();
          }}
          title="Clone Course"
        >
          <FontAwesomeIcon icon={faClone} />
        </button>
      )}
      <div className="h-[90px] w-full overflow-hidden rounded-t-lg md:h-[120px] lg:h-[190px] xl:h-[206px]">
        <img
          className="h-full w-full object-cover"
          src={imgSrc}
          alt={altText}
        />
      </div>

      <div className="rounded-b-lg px-[7px] py-[6px] text-[14px] text-[#667185] md:py-2 lg:py-[14px] lg:text-[16px]">
        <p className="truncate">{title}</p>

        <p className="flex space-x-1 py-[10px] text-[12px] font-medium text-[#CC1747]">
          <span>Created</span>
          <span>{date}</span>
        </p>

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
  );
};

export default CreatedCourseCard;
