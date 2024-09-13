import { Star } from "lucide-react";

export function StarRating({ rating, maxRating = 5 }) {
  const getColor = (index) => {
    if (rating == null) return "text-white stroke-primary-color-600";
    const threshold = rating - index;
    if (threshold >= 1) return "text-primary-color-600";
    if (threshold > 0) return "text-white stroke-primary-color-600 ";
    return "text-white stroke-primary-color-600 ";
  };

  // const displayRating = rating != null ? rating.toFixed(1) : "N/A";

  return (
    <div className="flex items-center space-x-[2px]">
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          className={`h-[14px] w-[14px] ${getColor(index)}`}
          fill="currentColor"
        />
      ))}
      {/* <span className="ml-2 text-sm text-gray-600">
        {displayRating} out of {maxRating}
      </span> */}
    </div>
  );
}
