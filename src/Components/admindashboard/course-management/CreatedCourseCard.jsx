import { Link } from "react-router-dom";
import joinTeam from "../../../assets/images/join_team.png";
import RenderStars from "@/Components/RenderStars";
import { StarRating } from "@/Components/star-rating";

const CreatedCourseCard = ({
  imgSrc = joinTeam,
  altText,
  title,
  path = "/admin/course/management/edit", // Setting the default path to a string route
  date = "Created 18/09/2024",
  rating,
  review,
}) => {
  return (
    <div className="rounded-lg bg-[rgb(252,252,252)] shadow-md">
      <div className="h-[90px] w-full overflow-hidden rounded-t-lg md:h-[120px] lg:h-[190px] xl:h-[206px]">
        <img
          className="h-full w-full object-cover"
          src={imgSrc}
          alt={altText}
        />
      </div>

      <div className="rounded-b-lg px-[7px] py-[6px] text-[14px] text-[#667185] md:py-2 lg:py-[14px] lg:text-[16px]">
        <p>{title}</p>

        {path ? (
          <Link to={path}>
            <p className="py-[10px] text-[12px] font-medium text-[#CC1747]">
              {date}
            </p>
          </Link>
        ) : (
          <p className="py-[10px] text-[12px] font-medium text-[#CC1747]">
            {date}
          </p>
        )}

        {rating && (
          <div className="flex items-center gap-[10px]">
            <span className="text-sm text-[#667185]">{rating}</span>
            <StarRating rating={rating} />
            <span>{review}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatedCourseCard;
