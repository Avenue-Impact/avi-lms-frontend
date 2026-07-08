import { Link } from "react-router-dom";
import { FaRocket, FaSpinner } from "react-icons/fa"; // Import Launch Icon
import joinTeam from "../../../assets/images/join_team.png";
import { StarRating } from "@/Components/star-rating";

const UnpublishedCourseCard = ({
  imgSrc = joinTeam,
  altText,
  title,
  date = "18/09/2024",
  rating,
  review,
  onLaunch,
  isPending,
}) => {
  return (
    
    <div className="relative mt-2 rounded-lg bg-[rgb(252,252,252)] shadow-md">
      <button
        onClick={onLaunch}
        className="absolute right-3 top-3 bg-black/50 hover:bg-[#CC1747] text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors shadow-md"
        title="Launch Course"
      >
        {isPending ? (
          <FaSpinner className="animate-spin text-sm" />
        ) : (
          <FaRocket className="text-sm" />
        )}
      </button>

      <div className="h-[90px] w-full overflow-hidden rounded-t-lg md:h-[120px] lg:h-[190px] xl:h-[206px]">
        <img
          className="h-full w-full object-cover"
          src={imgSrc}
          alt={altText}
        />
      </div>

      <div className="rounded-b-lg px-[7px] py-[6px] text-[14px] text-[#667185] md:py-2 lg:py-[14px] lg:text-[16px]">
        <p className="truncate">{title}</p>

        <p className="py-[10px] text-[12px] font-medium text-[#CC1747]">
          <span>Created</span> <span>{date}</span>
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

export default UnpublishedCourseCard;
