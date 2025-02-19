import PropTypes from "prop-types";
// import img from "../../assets/images/join_team.png";
import { StarRating } from "../star-rating";
import { useNavigate } from "react-router-dom";
import { useDeleteWishlist } from "@/hooks/students/use-delete-wishlist";


function Courses({ wishlist, handleWishlist }) {
  const { title, average_rating, total_reviews, id } = wishlist;
  const navigate = useNavigate();
  const { isPending, mutate } = useDeleteWishlist();
  return (
    <div className="overflow-hidden rounded-lg">
      <div
        onClick={() => {
          navigate(`/preview-course/${id}`);
        }}
        className="cursor-pointer"
      >
        <img
          src={wishlist.cover_image}
          className="h-[180px] lg:h-[200px]"
          alt={title}
        />
      </div>

      <div className="bg-[#FCFCFC] px-[10px] py-3">
        <p className="text-xs text-tertiary-color-900 md:max-w-[190px] md:text-[14px]">
          {title.length > 24 ? `${title.slice(0, 22)}...` : title}
        </p>
        {average_rating ? (
          <div className="my-3 flex items-center gap-[10px]">
            <span className="text-sm text-[#667185]">
              {Math.round(average_rating)}
            </span>
            <StarRating rating={Math.round(average_rating)} />
            <span>{total_reviews}</span>
          </div>
        ) : (
          <p className="my-3 text-sm italic text-gray-400">No reviews yet...</p>
        )}
        {/* <div className="my-3 flex items-center gap-2">
          <span className="text-xs font-light text-[#566B8E]">
            {Math.floor(average_rating * 10) / 10}
          </span>
          <div className="flex items-center text-xs">{renderStars()}</div>
          <span className="text-xs font-light text-[#566B8E]">
            {total_reviews ? `(${total_reviews}-review)` : "(No review)"}
          </span>
        </div> */}
        <div className="h-px w-full bg-primary-color-500" />

        <div className="mt-3 flex items-center justify-between">
          {/* <span className="text-xs text-tertiary-color-900 md:text-sm">
            {wishlist.price}
          </span> */}
          <button

            className="font-light text-[#566b8e]"
            onClick={() => mutate(id)}

          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

Courses.propTypes = {
  wishlist: PropTypes.object,
  handleWishlist: PropTypes.func,
};

export default Courses;
