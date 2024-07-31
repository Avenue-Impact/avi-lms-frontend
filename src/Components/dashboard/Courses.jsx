import PropTypes from "prop-types";
import img from "../../assets/images/join_team.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Courses({ wishlist, handleWishlist }) {
  const { price, reviews, ratings, title, id } = wishlist;
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
    <div className="overflow-hidden rounded-lg">
      <img src={img} alt={title} />
      <div className="bg-[#FCFCFC] px-[10px] py-3">
        <p className="text-xs text-tertiary-color-900 md:max-w-[166px] md:text-sm">
          {title}
        </p>
        <div className="my-3 flex items-center gap-2 md:gap-3">
          <span className="text-xs font-light text-[#566B8E]">{ratings}</span>
          <div className="flex items-center text-xs">{renderStars()}</div>
          <span className="text-xs font-light text-[#566B8E]">{reviews}</span>
        </div>
        <div className="h-px w-full bg-primary-color-500" />

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-tertiary-color-900 md:text-sm">

            

            {price}
          </span>
          <button
            className="text-xs font-light text-[#566b8e] md:text-base"
            onClick={() => handleWishlist(id)}
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
