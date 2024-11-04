"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export function Component({ initialRating = 0, onChange }) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  const getStarColor = (starNumber) => {
    const threshold = hover || rating;
    if (starNumber <= threshold) {
      if (threshold < 2) return "text-red-500";
      if (threshold < 3) return "text-orange-500";
      if (threshold < 4) return "text-yellow-500";
      if (threshold < 5) return "text-lime-500";
      return "text-green-500";
    }
    return "text-gray-300";
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((starNumber) => (
          <Star
            key={starNumber}
            className={`h-8 w-8 cursor-pointer ${getStarColor(starNumber)}`}
            fill={starNumber <= (hover || rating) ? "currentColor" : "none"}
            onMouseEnter={() => setHover(starNumber)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleRatingChange(starNumber)}
          />
        ))}
      </div>
      <p className="text-lg font-semibold">
        Average Rating: {rating.toFixed(1)}
      </p>
    </div>
  );
}

// import React from "react"
import StarRating from "./star-rating";

export function StarRatingDemo() {
  return (
    <div className="space-y-4 p-4">
      <h1 className="mb-4 text-2xl font-bold">Star Rating Component</h1>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <StarRating rating={0} />
          <span className="text-sm text-gray-600">Rating: 0</span>
        </div>
        <div className="flex items-center space-x-2">
          <StarRating rating={2.5} />
          <span className="text-sm text-gray-600">Rating: 2.5</span>
        </div>
        <div className="flex items-center space-x-2">
          <StarRating rating={3.7} />
          <span className="text-sm text-gray-600">Rating: 3.7</span>
        </div>
        <div className="flex items-center space-x-2">
          <StarRating rating={5} />
          <span className="text-sm text-gray-600">Rating: 5</span>
        </div>
      </div>
    </div>
  );
}

export default function Component({ rating, maxRating = 5 }) {
  const getColor = (index) => {
    if (rating == null) return "text-gray-300";
    const threshold = rating - index;
    if (threshold >= 1) return "text-yellow-400";
    if (threshold > 0) return "text-yellow-200";
    return "text-gray-300";
  };

  const displayRating = rating != null ? rating.toFixed(1) : "N/A";

  return (
    <div className="flex items-center space-x-1">
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          className={`h-6 w-6 ${getColor(index)}`}
          fill="currentColor"
        />
      ))}
      {/* <span className="ml-2 text-sm text-gray-600">
        {displayRating} 
      </span> */}
    </div>
  );
}
