import { useState } from "react";
import { Star } from "lucide-react";

export const StarRatingHover = ({ totalStars = 5, onRating }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleMouseEnter = (starIndex) => {
    setHover(starIndex);
  };

  const handleMouseLeave = () => {
    setHover(0);
  };

  const handleClick = (starIndex) => {
    setRating(starIndex);
    if (onRating) {
      onRating(starIndex);
    }
  };

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={index}
            className={`cursor-pointer transition-colors ${
              starValue <= (hover || rating)
                ? "fill-primary-color-600 text-primary-color-600"
                : "text-gray-300"
            }`}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
            size={24}
          />
        );
      })}
    </div>
  );
};
